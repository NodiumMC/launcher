import { createGlobalStyle } from 'styled-components'
import { rgba } from 'polished'

export const Style = createGlobalStyle<{ storybook?: boolean }>`
  *:where(:not(html, iframe, canvas, img, svg, video, audio):not(svg *, symbol *)) {
    all: unset;
    display: revert;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  a, button {
    cursor: revert;
  }

  ol, ul, menu {
    list-style: none;
  }

  img {
    max-width: 100%;
  }

  table {
    border-collapse: collapse;
  }

  input, textarea {
    -webkit-user-select: auto;
  }

  textarea {
    white-space: revert;
  }

  meter {
    -webkit-appearance: revert;
    appearance: revert;
  }

  ::placeholder {
    color: unset;
  }

  :where([hidden]) {
    display: none;
  }

  :where([contenteditable]:not([contenteditable="false"])) {
    -moz-user-modify: read-write;
    -webkit-user-modify: read-write;
    overflow-wrap: break-word;
    -webkit-line-break: after-white-space;
    -webkit-user-select: auto;
  }

  :where([draggable="true"]) {
    -webkit-user-drag: element;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  html, body {
    width: 100%;
    height: 100%;
    overflow: ${({ storybook }) => (storybook ? 'initial' : 'hidden')};
    border-radius: ${({ theme }) => theme.radius()};
    font-family: "JetBrains Mono", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol, "Noto Color Emoji";
    color: ${({ theme }) => theme.master.front};
    font-size: 14px;
    transition: background-color, color, font-size, ${({ theme }) => theme.transition.time};
  }

  img, button {
    user-select: none;
  }

  *::-webkit-scrollbar {
    display: none;
  }
  
  h1, h2, h3, h4, h5, h6 {
    display: block;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
  }

  h2 {
    font-size: 2.1rem;
    font-weight: bold;
  }

  h3 {
    font-size: 1.7rem;
  }

  h4 {
    font-size: 1.3rem;
  }

  h5 {
    font-size: 1rem;
  }
  
  h6 {
    font-size: 0.8rem;
  }

  b, strong {
    font-weight: bold;
  }
  
  del {
    text-decoration: line-through;
  }
  
  em {
    font-style: italic;
  }
  
  code {
    background-color: ${({ theme }) => theme.master.tint(0.1)};
    padding: 0 ${({ theme }) => theme.space()};
    border-radius: 4px;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.master.reshade(0.3)};
  }
  
  ul, ol {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space()};
    margin: ${({ theme }) => theme.space()} 0;
    counter-reset: item;
  }
  
  li {
    position: relative;
    list-style: none;
    margin-left: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    counter-increment: item;
    color: ${({ theme }) => theme.master.reshade(0.15)};
  }
  
  ul > li:before {
    position: absolute;
    top: 0.65rem;
    translate: -1rem -50%;
    content: '';
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.master.shade(0.3)};
  }
  
  ol > li:before {
    position: absolute;
    top: 0.65rem;
    translate: -1rem -50%;
    display: block;
    color: ${({ theme }) => theme.master.reshade(0.5)};
    font-size: 0.9rem;
    content: counter(item);
  }

  *::selection {
    background: ${({ theme }) => rgba(theme.master.front, 0.321)};
  }
`
