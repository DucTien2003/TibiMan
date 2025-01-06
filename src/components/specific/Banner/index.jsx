import clsx from "clsx";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useEffect, useState } from "react";

import styles from "./banner.module.scss";
import Cover from "@/components/common/Cover";
import AppIconButton from "@/components/common/buttons/AppIconButton";
import { FaAngleRight, FaAngleLeft } from "@/utils";

function Banner({ comics }) {
  const swiperElRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(1);

  const nextSlide = () => {
    swiperElRef.current.swiper.slideNext();
  };

  const prevSlide = () => {
    swiperElRef.current.swiper.slidePrev();
  };

  useEffect(() => {
    const swiperInstance = swiperElRef.current.swiper;

    if (!swiperInstance) return;

    const updateCurrentSlide = () => {
      setCurrentSlide(swiperInstance.realIndex + 1);
    };

    swiperInstance.on("slideChange", updateCurrentSlide);

    return () => {
      swiperInstance.off("slideChange", updateCurrentSlide);
    };
  }, []);

  return (
    <div className="relative">
      {/* Title */}
      <h2 className="absolute left-4 z-30 mt-14 font-medium">
        Popular New Titles
      </h2>

      {/* Swiper control */}
      <div className="absolute bottom-3 right-4 z-20">
        <div className="flex items-center">
          {/* Number order */}
          <span className="theme-primary-text mr-2 mt-1 font-semibold uppercase">
            NO.<span>{currentSlide}</span>
          </span>

          {/* Previous button */}
          <AppIconButton onClick={prevSlide} size="large">
            <FaAngleLeft fontSize="20" />
          </AppIconButton>

          {/* Next button */}
          <AppIconButton onClick={nextSlide} size="large">
            <FaAngleRight fontSize="20" />
          </AppIconButton>
        </div>
      </div>

      {/* Swiper */}
      <Swiper
        id="swiper"
        ref={swiperElRef}
        loop={true}
        speed={500}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}>
        {comics.map((swiperItem, index) => {
          return (
            <SwiperSlide key={index}>
              <div
                key={swiperItem.id}
                className={clsx("relative flex overflow-hidden pt-24")}>
                {/* Background banner */}
                <img
                  src={swiperItem.cover}
                  alt="cover"
                  className={clsx(
                    styles["swiper-bg"],
                    "absolute left-0 top-0 h-[150%] w-full select-none object-cover"
                  )}
                />

                {/* Swiper content */}
                <div className="container z-40 flex flex-col">
                  <div className="w-full">
                    <div className="my-5 flex">
                      {/* Cover */}
                      <div className="w-1/4 max-w-[215px] shadow-lg">
                        <Cover comic={swiperItem} />
                      </div>

                      {/* Info */}
                      <div className="ml-4 flex flex-1 flex-col">
                        {/* Name */}
                        <h1 className="font-black">{swiperItem.name}</h1>

                        {/* Categories */}
                        {/* <div className="text-mini flex flex-wrap items-center py-4 font-semibold">
                          {swiperItem.categories.map((category) => (
                            <span
                              key={category}
                              className="theme-primary-bg mr-2 rounded bg-white p-1 text-white">
                              {category}
                            </span>
                          ))}
                        </div> */}

                        {/* Description */}
                        <div className="flex-1">
                          <p key={index} className="limit-line-7">
                            {swiperItem.description}
                          </p>
                        </div>

                        {/* Author, Artist */}
                        <span className="font-semibold italic">
                          {swiperItem.author}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Overlay */}
                <div
                  className={clsx(
                    styles["banner-overlay"],
                    "absolute inset-0 z-10"
                  )}></div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Banner;
