import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import globalStyle from '../styles/global.style'

@customElement('rich-text-element')
export class RichTextElement extends LitElement {
  @property({ type: String })
  html!: string

  render() {
    return html`${unsafeHTML(this.html)}`
  }

  static styles = [globalStyle]
}

declare global {
  interface HTMLElementTagNameMap {
    'rich-text-element': RichTextElement
  }
}
