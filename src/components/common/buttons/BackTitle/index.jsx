import { useNavigate } from "react-router-dom";

import AppIconButton from "@/components/common/buttons/AppIconButton";
import { FaAngleLeft } from "@/utils";

function BackTitle({ title, className }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={`flex items-center ${className}`}>
      <AppIconButton color="black" onClick={handleBack}>
        <span>
          <FaAngleLeft className="text-lg" />
        </span>
      </AppIconButton>
      <h3 className="font-medium">{title}</h3>
    </div>
  );
}

export default BackTitle;
