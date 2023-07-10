import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import globalStyle from '../styles/global.style'
import buttonStyle from '../styles/button.style'

@customElement('link-element')
export class LinkElement extends LitElement {
  @property({
    type: String,
  })
  href!: string

  @property({
    type: String,
  })
  className = ''

  private _onClick(event: MouseEvent): void {
    event.preventDefault()

    window.location.hash = this.href.split('#')[1]
  }

  render() {
    return html`<a
      href="${this.href}"
      class="${this.className}"
      @click=${this._onClick}
      ><slot></slot
    ></a>`
  }

  static styles = [globalStyle, buttonStyle]
}

declare global {
  interface HTMLElementTagNameMap {
    'link-element': LinkElement
  }
}
