import { useState, useRef, useEffect } from "react";

const LIMIT_LINE = 6;

function Description({ description }) {
  const [isShowMore, setIsShowMore] = useState(false);
  const descriptionRef = useRef(null);

  const handleShowMore = () => {
    setIsShowMore(!isShowMore);
  };

  useEffect(() => {
    if (
      descriptionRef.current.clientHeight >
      descriptionRef.current.lineHeight * LIMIT_LINE
    ) {
      setIsShowMore(true);
    } else {
      setIsShowMore(false);
    }
  }, [description]);

  return (
    <div className="flex flex-col">
      <p
        ref={descriptionRef}
        className={`${isShowMore ? "" : `limit-line-${LIMIT_LINE}`} transition-all duration-1000`}>
        {description}
      </p>
      <button
        onClick={handleShowMore}
        className="theme-primary-text mt-1 font-medium hover:underline">
        <p>- {isShowMore ? "Thu gọn" : "Xem thêm"} -</p>
      </button>
    </div>
  );
}

export default Description;
