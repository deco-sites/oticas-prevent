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
  informacoesModal?: TipoLente[] | null;
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
    index: number;
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

function ModalCategoryType(
  { categorias, select, informacoes, selecaoCliente}: {
    categorias: string[];
    select: (categoria: string) => void;
    informacoes: Object[];
    selecaoCliente: string;
  },
) {

  const informacoesFiltradas = categorias.map(categoria => 
    informacoes?.filter(item => item?.tipoLente === categoria)
  );
  

  return (
    <div class="flex flex-col gap-5">
      
      <div class="flex flex-col gap-4">
        {selecaoCliente != "" && selecaoCliente != undefined ? (
            <div class="text-center text-sm text-[#119184]">
              <p><span class="uppercase">Você selecionou:</span> <span class="font-bold text-base">{selecaoCliente}</span></p>
            </div>
          ) : (
            <div class="text-center text-sm text-[#119184] uppercase">
              <p >Primeiro passo</p>
            </div>
          )
        }
        <div class="text-center text-xl font-medium">
          <p>Escolha o <span class="font-bold">tipo das lentes</span> para prosseguir:</p>
        </div>
      </div>

      <div class="grid grid-cols-4 gap-4">
        {categorias.map((categoria, index) => (
          <div
          className={`p-5 bg-white rounded-2xl cursor-pointer flex flex-col justify-center gap-3 ${
            categoria === selecaoCliente ? "border-4 border-[#119184]" : "border border-[#D0D0D0]"
            }`}
            onClick={() => select(categoria)}
          >
            {informacoesFiltradas[index]?.map((info, i) => (
            <Image
                className={`group-disabled:border-base-300 w-full rounded-lg ${
                  categoria != selecaoCliente && selecaoCliente != "" ? "grayscale" : ""
                }`} 
                width={64}
                height={64}
                src={info?.imagem}
                alt={categoria}
              />
            ))}

            <div class="font-bold text-[#696969] uppercase text-xl text-center ">
              {categoria}
            </div>
            
            {informacoesFiltradas[index]?.map((info, i) => (
              <div class="text-center font-semibold">
                {info.descricao}
              </div>
            ))}

            {categoria === selecaoCliente ? (

            <div class="btn uppercase font-semibold bg-secondary rounded-[200px] text-white hover:bg-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                <g clip-path="url(#clip0_156_3614)">
                  <path d="M12.25 2.72998C10.3216 2.72998 8.43657 3.30181 6.83319 4.37315C5.22982 5.4445 3.98013 6.96724 3.24218 8.74882C2.50422 10.5304 2.31114 12.4908 2.68735 14.3821C3.06355 16.2734 3.99215 18.0107 5.35571 19.3743C6.71928 20.7378 8.45656 21.6664 10.3479 22.0426C12.2392 22.4188 14.1996 22.2258 15.9812 21.4878C17.7627 20.7499 19.2855 19.5002 20.3568 17.8968C21.4282 16.2934 22 14.4083 22 12.48C21.9973 9.89496 20.9692 7.41659 19.1413 5.5887C17.3134 3.76082 14.835 2.73271 12.25 2.72998ZM16.5306 10.7606L11.2806 16.0106C11.211 16.0803 11.1283 16.1357 11.0372 16.1734C10.9462 16.2111 10.8486 16.2306 10.75 16.2306C10.6514 16.2306 10.5538 16.2111 10.4628 16.1734C10.3718 16.1357 10.289 16.0803 10.2194 16.0106L7.96938 13.7606C7.82865 13.6199 7.74959 13.429 7.74959 13.23C7.74959 13.031 7.82865 12.8401 7.96938 12.6994C8.11011 12.5586 8.30098 12.4796 8.5 12.4796C8.69903 12.4796 8.8899 12.5586 9.03063 12.6994L10.75 14.4197L15.4694 9.69936C15.5391 9.62967 15.6218 9.5744 15.7128 9.53668C15.8039 9.49897 15.9015 9.47956 16 9.47956C16.0986 9.47956 16.1961 9.49897 16.2872 9.53668C16.3782 9.5744 16.4609 9.62967 16.5306 9.69936C16.6003 9.76904 16.6556 9.85176 16.6933 9.94281C16.731 10.0339 16.7504 10.1314 16.7504 10.23C16.7504 10.3285 16.731 10.4261 16.6933 10.5172C16.6556 10.6082 16.6003 10.6909 16.5306 10.7606Z" fill="white"/>
                </g>
                <defs>
                <clipPath id="clip0_156_3614">
                  <rect width="24" height="24" fill="white" transform="translate(0.25 0.47998)"/>
                </clipPath>
                </defs>
              </svg>
              Selecionado
            </div>

            ) : (

            <div class="btn uppercase font-semibold bg-[#696969] rounded-[200px] text-white hover:bg-secondary">
              Quero este
            </div>

            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ModalCategoryTec(
  { lentes, select, selecaoIndex, informacoes, selecaoCliente}: {
    lentes: Lente[];
    select: (tecnologia: string) => void;
    selecaoIndex: number;
    informacoes: Object[];
    selecaoCliente: string;
  },
) {

  const categoriasUnicas: Set<string> = new Set();
 
  return (
    <div class="flex flex-col gap-5">
      <div class="flex flex-col gap-4">
        {selecaoCliente != "" && selecaoCliente != undefined ? (
            <div class="text-center text-sm text-[#119184]">
              <p><span class="uppercase">Você selecionou:</span> <span class="font-bold text-base">{selecaoCliente}</span></p>
            </div>
          ) : (
            <div class="text-center text-sm text-[#119184] uppercase">
              <p >Segundo passo</p>
            </div>
          )
        }
        <div class="text-center text-xl font-medium">
          <p>Escolha a <span class="font-bold">tecnologia das lentes</span> para prosseguir:</p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
      {lentes.map((categoria, index) => {
        const categoriaAtual = categoria?.categorias[selecaoIndex];

        if (categoriasUnicas.has(categoriaAtual)) {
          return null;
        } else {
          categoriasUnicas.add(categoriaAtual);

          const informacoesFiltradas = informacoes.filter(item => item?.tipoLente === categoria?.categorias[0]);

          return (
            <div
              className={`p-5 bg-white rounded-2xl cursor-pointer flex flex-col justify-center gap-3 ${
                categoriaAtual === selecaoCliente ? "border-4 border-[#119184]" : "border border-[#D0D0D0]"
                }`}
                onClick={() => select(categoriaAtual)}
              >
                <div class="font-bold text-[#119184] uppercase text-xl text-center">
                  {categoriaAtual}
                </div>

                {informacoesFiltradas.map((info, i) => (
                  <div class="text-center font-medium text-sm">
                    {info?.tecnologiaLente.map((tecnologia, index) => {
                      if (tecnologia.tipotecnologia === categoriaAtual) {
                        return (
                          <div>
                            {tecnologia.descricao}
                          </div>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </div>
                ))}

                {categoriaAtual === selecaoCliente ? (
                   <div class="btn uppercase font-semibold bg-secondary rounded-[200px] text-white hover:bg-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                      <g clip-path="url(#clip0_156_3614)">
                        <path d="M12.25 2.72998C10.3216 2.72998 8.43657 3.30181 6.83319 4.37315C5.22982 5.4445 3.98013 6.96724 3.24218 8.74882C2.50422 10.5304 2.31114 12.4908 2.68735 14.3821C3.06355 16.2734 3.99215 18.0107 5.35571 19.3743C6.71928 20.7378 8.45656 21.6664 10.3479 22.0426C12.2392 22.4188 14.1996 22.2258 15.9812 21.4878C17.7627 20.7499 19.2855 19.5002 20.3568 17.8968C21.4282 16.2934 22 14.4083 22 12.48C21.9973 9.89496 20.9692 7.41659 19.1413 5.5887C17.3134 3.76082 14.835 2.73271 12.25 2.72998ZM16.5306 10.7606L11.2806 16.0106C11.211 16.0803 11.1283 16.1357 11.0372 16.1734C10.9462 16.2111 10.8486 16.2306 10.75 16.2306C10.6514 16.2306 10.5538 16.2111 10.4628 16.1734C10.3718 16.1357 10.289 16.0803 10.2194 16.0106L7.96938 13.7606C7.82865 13.6199 7.74959 13.429 7.74959 13.23C7.74959 13.031 7.82865 12.8401 7.96938 12.6994C8.11011 12.5586 8.30098 12.4796 8.5 12.4796C8.69903 12.4796 8.8899 12.5586 9.03063 12.6994L10.75 14.4197L15.4694 9.69936C15.5391 9.62967 15.6218 9.5744 15.7128 9.53668C15.8039 9.49897 15.9015 9.47956 16 9.47956C16.0986 9.47956 16.1961 9.49897 16.2872 9.53668C16.3782 9.5744 16.4609 9.62967 16.5306 9.69936C16.6003 9.76904 16.6556 9.85176 16.6933 9.94281C16.731 10.0339 16.7504 10.1314 16.7504 10.23C16.7504 10.3285 16.731 10.4261 16.6933 10.5172C16.6556 10.6082 16.6003 10.6909 16.5306 10.7606Z" fill="white"/>
                      </g>
                      <defs>
                      <clipPath id="clip0_156_3614">
                        <rect width="24" height="24" fill="white" transform="translate(0.25 0.47998)"/>
                      </clipPath>
                      </defs>
                    </svg>
                    Selecionado
                  </div>
                  ): (
                  <div class="btn uppercase font-semibold bg-[#696969] rounded-[200px] text-white hover:bg-secondary">
                    Quero este
                  </div>
                  )
                }
            </div>
            );
          }
        })}
      </div>
    </div>
  );
}

function ModalCategoryTrat(
  { lentes, select, selecaoIndex, selecaoCliente}: {
    lentes: Lente[];
    select: (categoria: string) => void;
    selecaoIndex: number;
    selecaoCliente: string;
  },
) {

  return (
    <div class="flex flex-col gap-5">
      <div class="flex flex-col gap-4">
        {selecaoCliente != "" && selecaoCliente != undefined ? (
            <div class="text-center text-sm text-[#119184]">
              <p><span class="uppercase">Você selecionou:</span> <span class="font-bold text-base">{selecaoCliente}</span></p>
            </div>
          ) : (
            <div class="text-center text-sm text-[#119184] uppercase">
              <p >Terceiro passo</p>
            </div>
          )
        }
        <div class="text-center text-xl font-medium">
          <p>Escolha o <span class="font-bold">tratamento das lentes</span> para prosseguir:</p>
        </div>
      </div>
      <div class="grid grid-cols-4 gap-4">
        {lentes.map((lente) => (
          <div
            className={`p-5 bg-white rounded-2xl cursor-pointer flex flex-col justify-center gap-3 ${
              lente?.categorias[selecaoIndex] === selecaoCliente ? "border-4 border-[#119184]" : "border border-[#D0D0D0]"
            }`}
            onClick={() => select(lente?.categorias[selecaoIndex])}
          >
            <div class="font-bold text-[#119184] uppercase text-xl text-center">
              {lente.categorias[selecaoIndex]}
            </div>
          
            <div class="font-bold text-center">
              {formatPrice(
                  lente.price,
                  "BRL",
                  "pt-BR",
                )}
            </div>

            {lente?.categorias[selecaoIndex] === selecaoCliente ? (
                <div class="btn uppercase font-semibold bg-secondary rounded-[200px] text-white hover:bg-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                    <g clip-path="url(#clip0_156_3614)">
                      <path d="M12.25 2.72998C10.3216 2.72998 8.43657 3.30181 6.83319 4.37315C5.22982 5.4445 3.98013 6.96724 3.24218 8.74882C2.50422 10.5304 2.31114 12.4908 2.68735 14.3821C3.06355 16.2734 3.99215 18.0107 5.35571 19.3743C6.71928 20.7378 8.45656 21.6664 10.3479 22.0426C12.2392 22.4188 14.1996 22.2258 15.9812 21.4878C17.7627 20.7499 19.2855 19.5002 20.3568 17.8968C21.4282 16.2934 22 14.4083 22 12.48C21.9973 9.89496 20.9692 7.41659 19.1413 5.5887C17.3134 3.76082 14.835 2.73271 12.25 2.72998ZM16.5306 10.7606L11.2806 16.0106C11.211 16.0803 11.1283 16.1357 11.0372 16.1734C10.9462 16.2111 10.8486 16.2306 10.75 16.2306C10.6514 16.2306 10.5538 16.2111 10.4628 16.1734C10.3718 16.1357 10.289 16.0803 10.2194 16.0106L7.96938 13.7606C7.82865 13.6199 7.74959 13.429 7.74959 13.23C7.74959 13.031 7.82865 12.8401 7.96938 12.6994C8.11011 12.5586 8.30098 12.4796 8.5 12.4796C8.69903 12.4796 8.8899 12.5586 9.03063 12.6994L10.75 14.4197L15.4694 9.69936C15.5391 9.62967 15.6218 9.5744 15.7128 9.53668C15.8039 9.49897 15.9015 9.47956 16 9.47956C16.0986 9.47956 16.1961 9.49897 16.2872 9.53668C16.3782 9.5744 16.4609 9.62967 16.5306 9.69936C16.6003 9.76904 16.6556 9.85176 16.6933 9.94281C16.731 10.0339 16.7504 10.1314 16.7504 10.23C16.7504 10.3285 16.731 10.4261 16.6933 10.5172C16.6556 10.6082 16.6003 10.6909 16.5306 10.7606Z" fill="white"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_156_3614">
                      <rect width="24" height="24" fill="white" transform="translate(0.25 0.47998)"/>
                    </clipPath>
                    </defs>
                  </svg>
                  Selecionado
                </div>
              ): (
                <div class="btn uppercase font-semibold bg-[#696969] rounded-[200px] text-white hover:bg-secondary">
                  Quero este
                </div>
              )
            }
          </div>
        ))}
      </div>
    </div>  
  );
}

function ReturnLente(
  { lentes, selecaoCliente, quantitySelecaoCliente}: {
    lentes: Lente[];
    selecaoCliente: string;
    quantitySelecaoCliente: string;
  }
){

  const product = lentes;
  /*
  console.log('lente', lentes);
 ;
  */
  
 console.log('lentes', lentes);
 
  if(Number(quantitySelecaoCliente) >= 3){
    
    let _lente: Lente[] | null = null;

    _lente = lentes?.filter((lente) =>
      lente.categorias ? lente?.categorias[0] : null  === selecaoCliente[0] &&
      lente.categorias ? lente?.categorias[1] : null === selecaoCliente[1] &&
      lente.categorias ? lente?.categorias[2] : null === selecaoCliente[2]
    );

    console.log('_lente', _lente);
    console.log('selecaoCliente', selecaoCliente);

    if (_lente[0]?.categorias != null && _lente[0]?.categorias != undefined ){
      return(
        <div>
          <div class="text-white text-sm uppercase">Subtotal com lentes</div>
          <div class="text-[#119184] text-lg font-bold">
            {formatPrice(
              _lente[0].price,
              "BRL",
              "pt-BR",
            )}
          </div>
          
        </div>
      )
    }
  }
  
}

function addCartModal(){
  return(
    <div class="flex flex-col gap-2">
      <div class="text-center bg-[#2F9B3E] h-[32px] rounded-[200px] p-2 cursor-pointer uppercase text-xs text-white font-semibold">
        Comprar agora
      </div>

      <div class="text-center h-[32px] rounded-[200px] p-2 cursor-pointer uppercase text-xs bg-black text-white font-semibold">
        Comprar somente a armação
      </div>
    </div>
  )
}

export default function ModalLentes(
  { tituloModal, informacoesModal, product, products }: Props,
) {
  const titulodoModal = tituloModal;
  const produtoPagina = product?.product;
  const produtoPaginaImage =
    produtoPagina?.image && produtoPagina?.image[0]?.url
      ? produtoPagina?.image[0]?.url
      : "";

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
    const array = selecaoDoCliente.value;
      
    selecaoDoCliente.value = [...array.slice(0, activeTabIndex.value),
    selecao];
    proximo();
  };

  const changeTab = (index: number) => {
    if(index < activeTabIndex.value){
      const anterior = Math.max(activeTabIndex.value - 1, 0);
      activeTabIndex.value = index;
    }
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
        return _lentes;
      case 2:
        _lentes = lentes?.value.filter((lente) =>
          lente?.categorias[0] === selecaoDoCliente?.value[0] &&
          lente?.categorias[1] === selecaoDoCliente?.value[1]
        );
        return _lentes;
      case 3: 
      _lentes = lentes?.value.filter((lente) =>
        lente?.categorias[0] === selecaoDoCliente?.value[0] &&
        lente?.categorias[1] === selecaoDoCliente?.value[1] &&
        lente?.categorias[2] === selecaoDoCliente?.value[2]
      );
      return _lentes;
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
      <ModalCategoryType
        categorias={elementsToRender.value}
        select={adicionarSelecao}
        informacoes={informacoesModal}
        selecaoCliente = {selecaoDoCliente?.value[0]}
      />
    ),
    tecnologia: (
      <ModalCategoryTec
        lentes={elementsToRender.value}
        select={adicionarSelecao}
        selecaoIndex={activeTabIndex.value}
        informacoes={informacoesModal}
        selecaoCliente = {selecaoDoCliente?.value[1]}
      />
    ),
    tratamento: (
      <ModalCategoryTrat
        lentes={elementsToRender.value}
        select={adicionarSelecao}
        selecaoIndex={activeTabIndex.value}
        selecaoCliente = {selecaoDoCliente?.value[2]}
      />
    ),
    receita: <div></div>,
    seuRosto: <div></div>,
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
                  onClick={() => {changeTab(0)}}
                />
                <ModalTab
                  text="Tecnologia"
                  active={activeTab === "tecnologia"}
                  onClick={() => {changeTab(1)}}
                />
                <ModalTab
                  text="Tratamento"
                  active={activeTab === "tratamento"}
                  onClick={() => {changeTab(2)}}
                />
                <ModalTab
                  text="Receita"
                  active={activeTab === "receita"}
                  onClick={() => {changeTab(3)}}
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
                <ReturnLente
                  lentes={elementsToRender.value}
                  quantitySelecaoCliente={selecaoDoCliente.value.length}
                  selecaoCliente={selecaoDoCliente.value}
                />
                <div>
                  {addCartModal()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
