import styled from "@emotion/styled";
import {CheckboxProps} from "@ui/checkbox/src/checkbox.interface";
import {styles} from "./styles";
import {wrapperStyles} from "@ui/checkbox/src/styles/wrapper.styles";
import {ChangeEventHandler} from "react";
import {labelStyles} from "@ui/checkbox/src/styles/label.styles";
import {checkmarkStyles} from "@ui/checkbox/src/styles/checkmark.styles";
import {AnimatePresence, motion} from "framer-motion";

const StyledCheckbox = styled.label<CheckboxProps>(styles);

const LabelCheckbox = styled.label(labelStyles)

const CheckboxWrapper = styled.div(wrapperStyles)

export const CheckboxInput = styled.input()

const CheckMark = styled(motion.div)(checkmarkStyles)

StyledCheckbox.defaultProps = {

}

interface CheckboxPropsWithChecked extends CheckboxProps{
    label?: string,
    value: boolean,
    onChange: ChangeEventHandler<HTMLInputElement>
}

export const Checkbox = ({label, value, onChange}: CheckboxPropsWithChecked) => label ? (
    <CheckboxWrapper>
        <CheckboxInput type={'checkbox'} id={'myCheckbox'} checked={value} onChange={onChange} />
        <StyledCheckbox htmlFor={'myCheckbox'}/>
        <LabelCheckbox>{label}</LabelCheckbox>
    </CheckboxWrapper>
) : (
    <CheckboxWrapper>
        <CheckboxInput type={'checkbox'} id={'myCheckbox'} checked={value} onChange={onChange} />
        <StyledCheckbox htmlFor={'myCheckbox'}>
            <AnimatePresence>
                {value && (
                    <CheckMark
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                )}
            </AnimatePresence>
        </StyledCheckbox>
    </CheckboxWrapper>
)

