import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import globalStyle from '../styles/global.style'

import './filters-search-element'
import './nav-element'
import './sort-element'
import { Router } from '@vaadin/router'
import { SortOption } from '../constants/sortOptions'

@customElement('filters-element')
export class FiltersElement extends LitElement {
  @property({ type: String })
  subreddit!: string

  @property({ type: String })
  sort!: SortOption

  private _handleSearch = ({ detail }: CustomEvent<string>): void => {
    Router.go(`/nambururu-lit/#/?subreddit=${detail}&sort=best`)
  }

  render() {
    return html` <footer class="filters">
      <filters-search-element
        id="search"
        @search=${this._handleSearch}
      ></filters-search-element>
      <nav-element subreddit=${this.subreddit}></nav-element>
      <sort-element
        subreddit=${this.subreddit}
        sort=${this.sort}
      ></sort-element>
    </footer>`
  }

  static styles = [
    globalStyle,
    css`
      .filters {
        background-color: var(--color-background);
        display: grid;
        gap: 0;
        grid-template-columns: 65% repeat(2, 1fr);
        width: 100%;
      }

      @media (min-width: 40em) {
        .filters {
          border-block-start: 1px solid var(--color-accent);
          gap: var(--gutter);
          grid-template-columns: repeat(3, minmax(auto, 20em));
          padding-block: calc(var(--gutter) / 2);
          padding-inline: var(--gutter);
        }
      }
    `,
  ]
}

declare global {
  interface HTMLElementTagNameMap {
    'filters-element': FiltersElement
  }
}
