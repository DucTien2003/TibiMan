import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

import { BiSolidArrowFromBottom } from "@/utils";

function GoToTopButton() {
  const [showButton, setShowButton] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Kiểm tra nếu người dùng cuộn lên ít nhất 100px
      if (lastScrollY - currentScrollY > 100) {
        setShowButton(true);
      }
      // Kiểm tra nếu người dùng cuộn xuống hoặc cuộn lên không đủ 50px
      else if (currentScrollY - lastScrollY > 0 || currentScrollY <= 50) {
        setShowButton(false);
      }

      // Cập nhật vị trí cuộn cuối cùng
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {showButton && (
        <Button
          variant="contained"
          className="!fixed bottom-8 right-6 !min-w-0 !rounded-full !p-3"
          onClick={scrollToTop}>
          <BiSolidArrowFromBottom className="text-2xl" />
        </Button>
      )}
    </>
  );
}

export default GoToTopButton;
