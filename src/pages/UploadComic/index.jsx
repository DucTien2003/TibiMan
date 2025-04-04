import Divider from "@mui/material/Divider";
import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ComicInfo from "./ComicInfo";
import ChaptersInfo from "./ChaptersInfo";
import AppIconButton from "@/components/common/buttons/AppIconButton";

import { useGetData } from "@/hooks";
import { FaAngleLeft } from "@/utils";
import { comicsIdApi } from "@/api";

function UploadComic() {
  const navigate = useNavigate();
  const { comicId } = useParams();

  const staticApis = useMemo(
    () =>
      comicId
        ? [
            {
              url: comicsIdApi(comicId),
              query: { orderBy: "created_at", sortType: "ASC" },
            },
          ]
        : [],
    [comicId]
  );

  const staticResponse = useGetData(staticApis);

  const handleBack = () => {
    navigate(-1);
  };

  if (staticResponse.loading) {
    return <h2 className="mt-16 w-full text-center">Loading...</h2>;
  }

  const [{ comic: comicInfo }] = comicId
    ? staticResponse.responseData
    : [{}, []];

  return (
    <div className="container mb-96 mt-20">
      <div className="mb-3 flex items-center">
        <AppIconButton color="black" onClick={handleBack}>
          <span>
            <FaAngleLeft className="text-lg" />
          </span>
        </AppIconButton>
        <h3 className="font-medium">Chi tiết truyện</h3>
      </div>

      {/* Comic info */}
      <ComicInfo comicId={comicId} comicInfo={comicInfo} />

      {comicId && <Divider className="!my-10" variant="middle"></Divider>}

      {/* Chapter */}
      {comicId && <ChaptersInfo comicInfo={comicInfo} />}
    </div>
  );
}

export default UploadComic;
