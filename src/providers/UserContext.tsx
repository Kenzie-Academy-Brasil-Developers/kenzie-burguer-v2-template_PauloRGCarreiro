import React, { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { IRegisterFormData } from "../components/Form/RegisterForm/registerFormSchema";
import { ILoginFormData } from "../components/Form/LoginForm/loginFormSchema";
import { useNavigate } from "react-router-dom";

interface IUserProviderProps {
  children: React.ReactNode;
}

interface IUserContext {
  user: IUser | null;
  userLogin: (formData: ILoginFormData) => Promise<void>;
  userRegister: (formData: IRegisterFormData) => Promise<void>;
  userLogout: () => void;
}

interface IUser {
  email: string;
  name: string;
  id: number;
  password: string;
}

interface IUserLoginResponse {
  accessToken: string;
  user: IUser;
}

interface IUserRegisterResponse {
  accessToken: string;
  user: IUser;
}

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IUserProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("@TOKEN");
    const userId = localStorage.getItem("@IDUSER");

    const autoLogin = async () => {
      try {
        const { data } = await api.get<IUser>(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(data);
        navigate("/shop");
      } catch (error) {
        localStorage.removeItem("@TOKEN");
        localStorage.removeItem("@IDUSER");
      }
    };

    if (token && userId) {
      autoLogin();
    }
  }, []);

  const navigate = useNavigate();

  const userLogin = async (formData: ILoginFormData) => {
    try {
      const { data } = await api.post<IUserLoginResponse>("/login", formData);
      const token = data.accessToken;
      const idUser = JSON.stringify(data.user.id);
      localStorage.setItem("@TOKEN", token);
      localStorage.setItem("@IDUSER", idUser);
      setUser(data.user);
      navigate("/shop");
    } catch (error) {
      console.log(error);
    }
  };

  const userRegister = async (formData: IRegisterFormData) => {
    try {
      await api.post<IUserRegisterResponse>("/users", formData);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const userLogout = () => {
    setUser(null);
    localStorage.clear();
    navigate("/");
  };

  return (
    <UserContext.Provider value={{ user, userLogin, userRegister, userLogout }}>
      {children}
    </UserContext.Provider>
  );
};
