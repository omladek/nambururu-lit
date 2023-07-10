import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'

import './link-element'
import globalStyle from '../styles/global.style'

@customElement('header-element')
export class HeaderElement extends LitElement {
  render() {
    return html`<header class="header">
      <nav class="header__nav">
        <ul class="header__nav-list">
          <li class="header__nav-list-item">
            <link-element class="header__logo" href="/nambururu-lit/#/">
              Nambururu
            </link-element>
          </li>
          <li class="header__nav-list-item">
            <link-element
              activeClass="is-active"
              class="header__nav-list-item-link"
              href="/nambururu-lit/#/"
            >
              Home
            </link-element>
          </li>
          <li class="header__nav-list-item">
            <link-element
              activeClass="is-active"
              class="header__nav-list-item-link"
              href="/nambururu-lit/#/settings"
            >
              Settings
            </link-element>
          </li>
        </ul>
      </nav>
    </header>`
  }

  static styles = [
    globalStyle,
    css`
      .header {
        align-items: center;
        background-color: var(--color-background);
        border-bottom: 1px solid var(--color-accent);
        display: flex;
        grid-area: header;
        justify-content: space-between;
        padding-inline: var(--gutter);
      }

      .header__logo {
        font-size: 1rem;
        font-weight: bold;
        text-decoration: none;
      }

      .header__nav {
        width: 100%;
      }

      .header__nav-list {
        align-items: center;
        display: flex;
        gap: var(--gutter);
        justify-content: space-between;
        list-style: none;
        margin: 0;
        padding: 0;
        width: 100%;
      }

      .header__nav-list-item:first-child {
        flex: 1;
      }

      .header__nav-list-item-link {
        display: block;
        padding-block: calc(var(--gutter) / 2);
        padding-inline: var(--gutter);
      }

      .header__nav-list-item-link.is-active {
        background-color: var(--color-accent);
        text-decoration: none;
      }
    `,
  ]
}

declare global {
  interface HTMLElementTagNameMap {
    'header-element': HeaderElement
  }
}
