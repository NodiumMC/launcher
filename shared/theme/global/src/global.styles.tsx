import { Global } from '@emotion/react'
import type { StyleFn } from '@lmpx/styled'

const global =
  (): StyleFn =>
  ({ theme }) => ({
    '*:where(:not(html, iframe, canvas, img, svg, video, audio):not(svg *, symbol *))': {
      all: 'unset',
      display: 'revert',
    },

    '*,*::before,*::after': {
      boxSizing: 'border-box',
    },

    'a,button': {
      cursor: 'revert',
    },

    'ol,ul,menu': {
      listStyle: 'none',
    },

    img: {
      maxInlineSize: '100%',
      maxBlockSize: '100%',
    },

    table: {
      borderCollapse: 'collapse',
    },

    'input,textarea': {
      WebkitUserSelect: 'auto',
    },

    textarea: {
      whiteSpace: 'revert',
    },

    ':where(pre)': {
      all: 'revert',
    },

    '::placeholder': {
      color: 'unset',
    },

    '::marker': {
      content: 'initial',
    },

    ":where([contenteditable]:not([contenteditable='false']))": {
      MozUserModify: 'read-write',
      WebkitUserModify: 'read-write',
      overflowWrap: 'break-word',
      WebkitUserSelect: 'auto',
    },

    'html,body': {
      width: '100%',
      height: '100%',
      position: 'relative',
      fontSize: '14px',
      zIndex: 1,
    },

    'img,button': {
      userSelect: 'none',
    },

    '*::-webkit-scrollbar': {
      display: 'none',
    },
  })

export const GlobalStyles = () => <Global styles={global as any} />
