import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { comicsApi, comicsIdApi } from "@/api";
import axiosRequest from "@/api/axiosRequest";
import DefaultButton from "@/components/common/buttons/DefaultButton";
import AppSelectInput from "@/components/common/form/AppSelectInput";
import AppTextFieldInput from "@/components/common/form/AppTextFieldInput";
import ModalComponent from "@/components/common/ModalComponent";
import GenresSelector from "@/components/specific/GenresSelector";
import UploadBox from "@/components/specific/UploadBox";
import { alertActions, useAlertStore } from "@/store";
import { convertImageToFile, requiredAcceptSpace, statusList } from "@/utils";

function ComicInfo({ comicId, comicInfo = {} }) {
  // Variables
  const initGenres = comicInfo.genres
    ? comicInfo.genres.map((genre) => genre.id)
    : [];

  // States
  const [genres, setGenres] = useState(initGenres);

  // Hooks
  const navigate = useNavigate();
  const [, alertDispatch] = useAlertStore();

  // Refs
  const coverRef = useRef();
  const resetModalRef = useRef();
  const updateModalRef = useRef();

  // For form
  const methods = useForm({
    defaultValues: {
      name: comicInfo.name || "",
      author: comicInfo.author || "",
      translator: comicInfo.translator || "",
      subname: comicInfo.subname || "",
      description: comicInfo.description || "",
      status: comicInfo.status || statusList[0].value,
    },
  });
  // const { setError } = methods;

  const [initialFiles, setCoverFile] = useState([]);

  useEffect(() => {
    const fetchCoverFile = async () => {
      if (comicInfo.cover) {
        const coverFile = await convertImageToFile(comicInfo.cover);
        setCoverFile([coverFile]);
      }
    };

    fetchCoverFile();
  }, [comicInfo]);

  const handleReset = () => {
    methods.reset();
    coverRef.current.resetFiles();
    setGenres(initGenres);
  };

  const onSubmit = () => {
    // Check if cover is empty
    const isEmptyCover = coverRef.current.checkEmpty();

    if (isEmptyCover) {
      return null;
    }

    // Open modal
    updateModalRef.current.openModal();
  };

  const handleConfirm = async () => {
    const cover = coverRef.current.getFiles();
    const data = methods.getValues();

    const newComicInfo = {
      ...data,
      genres,
    };

    const formData = new FormData();
    formData.append("cover", cover[0]);
    formData.append("comicInfo", JSON.stringify(newComicInfo));
    formData.append("oldComicInfo", JSON.stringify(comicInfo));

    const response = comicId
      ? await axiosRequest(comicsIdApi(comicId), {
          method: "PUT",
          body: formData,
          headers: { "Content-Type": "multipart/form-data" },
        })
      : await axiosRequest(comicsApi(), {
          method: "POST",
          body: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });

    if (response.success && response.code === 200) {
      alertDispatch(
        alertActions.showAlert(
          comicId ? "Cập nhật truyện thành công." : "Tạo truyện thành công.",
          "success"
        )
      );
    } else {
      alertDispatch(
        alertActions.showAlert(
          comicId ? "Cập nhật truyện thất bại." : "Tạo truyện thất bại.",
          "error"
        )
      );
    }

    navigate(-1);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col-reverse gap-6 md:flex-col">
        <div className="flex items-center justify-end">
          <DefaultButton
            className="!mr-3 !rounded-md border text-lg font-medium"
            variant="outlined"
            onClick={() => resetModalRef.current.openModal()}>
            Cài lại
          </DefaultButton>

          <DefaultButton
            type="submit"
            className="!rounded-md text-lg font-medium">
            {comicId ? "Cập nhật" : "Tạo truyện"}
          </DefaultButton>
        </div>

        <div className="flex flex-col gap-6 py-4 md:flex-row">
          <div className="md:w-1/2">
            <div className="flex flex-col gap-6 md:flex-row">
              {/* Cover + Name */}
              <div className="flex flex-col items-center justify-center md:w-1/2">
                <div>
                  <UploadBox
                    isSingle={true}
                    label="Ảnh bìa*"
                    showName={false}
                    ref={coverRef}
                    initialData={comicInfo.cover ? initialFiles : []}
                  />
                </div>

                <div className="mt-3 w-full">
                  <AppTextFieldInput
                    id="name"
                    name="Tên truyện"
                    label="Tên truyện"
                    required={true}
                    variant="standard"
                    defaultValue={comicInfo.name || ""}
                    validate={[requiredAcceptSpace]}
                  />
                </div>
              </div>

              {/* Author + Translator + Sub name + Status */}
              <div className="flex flex-1 flex-col justify-between gap-6">
                {/* Author */}
                <div>
                  <AppTextFieldInput
                    id="author"
                    name="Tác giả"
                    label="Tác giả"
                    size="small"
                    required={true}
                    defaultValue={comicInfo.author || ""}
                    validate={[requiredAcceptSpace]}
                  />
                </div>
                {/* Translator */}
                <div>
                  <AppTextFieldInput
                    id="translator"
                    name="Dịch giả"
                    label="Dịch giả"
                    size="small"
                    // defaultValue={comicInfo.translator || ""}
                  />
                </div>
                {/* Sub name */}
                <AppTextFieldInput
                  id="subname"
                  name="Tên phụ"
                  label="Tên phụ"
                  size="small"
                  // defaultValue={comicInfo.subname || ""}
                />
                {/* Status */}
                <AppSelectInput
                  id="status"
                  name="Trạng thái"
                  label="Trạng thái"
                  list={statusList}
                  size="small"
                />
              </div>
            </div>
          </div>

          {/* Description + Genres */}
          <div className="flex flex-1 flex-col gap-6 md:w-1/2 md:justify-between md:gap-3.5">
            {/* Description */}
            <div>
              <AppTextFieldInput
                id="description"
                name="Mô tả"
                label="Mô tả"
                defaultValue={comicInfo.description || ""}
                size="small"
                multiline={true}
                rows={7}
              />
            </div>
            {/* Genres */}
            <div>
              <GenresSelector
                id="genres"
                label="Thể loại"
                genres={genres}
                size="small"
                setGenres={setGenres}
              />
            </div>
          </div>
        </div>
      </form>
      <ModalComponent
        title="Reset comic info"
        submitTitle="Reset"
        handleSubmit={handleReset}
        ref={resetModalRef}>
        <p>Are you sure you want to reset the comic info?</p>
        <p className="mt-1">Your changes will be lost.</p>
      </ModalComponent>
      <ModalComponent
        title={comicId ? "Update comic info" : "Create comic info"}
        submitTitle="Confirm"
        handleSubmit={handleConfirm}
        ref={updateModalRef}>
        <p>
          {comicId
            ? "Are you sure you want to update the comic info?"
            : "Are you sure you want to create the comic?"}
        </p>
        <p className="mt-1">
          {comicId ? "Your changes will be saved." : "The info will be saved"}
        </p>
      </ModalComponent>
    </FormProvider>
  );
}

export default ComicInfo;
