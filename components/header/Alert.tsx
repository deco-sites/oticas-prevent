import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";

export interface Props {
  alerts?: string[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function Alert({ alerts = [], interval = 5 }: Props) {
  const id = useId();

  return (
    <div id={id} class="fixed top-0 z-50">
      <Slider class="carousel carousel-center bg-secondary gap-6 w-full col-span-full row-span-full">
        {alerts.map((alert, index) => (
          <Slider.Item index={index} class="carousel-item w-full">
            <span class="relative overflow-y-hidden w-full text-sm text-white flex justify-center items-center w-screen h-[40px]">
              {alert}
            </span>
          </Slider.Item>
        ))}
      </Slider>

      <SliderJS rootId={id} interval={interval && interval * 1e3} infinite />
    </div>
  );
}

export default Alert;
