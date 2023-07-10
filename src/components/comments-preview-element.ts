import { LitElement, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import getCommentsPreview from '../utilities/getCommentsPreview'
import { NormalizedComment } from '../types/reddit-api/CommentsResult.type'
import { when } from 'lit/directives/when.js'
import './loader-element'
import './comment-element'
import buttonStyle from '../styles/button.style'
import globalStyle from '../styles/global.style'
import { repeat } from 'lit/directives/repeat.js'

@customElement('comments-preview-element')
export class CommentsPreviewElement extends LitElement {
  @property({ type: String })
  id!: string

  @state()
  isLoading = false

  @state()
  showComments = false

  @state()
  comments: NormalizedComment[] = []

  @state()
  commentsPreviewController: AbortController | null = null

  private async _getComments() {
    this.isLoading = true

    try {
      if (this.commentsPreviewController) {
        this.commentsPreviewController.abort()
      }
      this.commentsPreviewController = new AbortController()
      const { signal } = this.commentsPreviewController
      const comments = await getCommentsPreview(this.id, signal)

      this.comments = comments
      this.showComments = true
    } catch (error) {
      console.error(error)
    } finally {
      this.isLoading = false
    }
  }

  render() {
    return html`
      ${when(
        !this.showComments || this.isLoading,
        () => html`
          <button
            class="${`btn btn--block ${this.isLoading ? 'is-loading' : ''}`}"
            @click=${this._getComments}
            type="button"
          >
            ${when(
              this.isLoading,
              () => html`<loader-element size="xs"></loader-element>`,
            )}
            <span class="btn__text">Load comments</span>
          </button>
        `,
        () => html`
          ${when(
            this.comments.length,
            () => html`
              ${repeat(
                this.comments,
                (comment) => comment.id,
                (comment) =>
                  html`<comment-element
                    .comment="${comment}"
                  ></comment-element> `,
              )}
            `,
            () => html`<p>No relevant comments.</p>`,
          )}
        `,
      )}
    `
  }

  static styles = [globalStyle, buttonStyle]
}

declare global {
  interface HTMLElementTagNameMap {
    'comments-preview-element': CommentsPreviewElement
  }
}
