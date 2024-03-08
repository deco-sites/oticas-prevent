import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  agencia?: {
    image: ImageWidget;
    link?: string;
    alt?: string;
  };
}

export default function Agencia({ agencia }: Props) {
  return (
    <>
      {agencia?.image && (
        <div class="flex flex-col gap-3">
          <div class="w-28 max-h-16 brightness-[100]">
            <a
              class="link"
              href={agencia?.link}
              target="_blank"
              rel="noreferrer noopener"
              title={agencia?.alt}
            >
              <Image
                loading="lazy"
                src={agencia?.image}
                alt={agencia?.alt}
                width={140}
                height={36}
              />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
