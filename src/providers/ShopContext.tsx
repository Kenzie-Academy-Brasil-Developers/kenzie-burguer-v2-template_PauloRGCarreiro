import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface IShopProviderProps {
  children: React.ReactNode;
}

interface IShopContextProps {
  listItens: IItem[];
}

interface IItem {
  name: string;
  id: number;
  category: string;
  img: string;
  price: number;
}

export const ShopContext = createContext({} as IShopContextProps);

export const ShopProvider = ({ children }: IShopProviderProps) => {
  const [listItens, setListItens] = useState<IItem[]>([]);
  const token = localStorage.getItem("@TOKEN");

  useEffect(() => {
    const ShopCard = async () => {
      try {
        api.defaults.headers.common.authorization = `Bearer ${token}`;
        const { data } = await api.get<IItem[]>("/products");
        setListItens(data);
      } catch (error) {}
    };
    ShopCard();
  });

  return (
    <ShopContext.Provider value={{ listItens }}>
      {children}
    </ShopContext.Provider>
  );
};
