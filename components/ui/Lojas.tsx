import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

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
  lado,
}: Props) {
  const ladoimg = lado === true ? "direito" : "esquerdo";
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
        <div class="lg:w-1/2 py-4">
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
        </div>
      </div>
    </div>
  );
}
