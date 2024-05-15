/**
 * This component renders the filter and selectors for skus.
 * TODO: Figure out a better name for this component.
 */

const colors: Record<string, string> = {
  "azul-clara": "bg-[#87CEFA] ring-[#87CEFA]",
  "azul-marinho": "bg-[#000080] ring-[#000080]",
  "branca": "bg-[#FFFFFF] ring-[#FFFFFF]",
  "cinza-escura": "bg-[#A9A9A9] ring-[#A9A9A9]",
  "preta": "bg-[#161616] ring-[#161616]",
  "verde-clara": "bg-[#90EE90] ring-[#90EE90]",
  "vermelha": "bg-[#FF0000] ring-[#FF0000]",
  "azul": "bg-[#1570ec] ring-[#1570ec]",
  "branco": "bg-[#FFFFFF] ring-[#FFFFFF]",
  "cinza": "bg-[#9a9a9a] ring-[#9a9a9a]",
  "cristal": "bg-gradient-to-r from-[#f0f1f3] to-[#dedfe4] ring-[#f0f1f3]",
  "dourado": "bg-gradient-to-r from-[#be8409] to-[#f5c654] ring-[#be8409]",
  "marrom": "bg-[8b6244] ring-[#8b6244]",
  "nude": "bg-[#e4d6b1] ring-[#e4d6b1]",
  "prata": "bg-gradient-to-r from-[#dbdbdb] to-[#676c70] ring-[#dbdbdb]",
  "preto": "bg-[#000000] ring-[#000000]",
  "sépia": "bg-[#705714] ring-[#705714]",
  "sepia": "bg-[#705714] ring-[#705714]",
  "tartaruga": "bg-gradient-to-r from-[#241111] to-[#9a590f] ring-[#241111]",
  "titanium": "bg-gradient-to-r from-[#909090] to-[#383838] ring-[#909090]",
  "transparente": "bg-gradient-to-r from-[#dedfe4] to-[#f0f1f3] ring-[#dedfe4]",
  "verde": "bg-[#48bc41] ring-[48bc41]",
  "vermelho": "bg-[#f12f30] ring-[#f12f30]",
  "amarelo": "bg-[#ffcf03] ring-[#ffcf03]",
  "rosé": "bg-[#ffcada] ring-[#ffcada]",
  "rosa": "bg-[#f85b9e] ring-[#f85b9e]",
  "roxo": "bg-[#823dbe] ring-[#823dbe]",
  "laranja": "bg-[#fea501] ring-[#fea501]",
  "vinho": "bg-[#5f2229] ring-[#5f2229]",
  // Color variants - only applied when no color as content is passed
  "active": "text-base-content ring-1 ring-black rounded-full",
  "disabled":
    "line-through text-neutral-content ring-1 ring-slate-400 rounded-full",
  "default": "text-base-content ring-1 ring-slate-400 rounded-full",
};

interface Props {
  variant?: "active" | "disabled" | "default";
  content: string;
}

const variants = {
  active: "text-base-content ring-1 ring-black rounded-full",
  disabled:
    "line-through text-neutral-content ring-1 ring-slate-400 rounded-full",
  default: "text-base-content ring-1 ring-slate-400 rounded-full",
};

function Avatar({ content, variant = "default" }: Props) {
  return (
    <div class="avatar placeholder text-sm font-light h-6">
      <div
        class={`${colors[content] ?? colors[variant]} ${variants[variant]}`}
        title={content}
      >
        <span class="uppercase ">
          {colors[content] ? "" : content.substring(0, 2)}
        </span>
      </div>
    </div>
  );
}

export default Avatar;
