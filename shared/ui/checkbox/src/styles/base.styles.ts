import {combine, ifNotProp, ifProp, StyleFn} from "@styled/tools";
import {CheckboxProps} from "@ui/checkbox";

const base: StyleFn<CheckboxProps> = ({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    width: '16px',
    height: '16px',
    border: `1px solid ${theme.palette.primary._500}`,
    borderRadius: '4px',
    padding: '5px',
    ':hover': {
        backgroundColor: `${theme.palette.primary._100}`
    },
    ':active': {
        boxShadow: `0px 0px 0px 4px ${theme.palette.primary._50}`,
        backgroundColor: theme.palette.primary._500
    }
})

const circle: StyleFn = () => ({})

const pointer: StyleFn = () => ({
    cursor: 'pointer'
})

export const baseStyles = combine(
    base,
    ifProp((props: CheckboxProps) => props.circle, circle),
    ifNotProp((props: CheckboxProps) => props.disabled, pointer)
)