import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  imagem?: {
    Imagem: ImageWidget;
    Alt?: string;
  };
  /**
   * @title Título da Loja
   */
  tituloloja: string;
  /**
   * @title Endereço
   */
  endereco: string;
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

export default function Lojas(
  { tituloloja, endereco, telefone, horario, email, imagem, lado }: Props,
) {
  const ladoimg = lado === true ? "direito" : "esquerdo";
  return (
    <div class={`loja grid grid-cols-1 lg:grid-cols-2 ${ladoimg}`}>
      <div class="col-img">
        <img
          loading="lazy"
          src={imagem?.Imagem}
          alt={imagem?.Alt}
          class="w-full"
        />
      </div>
      <div class="flex content-center justify-center flex-wrap">
        <div class="lg:w-1/2 py-4">
          {tituloloja && (
            <h2 class="font-semibold mb-4 text-xl lg:text-4xl text-secondary w-full">
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
