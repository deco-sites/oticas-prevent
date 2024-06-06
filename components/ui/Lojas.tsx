import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import ModalCustom from "$store/components/ui/ModalCustom.tsx";
import { computed, signal } from "@preact/signals";
import { useCallback, useEffect, useState } from "preact/hooks";
export interface Props {
  imagem?: {
    Imagem: ImageWidget;
    ImagemDois: ImageWidget;
    ImagemTres: ImageWidget;
    ImagemQuatro: ImageWidget;
    Alt?: string;
  };
  /**
   * @title Título da Loja
   */
  tituloloja?: string; // Tornando o campo opcional
  /**
   * @title Endereço
   */
  endereco?: string; // Tornando o campo opcional
  email?: string;
  telefone?: string;
  /**
   * @title Horário
   */
  horario?: string;
  /**
   * @title Localização
   */
  mapa?: string;
  /**
   * @title Imagem à direita?
   */
  lado?: boolean;
}

export default function Lojas({
  tituloloja = "Título Padrão",
  endereco = "Endereço Padrão",
  telefone,
  horario,
  email,
  imagem,
  mapa,
  lado,
}: Props) {
  const ladoimg = lado === true ? "direito" : "esquerdo";

  const [displayMapsModal, setDisplayMapsModal] = useState(false);

  const openModalMaps = () => {
    setDisplayMapsModal(true);
  };

  const closeModalMaps = () => {
    setDisplayMapsModal(false);
  };

  return (
    <div class={`loja grid grid-cols-1 lg:grid-cols-2 ${ladoimg}`}>
      <div
        class={`col-img grid grid-cols-2 ${
          lado === true ? "lg:order-2 md:order-1" : ""
        }`}
      >
        <Image
          class="min-w-full h-auto"
          src={imagem?.Imagem !== undefined ? imagem?.Imagem : ""}
          alt={imagem?.Alt}
          height={270}
          width={400}
        />
        <Image
          class="min-w-full h-auto "
          src={imagem?.ImagemDois !== undefined ? imagem?.ImagemDois : ""}
          alt={imagem?.Alt}
          width={400}
          height={270}
        />
        <Image
          class="min-w-full h-auto"
          src={imagem?.ImagemTres !== undefined ? imagem?.ImagemTres : ""}
          alt={imagem?.Alt}
          width={400}
          height={270}
        />
        <Image
          class="min-w-full h-auto"
          src={imagem?.ImagemQuatro !== undefined ? imagem?.ImagemQuatro : ""}
          alt={imagem?.Alt}
          width={400}
          height={270}
        />
      </div>
      <div class="flex content-center justify-center flex-wrap">
        <div class="lg:w-1/2 py-4 px-4 md:px-0">
          {tituloloja && (
            <h2 class="font-semibold mb-4 text-xl lg:text-4xl text-[#5f9b9a] w-full">
              {tituloloja}
            </h2>
          )}
          <span></span>
          {endereco && endereco.trim() !== "" && (
            <p class="my-2 w-full">{endereco}</p>
          )}
          {email && email.trim() !== "" && <p class="my-2 w-full">{email}</p>}
          {telefone && telefone.trim() !== "" && (
            <p class="my-2 w-full">{telefone}</p>
          )}
          {horario && horario.trim() !== "" && (
            <p class="my-2 w-full">{horario}</p>
          )}

          {mapa && (
            <p
              class="btn text-white bg-secondary hover:bg-secondary"
              onClick={openModalMaps}
            >
              Ver no mapa
            </p>
          )}
          {displayMapsModal == true
            ? (
              <ModalCustom
                loading="lazy"
                open={displayMapsModal}
                onClose={() => setDisplayMapsModal(false)}
              >
                <div class="w-screen h-screen flex">
                  <div class="flex flex-col gap-3 md:gap-2 bg-white justify-start m-auto relative rounded-lg w-11/12 md:w-auto">
                    <div class="relative px-6 py-6 bg-white rounded-lg">
                      <div
                        class="absolute no-animation right-3 top-3 rounded-full border-2 border-[#119184] cursor-pointer p-1"
                        onClick={closeModalMaps}
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
                      {tituloloja && (
                        <h2 class="font-semibold mb-4 text-xl text-[#5f9b9a] w-full pr-4">
                          {tituloloja}
                        </h2>
                      )}
                      {mapa && (
                        <div
                          class="mapa-container"
                          dangerouslySetInnerHTML={{ __html: mapa }}
                        >
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ModalCustom>
            )
            : null}
        </div>
      </div>
    </div>
  );
}
