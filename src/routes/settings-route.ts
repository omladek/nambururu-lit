import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import '../components/header-element'
import '../components/link-element'
import globalStyle from '../styles/global.style'
import parseStorage from '../utilities/parseStorage'
import Storage from '../constants/storage'

@customElement('settings-route')
export class SettingsRouteElement extends LitElement {
  render() {
    return html`
      <header-element></header-element>
      <main class="main">
        <h1 class="title">Settings</h1>
        <div class="block">
          <ul>
            <li>
              <link-element href="/nambururu-lit/#/lists"
                >My lists</link-element
              >
              ( ${parseStorage('lists').length})
            </li>
            <li>
              <link-element href="/nambururu-lit/#/blocked-subreddits"
                >Blocked subreddits</link-element
              >
              (${parseStorage(Storage.BLOCKED_SUBREDDITS).length})
            </li>
            <li>
              <link-element href="/nambururu-lit/#/blocked-title-keywords">
                Blocked title keywords
              </link-element>
              (${parseStorage(Storage.BLOCKED_TITLE_KEYWORDS).length})
            </li>
          </ul>
        </div>
      </main>
    `
  }

  static styles = [globalStyle]
}

declare global {
  interface HTMLElementTagNameMap {
    'settings-route': SettingsRouteElement
  }
}
