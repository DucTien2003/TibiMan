import { useEffect, useRef, useState } from "react";

const LIMIT_LINE = 6;

function Description({ description }) {
  const [isShowMore, setIsShowMore] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const descriptionRef = useRef(null);

  const handleShowMore = () => {
    setIsShowMore(!isShowMore);
  };

  useEffect(() => {
    const el = descriptionRef.current;
    if (!el) return;

    const lineHeight = parseFloat(getComputedStyle(el).lineHeight);

    if (el.clientHeight > lineHeight * LIMIT_LINE) {
      setIsOverflow(true);
    } else {
      setIsOverflow(false);
    }
  }, [description]);

  return (
    <div className="flex flex-col">
      <p
        ref={descriptionRef}
        className={`${isShowMore ? "" : `limit-line-${LIMIT_LINE}`} transition-all duration-1000`}>
        {description}
      </p>
      {isOverflow && (
        <button
          onClick={handleShowMore}
          className="theme-primary-text mt-1 font-medium hover:underline">
          <p>- {isShowMore ? "Thu gọn" : "Xem thêm"} -</p>
        </button>
      )}
    </div>
  );
}

export default Description;
