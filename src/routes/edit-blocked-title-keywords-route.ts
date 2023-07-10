import { LitElement, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'

import '../components/header-element'
import globalStyle from '../styles/global.style'
import { when } from 'lit/directives/when.js'
import buttonStyle from '../styles/button.style'
import getDefaultValue from '../utilities/getDefaultValue'
import Storage from '../constants/storage'

@customElement('edit-blocked-title-keywords-route')
export class EditBlockedTitleKeywordsRouteElement extends LitElement {
  @state()
  isSaved = false

  @state()
  state = ''

  constructor() {
    super()

    this.state = getDefaultValue(Storage.BLOCKED_TITLE_KEYWORDS)
  }

  firstUpdated = async () => {
    this.state = getDefaultValue(Storage.BLOCKED_TITLE_KEYWORDS)
  }

  private _handleSubmit = async (
    event: Event & { currentTarget: HTMLFormElement },
  ): Promise<void> => {
    event.preventDefault()

    this.isSaved = false

    const entries = [...new FormData(event.currentTarget).entries()]

    entries.forEach(([key, value]) => {
      localStorage.setItem(key, value.toString())
    })

    await new Promise((resolve) => {
      setTimeout(() => resolve(undefined), 500)
    })

    this.isSaved = true
  }

  render() {
    return html`
      <header-element></header-element>
        <h1 class="title">Blocked title keywords</h1>
        <div class="block">
          <form action="" method="get" @submit=${this._handleSubmit}>
            <fieldset>
              <label for="${Storage.BLOCKED_TITLE_KEYWORDS}">
                blocked title keywords
              </label>
              <p>
                comma separated words; if a post title includes this word(s) it will
                not be shown
              </p>
              <textarea
                .value=${this.state}
                id="${Storage.BLOCKED_TITLE_KEYWORDS}"
                name="${Storage.BLOCKED_TITLE_KEYWORDS}"
                @change=${() => {
                  this.isSaved = false
                }}></textarea>
            </fieldset>

            <button class="btn" type="submit">Save</button>

            ${when(this.isSaved, () => html`<p>Changes were saved.</p>`)}
          </form>
        </div>
      </main>
    `
  }

  static styles = [globalStyle, buttonStyle]
}

declare global {
  interface HTMLElementTagNameMap {
    'edit-blocked-title-keywords-route': EditBlockedTitleKeywordsRouteElement
  }
}
