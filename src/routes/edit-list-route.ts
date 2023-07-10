import { LitElement, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'

import '../components/header-element'
import '../components/tags-element'
import globalStyle from '../styles/global.style'
import { when } from 'lit/directives/when.js'
import buttonStyle from '../styles/button.style'
import parseListIdFromURL from '../utilities/parseListIdFromURL'
import getDefaultValue from '../utilities/getDefaultValue'

@customElement('edit-list-route')
export class EditListRouteElement extends LitElement {
  @state()
  id = ''

  @state()
  formId = ''

  @state()
  isSaved = false

  @state()
  state = ''

  constructor() {
    super()

    const id = parseListIdFromURL(window.location.href) || ''
    this.id = id
    this.formId = `form-${id}`
    this.state = getDefaultValue(id)
  }

  firstUpdated = async () => {
    const id = parseListIdFromURL(window.location.href) || ''
    this.id = id
    this.formId = `form-${id}`
    this.state = getDefaultValue(id)
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

  private _removeTag = ({ detail }: CustomEvent<string>): void => {
    this.state = this.state
      .split(',')
      .filter((tag) => tag !== detail)
      .join(',')
  }

  private _handleSearch = ({ detail }: CustomEvent<string>): void => {
    this.state = [...this.state.split(',').filter(Boolean), detail].join(',')
  }

  render() {
    return html`
      <header-element></header-element>
      <main class="main">
        <h1 class="title">Edit list</h1>
        <div class="block">
          <form id="${this.formId}" @submit=${this._handleSubmit}>
            <fieldset>
              <label for="${this.id}">List ${this.id}</label>
              <p>comma separated subreddit names</p>
              <textarea
                id="${this.id}"
                name="${this.id}"
                @change=${(
                  event: Event & { currentTarget: HTMLTextAreaElement },
                ) => {
                  this.state = event.currentTarget.value
                  this.isSaved = false
                }}
                .value=${this.state}
                required
              ></textarea>
              <tags-element
                .tags=${this.state.split(',').filter(Boolean)}
                @tag=${this._removeTag}
              ></tags-element>
            </fieldset>
          </form>

          <search-element
            id="${`search-${this.id}`}"
            @search=${this._handleSearch}
          ></search-element>

          <button class="btn" form="${this.formId}" type="submit">Save</button>

          ${when(this.isSaved, () => html`<p>Changes were saved.</p>`)}
        </div>
      </main>
    `
  }

  static styles = [globalStyle, buttonStyle]
}

declare global {
  interface HTMLElementTagNameMap {
    'edit-list-route': EditListRouteElement
  }
}
