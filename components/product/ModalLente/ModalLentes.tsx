import type { Product } from "apps/commerce/types.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";

export interface Props {
  
  /**
   * @title Título do Modal
   */
  tituloModal?: string; // Tornando o campo opcional
  product: ProductDetailsPage | null;
  products : Product[] | null;

}

export default function ModalLentes( {product, products} : Props) {
  console.log(product, products);
  return (
    <div class="step1">
      {product}
    teste<div class="opção"></div>
    </div>
  );
}


