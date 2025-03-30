import clsx from "clsx";
import { useState } from "react";

import axiosRequest from "@/api/axiosRequest";
import DefaultButton from "@/components/common/buttons/DefaultButton";
import { comicsIdRatingApi } from "@/api";
import { FaRegStar } from "@/utils";
import { useDropdown } from "@/hooks";

const rateList = [
  { value: 10, title: "Masterpiece" },
  { value: 9, title: "Great" },
  { value: 8, title: "Very Good" },
  { value: 7, title: "Good" },
  { value: 6, title: "Fine" },
  { value: 5, title: "Average" },
  { value: 4, title: "Bad" },
  { value: 3, title: "Very bad" },
  { value: 2, title: "Horrible" },
  { value: 1, title: "Appalling" },
];

function Rating({ comicId, authRating, rating }) {
  const { isShowDropdown, dropdownRef, setIsShowDropdown } = useDropdown();

  const [rateValue, setRateValue] = useState(authRating);

  const handleRating = async (ratingValue) => {
    try {
      if (rateValue !== 0) {
        await axiosRequest(comicsIdRatingApi(comicId), {
          method: "PUT",
          body: { rating: ratingValue },
        });

        setRateValue(ratingValue);
      } else {
        await axiosRequest(comicsIdRatingApi(comicId), {
          method: "POST",
          body: { rating: ratingValue },
        });

        setRateValue(ratingValue);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleRemoveRating = async () => {
    try {
      const response = await axiosRequest(comicsIdRatingApi(comicId), {
        method: "DELETE",
      });

      setRateValue(0);
      console.log(response);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="relative font-semibold text-black"
      onClick={() => setIsShowDropdown(!isShowDropdown)}>
      <DefaultButton
        variant={rateValue ? "contained" : "outlined"}
        className="flex h-12 w-full !min-w-24 gap-1 !rounded-md">
        <FaRegStar size={20} />
        <div className="flex items-center justify-center gap-1 text-[15px] font-medium">
          <span className="hidden md:block">Đánh giá</span>
          <span>({rating})</span>
        </div>
        {/* {!!rateValue && <span className="ml-1 mt-1 text-lg ">{rateValue}</span>} */}
      </DefaultButton>

      <div
        className={clsx(
          { flex: isShowDropdown, hidden: !isShowDropdown },
          "absolute top-full pt-2"
        )}>
        <div className="flex-col overflow-hidden rounded-md bg-gray-200">
          {rateList.map((rate) => (
            <div
              key={rate.value}
              className={clsx(
                { "theme-primary-text": rate.value === rateValue },
                "cursor-pointer rounded-md px-4 py-3 hover:bg-gray-300"
              )}
              onClick={() => handleRating(rate.value)}>
              <span>({rate.value})</span>
              <span className="ml-1">{rate.title}</span>
            </div>
          ))}
          {!!rateValue && (
            <div
              className="cursor-pointer px-4 py-3 hover:bg-gray-300"
              onClick={() => handleRemoveRating()}>
              <span>Remove Rating</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Rating;
