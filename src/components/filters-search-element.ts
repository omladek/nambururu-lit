import { css } from 'lit'
import { customElement } from 'lit/decorators.js'

import { SearchElement } from './search-element'

@customElement('filters-search-element')
export class FiltersSearchElement extends SearchElement {
  static styles = [
    SearchElement.styles,
    css`
      :host fieldset {
        border: 0;
        margin: 0;
        padding: 0;
      }

      @media (max-width: 40em) {
        :host fieldset {
          border: 0;
          padding: 0;
          position: relative;
        }

        :host .search input {
          border-block-end: 0;
          border-inline-start: 0;
        }

        :host .search .btn {
          border-block-end: 0;
        }

        :host .search label {
          clip: rect(0 0 0 0);
          clip-path: inset(50%);
          height: 1px;
          overflow: hidden;
          position: absolute;
          white-space: nowrap;
          width: 1px;
        }
      }

      @media (min-width: 40em) {
        :host .search fieldset {
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
    'filters-search-element': FiltersSearchElement
  }
}
