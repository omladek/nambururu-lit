import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import globalStyle from '../styles/global.style'
import getSanitizedString from '../utilities/getSanitizedString'
import buttonStyle from '../styles/button.style'

@customElement('add-list-element')
export class AddListElement extends LitElement {
  @property({ type: String })
  inputId = 'list-name'

  @property({ type: Array })
  lists: string[] = []

  private _dispatchListId(listId: string) {
    this.dispatchEvent(
      new CustomEvent('listId', {
        bubbles: true,
        detail: listId,
      }),
    )
  }

  private _handleSubmit = (
    event: Event & { currentTarget: HTMLFormElement },
  ): void => {
    event.preventDefault()

    const listName = getSanitizedString(
      (
        new FormData(event.currentTarget).get(this.inputId)?.toString() || ''
      ).trim(),
    )

    if (!listName) {
      return
    }

    const isExisting = this.lists.includes(listName)

    if (isExisting) {
      // eslint-disable-next-line no-alert
      alert(
        `List "${listName}" already exists! Please choose a different name.`,
      )
      return
    }

    this._dispatchListId(listName)
  }

  render() {
    return html`<form action="" method="get" @submit=${this._handleSubmit}>
      <fieldset>
        <legend>Create new list</legend>
        <label for="${this.inputId}">Name</label>
        <input
          autocomplete="off"
          id="${this.inputId}"
          maxlength="38"
          name="${this.inputId}"
          pattern="[a-zA-Z0-9_]+"
          required
          type="text"
        />
        <p>
          <small>Allowed: letters, numbers, underscore, hyphen</small>
        </p>
        <button class="btn" type="submit">Create</button>
      </fieldset>
    </form>`
  }

  static styles = [globalStyle, buttonStyle]
}

declare global {
  interface HTMLElementTagNameMap {
    'add-list-element': AddListElement
  }
}
