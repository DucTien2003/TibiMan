import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axiosRequest from "@/api/axiosRequest";
import UploadBox from "@/components/specific/UploadBox";
import SelectInput from "@/components/common/SelectInput";
import ModalComponent from "@/components/common/ModalComponent";
import GenresSelector from "@/components/specific/GenresSelector";
import DefaultButton from "@/components/common/buttons/DefaultButton";
import AppTextFieldInput from "@/components/common/AppTextFieldInput";
import { comicsApi, comicsIdApi } from "@/api";
import { useAlertStore, alertActions } from "@/store";
import { useForm, FormProvider } from "react-hook-form";
import {
  requiredAcceptSpace,
  convertImageToFile,
  capitalizeFirstLetter,
} from "@/utils";

const statusList = [
  { value: "ongoing", title: "Ongoing" },
  { value: "dropped", title: "Dropped" },
  { value: "completed", title: "Completed" },
];

function ComicInfo({ comicId, comicInfo = {} }) {
  const navigate = useNavigate();
  const [, alertDispatch] = useAlertStore();

  // Refs
  const resetModalRef = useRef();
  const updateModalRef = useRef();

  const coverRef = useRef();
  const statusSelectorRef = useRef();
  const genresSelectorRef = useRef();

  // For form
  const [formControllerData, setFormControllerData] = useState(comicInfo);
  const methods = useForm();
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
    statusSelectorRef.current.resetValue();
    genresSelectorRef.current.resetValue();
  };

  const onSubmit = (data) => {
    // Check if cover is empty
    const isEmptyCover = coverRef.current.checkEmpty();

    if (isEmptyCover) {
      return null;
    }

    // Open modal
    setFormControllerData(data);
    updateModalRef.current.openModal();
  };

  const handleConfirm = async () => {
    const cover = coverRef.current.getFiles();
    const status = statusSelectorRef.current.getValue();
    const genres = genresSelectorRef.current.getValue();

    const newComicInfo = {
      ...formControllerData,
      status,
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
                    defaultValue={comicInfo.translator || ""}
                  />
                </div>
                {/* Sub name */}
                <div>
                  <AppTextFieldInput
                    id="subname"
                    name="Tên phụ"
                    label="Tên phụ"
                    size="small"
                    defaultValue={comicInfo.subname || ""}
                  />
                </div>
                {/* Status */}
                <div>
                  <SelectInput
                    id="status-selector"
                    label="Trạng thái"
                    list={statusList}
                    initialValue={
                      comicInfo.status
                        ? {
                            value: comicInfo.status,
                            title: capitalizeFirstLetter(comicInfo.status),
                          }
                        : statusList[0]
                    }
                    size="small"
                    ref={statusSelectorRef}
                  />
                </div>
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
                initialData={
                  comicInfo.genres
                    ? comicInfo.genres.map((genre) => genre.id)
                    : []
                }
                ref={genresSelectorRef}
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
