import { SendEventOnView } from "$store/components/Analytics.tsx";
import { Layout as CardLayout } from "$store/components/product/ProductCard.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import SearchControls from "$store/islands/SearchControls.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";

export interface Layout {
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Number of products per line on grid
   */
  columns?: Columns;
}

export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
  layout?: Layout;
  cardLayout?: CardLayout;

  /** @description 0 for ?page=0 as your first page */
  startingPage?: 0 | 1;
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-10">
      <span>Not Found!</span>
    </div>
  );
}

function Result({
  page,
  layout,
  cardLayout,
  startingPage = 0,
}: Omit<Props, "page"> & { page: ProductListingPage }) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;

  const perPage = pageInfo.recordPerPage || products.length;

  const id = useId();

  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;

  const totalPages = Math.ceil(
    (pageInfo?.records ?? 0) / (pageInfo?.recordPerPage ?? 1),
  );
  const currentPage = zeroIndexedOffsetPage + 1;

  const pageLinks = [];
  for (let i = 1; i <= totalPages; i++) {
    pageLinks.push(
      <li class="w-full">
        <a
          href={`?pg=${i}`}
          key={i}
          class="block text-center text-xs py-1 font-bold hover:text-[#B994FE]"
        >
          {i}
        </a>
      </li>,
    );
  }
  const previousPages = [];
  for (let i = Math.max(currentPage - 2, 1); i < currentPage; i++) {
    previousPages.push(
      <a
        href={`?pg=${i}`}
        class="inline-block text-sm text-secondary font-bold"
      >
        {i}
      </a>,
    );
  }
  const nextPages = [];
  for (
    let i = currentPage + 1;
    i <= Math.min(currentPage + 2, totalPages);
    i++
  ) {
    nextPages.push(
      <a
        href={`?pg=${i}`}
        class="inline-block text-sm text-secondary font-bold"
      >
        {i}
      </a>,
    );
  }

  return (
    <>
      <div class="container px-4 sm:py-10">
        <SearchControls
          sortOptions={sortOptions}
          filters={filters}
          breadcrumb={breadcrumb}
          displayFilter={layout?.variant === "drawer"}
        />

        <div class="flex flex-row">
          {layout?.variant === "aside" && filters.length > 0 && (
            <aside class="hidden sm:block w-min min-w-[250px]">
              <Filters filters={filters} />
            </aside>
          )}
          <div class="flex-grow" id={id}>
            <ProductGallery
              products={products}
              offset={offset}
              layout={{ card: cardLayout, columns: layout?.columns }}
            />
          </div>
        </div>

        <div class="flex justify-center items-end my-4 w-full mt-10">
          <div class="join justify-center md:items-end flex-wrap">
            <div class="flex items-center gap-5 mr-2 md:mx-6">
              {pageInfo.previousPage !== "?pg=0" && pageInfo.previousPage &&
                (
                  <a
                    aria-label="previous page link hidden md:flex"
                    rel="prev"
                    href={pageInfo.previousPage}
                    class="text-xs btn py-1 min-height-unset text-white h-auto bg-secondary hover:bg-secondary rounded-full mx-2 hidden md:flex"
                  >
                    ANTERIOR
                  </a>
                )}

              {previousPages}

              <p
                id="pagina-atual"
                class="text-xs font-bold bg-secondary px-3 w-7 h-7 flex items-center justify-center text-white rounded-full"
              >
                {currentPage}
              </p>

              {nextPages}

              <span class="mx-2 text-secondary">...</span>

              <a
                href={`?pg=${totalPages}`}
                class="inline-block text-sm text-secondary font-bold"
              >
                {totalPages}
              </a>

              {currentPage < totalPages && (
                <a
                  aria-label="next page link"
                  rel="next"
                  href={pageInfo.nextPage}
                  class="text-xs btn py-1 min-height-unset text-white h-auto bg-secondary hover:bg-secondary rounded-full mx-2 hidden md:flex"
                >
                  PRÓXIMO
                </a>
              )}
            </div>

            <div class="w-full flex md:hidden justify-center mt-4">
              {pageInfo.previousPage !== "?pg=0" && pageInfo.previousPage &&
                (
                  <a
                    aria-label="previous page link"
                    rel="prev"
                    href={pageInfo.previousPage}
                    class="text-xs btn py-1 min-height-unset text-white h-auto bg-secondary hover:bg-secondary rounded-full mx-2 w-[48%]"
                  >
                    ANTERIOR
                  </a>
                )}
              {currentPage < totalPages && (
                <a
                  aria-label="next page link"
                  rel="next"
                  href={pageInfo.nextPage}
                  class="text-xs btn py-1 min-height-unset text-white h-auto bg-secondary hover:bg-secondary rounded-full mx-2 w-[48%]"
                >
                  PRÓXIMO
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      <SendEventOnView
        id={id}
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: breadcrumb.itemListElement?.at(-1)?.name,
            item_list_id: breadcrumb.itemListElement?.at(-1)?.item,
            items: page.products?.map((product, index) =>
              mapProductToAnalyticsItem({
                ...(useOffer(product.offers)),
                index: offset + index,
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}

function SearchResult({ page, ...props }: Props) {
  if (!page) {
    return <NotFound />;
  }

  return <Result {...props} page={page} />;
}

export default SearchResult;
