import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'

import '../components/header-element'
import '../components/link-element'
import '../components/add-list-element'
import globalStyle from '../styles/global.style'
import parseStorage from '../utilities/parseStorage'
import getSortedList from '../utilities/getSortedList'
import { when } from 'lit/directives/when.js'
import { repeat } from 'lit/directives/repeat.js'
import buttonStyle from '../styles/button.style'

@customElement('lists-route')
export class ListsRouteElement extends LitElement {
  @state()
  lists: string[] = []

  constructor() {
    super()

    this.lists = getSortedList(parseStorage('lists'))
  }

  private _getSubredditsTotalByList = (id: string): number => {
    return parseStorage(id).length
  }

  private _removeFromLists = (id: string): void => {
    // eslint-disable-next-line no-restricted-globals, no-alert
    const result = confirm('Are you sure?')

    if (!result) {
      return
    }

    const nextLists = this.lists.filter((list) => list !== id).filter(Boolean)

    localStorage.setItem('lists', nextLists.join(','))

    localStorage.removeItem(id)

    this.lists = nextLists
  }

  private _addListId = (event: CustomEvent<string>): void => {
    const nextLists = getSortedList([...this.lists, event.detail])

    localStorage.setItem('lists', nextLists.join(','))

    this.lists = nextLists
  }

  render() {
    return html`
      <header-element></header-element>
      <main class="main">
        <h1 class="title">My lists</h1>
        <div class="block">
          ${when(
            this.lists.length,
            () => html`
              <table class="lists">
                <thead>
                  <tr>
                    <th>title</th>
                    <th>subreddits</th>
                    <th>actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${repeat(
                    this.lists,
                    (list) => list,
                    (list) =>
                      html`<tr>
                        <td>${list}</td>
                        <td>${this._getSubredditsTotalByList(list)}</td>
                        <td class="lists__actions">
                          <link-element
                            className="btn"
                            href="${`/nambururu-lit/#/edit/?list=${list}`}"
                          >
                            edit
                          </link-element>
                          <button
                            class="btn"
                            @click=${() => this._removeFromLists(list)}
                            type="button"
                          >
                            delete
                          </button>
                        </td>
                      </tr>`,
                  )}
                </tbody>
              </table>
            `,
            () => html`<p>No lists.</p>`,
          )}

          <add-list-element
            .lists=${this.lists}
            @listId=${this._addListId}
          ></add-list-element>
        </div>
      </main>
    `
  }

  static styles = [
    globalStyle,
    buttonStyle,
    css`
      .lists {
        border: 1px solid var(--color-accent);
        table-layout: fixed;

        & th {
          border: 0;
          border-bottom: 1px solid var(--color-accent);
          text-align: left;
        }

        & th,
        & td {
          padding: 0.25em 0.5em;
        }

        & td {
          border: 0;
        }

        & tbody tr {
          border-bottom: 1px solid var(--color-accent);
        }
      }

      .lists:not(:last-child) {
        margin-block-end: var(--gutter);
      }

      .lists__actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5em;

        & .btn {
          flex: 1;
          white-space: nowrap;
          width: 100%;
        }
      }
    `,
  ]
}

declare global {
  interface HTMLElementTagNameMap {
    'lists-route': ListsRouteElement
  }
}
