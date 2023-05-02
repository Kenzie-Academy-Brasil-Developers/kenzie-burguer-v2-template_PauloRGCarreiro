import { StyledProductCard } from "./style";
import { StyledButton } from "../../../styles/button";
import { StyledParagraph, StyledTitle } from "../../../styles/typography";

const ProductCard = ({ item }) => {
  return (
    <StyledProductCard>
      <div className="imageBox">
        <img src={item.img} alt="Hamburguer" />
      </div>
      <div className="content">
        <StyledTitle tag="h3" $fontSize="three">
          {item.name}
        </StyledTitle>
        <StyledParagraph className="category">{item.category}</StyledParagraph>
        <StyledParagraph className="price">R$ {item.price}</StyledParagraph>
        <StyledButton $buttonSize="medium" $buttonStyle="green">
          Adicionar
        </StyledButton>
      </div>
    </StyledProductCard>
  );
};

export default ProductCard;
