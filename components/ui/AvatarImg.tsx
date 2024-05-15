/**
 * This component renders the filter and selectors for skus.
 * TODO: Figure out a better name for this component.
 */

const colors: Record<string, string> = {
  "azul-clara": "bg-[#87CEFA] ring-[#87CEFA]",
  "azul-marinho": "bg-[#000080] ring-[#000080]",
  "branca": "bg-[#FFFFFF] ring-[#FFFFFF]",
  "cinza": "bg-[#808080] ring-[#808080]",
  "cinza-escura": "bg-[#A9A9A9] ring-[#A9A9A9]",
  "laranja": "bg-[#FFA500] ring-[#FFA500]",
  "marrom": "bg-[#A52A2A] ring-[#A52A2A]",
  "preta": "bg-[#161616] ring-[#161616]",
  "verde-clara": "bg-[#90EE90] ring-[#90EE90]",
  "vermelha": "bg-[#FF0000] ring-[#FF0000]",

  // Color variants - only applied when no color as content is passed
  "active": "text-base-content ring-1 ring-black rounded-full",
  "disabled":
    "line-through text-neutral-content ring-1 ring-slate-400 rounded-full",
  "default": "text-base-content bg-base-100 ring-1 ring-slate-400 rounded-full",
};

interface Props {
  variant?: "active" | "disabled" | "default";
  content: string;
  img?: string;
}

const variants = {
  active: "text-base-content ring-1 ring-black rounded-full",
  disabled:
    "line-through text-neutral-content ring-1 ring-slate-400 rounded-full",
  default: "text-base-content bg-base-100 ring-1 ring-slate-400 rounded-full",
};

function AvatarImg({ content, variant = "default", img }: Props) {
  return (
    <div class="avatar placeholder text-sm font-light h-6">
      <div
        class={`${colors[content] ?? colors[variant]} ${
          variants[variant]
        } bg-[url('${img}')]`}
      >
        <span class="uppercase ">
          <img src={img} alt={content} title={content} width={24} height={24} />
        </span>
      </div>
    </div>
  );
}

export default AvatarImg;
