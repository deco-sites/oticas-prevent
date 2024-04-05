import type { Product } from "apps/commerce/types.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { Signal, useComputed, useSignal } from "@preact/signals";
import { JSX } from "preact";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { formatPrice } from "$store/sdk/format.ts";
import type { ImageObject } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import Modal from "$store/components/ui/Modal.tsx";

export interface TecnologiaLente {
  /**
   * @title Tipo de Tecnologia
   */
  tipotecnologia?: string;
  descricao?: string;
}

export interface TipoLente {
  /**
   * @title Tipo de Lente
   */
  tipoLente?: string;
  imagem?: ImageWidget;
  descricao?: string;
  tecnologiaLente?: TecnologiaLente[];
}

export interface Props {
  /**
   * @title Título do Modal
   */
  tituloModal?: string; // Tornando o campo opcional
  /**
   * @title Informações do Modal
   */
  informacoesModal?: TipoLente[];
  product: ProductDetailsPage | null;
  products: Product[] | null;
}

type Lente = {
  nome: string;
  sku: string;
  imagem: string;
  categorias: string[];
  price: number;
};

function ModalTab(
  { text, active, onClick }: {
    text: string;
    active: boolean;
    onClick: () => void;
  },
) {
  return (
    <button
      onClick={onClick}
      class={`py-3.5 ${
        active ? "bg-[#F8F8F8]" : "bg-[#D7F2EF]"
      } text-center font-bold text-base cursor-pointer rounded-tl-2x`}
    >
      {text}
    </button>
  );
}

function ModalCategory(
  { categorias, select }: {
    categorias: string[];
    select: (categoria: string) => void;
  },
) {
  return (
    <div class="grid grid-cols-4 gap-4">
      {categorias.map((categoria) => (
        <div
          class="p-5 bg-white border border-[#D0D0D0] rounded-2xl cursor-pointer flex flex-col justify-center"
          onClick={() => select(categoria)}
        >
          <div class="font-bold text-[#119184] uppercase text-xl text-center">
            {categoria}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ModalLentes(
  { tituloModal, informacoesModal, product, products }: Props,
) {
  const titulodoModal = tituloModal;
  const produtoPagina = product?.product;
  const produtoPaginaImage = produtoPagina?.image && produtoPagina?.image[0]?.url ? produtoPagina?.image[0]?.url : "";

  const abas = [
    "tipo",
    "tecnologia",
    "tratamento",
    "receita",
    "seuRosto",
  ] as const;
  type Aba = typeof abas[number];

  const activeTabIndex = useSignal<number>(0);
  const activeTab = abas[activeTabIndex.value];

  const selecaoDoCliente = useSignal<string[]>([]);

  const proximo = () => {
    const proximo = Math.min(activeTabIndex.value + 1, abas.length - 1);
    activeTabIndex.value = proximo;
  };

  const adicionarSelecao = (selecao: string) => {
    if (selecaoDoCliente.value.length < 3) {
      selecaoDoCliente.value = [...selecaoDoCliente.value, selecao];
      proximo();
    }
  };

  const anterior = () => {
    const anterior = Math.max(activeTabIndex.value - 1, 0);
    activeTabIndex.value = anterior;
  };

  /*@ts-ignore*/
  const lentes: Signal<Lente[]> = useComputed(() => {
    return products?.map((p) => {
      const propCategorias = p.isVariantOf?.additionalProperty.find((prop) =>
        prop?.name === "Modal Prevent"
      )?.value;
      if (!propCategorias) return null;
      const categorias = propCategorias.split(", ");

      return {
        categorias,
        nome: p?.name || "",
        sku: p?.sku || "",
        image: p?.image?.[0]?.url || "",
        price: p?.offers?.lowPrice || 0,
      };
    }).filter(Boolean);
  });

  const elementsToRender = useComputed(() => {
    const tabIndex = activeTabIndex.value;
    let _lentes: Lente[] | null = null;

    switch (tabIndex) {
      case 0:
        _lentes = lentes?.value;
        break;
      case 1:
        _lentes = lentes?.value.filter((lente) =>
          lente?.categorias[0] === selecaoDoCliente?.value[0]
        );
        break;
      case 2:
        _lentes = lentes?.value.filter((lente) =>
          lente?.categorias[0] === selecaoDoCliente?.value[0] &&
          lente?.categorias[1] === selecaoDoCliente?.value[1]
        );
        break;
      default:
        _lentes = null;
    }

    if (!_lentes) {
      return [];
    }

    return Array.from(
      new Set(_lentes.map((lente) => lente?.categorias[tabIndex])),
    );
  });

  console.log({
    PRODUCTS: products,
    LENTES: lentes.value,
    ELEMENTS: elementsToRender.value,
    INFORMACOES: informacoesModal,
  });

  const categories: Record<Aba, JSX.Element> = {
    tipo: (
      <ModalCategory
        categorias={elementsToRender.value}
        select={adicionarSelecao}
      />
    ),
    tecnologia: (
      <ModalCategory
        categorias={elementsToRender.value}
        select={adicionarSelecao}
      />
    ),
    tratamento: (
      <ModalCategory
        categorias={elementsToRender.value}
        select={adicionarSelecao}
      />
    ),
    receita: <div></div>,
    seuRosto: <div></div>,
  };

  const getTabClass = (tab: Aba) => {
    return tab === activeTab ? "bg-slate-100" : "inactive-tab";
  };

  const open = useSignal(true);

  return (
    <Modal
      loading="lazy"
      open={open.value}
      onClose={() => open.value = false}
    >
      <div class="w-screen h-screen flex">
        <div class="flex flex-col gap-2 bg-white justify-between m-auto max-w-[1366px] max-h-[724px] w-11/12 h-[95%] rounded-lg">
          <div class="relative pt-8 pb-6 px-6">
            <div class="w-full text-center uppercase text-xl font-bold">
              {titulodoModal}
            </div>
          </div>
          <div class="p-3">
            <div class="flex flex-col max-w-screen-xl w-full m-auto">
              <div class="grid gap-1 grid-cols-5">
                <ModalTab
                  text="Tipo"
                  active={activeTab === "tipo"}
                  onClick={() => {}}
                />
                <ModalTab
                  text="Tecnologia"
                  active={activeTab === "tecnologia"}
                  onClick={() => {}}
                />
                <ModalTab
                  text="Tratamento"
                  active={activeTab === "tratamento"}
                  onClick={() => {}}
                />
                <ModalTab
                  text="Receita"
                  active={activeTab === "receita"}
                  onClick={() => {}}
                />
                <ModalTab
                  text="Seu Rosto"
                  active={activeTab === "seuRosto"}
                  onClick={() => {}}
                />
              </div>
              <div class="bg-[#F8F8F8] rounded-b-2xl py-7 px-8">
                {categories[activeTab]}
              </div>
            </div>
          </div>
          <div class="bg-[#0B0E0D] p-3 rounded-b-lg">
            <div class="flex flex-col max-w-screen-xl w-full m-auto">
              <div class="flex justify-between">
                <div class="flex gap-6">
                  <div>
                    <Image
                      class="group-disabled:border-base-300"
                      width={64}
                      height={64}
                      src={produtoPaginaImage}
                      alt={produtoPagina?.name}
                    />
                  </div>
                  <div>
                    <div class="text-white text-sm">
                      {produtoPagina?.name}
                    </div>
                    <div class="text-[#119184] text-lg font-bold">
                      {formatPrice(
                        produtoPagina?.offers?.lowPrice,
                        produtoPagina?.offers?.priceCurrency,
                        "pt-BR",
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
