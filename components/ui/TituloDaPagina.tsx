export interface Props {
  titulo: string;
  subtitulo?: string;
  ativarCorDeFundo: boolean;
}

export default function TituloDaPagina(
  { titulo, subtitulo, ativarCorDeFundo }: Props,
) {
  const fundoCor = ativarCorDeFundo === true ? "bg-secondary" : "";
  const textoCor = ativarCorDeFundo === true ? "text-white" : "text-secondary";
  return (
    <div class={`py-5 ${fundoCor}`}>
      <h1
        class={`font-semibold ${textoCor} text-center mt-8 text-xl lg:text-4xl`}
      >
        {titulo}
      </h1>
      {subtitulo && subtitulo.trim() !== "" && (
        <h2 class={`font-medium ${textoCor} text-center mt-1 mb-8`}>
          {subtitulo}
        </h2>
      )}
    </div>
  );
}

export interface Props {
  titulo: string;
  subtitulo?: string;
  ativarCorDeFundo: boolean;
}
