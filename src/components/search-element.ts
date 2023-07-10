import { CSSResultGroup, LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import debounce from 'lodash.debounce'

import globalStyle from '../styles/global.style'
import getSanitizedString from '../utilities/getSanitizedString'
import { repeat } from 'lit/directives/repeat.js'
import buttonStyle from '../styles/button.style'

interface RedditNameResponse {
  names: string[]
}

@customElement('search-element')
export class SearchElement extends LitElement {
  @property({ type: String })
  id!: string

  @property({ type: String })
  customCSS!: string

  @state()
  inputId = ''

  @state()
  listId = ''

  @state()
  suggestions: string[] = []

  @state()
  searchAbortController: AbortController | null = null

  override firstUpdated = async () => {
    // avoid unnecessary calls by waiting for any pending updated to complete.
    await this.updateComplete

    this.inputId = `input-${this.id}`
    this.listId = `list-${this.id}`
  }

  disconnectedCallback = () => {
    if (this.searchAbortController) {
      this.searchAbortController.abort()
    }

    super.disconnectedCallback()
  }

  private _handleSearchSubmit = (
    event: Event & { currentTarget: HTMLFormElement },
  ) => {
    event.preventDefault()

    const nextSubredit = getSanitizedString(
      (
        new FormData(event.currentTarget).get(this.inputId)?.toString() || ''
      ).trim(),
    )

    if (!nextSubredit) {
      return
    }

    if (this.searchAbortController) {
      this.searchAbortController.abort()
    }

    this.dispatchEvent(
      new CustomEvent('search', {
        bubbles: true,
        detail: nextSubredit,
      }),
    )
  }

  private _handleInput = debounce(async (value: string) => {
    const sanitizedValue = getSanitizedString(value.trim())

    if (sanitizedValue.length < 3) {
      return
    }

    if (this.searchAbortController) {
      this.searchAbortController.abort()
    }

    this.searchAbortController = new AbortController()
    const { signal } = this.searchAbortController

    const response: RedditNameResponse = await fetch(
      `https://www.reddit.com/api/search_reddit_names.json?query=${sanitizedValue}`,
      { signal },
    ).then((response) => response.json())

    this.suggestions = response.names
  }, 300)

  render() {
    return html`<form
      action=""
      class="search"
      method="get"
      @submit=${this._handleSearchSubmit}
    >
      <fieldset>
        <label for="${this.inputId}">search</label>
        <div class="search__group">
          <input
            autocomplete="off"
            id="${this.inputId}"
            list="${this.listId}"
            maxlength="38"
            name="${this.inputId}"
            @input=${({ target }: Event & { target: HTMLInputElement }) =>
              this._handleInput(target.value)}
            pattern="[a-zA-Z0-9_]+"
            placeholder="search subreddit"
            required
            type="search"
          />
          <datalist id="${this.listId}">
            ${repeat(
              this.suggestions,
              (suggestion) => suggestion,
              (option) => html`<option value="${option}">${option}</option>`,
            )}
          </datalist>
          <button class="btn" type="submit">
            <span class="btn__text">🔍</span>
          </button>
        </div>
      </fieldset>
    </form>`
  }

  static styles: CSSResultGroup = [
    globalStyle,
    buttonStyle,
    css`
      .search__group {
        display: flex;

        & input ~ .btn {
          border-inline-start: 0;
        }
      }
    `,
  ]
}

declare global {
  interface HTMLElementTagNameMap {
    'search-element': SearchElement
  }
}
