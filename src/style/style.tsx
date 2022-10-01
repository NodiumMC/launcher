import { createGlobalStyle } from 'styled-components'
import { rgba } from 'polished'

export const Style = createGlobalStyle`
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
    overflow: hidden;
    border-radius: ${({ theme }) => theme.radius()};
    font-family: Rubik, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol, "Noto Color Emoji";
    color: ${({ theme }) => theme.master.reshade()};
    font-size: 14px;
    transition: background-color, color, font-size ${({ theme }) =>
      theme.transition.time};
  }

  img, button {
    user-select: none;
  }

  *::-webkit-scrollbar {
    display: none;
  }

  h1 {
    font-size: 60px;
    font-weight: bold;
  }

  h2 {
    font-size: 50px;
    font-weight: bold;
  }

  h3 {
    font-size: 40px;
  }

  h4 {
    font-size: 30px;
  }

  h5 {
    font-size: 20px;
  }

  b {
    font-weight: bold;
  }

  *::selection {
    background: ${({ theme }) => rgba(theme.master.front, 0.321)};
  }
  
  * {
    transition: color, background-color, border-color ${({ theme }) =>
      theme.transition.time};
    &:after, &:before {
      transition: color, background-color ${({ theme }) =>
        theme.transition.time};
    }
  }
`
