import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { NormalizedComment } from '../types/reddit-api/CommentsResult.type'

import './rich-text-element'
import globalStyle from '../styles/global.style'

@customElement('comment-element')
export class CommentElement extends LitElement {
  @property({ type: Object })
  comment!: NormalizedComment

  render() {
    const { text, upVotes, voteResult } = this.comment

    return html`<section class="comment">
      <h3 class="comment__title">${voteResult} (${upVotes})</h3>
      <div class="comment__body">
        <rich-text-element html="${text}"></rich-text-element>
      </div>
    </section>`
  }

  static styles = [
    globalStyle,
    css`
      .comment {
        &:not(:last-child) {
          border-bottom: 1px solid var(--color-accent);
          margin-block-end: 0.5em;
        }
      }

      .comment__title {
        font-size: 0.8rem;
        font-weight: 500;
        margin: 0;
        margin-block-end: 0.5em;
        padding: 0;
      }

      .comment__body {
        margin-block-end: 0.5em;
        overflow: auto;

        & a {
          word-break: break-all;
        }

        & p:last-child {
          margin-block-end: 0;
        }

        & img {
          height: auto;
          max-width: 100%;
          width: 100%;
        }
      }
    `,
  ]
}

declare global {
  interface HTMLElementTagNameMap {
    'comment-element': CommentElement
  }
}
