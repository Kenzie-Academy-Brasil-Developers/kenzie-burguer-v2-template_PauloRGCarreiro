import { useContext } from "react";
import { ShopContext } from "../../providers/ShopContext";
import ProductCard from "./ProductCard";
import { StyledProductList } from "./style";

const ProductList = () => {
  const { listItens } = useContext(ShopContext);

  return (
    <StyledProductList>
      {listItens.map((item) => (
        <ProductCard key={item.id} item />
      ))}
    </StyledProductList>
  );
};

export default ProductList;
