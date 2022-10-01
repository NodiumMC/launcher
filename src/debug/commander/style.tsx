import { createGlobalStyle } from 'styled-components'
import { mix } from 'polished'

export const AceStyle = createGlobalStyle`
  .ace_autocomplete .ace_scroller {
    background-color: ${({ theme }) => theme.master.shade()};
  }
  
  .ace_editor.ace_autocomplete {
    border: 0;
    color: ${({ theme }) => theme.master.front};
    .ace_line.ace_selected {
      background-color: ${({ theme }) => theme.accent.primary};
      color: ${({ theme }) => theme.master.back};
      .ace_completion-meta {
        color: ${({ theme }) => theme.master.back};
      }
    }
    .ace_line {
      font-family: 'Fira Code', sans-serif;
      padding-left: ${({ theme }) => theme.space(2)};
    }
    .ace_line .ace_{
      font-weight: bold;
    }
    .ace_line .ace_completion-meta {
      color: ${({ theme }) => theme.master.reshade(0.5)};
    }
  }
  
  .ace_autocomplete .ace_layer.ace_marker-layer .ace_line-hover {
    background-color: ${({ theme }) =>
      mix(0.2, theme.accent.primary, theme.master.back)};
    border: 1px solid ${({ theme }) => theme.accent.primary};
  }
  
  .ace_layer.ace_marker-layer {
    background-color: transparent;
    .ace_active-line {
      background-color: ${({ theme }) => theme.accent.primary} !important;
    }
  }
`
