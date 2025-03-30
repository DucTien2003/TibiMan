import { useState, useRef } from "react";

import axiosRequest from "@/api/axiosRequest";
import DataTable from "@/components/common/DataTable";
import ModalComponent from "@/components/common/ModalComponent";
import { chaptersIdApi, comicsIdChaptersApi } from "@/api";
import { LuTrash2, RiImageEditFill, timeStandard } from "@/utils";

function ListChapter({ handleGetImagesChapter, comicInfo = {} }) {
  const deleteModalRef = useRef();

  const [selectedDeleteChapter, setSelectedDeleteChapter] = useState(null);

  const handleClickDelete = (chapter) => {
    setSelectedDeleteChapter(chapter);
    deleteModalRef.current.openModal();
  };

  const handleDelete = async (chapter) => {
    const response = await axiosRequest(chaptersIdApi(chapter.id), {
      method: "DELETE",
      query: {
        comicNameMinio: comicInfo.nameMinio,
        chapterNameMinio: chapter.nameMinio,
      },
    });

    console.log(response);

    if (response.data.success) {
      console.log("Delete chapter success");
    }
  };

  return (
    <>
      <DataTable
        fetchUrl={comicsIdChaptersApi(comicInfo.id)}
        columns={[
          {
            field: "id",
            headerName: "ID",
            valueGetter: (value, row) => {
              return `${row.id || value}`;
            },
          },
          {
            field: "name",
            headerName: "Tên chương",
          },
          {
            field: "createdAt",
            headerName: "Ngày tạo",
            width: 130,
            valueGetter: (value, row) => {
              return timeStandard(row.createdAt);
            },
          },
          {
            field: "actions",
            headerName: "Hành động",
            sortable: false,
            width: 120,
            actions: [
              {
                icon: RiImageEditFill,
                title: "Sửa",
                onClick: (row) => handleGetImagesChapter(row.row),
              },
              {
                icon: LuTrash2,
                title: "Xóa",
                onClick: handleClickDelete,
              },
            ],
          },
        ]}
      />

      <ModalComponent
        title="Delete chapter"
        submitTitle="Confirm"
        handleSubmit={() => handleDelete(selectedDeleteChapter)}
        ref={deleteModalRef}>
        {selectedDeleteChapter && selectedDeleteChapter.name && (
          <p>
            Are you sure you want to delete{" "}
            <span className="font-semibold">{selectedDeleteChapter.name}</span>?
          </p>
        )}
        <p className="mt-1">Your data will be lost.</p>
      </ModalComponent>
    </>
  );
}

export default ListChapter;
