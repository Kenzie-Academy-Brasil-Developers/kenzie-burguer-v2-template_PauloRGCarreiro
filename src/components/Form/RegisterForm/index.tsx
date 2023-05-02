import Input from "../Input";
import { StyledButton } from "../../../styles/button";
import { StyledForm } from "../../../styles/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserContext } from "../../../providers/UserContext";
import { useContext } from "react";
import { registerFormSchema, IRegisterFormData } from "./registerFormSchema";

const RegisterForm = () => {
  const { userRegister } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const submit: SubmitHandler<IRegisterFormData> = (formData) => {
    userRegister(formData);
  };

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input
        id="name"
        placeholder="Digite seu nome"
        {...register("name")}
        error={errors.name}
      />
      <Input
        id="email"
        placeholder="Digite seu email"
        {...register("email")}
        error={errors.email}
      />
      <Input
        id="passwors"
        type="password"
        placeholder="Digite uma senha"
        {...register("password")}
        error={errors.password}
      />
      <Input
        id="confirmPassword"
        type="password"
        placeholder="Confirme sua senha"
        {...register("confirm")}
      />
      <StyledButton type="submit" $buttonSize="default" $buttonStyle="gray">
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
