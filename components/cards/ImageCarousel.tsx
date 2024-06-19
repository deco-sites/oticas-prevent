import Slider from "../../components/ui/Slider.tsx";
import SliderJS from "../../islands/SliderJS.tsx";
import { useId } from "../../sdk/useId.ts";
import { clx } from "../../sdk/clx.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Icon from "../../components/ui/Icon.tsx";

export interface Banner {
  srcMobile: ImageWidget;
  srcDesktop?: ImageWidget;
  /**
   * @description Image alt text
   */
  alt?: string;
  /**
   * @description When you click you go to
   */
  href?: string;
  buttonText?: string;
}

export interface Props {
  banners: Banner[];
  layout?: {
    numberOfSliders?: {
      mobile?: 1 | 2 | 3 | 4 | 5;
      desktop?: 1 | 2 | 3 | 4 | 5;
    };
  };
}

export default function Section(
  { layout, banners = [] }: Props,
) {
  const id = useId();

  const slideDesktop = {
    1: "md:w-full",
    2: "md:w-1/2",
    3: "md:w-1/3",
    4: "md:w-1/4",
    5: "md:w-1/5",
  };

  const slideMobile = {
    1: "w-full",
    2: "w-1/2",
    3: "w-1/3",
    4: "w-1/4",
    5: "w-1/5",
  };

  return (
    <div id={id} class="w-full container py-8 flex flex-col gap-6 lg:py-10">
      <div class="grid grid-cols-[48px_1fr_48px] md:grid-cols-1 px-0 md:px-5 container">
        <Slider class="carousel carousel-center sm:carousel-end sm:gap-1 row-start-2 row-end-5 gap-2 md:gap-4 lg:gap-8">
          {banners.map((item, index) => (
            <Slider.Item
              index={index}
              class={clx(
                "carousel-item",
                slideDesktop[layout?.numberOfSliders?.desktop ?? 3],
                slideMobile[layout?.numberOfSliders?.mobile ?? 1],
              )}
            >
              <a
                href={item?.href}
                class="overflow-hidden relative"
              >
                <Picture>
                  <Source
                    src={item?.srcMobile}
                  />
                  <Source
                    src={item?.srcDesktop ? item?.srcDesktop : item?.srcMobile}
                  />
                  <img
                    class="card w-full"
                    src={item?.srcMobile}
                    alt={item?.alt}
                  />
                </Picture>
                <div class="text-lg text-base-content">
                  <span class="text-lg text-base-content">
                    {item?.buttonText}
                  </span>
                </div>
              </a>
            </Slider.Item>
          ))}
        </Slider>

        <div class="relative block z-10 col-start-1 row-start-3 md:hidden">
          <Slider.PrevButton class="absolute w-12 h-12 flex justify-center items-center">
            <Icon size={24} id="ChevronLeft" strokeWidth={1} class="w-5" />
          </Slider.PrevButton>
        </div>
        <div class="relative block z-10 col-start-3 row-start-3 md:hidden">
          <Slider.NextButton class="absolute w-12 h-12 flex justify-center items-center">
            <Icon size={24} id="ChevronRight" strokeWidth={1} />
          </Slider.NextButton>
        </div>

        <SliderJS rootId={id} />
      </div>
    </div>
  );
}
