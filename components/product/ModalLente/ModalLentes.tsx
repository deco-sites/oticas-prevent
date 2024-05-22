import type { Product } from "apps/commerce/types.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { Signal, useComputed, useSignal } from "@preact/signals";
import { JSX } from "preact";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { formatPrice } from "$store/sdk/format.ts";
import type { ImageObject } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import ModalCustom from "$store/components/ui/ModalCustom.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { useCart } from "apps/vtex/hooks/useCart.ts";

export interface TratamentoLente {
  /**
   * @title Tratamento Lente
   */
  label: string;
  imagem?: ImageWidget;
}

export interface TecnologiaLente {
  /**
   * @title Tipo de Tecnologia
   */
  label: string;
  imagem?: ImageWidget;
  descricao?: string;
  tratamentoLente?: TratamentoLente[];
}

export interface ImagemRosto {
  /**
   * @title Envio da Foto
   */
  imagem?: ImageWidget;
}

export interface TipoLente {
  /**
   * @title Tipo de Lente
   */
  label: string;
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
  imagemRosto?: ImagemRosto;
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

const { displayModal } = useUI();

const onCloseModal = () => {
  displayModal.value = false;
};

function ModalTab(
  { text, active, onClick, index, selecaoClienteSize, selecaoCliente }: {
    text: string;
    active: boolean;
    onClick: () => void;
    index: number;
    selecaoClienteSize: number;
    selecaoCliente: string[];
  },
) {
  return (
    <button
      onClick={onClick}
      class={`md:py-3.5 ${
        active
          ? "bg-[#119184] text-white md:text-black md:bg-[#F8F8F8] relative md:before:content[''] md:before:absolute md:before:w-full md:before:h-4 md:before:bg-[#F8F8F8] md:before:top-[-9px] md:before:rounded-t-2xl md:before:block"
          : "bg-white border border-[#D0D0D0] md:bg-[#D7F2EF] md:border-0"
      } ${
        index == 0 && !active
          ? "rounded-full md:rounded-none md:rounded-tl-2xl"
          : "rounded-full md:rounded-none"
      } ${
        index == 4 && !active
          ? "rounded-full md:rounded-none md:rounded-tr-2xl"
          : "rounded-full md:rounded-none"
      } text-center font-bold text-sm md:text-base cursor-pointer rounded-tl-2x w-7 h-7 md:w-auto md:h-auto`}
    >
      <span class="hidden md:block">
        {text}
      </span>

      {selecaoClienteSize >= (index + 1)
        ? (
          <span class="flex justify-center md:hidden rounded-full bg-white w-fit m-auto p-px">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.0001 0.25C8.07176 0.25 6.1867 0.821828 4.58332 1.89317C2.97994 2.96451 1.73026 4.48726 0.992301 6.26884C0.254347 8.05042 0.0612641 10.0108 0.43747 11.9021C0.813676 13.7934 1.74227 15.5307 3.10584 16.8943C4.4694 18.2579 6.20668 19.1865 8.098 19.5627C9.98931 19.9389 11.9497 19.7458 13.7313 19.0078C15.5129 18.2699 17.0356 17.0202 18.107 15.4168C19.1783 13.8134 19.7501 11.9284 19.7501 10C19.7474 7.41498 18.7193 4.93661 16.8914 3.10872C15.0635 1.28084 12.5851 0.25273 10.0001 0.25ZM14.2808 8.28063L9.03075 13.5306C8.9611 13.6004 8.87838 13.6557 8.78733 13.6934C8.69628 13.7312 8.59869 13.7506 8.50013 13.7506C8.40156 13.7506 8.30397 13.7312 8.21292 13.6934C8.12187 13.6557 8.03916 13.6004 7.9695 13.5306L5.7195 11.2806C5.57877 11.1399 5.49971 10.949 5.49971 10.75C5.49971 10.551 5.57877 10.3601 5.7195 10.2194C5.86023 10.0786 6.0511 9.99958 6.25013 9.99958C6.44915 9.99958 6.64002 10.0786 6.78075 10.2194L8.50013 11.9397L13.2195 7.21937C13.2892 7.14969 13.3719 7.09442 13.463 7.0567C13.554 7.01899 13.6516 6.99958 13.7501 6.99958C13.8487 6.99958 13.9463 7.01899 14.0373 7.0567C14.1283 7.09442 14.2111 7.14969 14.2808 7.21937C14.3504 7.28906 14.4057 7.37178 14.4434 7.46283C14.4811 7.55387 14.5005 7.65145 14.5005 7.75C14.5005 7.84855 14.4811 7.94613 14.4434 8.03717C14.4057 8.12822 14.3504 8.21094 14.2808 8.28063Z"
                fill="#2F9B3E"
              />
            </svg>
          </span>
        )
        : (
          <span class="block md:hidden">
            {text === "Tipo"
              ? "1"
              : text === "Tecnologia"
              ? "2"
              : text === "Tratamento"
              ? "3"
              : text === "Receita"
              ? "4"
              : "5"}
          </span>
        )}
    </button>
  );
}

function ModalCategoryType(
  { categorias, select, informacoes, selecaoCliente }: {
    categorias: string[];
    select: (categoria: string) => void;
    informacoes: Object[];
    selecaoCliente: string;
  },
) {
  const informacoesFiltradas = categorias.map((categoria) =>
    informacoes?.filter((item) => item?.label === categoria)
  );

  //console.log('informacoesFiltradas', informacoesFiltradas);
  //console.log('categorias', categorias);
  return (
    <div class="flex flex-col gap-5">
      <div class="flex flex-col gap-4">
        {selecaoCliente != "" && selecaoCliente != undefined
          ? (
            <div class="text-center text-sm text-[#119184]">
              <p>
                <span class="uppercase">Você selecionou:</span>{" "}
                <span class="font-bold text-base">{selecaoCliente}</span>
              </p>
            </div>
          )
          : (
            <>
              <div class="text-center text-sm text-[#119184] uppercase hidden md:block">
                <p>Primeiro passo</p>
              </div>

              <div class="text-center text-sm text-[#119184] uppercase block md:hidden">
                <p>1 de 5</p>
              </div>
            </>
          )}
        <div class="text-center text-sm md:text-xl font-medium">
          <p>
            Escolha o <span class="font-bold">tipo das lentes</span>{" "}
            para prosseguir:
          </p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-1 md:gap-4 sm:grid-cols-4">
        {categorias.map((categoria, index) => (
          <div
            className={`p-3 md:p-5 bg-white rounded-2xl cursor-pointer flex flex-col justify-between gap-2.5 md:gap-3 ${
              categoria === selecaoCliente
                ? "border-4 border-[#119184]"
                : "border border-[#D0D0D0]"
            } ${
              categoria === "Grau"
                ? "order-1"
                : categoria === "Grau Alto"
                ? "order-2"
                : categoria === "Multifocal"
                ? "order-3"
                : categoria === "Linha Premium"
                ? "order-4"
                : "order-5"
            }`}
            onClick={() => select(categoria)}
          >
            {informacoesFiltradas[index]?.map((info, i) => (
              <Image
                className={`group-disabled:border-base-300 w-full rounded-lg ${
                  categoria != selecaoCliente && selecaoCliente != ""
                    ? "grayscale"
                    : ""
                }`}
                width={250}
                height={160}
                src={info?.imagem}
                alt={categoria}
              />
            ))}

            <div class="font-bold text-[#696969] uppercase text-xl text-center ">
              {categoria}
            </div>

            {informacoesFiltradas[index]?.map((info, i) => (
              <div class="text-center font-semibold text-xs md:text-base">
                {info.descricao}
              </div>
            ))}

            {categoria === selecaoCliente
              ? (
                <div class="btn uppercase font-semibold bg-secondary rounded-[200px] text-white hover:bg-secondary h-10 min-h-10 md:min-h-12 md:h-12 text-xs md:text-sm px-2.5">
                  <svg
                    class="w-5 md:w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_156_3614)">
                      <path
                        d="M12.25 2.72998C10.3216 2.72998 8.43657 3.30181 6.83319 4.37315C5.22982 5.4445 3.98013 6.96724 3.24218 8.74882C2.50422 10.5304 2.31114 12.4908 2.68735 14.3821C3.06355 16.2734 3.99215 18.0107 5.35571 19.3743C6.71928 20.7378 8.45656 21.6664 10.3479 22.0426C12.2392 22.4188 14.1996 22.2258 15.9812 21.4878C17.7627 20.7499 19.2855 19.5002 20.3568 17.8968C21.4282 16.2934 22 14.4083 22 12.48C21.9973 9.89496 20.9692 7.41659 19.1413 5.5887C17.3134 3.76082 14.835 2.73271 12.25 2.72998ZM16.5306 10.7606L11.2806 16.0106C11.211 16.0803 11.1283 16.1357 11.0372 16.1734C10.9462 16.2111 10.8486 16.2306 10.75 16.2306C10.6514 16.2306 10.5538 16.2111 10.4628 16.1734C10.3718 16.1357 10.289 16.0803 10.2194 16.0106L7.96938 13.7606C7.82865 13.6199 7.74959 13.429 7.74959 13.23C7.74959 13.031 7.82865 12.8401 7.96938 12.6994C8.11011 12.5586 8.30098 12.4796 8.5 12.4796C8.69903 12.4796 8.8899 12.5586 9.03063 12.6994L10.75 14.4197L15.4694 9.69936C15.5391 9.62967 15.6218 9.5744 15.7128 9.53668C15.8039 9.49897 15.9015 9.47956 16 9.47956C16.0986 9.47956 16.1961 9.49897 16.2872 9.53668C16.3782 9.5744 16.4609 9.62967 16.5306 9.69936C16.6003 9.76904 16.6556 9.85176 16.6933 9.94281C16.731 10.0339 16.7504 10.1314 16.7504 10.23C16.7504 10.3285 16.731 10.4261 16.6933 10.5172C16.6556 10.6082 16.6003 10.6909 16.5306 10.7606Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_156_3614">
                        <rect
                          width="24"
                          height="24"
                          fill="white"
                          transform="translate(0.25 0.47998)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  Selecionado
                </div>
              )
              : (
                <div class="btn uppercase font-semibold bg-[#696969] rounded-[200px] text-white hover:bg-secondary h-10 min-h-10 md:min-h-12 md:h-12 text-xs md:text-sm px-2.5">
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
  { lentes, select, selecaoIndex, informacoes, selecaoCliente }: {
    lentes: string[] | Lente[];
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
        {selecaoCliente != "" && selecaoCliente != undefined
          ? (
            <div class="text-center text-sm text-[#119184]">
              <p>
                <span class="uppercase">Você selecionou:</span>
                <span class="font-bold text-base">{selecaoCliente}</span>
              </p>
            </div>
          )
          : (
            <>
              <div class="text-center text-sm text-[#119184] uppercase hidden md:block">
                <p>Segundo passo</p>
              </div>

              <div class="text-center text-sm text-[#119184] uppercase block md:hidden">
                <p>2 de 5</p>
              </div>
            </>
          )}
        <div class="text-center text-sm md:text-xl font-medium">
          <p>
            Escolha a <span class="font-bold">tecnologia das lentes</span>
            para prosseguir:
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-4">
        {lentes.map((categoria, index) => {
          const categoriaAtual = categoria?.categorias[selecaoIndex];

          if (categoriasUnicas.has(categoriaAtual)) {
            return null;
          } else {
            categoriasUnicas.add(categoriaAtual);

            const informacoesFiltradas = informacoes.filter((item) =>
              item?.label === categoria?.categorias[0]
            );

            return (
              <div
                className={`p-5 bg-white rounded-2xl cursor-pointer flex flex-col justify-center gap-3 ${
                  categoriaAtual === selecaoCliente
                    ? "border-4 border-[#119184]"
                    : "border border-[#D0D0D0]"
                }`}
                onClick={() => select(categoriaAtual)}
              >
                {informacoesFiltradas.map((info, i) => (
                  <>
                    {info?.tecnologiaLente.map((tecnologia, index) => {
                      if (tecnologia.label === categoriaAtual) {
                        if (tecnologia?.imagem) {
                          return (
                            <Image
                              className={`group-disabled:border-base-300 w-full rounded-lg ${
                                categoriaAtual != selecaoCliente &&
                                  selecaoCliente != ""
                                  ? "grayscale"
                                  : ""
                              }`}
                              width={250}
                              height={160}
                              src={tecnologia?.imagem}
                              alt={categoriaAtual}
                            />
                          );
                        }
                      }
                    })}
                  </>
                ))}

                <div class="font-bold text-[#119184] uppercase text-xl text-center">
                  {categoriaAtual}
                </div>

                {informacoesFiltradas.map((info, i) => (
                  <div class="text-center font-medium text-sm">
                    {info?.tecnologiaLente.map((tecnologia, index) => {
                      if (tecnologia.label === categoriaAtual) {
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

                {categoriaAtual === selecaoCliente
                  ? (
                    <div class="btn uppercase font-semibold bg-secondary rounded-[200px] text-white hover:bg-secondary h-10 min-h-10 md:min-h-12 md:h-12 text-xs md:text-sm px-2.5">
                      <svg
                        class="w-5 md:w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_156_3614)">
                          <path
                            d="M12.25 2.72998C10.3216 2.72998 8.43657 3.30181 6.83319 4.37315C5.22982 5.4445 3.98013 6.96724 3.24218 8.74882C2.50422 10.5304 2.31114 12.4908 2.68735 14.3821C3.06355 16.2734 3.99215 18.0107 5.35571 19.3743C6.71928 20.7378 8.45656 21.6664 10.3479 22.0426C12.2392 22.4188 14.1996 22.2258 15.9812 21.4878C17.7627 20.7499 19.2855 19.5002 20.3568 17.8968C21.4282 16.2934 22 14.4083 22 12.48C21.9973 9.89496 20.9692 7.41659 19.1413 5.5887C17.3134 3.76082 14.835 2.73271 12.25 2.72998ZM16.5306 10.7606L11.2806 16.0106C11.211 16.0803 11.1283 16.1357 11.0372 16.1734C10.9462 16.2111 10.8486 16.2306 10.75 16.2306C10.6514 16.2306 10.5538 16.2111 10.4628 16.1734C10.3718 16.1357 10.289 16.0803 10.2194 16.0106L7.96938 13.7606C7.82865 13.6199 7.74959 13.429 7.74959 13.23C7.74959 13.031 7.82865 12.8401 7.96938 12.6994C8.11011 12.5586 8.30098 12.4796 8.5 12.4796C8.69903 12.4796 8.8899 12.5586 9.03063 12.6994L10.75 14.4197L15.4694 9.69936C15.5391 9.62967 15.6218 9.5744 15.7128 9.53668C15.8039 9.49897 15.9015 9.47956 16 9.47956C16.0986 9.47956 16.1961 9.49897 16.2872 9.53668C16.3782 9.5744 16.4609 9.62967 16.5306 9.69936C16.6003 9.76904 16.6556 9.85176 16.6933 9.94281C16.731 10.0339 16.7504 10.1314 16.7504 10.23C16.7504 10.3285 16.731 10.4261 16.6933 10.5172C16.6556 10.6082 16.6003 10.6909 16.5306 10.7606Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_156_3614">
                            <rect
                              width="24"
                              height="24"
                              fill="white"
                              transform="translate(0.25 0.47998)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      Selecionado
                    </div>
                  )
                  : (
                    <div class="btn uppercase font-semibold bg-[#696969] rounded-[200px] text-white hover:bg-secondary h-10 min-h-10 md:min-h-12 md:h-12 text-xs md:text-sm px-2.5">
                      Quero este
                    </div>
                  )}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

function ModalCategoryTrat(
  { lentes, select, selecaoIndex, selecaoCliente, informacoes }: {
    lentes: string[] | Lente[];
    select: (categoria: string) => void;
    selecaoIndex: number;
    selecaoCliente: string;
    informacoes: Object[];
  },
) {
  return (
    <div class="flex flex-col gap-5">
      <div class="flex flex-col gap-4">
        {selecaoCliente != "" && selecaoCliente != undefined
          ? (
            <div class="text-center text-sm text-[#119184]">
              <p>
                <span class="uppercase">Você selecionou:</span>
                <span class="font-bold text-base">{selecaoCliente}</span>
              </p>
            </div>
          )
          : (
            <>
              <div class="text-center text-sm text-[#119184] uppercase hidden md:block">
                <p>Terceiro passo</p>
              </div>

              <div class="text-center text-sm text-[#119184] uppercase block md:hidden">
                <p>3 de 5</p>
              </div>
            </>
          )}
        <div class="text-center text-sm md:text-xl font-medium">
          <p>
            Escolha o <span class="font-bold">tratamento das lentes</span>
            para prosseguir:
          </p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-4">
        {lentes.map((lente) => {
          const informacoesFiltradas = informacoes.filter((item) =>
            item?.label === lente?.categorias[0]
          ).map((item) =>
            item?.tecnologiaLente?.find((elemento) =>
              elemento?.label === lente?.categorias[1]
            )
          ).filter((item) => item);

          return (
            <div
              className={`p-5 bg-white rounded-2xl cursor-pointer flex flex-col justify-center gap-3 ${
                lente?.categorias[selecaoIndex] === selecaoCliente
                  ? "border-4 border-[#119184]"
                  : "border border-[#D0D0D0]"
              }`}
              onClick={() => select(lente?.categorias[selecaoIndex])}
            >
              {informacoesFiltradas.map((info, i) => (
                <>
                  {info?.tratamentoLente &&
                    info.tratamentoLente.map((tratamento, index) => {
                      if (
                        tratamento.label === lente?.categorias[selecaoIndex]
                      ) {
                        if (tratamento?.imagem) {
                          return (
                            <Image
                              className={`group-disabled:border-base-300 w-full rounded-lg ${
                                lente?.categorias[selecaoIndex] !=
                                    selecaoCliente && selecaoCliente != ""
                                  ? "grayscale"
                                  : ""
                              }`}
                              width={250}
                              height={160}
                              src={tratamento?.imagem}
                              alt={lente?.categorias[selecaoIndex]}
                            />
                          );
                        }
                      }
                    })}
                </>
              ))}

              <div class="font-bold text-[#119184] uppercase text-xl text-center">
                {lente?.categorias[selecaoIndex]}
              </div>

              {lente?.descricao && (
                <div class="text-center font-medium text-sm">
                  <div>
                    {lente?.descricao}
                  </div>
                </div>
              )}

              <div class="font-bold text-center">
                {formatPrice(
                  lente.price,
                  "BRL",
                  "pt-BR",
                )}
              </div>

              {lente?.categorias[selecaoIndex] === selecaoCliente
                ? (
                  <div class="btn uppercase font-semibold bg-secondary rounded-[200px] text-white hover:bg-secondary h-10 min-h-10 md:min-h-12 md:h-12 text-xs md:text-sm px-2.5">
                    <svg
                      class="w-5 md:w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_156_3614)">
                        <path
                          d="M12.25 2.72998C10.3216 2.72998 8.43657 3.30181 6.83319 4.37315C5.22982 5.4445 3.98013 6.96724 3.24218 8.74882C2.50422 10.5304 2.31114 12.4908 2.68735 14.3821C3.06355 16.2734 3.99215 18.0107 5.35571 19.3743C6.71928 20.7378 8.45656 21.6664 10.3479 22.0426C12.2392 22.4188 14.1996 22.2258 15.9812 21.4878C17.7627 20.7499 19.2855 19.5002 20.3568 17.8968C21.4282 16.2934 22 14.4083 22 12.48C21.9973 9.89496 20.9692 7.41659 19.1413 5.5887C17.3134 3.76082 14.835 2.73271 12.25 2.72998ZM16.5306 10.7606L11.2806 16.0106C11.211 16.0803 11.1283 16.1357 11.0372 16.1734C10.9462 16.2111 10.8486 16.2306 10.75 16.2306C10.6514 16.2306 10.5538 16.2111 10.4628 16.1734C10.3718 16.1357 10.289 16.0803 10.2194 16.0106L7.96938 13.7606C7.82865 13.6199 7.74959 13.429 7.74959 13.23C7.74959 13.031 7.82865 12.8401 7.96938 12.6994C8.11011 12.5586 8.30098 12.4796 8.5 12.4796C8.69903 12.4796 8.8899 12.5586 9.03063 12.6994L10.75 14.4197L15.4694 9.69936C15.5391 9.62967 15.6218 9.5744 15.7128 9.53668C15.8039 9.49897 15.9015 9.47956 16 9.47956C16.0986 9.47956 16.1961 9.49897 16.2872 9.53668C16.3782 9.5744 16.4609 9.62967 16.5306 9.69936C16.6003 9.76904 16.6556 9.85176 16.6933 9.94281C16.731 10.0339 16.7504 10.1314 16.7504 10.23C16.7504 10.3285 16.731 10.4261 16.6933 10.5172C16.6556 10.6082 16.6003 10.6909 16.5306 10.7606Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_156_3614">
                          <rect
                            width="24"
                            height="24"
                            fill="white"
                            transform="translate(0.25 0.47998)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    Selecionado
                  </div>
                )
                : (
                  <div class="btn uppercase font-semibold bg-[#696969] rounded-[200px] text-white hover:bg-secondary h-10 min-h-10 md:min-h-12 md:h-12 text-xs md:text-sm px-2.5">
                    Quero este
                  </div>
                )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ModalCategoryReceita(
  { selecaoCliente, select }: {
    selecaoCliente: string;
    select: (categoria: string) => void;
  },
) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event?.target?.files;
    if (files && files?.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target?.result;
        const fileData: FileData = {
          name: file.name,
          type: file.type,
          size: file.size,
          content: fileContent,
        };
        sessionStorage.setItem("receita", JSON.stringify(fileData.content));

        if (sessionStorage.getItem("receitaDepois")) {
          sessionStorage.removeItem("receitaDepois");
        }
      };
      reader.readAsDataURL(file);
      select("anexo Receita");
    }
  };

  return (
    <div class="flex flex-col gap-5">
      <div class="flex flex-col gap-2 md:gap-8 max-w-[487px] m-auto w-full">
        {selecaoCliente != "" && selecaoCliente != undefined
          ? (
            <div class="text-center text-sm text-[#119184]">
              <p>
                <span class="uppercase">Estamos quase lá!</span>
              </p>
            </div>
          )
          : (
            <>
              <div class="text-center text-sm text-[#119184] uppercase hidden md:block">
                <p>Quarto passo</p>
              </div>

              <div class="text-center text-sm text-[#119184] uppercase block md:hidden">
                <p>4 de 5</p>
              </div>
            </>
          )}
        <div class="text-center text-sm md:text-xl font-medium">
          <p>
            Envie uma foto da sua <span class="font-bold">receita médica</span>
          </p>
        </div>

        <div class="flex flex-col justify-center items-center gap-3.5 relative">
          {selecaoCliente == "anexo Receita"
            ? (
              <div class="btn uppercase font-semibold bg-[#8f8f8f] rounded-[200px] text-white hover:bg-[#8f8f8f] px-9 absolute top-0 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="29"
                  viewBox="0 0 28 29"
                  fill="none"
                >
                  <g clip-path="url(#clip0_150_13359)">
                    <path
                      d="M21.875 25.3862H6.125C5.89294 25.3862 5.67038 25.294 5.50628 25.1299C5.34219 24.9659 5.25 24.7433 5.25 24.5112V5.26123C5.25 5.02917 5.34219 4.80661 5.50628 4.64251C5.67038 4.47842 5.89294 4.38623 6.125 4.38623H16.625L22.75 10.5112V24.5112C22.75 24.7433 22.6578 24.9659 22.4937 25.1299C22.3296 25.294 22.1071 25.3862 21.875 25.3862Z"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M16.625 4.38623V10.5112H22.75"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.375 17.5112H16.625"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M14 14.8862V20.1362"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_150_13359">
                      <rect
                        width="28"
                        height="28"
                        fill="white"
                        transform="translate(0 0.88623)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <span>ARQUIVO ANEXADO</span>
              </div>
            )
            : (
              <div class="btn uppercase font-semibold bg-secondary rounded-[200px] text-white hover:bg-secondary px-9 absolute top-0 cursor-pointer">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_144_4486)">
                    <path
                      d="M15.0005 8.29722L7.19014 16.2369C6.91569 16.5196 6.7635 16.899 6.76646 17.293C6.76943 17.687 6.92731 18.064 7.20599 18.3426C7.48468 18.6212 7.86177 18.7789 8.25579 18.7817C8.64981 18.7845 9.0291 18.6321 9.3117 18.3575L18.622 8.91878C19.1847 8.35611 19.5008 7.59296 19.5008 6.79722C19.5008 6.00148 19.1847 5.23833 18.622 4.67565C18.0593 4.11298 17.2962 3.79688 16.5005 3.79688C15.7047 3.79688 14.9416 4.11298 14.3789 4.67565L5.06858 14.1153C4.23602 14.9616 3.77157 16.1025 3.7764 17.2896C3.78124 18.4767 4.25496 19.6139 5.09439 20.4533C5.93381 21.2927 7.07093 21.7664 8.25804 21.7713C9.44516 21.7761 10.5861 21.3117 11.4323 20.4791L19.1255 12.7972"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_144_4486">
                      <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(0 0.797363)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <span>ANEXAR ARQUIVO</span>
              </div>
            )}

          <input
            type="file"
            onChange={handleFileChange}
            id="imgReceita"
            accept=".jpg,.jpeg,.png"
            class="h-12 opacity-0 cursor-pointer"
          />
          <div class="text-sm mt-2 block">
            Apenas arquivos no formato PDF ou JPG.
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <div class="text-xs md:text-base">
            Se preferir, poderá enviar a receita médica posteriormente pelo
            e-mail{" "}
            <span class="font-bold underline-offset-4 text-[#119184]">
              ecommerce@oticasprevent.com.br
            </span>{" "}
            ou pelo nosso{" "}
            <a href="" target="_blank" class="font-bold">
              Whatsapp{" "}
              <svg
                class="inline"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.9628 2.46942C11.6096 1.06445 9.80992 0.290375 7.89268 0.289551C3.94201 0.289551 0.726749 3.62381 0.72516 7.72189C0.72463 9.03192 1.05463 10.3107 1.68188 11.4379L0.665039 15.2895L4.46465 14.2559C5.5116 14.8482 6.69026 15.1603 7.88976 15.1606H7.89277C11.843 15.1606 15.0586 11.8261 15.0601 7.72784C15.0609 5.7417 14.3161 3.8743 12.9628 2.46942ZM7.89268 13.9054H7.89021C6.82128 13.9049 5.77292 13.607 4.85813 13.0442L4.64069 12.9103L2.38594 13.5237L2.98776 11.2439L2.84607 11.0102C2.24972 10.0265 1.93481 8.88965 1.93534 7.72235C1.93658 4.31613 4.60908 1.54492 7.89506 1.54492C9.48627 1.54547 10.9821 2.1889 12.1068 3.35666C13.2315 4.52441 13.8505 6.0766 13.85 7.72738C13.8486 11.1339 11.1763 13.9054 7.89268 13.9054ZM11.1604 9.27838C10.9813 9.18536 10.1008 8.7362 9.93661 8.67413C9.77258 8.61215 9.65304 8.5813 9.53377 8.76715C9.41432 8.953 9.07117 9.3714 8.96664 9.49527C8.86211 9.61923 8.75776 9.63479 8.57864 9.54178C8.39951 9.44885 7.82249 9.25265 7.13839 8.61993C6.60604 8.12747 6.24664 7.51929 6.14211 7.33343C6.03776 7.1474 6.14123 7.05658 6.22069 6.95441C6.41456 6.70474 6.60869 6.44299 6.66837 6.31912C6.72814 6.19516 6.69821 6.08667 6.65336 5.99374C6.60869 5.90082 6.25053 4.98666 6.10133 4.61468C5.95584 4.25268 5.80832 4.30157 5.69832 4.2959C5.59397 4.2905 5.47452 4.2894 5.35507 4.2894C5.23571 4.2894 5.04167 4.33581 4.87746 4.52185C4.71334 4.70779 4.25074 5.15704 4.25074 6.0712C4.25074 6.98535 4.89247 7.86847 4.98199 7.99243C5.07151 8.11639 6.24488 9.99231 8.04135 10.7967C8.46864 10.9882 8.80217 11.1024 9.06234 11.188C9.49139 11.3293 9.88169 11.3094 10.1903 11.2616C10.5345 11.2082 11.2498 10.8123 11.3992 10.3785C11.5484 9.94461 11.5484 9.57281 11.5035 9.49527C11.4589 9.41781 11.3394 9.3714 11.1604 9.27838Z"
                  fill="#0B0E0D"
                />
              </svg>
            </a>
          </div>

          <div class="p-2.5 rounded-2xl bg-[#DCF5F3] text-xs md:text-sm text-center">
            Mas, lembre-se de{" "}
            <span class="font-bold text-xs md:text-base">
              incluir o número do pedido!
            </span>
          </div>

          <div class="flex gap-2 cursor-pointer items-center">
            {selecaoCliente == "receita Depois"
              ? (
                <input
                  type="checkbox"
                  id="envioreceita"
                  onClick={() => select("receita Depois")}
                  class="appearance-none border border-black w-4 h-4 rounded-full relative border-[bg-secondary] after:content[''] after:bg-secondary after:absolute after:w-2 after:h-2 after:inset-0 after:m-auto after:rounded-full"
                />
              )
              : (
                <input
                  type="checkbox"
                  id="envioreceita"
                  onClick={() => select("receita Depois")}
                  class="appearance-none border border-black w-4 h-4 rounded-full relative checked:border-[bg-secondary] checked:after:content[''] checked:after:bg-secondary checked:after:absolute checked:after:w-2 checked:after:h-2 checked:after:inset-0 checked:after:m-auto checked:after:rounded-full"
                />
              )}
            <label for="envioreceita" class="text-xs md:text-base">
              Entendi e aceito os termos para enviar mais tarde.
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModalCategoryRosto(
  { selecaoCliente, select }: {
    selecaoCliente: string;
    select: (categoria: string) => void;
  },
) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event?.target?.files;
    if (files && files?.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target?.result;
        const fileData: FileData = {
          name: file.name,
          type: file.type,
          size: file.size,
          content: fileContent,
        };
        sessionStorage.setItem("rosto", JSON.stringify(fileData.content));
        if (sessionStorage.getItem("rostoDepois")) {
          sessionStorage.removeItem("rostoDepois");
        }
      };
      reader.readAsDataURL(file);
      select("anexo Rosto");
    }
  };

  return (
    <div class="flex gap-5">
      <div class="max-w-[407px] mt-6 hidden md:block">
        <Image
          class="group-disabled:border-base-300"
          src="https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4488/d9d970b5-b9f7-4e24-b458-40d20bce5272"
          width={450}
          height={200}
        />
        <div class="text-center text-xs md:text-base font-medium mt-6">
          A Distância Naso Pupilar (DNP) é essencial para fazermos seus óculos
          na medida ideal para você!
        </div>
      </div>
      <div class="flex flex-col gap-2 md:gap-8 max-w-[487px] m-auto w-full">
        {selecaoCliente != "" && selecaoCliente != undefined
          ? (
            <div class="text-center text-sm text-[#119184]">
              <p>
                <span class="uppercase">Estamos quase lá!</span>
              </p>
            </div>
          )
          : (
            <>
              <div class="text-center text-sm text-[#119184] uppercase hidden md:block">
                <p>Ultimo Passo</p>
              </div>

              <div class="text-center text-sm text-[#119184] uppercase block md:hidden">
                <p>5 de 5</p>
              </div>
            </>
          )}
        <div class="text-center text-sm md:text-xl font-medium">
          <p>
            Envia uma{" "}
            <span class="font-bold">foto do seu rosto segurando um cartão</span>
            {" "}
            para obtermos algumas medidas:
          </p>
        </div>

        <div class="flex flex-col justify-center items-center gap-3.5 relative">
          {selecaoCliente == "anexo Rosto"
            ? (
              <div class="btn uppercase font-semibold bg-[#8f8f8f] rounded-[200px] text-white hover:bg-[#8f8f8f] px-9 absolute top-0 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="29"
                  viewBox="0 0 28 29"
                  fill="none"
                >
                  <g clip-path="url(#clip0_150_13359)">
                    <path
                      d="M21.875 25.3862H6.125C5.89294 25.3862 5.67038 25.294 5.50628 25.1299C5.34219 24.9659 5.25 24.7433 5.25 24.5112V5.26123C5.25 5.02917 5.34219 4.80661 5.50628 4.64251C5.67038 4.47842 5.89294 4.38623 6.125 4.38623H16.625L22.75 10.5112V24.5112C22.75 24.7433 22.6578 24.9659 22.4937 25.1299C22.3296 25.294 22.1071 25.3862 21.875 25.3862Z"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M16.625 4.38623V10.5112H22.75"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.375 17.5112H16.625"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M14 14.8862V20.1362"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_150_13359">
                      <rect
                        width="28"
                        height="28"
                        fill="white"
                        transform="translate(0 0.88623)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <span>ARQUIVO ANEXADO</span>
              </div>
            )
            : (
              <div class="btn uppercase font-semibold bg-secondary rounded-[200px] text-white hover:bg-secondary px-9 absolute top-0 cursor-pointer">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_144_4486)">
                    <path
                      d="M15.0005 8.29722L7.19014 16.2369C6.91569 16.5196 6.7635 16.899 6.76646 17.293C6.76943 17.687 6.92731 18.064 7.20599 18.3426C7.48468 18.6212 7.86177 18.7789 8.25579 18.7817C8.64981 18.7845 9.0291 18.6321 9.3117 18.3575L18.622 8.91878C19.1847 8.35611 19.5008 7.59296 19.5008 6.79722C19.5008 6.00148 19.1847 5.23833 18.622 4.67565C18.0593 4.11298 17.2962 3.79688 16.5005 3.79688C15.7047 3.79688 14.9416 4.11298 14.3789 4.67565L5.06858 14.1153C4.23602 14.9616 3.77157 16.1025 3.7764 17.2896C3.78124 18.4767 4.25496 19.6139 5.09439 20.4533C5.93381 21.2927 7.07093 21.7664 8.25804 21.7713C9.44516 21.7761 10.5861 21.3117 11.4323 20.4791L19.1255 12.7972"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_144_4486">
                      <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(0 0.797363)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <span>ANEXAR ARQUIVO</span>
              </div>
            )}

          <input
            type="file"
            id="imgRosto"
            accept=".jpg,.jpeg,.png"
            class="h-12 opacity-0 cursor-pointer"
            onChange={handleFileChange}
          />
          <div class="text-sm mt-2 block">
            Apenas arquivos no formato PDF ou JPG.
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <div class="text-sm md:text-base">
            Se preferir, poderá enviar a receita médica posteriormente pelo
            e-mail{" "}
            <span class="font-bold underline-offset-4 text-[#119184]">
              ecommerce@oticasprevent.com.br
            </span>{" "}
            ou pelo nosso{" "}
            <a href="" target="_blank" class="font-bold">
              Whatsapp{" "}
              <svg
                class="inline"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.9628 2.46942C11.6096 1.06445 9.80992 0.290375 7.89268 0.289551C3.94201 0.289551 0.726749 3.62381 0.72516 7.72189C0.72463 9.03192 1.05463 10.3107 1.68188 11.4379L0.665039 15.2895L4.46465 14.2559C5.5116 14.8482 6.69026 15.1603 7.88976 15.1606H7.89277C11.843 15.1606 15.0586 11.8261 15.0601 7.72784C15.0609 5.7417 14.3161 3.8743 12.9628 2.46942ZM7.89268 13.9054H7.89021C6.82128 13.9049 5.77292 13.607 4.85813 13.0442L4.64069 12.9103L2.38594 13.5237L2.98776 11.2439L2.84607 11.0102C2.24972 10.0265 1.93481 8.88965 1.93534 7.72235C1.93658 4.31613 4.60908 1.54492 7.89506 1.54492C9.48627 1.54547 10.9821 2.1889 12.1068 3.35666C13.2315 4.52441 13.8505 6.0766 13.85 7.72738C13.8486 11.1339 11.1763 13.9054 7.89268 13.9054ZM11.1604 9.27838C10.9813 9.18536 10.1008 8.7362 9.93661 8.67413C9.77258 8.61215 9.65304 8.5813 9.53377 8.76715C9.41432 8.953 9.07117 9.3714 8.96664 9.49527C8.86211 9.61923 8.75776 9.63479 8.57864 9.54178C8.39951 9.44885 7.82249 9.25265 7.13839 8.61993C6.60604 8.12747 6.24664 7.51929 6.14211 7.33343C6.03776 7.1474 6.14123 7.05658 6.22069 6.95441C6.41456 6.70474 6.60869 6.44299 6.66837 6.31912C6.72814 6.19516 6.69821 6.08667 6.65336 5.99374C6.60869 5.90082 6.25053 4.98666 6.10133 4.61468C5.95584 4.25268 5.80832 4.30157 5.69832 4.2959C5.59397 4.2905 5.47452 4.2894 5.35507 4.2894C5.23571 4.2894 5.04167 4.33581 4.87746 4.52185C4.71334 4.70779 4.25074 5.15704 4.25074 6.0712C4.25074 6.98535 4.89247 7.86847 4.98199 7.99243C5.07151 8.11639 6.24488 9.99231 8.04135 10.7967C8.46864 10.9882 8.80217 11.1024 9.06234 11.188C9.49139 11.3293 9.88169 11.3094 10.1903 11.2616C10.5345 11.2082 11.2498 10.8123 11.3992 10.3785C11.5484 9.94461 11.5484 9.57281 11.5035 9.49527C11.4589 9.41781 11.3394 9.3714 11.1604 9.27838Z"
                  fill="#0B0E0D"
                />
              </svg>
            </a>
          </div>

          <div class="p-2.5 rounded-2xl bg-[#DCF5F3] text-xs md:text-sm text-center">
            Mas, lembre-se de{" "}
            <span class="font-bold text-xs md:text-base">
              incluir o número do pedido!
            </span>
          </div>
          <div class="flex gap-2 cursor-pointer items-center">
            {selecaoCliente == "rosto Depois"
              ? (
                <input
                  type="checkbox"
                  id="enviorosto"
                  onClick={() => select("rosto Depois")}
                  class="appearance-none border border-black w-4 h-4 rounded-full relative border-[bg-secondary] after:content[''] after:bg-secondary after:absolute after:w-2 after:h-2 after:inset-0 after:m-auto after:rounded-full"
                />
              )
              : (
                <input
                  type="checkbox"
                  id="enviorosto"
                  onClick={() => select("rosto Depois")}
                  class="appearance-none border border-black w-4 h-4 rounded-full relative checked:border-[bg-secondary] checked:after:content[''] checked:after:bg-secondary checked:after:absolute checked:after:w-2 checked:after:h-2 checked:after:inset-0 checked:after:m-auto checked:after:rounded-full"
                />
              )}

            <label for="enviorosto" class="text-xs md:text-base">
              Entendi e aceito os termos para enviar mais tarde.
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReturnLente(
  { lentes, selecaoCliente, quantitySelecaoCliente, priceProduct }: {
    lentes: Lente[];
    selecaoCliente: string[];
    quantitySelecaoCliente: string[];
    priceProduct: number;
  },
) {
  if (Number(quantitySelecaoCliente) >= 3) {
    let _lente: Lente[] | null = null;

    _lente = lentes?.filter((lente) =>
      lente?.categorias[0] === selecaoCliente[0] &&
      lente?.categorias[1] === selecaoCliente[1] &&
      lente?.categorias[2] === selecaoCliente[2]
    );

    const priceTotal = priceProduct + _lente[0].price;

    return (
      <>
        <div class="w-px h-auto bg-[#9C9C9C] hidden md:block"></div>
        <div class="text-center md:text-left mb-2 md:mb-0">
          <div class="text-white text-sm uppercase">Subtotal com lentes</div>
          <div class="text-[#119184] text-lg font-bold">
            {formatPrice(
              priceTotal,
              "BRL",
              "pt-BR",
            )}
          </div>
        </div>
      </>
    );
  }
}

function AddCartModal({ quantitySelecaoCliente, armacao, lente }: {
  quantitySelecaoCliente: number;
}) {
  return (
    <div class="flex flex-col gap-2">
      {quantitySelecaoCliente >= 5
        ? (
          <div
            class="text-center bg-[#2F9B3E] h-[32px] rounded-[200px] p-2 cursor-pointer uppercase text-xs text-white font-semibold"
            onClick={() => lente()}
          >
            Comprar agora
          </div>
        )
        : (
          <div class="text-center bg-[#2F9B3E] h-[32px] rounded-[200px] p-2 uppercase text-xs text-white font-semibold opacity-30">
            Comprar agora
          </div>
        )}
      <div
        class="flex justify-center items-center h-[32px] rounded-[200px] p-2 cursor-pointer uppercase text-xs bg-black text-white font-semibold border-2 border-white"
        onClick={() => armacao()}
      >
        Comprar somente a armação
      </div>
    </div>
  );
}

export default function ModalLentes(
  { tituloModal, informacoesModal, product, products }: Props,
) {
  const { addItems } = useCart();
  const { displayCart } = useUI();
  const productID = product?.product?.productID;
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

  //console.log(product);
  const proximo = () => {
    const proximo = Math.min(activeTabIndex.value + 1, abas.length - 1);
    activeTabIndex.value = proximo;
  };

  const reseterModal = () => {
    displayModal.value = false;
    displayCart.value = true;
    activeTabIndex.value = 0;
    selecaoDoCliente.value = [];
  };

  const adicionarSelecao = (selecao: string) => {
    if (selecao == "receita Depois") {
      if (sessionStorage.getItem("receita")) {
        sessionStorage.removeItem("receita");
      }
      sessionStorage.setItem(
        "receitaDepois",
        "Receita será enviada mais tarde",
      );
    }

    if (selecao == "rosto Depois") {
      if (sessionStorage.getItem("rosto")) {
        sessionStorage.removeItem("rosto");
      }
      sessionStorage.setItem(
        "rostoDepois",
        "Foto do rosto será enviada mais tarde",
      );
    }

    const array = selecaoDoCliente.value;
    selecaoDoCliente.value = [...array.slice(0, activeTabIndex.value), selecao];
    proximo();
  };

  const addToCartArmacao = () => {
    try {
      addItems({
        orderItems: [{
          id: productID,
          seller: "1",
          quantity: 1,
        }],
      });
    } finally {
      reseterModal();
    }
  };

  const addToCart = () => {
    const lenteID = elementsToRender?.value[0]?.sku;
    try {
      addItems({
        orderItems: [
          {
            id: productID,
            seller: "1",
            quantity: 1,
          },
          {
            id: lenteID,
            seller: "1",
            quantity: 1,
          },
        ],
      });
    } finally {
      reseterModal();
    }
  };

  const changeTab = (index: number) => {
    const proximo = selecaoDoCliente.value.length;
    if (index < activeTabIndex.value) {
      activeTabIndex.value = index;
    } else if (index == proximo || proximo >= index) {
      activeTabIndex.value = index;
    }
  };

  /*@ts-ignore*/
  const lentes: Signal<Lente[]> = useComputed(() => {
    return products?.map((p) => {
      const propCategorias = p.isVariantOf?.additionalProperty.find((prop) =>
        prop?.name === "Modal"
      )?.value;
      if (!propCategorias) return null;
      const categorias = propCategorias.split(", ");
      const descricaoTratamento = p.isVariantOf?.additionalProperty.find((
        prop,
      ) => prop?.name === "Descrição - Tratamento (Modal)")?.value;
      return {
        categorias,
        nome: p?.name || "",
        sku: p?.sku || "",
        image: p?.image?.[0]?.url || "",
        price: p?.offers?.lowPrice || 0,
        descricao: descricaoTratamento,
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
      case 4:
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

  /*
  console.log({
    PRODUCTS: products,
    LENTES: lentes.value,
    ELEMENTS: elementsToRender.value,
    INFORMACOES: informacoesModal,
  });
  */

  const categories: Record<Aba, JSX.Element> = {
    tipo: (
      <ModalCategoryType
        categorias={elementsToRender.value}
        select={adicionarSelecao}
        informacoes={informacoesModal}
        selecaoCliente={selecaoDoCliente?.value[0]}
      />
    ),
    tecnologia: (
      <ModalCategoryTec
        lentes={elementsToRender.value}
        select={adicionarSelecao}
        selecaoIndex={activeTabIndex.value}
        informacoes={informacoesModal}
        selecaoCliente={selecaoDoCliente?.value[1]}
      />
    ),
    tratamento: (
      <ModalCategoryTrat
        lentes={elementsToRender.value}
        select={adicionarSelecao}
        selecaoIndex={activeTabIndex.value}
        informacoes={informacoesModal}
        selecaoCliente={selecaoDoCliente?.value[2]}
      />
    ),
    receita: (
      <ModalCategoryReceita
        selecaoCliente={selecaoDoCliente?.value[3]}
        select={adicionarSelecao}
      />
    ),
    seuRosto: (
      <ModalCategoryRosto
        selecaoCliente={selecaoDoCliente?.value[4]}
        /*select={addToCart} */
        select={adicionarSelecao}
      />
    ),
  };

  return (
    <ModalCustom
      loading="lazy"
      open={displayModal.value}
      onClose={() => displayModal.value = false}
    >
      <div class="w-screen h-screen flex">
        <div class="flex flex-col gap-3 md:gap-2 bg-white  justify-start m-auto max-w-[1366px] max-h-[724px] w-screen md:w-11/12 h-screen md:h-[95%] md:rounded-lg relative">
          <div class="relative md:px-6 md:pt-8 md:pb-6 py-3.5 px-16 bg-[#DCF5F3] md:bg-white">
            <div
              class="absolute no-animation right-3 top-3 rounded-full border-2 border-[#119184] cursor-pointer p-1"
              onClick={onCloseModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
              >
                <g clip-path="url(#clip0_144_3780)">
                  <path
                    d="M13 4.20459L4 13.2046"
                    stroke="#119184"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13 13.2046L4 4.20459"
                    stroke="#119184"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_144_3780">
                    <rect
                      width="16"
                      height="16"
                      fill="white"
                      transform="translate(0.5 0.70459)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>

            <div class="w-full text-center uppercase text-sm md:text-xl font-bold">
              {titulodoModal}
            </div>
          </div>
          <div class="overflow-y-auto mb-16 pb-12">
            <div class="flex flex-col gap-3 md:gap-0 max-w-screen-xl w-full m-auto">
              <div class="flex gap-2 justify-center md:justify-normal md:grid md:gap-1 md:grid-cols-5">
                {activeTabIndex.value > 0
                  ? (
                    <div
                      class="text-xs flex flex-col justify-center items-center gap-1.5 font-bold md:hidden"
                      onClick={() => {
                        changeTab(activeTabIndex.value - 1);
                      }}
                    >
                      <svg
                        width="31"
                        height="30"
                        viewBox="0 0 31 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="30.175"
                          y="30"
                          width="30"
                          height="30"
                          rx="15"
                          transform="rotate(180 30.175 30)"
                          fill="#0B0E0D"
                        />
                        <path
                          d="M15.0188 7.96876C11.1356 7.96876 7.98756 11.1168 7.98756 15C7.98756 18.8833 11.1356 22.0313 15.0188 22.0313C18.9021 22.0313 22.05 18.8833 22.05 15C22.05 11.1168 18.9021 7.96876 15.0188 7.96876Z"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                        />
                        <path
                          d="M15.8977 17.6367L12.968 15L15.8977 12.3633"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>

                      Anterior
                    </div>
                  )
                  : ("")}

                <ModalTab
                  text="Tipo"
                  active={activeTab === "tipo"}
                  onClick={() => {
                    changeTab(0);
                  }}
                  index={0}
                  selecaoClienteSize={selecaoDoCliente.value.length}
                  selecaoCliente={selecaoDoCliente.value}
                />
                <ModalTab
                  text="Tecnologia"
                  active={activeTab === "tecnologia"}
                  onClick={() => {
                    changeTab(1);
                  }}
                  index={1}
                  selecaoClienteSize={selecaoDoCliente.value.length}
                  selecaoCliente={selecaoDoCliente.value}
                />
                <ModalTab
                  text="Tratamento"
                  active={activeTab === "tratamento"}
                  onClick={() => {
                    changeTab(2);
                  }}
                  index={2}
                  selecaoClienteSize={selecaoDoCliente.value.length}
                  selecaoCliente={selecaoDoCliente.value}
                />
                <ModalTab
                  text="Receita"
                  active={activeTab === "receita"}
                  onClick={() => {
                    changeTab(3);
                  }}
                  index={3}
                  selecaoClienteSize={selecaoDoCliente.value.length}
                  selecaoCliente={selecaoDoCliente.value}
                />
                <ModalTab
                  text="Seu Rosto"
                  active={activeTab === "seuRosto"}
                  onClick={() => {
                    changeTab(4);
                  }}
                  index={4}
                  selecaoClienteSize={selecaoDoCliente.value.length}
                  selecaoCliente={selecaoDoCliente.value}
                />

                {activeTabIndex.value < 4
                  ? (
                    <div
                      class="text-xs flex flex-col justify-center items-center gap-1.5 font-bold md:hidden"
                      onClick={() => {
                        changeTab(activeTabIndex.value + 1);
                      }}
                    >
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="30"
                          height="30"
                          rx="15"
                          transform="matrix(1 8.74228e-08 8.74228e-08 -1 0 30)"
                          fill="#0B0E0D"
                        />
                        <path
                          d="M15.1562 7.96876C19.0395 7.96876 22.1875 11.1168 22.1875 15C22.1875 18.8833 19.0395 22.0313 15.1562 22.0313C11.273 22.0313 8.125 18.8833 8.125 15C8.125 11.1168 11.273 7.96876 15.1562 7.96876Z"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                        />
                        <path
                          d="M14.2773 17.6367L17.207 15L14.2773 12.3633"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      Próximo
                    </div>
                  )
                  : ("")}
              </div>
              <div class="bg-white md:bg-[#F8F8F8] rounded-b-2xl pt-0 pb-16 md:pb-7 md:py-7 px-4 md:px-8">
                {categories[activeTab]}
              </div>
            </div>
          </div>

          <div class="bg-[#0B0E0D] p-3 rounded-t-lg md:rounded-none md:rounded-b-lg absolute bottom-0 left-0 right-0">
            <div class="flex flex-col w-full m-auto max-w-screen-lg">
              <div class="flex justify-between flex-col sm:flex-row">
                <div class="gap-6 hidden md:flex">
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
                  lentes={lentes?.value}
                  quantitySelecaoCliente={selecaoDoCliente.value.length}
                  selecaoCliente={selecaoDoCliente.value}
                  priceProduct={produtoPagina?.offers?.lowPrice}
                />
                <div>
                  <AddCartModal
                    quantitySelecaoCliente={selecaoDoCliente.value.length}
                    armacao={addToCartArmacao}
                    lente={addToCart}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalCustom>
  );
}
