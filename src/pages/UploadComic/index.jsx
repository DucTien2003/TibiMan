import Divider from "@mui/material/Divider";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { comicsIdApi } from "@/api";
import BackTitle from "@/components/common/buttons/BackTitle";
import { useGetData } from "@/hooks";

import ChaptersInfo from "./ChaptersInfo";
import ComicInfo from "./ComicInfo";

function UploadComic() {
  const { comicId } = useParams();

  const staticApis = useMemo(
    () =>
      comicId
        ? [
            {
              url: comicsIdApi(comicId),
              query: { orderBy: "created_at", order: "ASC" },
            },
          ]
        : [],
    [comicId]
  );

  const staticResponse = useGetData(staticApis);

  if (staticResponse.loading) {
    return <h2 className="mt-16 w-full text-center">Loading...</h2>;
  }

  const [{ comic: comicInfo }] = comicId
    ? staticResponse.responseData
    : [{}, []];

  return (
    <div className="container mb-20 mt-20 min-h-screen">
      <BackTitle className="mb-3" title="Chi tiết truyện" />

      {/* Comic info */}
      <ComicInfo comicId={comicId} comicInfo={comicInfo} />

      {comicId && <Divider className="!my-10" variant="middle"></Divider>}

      {/* Chapter */}
      {comicId && <ChaptersInfo comicInfo={comicInfo} />}
    </div>
  );
}

export default UploadComic;
