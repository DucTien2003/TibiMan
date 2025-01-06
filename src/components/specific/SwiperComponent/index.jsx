import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import DetailCard from "@/components/common/cards/DetailCard";
import MonotonicCard from "@/components/common/cards/MonotonicCard";
import DescriptionCard from "@/components/common/cards/DescriptionCard";

function SwiperComponent({
  comicList,
  numberOfSlides = 1,
  gap = 30,
  cardType = "detail",
}) {
  let CardComponent;

  switch (cardType) {
    case "detail":
      CardComponent = DetailCard;
      break;
    case "description":
      CardComponent = DescriptionCard;
      break;
    case "monotonic":
      CardComponent = MonotonicCard;
      break;
    default:
      CardComponent = MonotonicCard;
  }

  return (
    /* Swiper */
    <Swiper
      id="swiper"
      loop={true}
      speed={500}
      spaceBetween={gap}
      slidesPerView={numberOfSlides}
      autoplay={{
        delay: 2500,
        disableOnInteraction: true,
      }}
      modules={[Autoplay]}>
      {comicList.map((comic, index) => {
        return (
          <SwiperSlide key={index}>
            <div className="pb-12">
              <CardComponent comic={comic} />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default SwiperComponent;
