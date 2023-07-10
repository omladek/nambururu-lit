import { css } from 'lit'

const globalStyle = css`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  a {
    color: var(--color-link);
  }

  @media (hover: hover) {
    a:hover {
      text-decoration: underline;
    }
  }

  p {
    margin-block-start: 0;
  }

  p:last-child {
    margin-block-end: 0;
  }

  pre {
    background-color: var(--color-accent);
    padding: 0.25em 1em;
  }

  code {
    line-height: 2.5;
    white-space: pre-wrap;
  }

  blockquote {
    border-inline-start: 5px solid var(--color-accent);
    margin-inline: var(--gutter);
    padding-inline: var(--gutter);
  }

  input,
  button,
  select {
    height: var(--form-element-height);
    padding-inline: 0.25em;
  }

  input:placeholder-shown {
    text-overflow: ellipsis;
  }

  input,
  select {
    width: 100%;
  }

  label {
    display: block;
    font-weight: bold;
  }

  input,
  textarea,
  select {
    border: 1px solid var(--color-accent);
    color: var(--color-text);
    padding: 0.5em;
  }

  input:focus,
  textarea:focus,
  select:focus {
    /* TODO */
    outline: none;
  }

  [list]::-webkit-calendar-picker-indicator {
    opacity: 0;
  }

  @media (prefers-color-scheme: dark) {
    input,
    textarea,
    select {
      background-color: var(--color-background);
    }
  }

  textarea {
    min-height: 15em;
    width: 100%;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  table th,
  table td {
    border: 1px solid var(--color-accent);
    word-break: break-all;
  }

  fieldset:not([class]) {
    border: 1px solid var(--color-accent);
    margin: 0;
    margin-bottom: var(--gutter);
    padding: var(--gutter);

    & legend {
      font-weight: bold;
      margin: 0;
      padding: 0;
    }
  }

  .sr-only {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  .title {
    font-size: 1.25rem;
    margin: var(--gutter);
    padding: 0;
  }

  .block {
    background-color: var(--color-post);
    border-bottom: 1px solid var(--color-accent);
    margin: var(--gutter);
    max-width: 80em;
    padding: var(--gutter);
  }
`

export default globalStyle
