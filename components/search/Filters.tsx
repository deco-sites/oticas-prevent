import Avatar from "$store/components/ui/Avatar.tsx";
import AvatarSize from "$store/components/ui/AvatarSize.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";

interface Props {
  filters: ProductListingPage["filters"];
}

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
  "marrom": "bg-[#8b6244] ring-[#8b6244]",
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

const variants = {
  active: "text-base-content ring-1 ring-black rounded-full",
  disabled:
    "line-through text-neutral-content ring-1 ring-slate-400 rounded-full",
  default: "text-base-content ring-1 ring-slate-400 rounded-full",
};

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  return (
    <a href={url} rel="nofollow" class="flex items-center gap-2 w-full">
      <div aria-checked={selected} class="checkbox" />
      <span class="text-sm">{label}</span>
      {quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>}
    </a>
  );
}

function ValueItemColor(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  const cor = label.toLowerCase();
  return (
    <a href={url} rel="nofollow" class="flex items-center gap-2 w-full">
      <div aria-checked={selected} class="checkbox" />
      {colors[cor]
        ? (
          <div class="avatar placeholder text-sm font-light h-6">
            <div
              class={`${
                colors[cor] ?? colors[selected ? "active" : "default"]
              } ${variants[selected ? "active" : "default"]}`}
              title={cor}
            >
            </div>
          </div>
        )
        : null}
      <span class="text-sm">{label}</span>
      {quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>}
    </a>
  );
}
function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";

  return (
    <ul class={`flex flex-wrap gap-2 ${flexDirection}`}>
      {values.map((item) => {
        const { url, selected, value, quantity } = item;

        if (key === "cor") {
          return <ValueItemColor {...item} />;
        }

        if (key === "tamanho") {
          return (
            <AvatarSize
              content={value}
              variant={selected ? "active" : "default"}
              link={url}
            />
          );
        }

        if (key === "price") {
          const range = parseRange(item.value);

          return range && (
            <ValueItem
              {...item}
              label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
            />
          );
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters }: Props) {
  return (
    <ul class="flex flex-col gap-6 p-4">
      {filters
        .filter(isToggle)
        .map((filter) => (
          <li class="flex flex-col gap-4">
            <span>{filter.label}</span>
            <FilterValues {...filter} />
          </li>
        ))}
    </ul>
  );
}

export default Filters;
