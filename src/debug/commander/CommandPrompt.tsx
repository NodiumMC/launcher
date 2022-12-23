import { FC, useEffect, useRef, useState } from 'react'
import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/snippets/javascript'
import 'ace-builds/src-noconflict/ext-language_tools'
import styled from 'styled-components'
import ReactAce from 'react-ace'
import { filter, fromEvent } from 'rxjs'

const Container = styled.div`
  padding: ${({ theme }) => theme.space(2)};
  border: 1px solid ${({ theme }) => theme.master.shade()};
  border-radius: ${({ theme }) => theme.radius()};
`

const Editor = styled(AceEditor)`
  background-color: transparent;
  font-size: 1rem;
  font-family: 'Fira Code', sans-serif;
  color: ${({ theme }) => theme.master.front};
  max-height: ${({ theme }) => theme.size(50)};

  .ace_print-margin {
    width: 1px;
    background: #555651;
  }

  .ace_cursor {
    color: ${({ theme }) => theme.master.front};
  }

  .ace_marker-layer .ace_selection {
    background: ${({ theme }) => theme.master.shade(0.15)};
  }

  .ace-monokai.ace_multiselect .ace_selection.ace_start {
    box-shadow: 0 0 3px 0px #272822;
  }

  .ace_marker-layer .ace_step {
    background: rgb(102, 82, 0);
  }

  .ace_marker-layer .ace_bracket {
    margin: -1px 0 0 -1px;
    border: 1px solid #49483e;
  }

  .ace_marker-layer .ace_active-line {
    background: ${({ theme }) => theme.master.shade()};
  }

  .ace_gutter-active-line {
    background-color: ${({ theme }) => theme.master.shade()};
  }

  .ace_marker-layer .ace_selected-word {
    border: 1px solid #49483e;
  }

  .ace_invisible {
    color: #52524d;
  }

  .ace_entity.ace_name.ace_tag,
  .ace_keyword,
  .ace_meta.ace_tag,
  .ace_storage {
    color: ${({ theme }) => theme.palette.red};
  }

  .ace_punctuation,
  .ace_punctuation.ace_tag {
    color: ${({ theme }) => theme.master.front};
  }

  .ace_constant.ace_character,
  .ace_constant.ace_language,
  .ace_constant.ace_numeric,
  .ace_constant.ace_other {
    color: ${({ theme }) => theme.palette.magenta};
  }

  .ace_invalid {
    color: ${({ theme }) => theme.master.front};
    background-color: ${({ theme }) => theme.palette.red};
  }

  .ace_invalid.ace_deprecated {
    color: ${({ theme }) => theme.master.front};
    background-color: ${({ theme }) => theme.palette.magenta};
  }

  .ace_support.ace_constant,
  .ace_support.ace_function {
    color: ${({ theme }) => theme.palette.cyan};
  }

  .ace_fold {
    background-color: ${({ theme }) => theme.palette.green};
    border-color: ${({ theme }) => theme.master.front};
  }

  .ace_storage.ace_type,
  .ace_support.ace_class,
  .ace_support.ace_type {
    font-style: italic;
    color: ${({ theme }) => theme.palette.cyan};
  }

  .ace_entity.ace_name.ace_function,
  .ace_entity.ace_other,
  .ace_entity.ace_other.ace_attribute-name,
  .ace_variable {
    color: ${({ theme }) => theme.palette.green};
  }

  .ace_variable.ace_parameter {
    font-style: italic;
    color: ${({ theme }) => theme.palette.orange};
  }

  .ace_string {
    color: ${({ theme }) => theme.palette.yellow};
  }

  .ace_comment {
    color: ${({ theme }) => theme.master.shade(0.5)};
  }

  .ace_indent-guide {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWPQ0FD0ZXBzd/wPAAjVAoxeSgNeAAAAAElFTkSuQmCC)
      right repeat-y;
  }

  .ace_indent-guide-active {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAZSURBVHjaYvj///9/hivKyv8BAAAA//8DACLqBhbvk+/eAAAAAElFTkSuQmCC)
      right repeat-y;
  }

  .ace_placeholder {
    font-family: 'Fira Code', sans-serif !important;
  }

  .ace_tooltip {
    background-color: red;
  }
`

export interface CommandPromptProps {
  send?: (code: string) => void
}

export const CommandPrompt: FC<CommandPromptProps> = ({ send }) => {
  const editor = useRef<ReactAce>(null)

  const [value, onChange] = useState('')

  useEffect(() => {
    if (!editor.current) return
    const sub = fromEvent(editor.current.refEditor, 'keypress')
      .pipe(filter(event => (event as KeyboardEvent).key === 'Enter' && !(event as KeyboardEvent).shiftKey))
      .subscribe(() => {
        send?.(value ?? '')
        setTimeout(() => onChange?.(''), 0)
      })
    return () => sub.unsubscribe()
  }, [editor, value])

  return (
    <Container>
      <Editor
        ref={editor}
        mode={'javascript'}
        name={'command-prompt'}
        fontSize={14}
        showGutter={false}
        highlightActiveLine={false}
        placeholder={'/Enter command/'}
        enableBasicAutocompletion
        tabSize={2}
        editorProps={{ $blockScrolling: true }}
        value={value}
        onChange={onChange}
        width={'100%'}
        showPrintMargin={false}
        // onLoad={editor => {
        //   editor.getSession().getMode().getCompletions = (
        //     state: string,
        //     session: any,
        //     pos: any,
        //     prefix: string,
        //   ) => {
        //     return [
        //       {
        //         value: '/self/',
        //         meta: 'command',
        //         caption: '/self/',
        //         score: 0,
        //       },
        //       {
        //         value: '/log/',
        //         meta: 'command',
        //         caption: '/log/',
        //         score: 0,
        //       },
        //     ]
        //   }
        // }}
      />
    </Container>
  )
}
