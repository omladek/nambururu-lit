import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { when } from 'lit/directives/when.js'
import getSubredditsFromUserLists from '../utilities/getSubredditsFromUserLists'
import parseStorage from '../utilities/parseStorage'
import { Router } from '@vaadin/router'
import globalStyle from '../styles/global.style'
import { repeat } from 'lit/directives/repeat.js'

@customElement('nav-element')
export class NavElement extends LitElement {
  @property({ type: String })
  subreddit!: string

  @state()
  userLists: string[] = []

  @state()
  subreddits: string[] = []

  constructor() {
    super()

    this.userLists = parseStorage('lists') || []
    this.subreddits = getSubredditsFromUserLists(this.userLists)
  }

  private async _handleNavChange({
    target,
  }: InputEvent & { target: HTMLSelectElement }) {
    Router.go(`/nambururu-lit/#/?subreddit=${target.value}&sort=best`)
  }

  render() {
    return html`<form action="" method="get">
      <fieldset class="nav">
        <label for="subreddit">r/</label>
        <select
          name="subreddit"
          id="subreddit"
          @change=${this._handleNavChange}
        >
          <option disabled>choose</option>
          ${when(
            this.userLists.length,
            () => html`
              <optgroup label="my lists">
                ${repeat(
                  this.userLists,
                  (userList) => userList,
                  (userList) =>
                    html`<option
                      value="${userList}"
                      ?selected=${this.subreddit === userList}
                    >
                      ${userList}
                    </option>`,
                )}
              </optgroup>
            `,
          )}
          ${when(
            this.subreddits.length,
            () => html`
              <optgroup label="subreddits">
                ${repeat(
                  this.subreddits,
                  (subreddit) => subreddit,
                  (subreddit) =>
                    html`<option
                      value="${subreddit}"
                      ?selected=${this.subreddit === subreddit}
                    >
                      ${subreddit}
                    </option>`,
                )}
              </optgroup>
            `,
          )}
        </select>
      </fieldset>
    </form>`
  }

  static styles = [
    globalStyle,
    css`
      .nav {
        border: 0;
        margin: 0;
        padding: 0;
      }

      @media (max-width: 40em) {
        :host(:not(:last-child)) {
          border-inline-end: 1px solid var(--color-accent);
        }

        .nav {
          position: relative;
        }

        .nav label {
          align-items: center;
          appearance: none;
          background-color: var(--color-post);
          border-block-start: 1px solid var(--color-accent);
          color: var(--color-link);
          display: inline-block;
          font-family: inherit;
          font-size: 0.8rem;
          font-weight: 500;
          height: var(--form-element-height);
          left: 0;
          margin: 0;
          padding: 0.75em 1.5em;
          pointer-events: none;
          position: absolute;
          text-align: center;
          text-decoration: none;
          top: 0;
          width: 100%;
          z-index: 1;
        }

        .nav select {
          opacity: 0;
        }
      }

      @media (min-width: 40em) {
        .nav {
          align-items: center;
          display: flex;
          gap: var(--gutter);
          justify-content: flex-start;

          & input,
          & select {
            width: 100%;
          }
        }
      }
    `,
  ]
}

declare global {
  interface HTMLElementTagNameMap {
    'nav-element': NavElement
  }
}
