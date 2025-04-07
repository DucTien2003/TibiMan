import clsx from "clsx";
import { useEffect, useState } from "react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { comicsApi } from "@/api";
import AppIconButton from "@/components/common/buttons/AppIconButton";
import Cover from "@/components/common/Cover";
import { useGetData } from "@/hooks";
import { comicUrl } from "@/routes";
import { FaAngleLeft, FaAngleRight } from "@/utils";

import styles from "./banner.module.scss";

function Banner() {
  // States
  const [currentSlide, setCurrentSlide] = useState(1);
  const [swiperInstance, setSwiperInstance] = useState(null);

  // Functions
  const nextSlide = () => {
    swiperInstance?.slideNext();
  };

  const prevSlide = () => {
    swiperInstance?.slidePrev();
  };

  // States functions
  useEffect(() => {
    if (!swiperInstance) return;

    const updateCurrentSlide = () => {
      setCurrentSlide(swiperInstance.realIndex + 1);
    };

    swiperInstance.on("slideChange", updateCurrentSlide);

    return () => {
      swiperInstance.off("slideChange", updateCurrentSlide);
    };
  }, [swiperInstance]);

  // Hooks
  const staticApis = useMemo(
    () => [{ url: comicsApi(), query: { limit: 5, orderBy: "views" } }],
    []
  );

  const { loading, error, responseData } = useGetData(staticApis);
  const [mostPopularComics] = responseData || [];

  if (loading || error) {
    return (
      <h2 className="mt-16 w-full text-center">{error || "Loading..."}</h2>
    );
  }

  return (
    <div className="relative">
      {/* Title */}
      <h2 className="absolute left-4 z-30 mt-14 font-medium">Truyện hot</h2>

      {/* Swiper control */}
      <div className="absolute bottom-3 right-4 z-20 hidden md:block">
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
        onSwiper={(swiper) => setSwiperInstance(swiper)}
        loop={true}
        speed={500}
        autoplay={{
          delay: 2500,
          // disableOnInteraction: false,
        }}
        modules={[Autoplay]}>
        {mostPopularComics.comics.map((swiperItem, index) => {
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
                    <Link to={comicUrl(swiperItem.id)} className="my-5 flex">
                      {/* Cover */}
                      <div className="w-1/4 min-w-[112px] max-w-[215px] shadow-lg">
                        <Cover comic={swiperItem} />
                      </div>

                      {/* Info */}
                      <div className="ml-4 flex flex-1 flex-col">
                        {/* Name */}
                        <h1 className="limit-line-1 text-sm font-black md:text-lg">
                          {swiperItem.name}
                        </h1>

                        {/* Description */}
                        <div className="mt-3 flex-1 md:mt-4">
                          <p
                            key={index}
                            className="limit-line-7 limit-line-4-md">
                            {swiperItem.description}
                          </p>
                        </div>

                        {/* Author, Artist */}
                        <span className="limit-line-1-md font-semibold italic">
                          {swiperItem.author}
                        </span>
                      </div>
                    </Link>
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
