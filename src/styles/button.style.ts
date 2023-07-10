import { css } from 'lit'

const buttonStyle = css`
  .btn {
    appearance: none;
    background-color: var(--color-post);
    border: 1px solid var(--color-accent);
    color: var(--color-link);
    cursor: pointer;
    display: inline-block;
    font-family: inherit;
    font-size: 0.8rem;
    font-weight: 500;
    height: var(--form-element-height);
    margin: 0;
    padding: 0.75em 1.5em;
    position: relative;
    text-align: center;
    text-decoration: none;
  }

  @media (hover: hover) {
    .btn:hover {
      background-color: var(--color-link);
      color: var(--color-accent);
      text-decoration: none;
    }
  }

  .btn.is-loading {
    & .btn__text {
      visibility: hidden;
    }

    & .loader {
      left: 50%;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .btn:active {
    background-color: var(--color-link);
    color: var(--color-accent);
    text-decoration: none;
  }

  .btn--block {
    display: block;
    width: 100%;
  }
`

export default buttonStyle
