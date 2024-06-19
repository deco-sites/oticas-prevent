import ImageCardsCarousel, {
  Props as CarouselProps,
} from "../../components/cards/ImageCarousel.tsx";

type Props = {
  carousel?: CarouselProps;
};

export default function Section({ carousel }: Props) {
  return <ImageCardsCarousel {...carousel} />;
}
