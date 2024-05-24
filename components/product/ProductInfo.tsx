import { SendEventOnView } from "$store/components/Analytics.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import AddToCartButtonLinx from "$store/islands/AddToCartButton/linx.tsx";
import AddToCartButtonShopify from "$store/islands/AddToCartButton/shopify.tsx";
import AddToCartButtonVNDA from "$store/islands/AddToCartButton/vnda.tsx";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";
import AddToCartButtonWake from "$store/islands/AddToCartButton/wake.tsx";
import AddToCartButtonNuvemshop from "$store/islands/AddToCartButton/nuvemshop.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import WishlistButtonVtex from "../../islands/WishlistButton/vtex.tsx";
import WishlistButtonWake from "../../islands/WishlistButton/wake.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductSelector from "./ProductVariantSelector.tsx";
import ProductSelectorCustom from "./ProductVariantSelectorCustomImage.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import AddToCartButtonModalLente from "$store/components/product/ModalLente/AddToCartButtonModalLente.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface ImagemMedidaArmacao {
  /**
   * @title Medida Armação
   */
  imagem?: ImageWidget;
}

interface Props {
  page: ProductDetailsPage | null;
  imagemMedidaArmacao: ImagemMedidaArmacao;
  layout: {
    /**
     * @title Product Name
     * @description How product title will be displayed. Concat to concatenate product and sku names.
     * @default product
     */
    name?: "concat" | "productGroup" | "product";
  };
}

