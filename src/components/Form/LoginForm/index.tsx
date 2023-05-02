import { useForm, SubmitHandler } from "react-hook-form";
import { StyledButton } from "../../../styles/button";
import { StyledForm } from "../../../styles/form";
import Input from "../Input";
import { useContext } from "react";
import { UserContext } from "../../../providers/UserContext";
import { loginFormSchema, ILoginFormData } from "./loginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginForm = () => {
  const { userLogin } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormData>({ resolver: zodResolver(loginFormSchema) });

  const submit: SubmitHandler<ILoginFormData> = (formData) => {
    userLogin(formData);
  };

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input
        id="login"
        placeholder="Digite seu email"
        {...register("email")}
        error={errors.email}
      />
      <Input
        id="senha"
        type="password"
        placeholder="Digite sua senha"
        {...register("password")}
        error={errors.password}
      />
      <StyledButton type="submit" $buttonSize="default" $buttonStyle="green">
        Entrar
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
