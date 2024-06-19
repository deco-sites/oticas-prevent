import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  reclameAqui?: {
    title?: string;
    image: ImageWidget;
    link?: string;
    alt?: string;
  };
}

export default function ReclameAqui({ reclameAqui }: Props) {
  return (
    <>
      {reclameAqui?.image && (
        <div class="flex flex-col gap-3">
          {reclameAqui.title && (
            <h3 class="text-lg text-white font-extrabold uppercase">
              {reclameAqui.title}
            </h3>
          )}
          <div class="w-28 max-h-16 brightness-[100]">
            <a
              class="link"
              href={reclameAqui?.link}
              target="_blank"
              rel="noreferrer noopener"
              title={reclameAqui?.alt}
            >
              <Image
                loading="lazy"
                src={reclameAqui?.image}
                alt={reclameAqui?.alt}
                width={80}
                height={80}
              />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