function ProductInfo({ page, layout, imagemMedidaArmacao }: Props) {
  const platform = usePlatform();
  const id = useId();
  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { breadcrumbList, product } = page;
  const {
    productID,
    offers,
    name = "",
    gtin,
    isVariantOf,
    additionalProperty = [],
  } = product;
  const description = product.description || isVariantOf?.description;

  const productFormato = isVariantOf?.additionalProperty.find((prop) =>
    prop?.name === "Formato"
  )?.value;

  const productTamanho = isVariantOf?.additionalProperty.find((prop) =>
    prop?.name === "Tamanho"
  )?.value;

  const productMaterial = isVariantOf?.additionalProperty.find((prop) =>
    prop?.name === "Material"
  )?.value;

  const productAro = isVariantOf?.additionalProperty.find((prop) =>
    prop?.name === "Aro ( largura das lentes)"
  )?.value;

  const productMedidaPonte = isVariantOf?.additionalProperty.find((prop) =>
    prop?.name === "Medida da Ponte"
  )?.value;

  const productComprimentoHastes = isVariantOf?.additionalProperty.find((
    prop,
  ) => prop?.name === "Comprimento das Hastes")?.value;

  const {
    price = 0,
    listPrice,
    seller = "1",
    installments,
    availability,
  } = useOffer(offers);
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  const eventItem = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
  });

  const productName = layout?.name === "concat"
    ? `${isVariantOf?.name} ${name}`
    : layout?.name === "productGroup"
    ? isVariantOf?.name
    : name;

  const { displayModal } = useUI();

  //console.log(product.offers);
  return (
    <div class="flex flex-col px-2.5" id={id}>
      <Breadcrumb itemListElement={breadcrumb.itemListElement} />
      {/* Code and name */}
      <div class="mt-4 sm:mt-8">
        <div>
          {gtin && <span class="text-sm text-base-300">Cod. {gtin}</span>}
        </div>
        <h1>
          <span class="font-medium text-xl capitalize">
            {layout?.name === "concat"
              ? `${isVariantOf?.name} ${name}`
              : layout?.name === "productGroup"
              ? isVariantOf?.name
              : name}
          </span>
        </h1>
      </div>
      {/* Prices */}
      <div class="mt-4">
        <div class="flex flex-row gap-2 items-center">
          {(listPrice ?? 0) > price && (
            <span class="line-through text-base-300 text-xs">
              {formatPrice(listPrice, offers?.priceCurrency)}
            </span>
          )}
          <span class="font-medium text-xl text-secondary">
            {formatPrice(price, offers?.priceCurrency)}
          </span>
        </div>
        <span class="text-sm text-base-300">{installments}</span>
      </div>
      {/* Sku Selector */}
      <div class="mt-4 sm:mt-6">
        <ProductSelector product={product} />
      </div>
      {/* Add to Cart and Favorites button */}
      <div class="mt-4 sm:mt-10 flex flex-col gap-2">
        {availability === "https://schema.org/InStock"
          ? (
            <>
              {platform === "vtex" && (
                <>
                  {productName?.includes("Óculos de Grau") ||
                      productName?.includes("Óculos de grau")
                    ? <AddToCartButtonModalLente />
                    : (
                      <AddToCartButtonVTEX
                        eventParams={{ items: [eventItem] }}
                        productID={productID}
                        seller={seller}
                      />
                    )}

                  <div class="hidden">
                    <WishlistButtonVtex
                      variant="full"
                      productID={productID}
                      productGroupID={productGroupID}
                    />
                  </div>
                </>
              )}
              {platform === "wake" && (
                <>
                  <AddToCartButtonWake
                    eventParams={{ items: [eventItem] }}
                    productID={productID}
                  />
                  <WishlistButtonWake
                    variant="full"
                    productID={productID}
                    productGroupID={productGroupID}
                  />
                </>
              )}
              {platform === "linx" && (
                <AddToCartButtonLinx
                  eventParams={{ items: [eventItem] }}
                  productID={productID}
                  productGroupID={productGroupID}
                />
              )}
              {platform === "vnda" && (
                <AddToCartButtonVNDA
                  eventParams={{ items: [eventItem] }}
                  productID={productID}
                  additionalProperty={additionalProperty}
                />
              )}
              {platform === "shopify" && (
                <AddToCartButtonShopify
                  eventParams={{ items: [eventItem] }}
                  productID={productID}
                />
              )}
              {platform === "nuvemshop" && (
                <AddToCartButtonNuvemshop
                  productGroupID={productGroupID}
                  eventParams={{ items: [eventItem] }}
                  additionalProperty={additionalProperty}
                />
              )}
            </>
          )
          : <OutOfStock productID={productID} />}
      </div>
      {/* Shipping Simulation */}
      <div class="mt-8 hidden">
        {platform === "vtex" && (
          <ShippingSimulation
            items={[
              {
                id: Number(product.sku),
                quantity: 1,
                seller: seller,
              },
            ]}
          />
        )}
      </div>

      {productName?.includes("Óculos de Grau") ||
          productName?.includes("Óculos de grau")
        ? (
          <div class="mt-8 bg-gray-200 p-2.5">
            <ul class="list-disc pl-5 text-sm">
              <li>
                <span class="text-orange-500">Fique tranquilo!</span>{" "}
                Sua receita pode ser enviada logo após a finalização do produto
                ou posteriormente via e-mail.
              </li>
            </ul>
          </div>
        )
        : null}

      {/* Description card */}
      <div class="mt-4 sm:mt-6">
        <span class="text-sm">
          {description && (
            <details open>
              <summary class="cursor-pointer font-bold">Descrição</summary>
              <div
                class="ml-2 mt-2"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </details>
          )}

          <figure>
            <Image
              class="w-full"
              src="https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4488/3141d4d8-1e8e-40e8-b822-f24ed93f0804"
              width={616}
              height={271}
              loading="lazy"
            />
          </figure>
        </span>
      </div>

      {/* Especificações Produto*/}
      <div class="text-sm">
        {productFormato && (
          <div>
            <span class="font-bold">Formato dos Óculos:</span>{" "}
            <span>{productFormato}</span>
          </div>
        )}
        {productTamanho && (
          <div>
            <span class="font-bold">Tamanho:</span>{" "}
            <span>{productTamanho}</span>
          </div>
        )}
        {productMaterial && (
          <div>
            <span class="font-bold">Material:</span>{" "}
            <span>{productMaterial}</span>
          </div>
        )}

        {productAro && (
          <div>
            <span class="font-bold">Aro ( largura das lentes):</span>{" "}
            <span>{productAro}</span>
          </div>
        )}

        {productMedidaPonte && (
          <div>
            <span class="font-bold">Medida da Ponte:</span>{" "}
            <span>{productMedidaPonte}</span>
          </div>
        )}

        {productComprimentoHastes && (
          <div>
            <span class="font-bold">Comprimento das Hastes:</span>{" "}
            <span>{productComprimentoHastes}</span>
          </div>
        )}
      </div>
      {/* Analytics Event */}
      <SendEventOnView
        id={id}
        event={{
          name: "view_item",
          params: {
            item_list_id: "product",
            item_list_name: "Product",
            items: [eventItem],
          },
        }}
      />
    </div>
  );
}

export default ProductInfo;
