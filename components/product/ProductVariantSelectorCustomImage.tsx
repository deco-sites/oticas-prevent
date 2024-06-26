import AvatarImg from "$store/components/ui/AvatarImg.tsx";
import { useVariantPossiblitiesCustomImage } from "$store/sdk/useVariantPossiblitiesCustomImage.ts";
import type { Product } from "apps/commerce/types.ts";
import { relative } from "$store/sdk/url.ts";

interface Props {
  product: Product;
}

function VariantSelector({ product }: Props) {
  const { url, isVariantOf } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities = useVariantPossiblitiesCustomImage(hasVariant, product);

  return (
    <ul class="flex flex-col gap-4">
      {Object.keys(possibilities).map((name) => {
        if (Object.prototype.hasOwnProperty.call(possibilities, name)) {
          const items = possibilities[name];

          return (
            <li class="flex flex-col gap-2">
              <span class="text-sm">{name}</span>
              <ul class="flex flex-row gap-3">
                {Object.keys(items).map((itemName) => {
                  const item = items[itemName];
                  const relativeUrl = relative(url);
                  const relativeLink = relative(item.url);
                  return (
                    <li key={itemName}>
                      <button f-partial={relativeLink} f-client-nav>
                        <AvatarImg
                          content={itemName}
                          variant={relativeLink === relativeUrl
                            ? "active"
                            : relativeLink
                            ? "default"
                            : "disabled"}
                          img={item.imageUrl}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        }
        return null;
      })}
      {
        /*Object.keys(possibilities).map((name) => (
        <li class="flex flex-col gap-2">
          <span class="text-sm">{name}</span>
          <ul class="flex flex-row gap-3">
            {Object.entries(possibilities[name]).map(([value, link]) => {
              const relativeUrl = relative(url);
              const relativeLink = relative(link);
              return (
                <li>
                  <button f-partial={relativeLink} f-client-nav>
                    <Avatar
                      content={value}
                      variant={relativeLink === relativeUrl
                        ? "active"
                        : relativeLink
                        ? "default"
                        : "disabled"}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </li>
      ))*/
      }
    </ul>
  );
}

export default VariantSelector;
