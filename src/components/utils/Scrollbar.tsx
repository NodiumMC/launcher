import { forwardRef } from 'react'
import Scrollbars, { ScrollbarProps } from 'react-custom-scrollbars-2'
import { useTheme } from 'styled-components'
import { rgba } from 'polished'

export const Scrollbar = forwardRef<HTMLDivElement, ExtraProps.HasChildren & ScrollbarProps & ExtraProps.Styled>(
  ({ children, className, style, ...props }, ref) => {
    const theme = useTheme()
    const estyle = style
    return (
      <Scrollbars
        autoHeight={false}
        autoHeightMax={'100%'}
        autoHide
        thumbMinSize={20}
        {...props}
        ref={ref as any}
        renderView={({ style, ...props }) => <div {...props} style={{ ...style, ...estyle }} className={className} />}
        renderTrackVertical={({ style, ...props }) => (
          <div
            {...props}
            style={{
              ...style,
              width: theme.space(),
              height: '100%',
              right: 0,
              top: 0,
              display: 'block',
            }}
          />
        )}
        renderThumbVertical={({ style, ...props }) => (
          <div
            {...props}
            style={{
              ...style,
              background: rgba(theme.master.shade(0.3), 0.3),
              borderRadius: theme.radius(),
            }}
          />
        )}
      >
        {children}
      </Scrollbars>
    )
  },
)
