import {StyleFn} from "@styled/tools"

export const transitionStyles: StyleFn = ({ theme }) => ({
    transitionProperty: 'background-color, borderColor, opacity',
    transitionDuration: theme.time.default
})
