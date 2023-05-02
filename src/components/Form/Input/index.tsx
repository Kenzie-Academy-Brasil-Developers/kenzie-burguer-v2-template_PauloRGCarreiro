import { StyledInputContainer } from "../../../styles/form";
import { StyledParagraph } from "../../../styles/typography";
import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
}

export const Input = forwardRef(
  ({ error, ...rest }: IInputProps, ref: ForwardedRef<HTMLInputElement>) => (
    <div>
      <StyledInputContainer>
        <input ref={ref} {...rest} />
      </StyledInputContainer>
      <StyledParagraph fontColor="red">
        {error ? <p>{error.message}</p> : null}
      </StyledParagraph>
    </div>
  )
);

export default Input;
