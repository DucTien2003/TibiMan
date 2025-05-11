import { useEffect, useMemo, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { chaptersApi, chaptersIdApi, chaptersIdImagesApi } from "@/api";
import axiosRequest from "@/api/axiosRequest";
import DefaultButton from "@/components/common/buttons/DefaultButton";
import AppTextFieldInput from "@/components/common/form/AppTextFieldInput";
import ModalComponent from "@/components/common/ModalComponent";
import UploadBox from "@/components/specific/UploadBox";
import { useGetData, useWindowResize } from "@/hooks";
import { alertActions, useAlertStore } from "@/store";
import { convertImageToFile, requiredAcceptSpace } from "@/utils";

function UploadChapter({
  chapter = {},
  comicInfo = {},
  handleBackOrUploadNewChapter = () => {},
}) {
  const [, alertDispatch] = useAlertStore();

  // Refs
  const imagesRef = useRef();
  const resetModalRef = useRef();
  const createModalRef = useRef();
  const { isMobile } = useWindowResize();

  // For form
  const [formControllerData, setFormControllerData] = useState(comicInfo);
  const methods = useForm();
  const { setError } = methods;

  const [imageFiles, setImageFiles] = useState([]);

  const staticApis = useMemo(
    () => [
      {
        url: chaptersIdImagesApi(chapter.id),
        query: { orderBy: "number_order", order: "ASC" },
      },
    ],
    [chapter.id]
  );

  const staticResponse = useGetData(staticApis);

  useEffect(() => {
    if (staticResponse.responseData.length > 0) {
      const [{ images: imagesChapter }] = chapter.id
        ? staticResponse.responseData
        : [{ images: [] }];

      const fetchImageFile = async () => {
        if (imagesChapter && imagesChapter.length > 0) {
          const imageFilePromises = imagesChapter.map(async (image) => {
            return await convertImageToFile(image.url);
          });

          const imageFilesResult = await Promise.all(imageFilePromises);

          setImageFiles(imageFilesResult);
        }
      };

      fetchImageFile();
    }
  }, [staticResponse.responseData, chapter.id]);

  const handleReset = () => {
    methods.reset();
    imagesRef.current.resetFiles();
  };

  const onSubmit = (data) => {
    // Check if images is empty
    const isEmptyImages = imagesRef.current.checkEmpty();

    if (isEmptyImages) {
      return null;
    }

    // Open modal
    setFormControllerData(data);
    createModalRef.current.openModal();
  };

  const handleConfirm = async () => {
    const images = imagesRef.current.getFiles();

    const chapterData = {
      name: formControllerData.chapterName,
      numberOrder: Number(formControllerData.numberOrder),
      oldNumberOrder: chapter.id ? chapter.numberOrder : null,
    };

    const formData = new FormData();
    formData.append("chapterData", JSON.stringify(chapterData));
    formData.append("comicInfo", JSON.stringify(comicInfo));
    images.map((image) => formData.append("images", image));

    const response = chapter.id
      ? await axiosRequest(chaptersIdApi(chapter.id), {
          method: "PUT",
          body: formData,
          headers: { "Content-Type": "multipart/form-data" },
        })
      : await axiosRequest(chaptersApi(), {
          method: "POST",
          body: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });

    if (!response.success && response.data.errors.length > 0) {
      response.data.errors.forEach((err) => {
        setError(err.field, {
          type: "manual",
          message: err.message,
        });
      });

      return;
    }

    if (response.success && response.code === 200) {
      alertDispatch(
        alertActions.showAlert(
          chapter.id
            ? "Update chapter info successfully!"
            : "Create chapter info successfully!",
          "success"
        )
      );
    } else {
      alertDispatch(
        alertActions.showAlert(
          chapter.id
            ? "Update chapter info failed!"
            : "Create chapter info failed!",
          "error"
        )
      );
    }

    handleBackOrUploadNewChapter();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <h3 className="mb-3 font-medium">
          {chapter.id ? "Cập nhật chương" : "Tạo chương mới"}
        </h3>

        {/* Main */}
        <div className="flex flex-col-reverse gap-6 md:flex-col">
          <div className="flex justify-end gap-3">
            <DefaultButton
              className="!rounded-md text-lg !font-medium"
              variant="outlined"
              onClick={() => resetModalRef.current.openModal()}>
              Cài lại
            </DefaultButton>

            <DefaultButton
              className="!rounded-md text-lg !font-medium"
              type="submit">
              {chapter.id ? "Cập nhật" : "Tạo chương"}
            </DefaultButton>
          </div>

          <div>
            <div className="flex flex-wrap gap-3">
              <div className="w-full md:w-1/4">
                <AppTextFieldInput
                  id="numberOrder"
                  name="STT"
                  label="STT"
                  type="number"
                  size={isMobile ? "small" : "medium"}
                  min={1}
                  required={true}
                  defaultValue={chapter.numberOrder || ""}
                  validate={[requiredAcceptSpace]}
                />
              </div>

              <div className="flex-1">
                <AppTextFieldInput
                  id="chapterName"
                  name="Tên chương"
                  label="Tên chương"
                  size={isMobile ? "small" : "medium"}
                  required={true}
                  defaultValue={chapter.name || ""}
                  validate={[requiredAcceptSpace]}
                />
              </div>
            </div>

            <h5 className="mb-3 mt-5 font-medium">Trang truyện</h5>
            <UploadBox initialData={imageFiles} ref={imagesRef} />
          </div>
        </div>
      </form>

      <ModalComponent
        title="Reset chapter info"
        submitTitle="Reset"
        handleSubmit={handleReset}
        ref={resetModalRef}>
        <p>Are you sure you want to reset the chapter info?</p>
        <p className="mt-1">Your data will be lost.</p>
      </ModalComponent>

      <ModalComponent
        title="Create chapter"
        submitTitle="Confirm"
        handleSubmit={handleConfirm}
        ref={createModalRef}>
        <p>
          {chapter.id ? (
            <span>Are you sure you want to update info of {chapter.name}?</span>
          ) : (
            <span>Are you sure you want to create the new chapter?</span>
          )}
        </p>
        <p className="mt-1">
          {chapter.id
            ? "Your changes will be saved."
            : "The info will be saved."}
        </p>
      </ModalComponent>
    </FormProvider>
  );
}

export default UploadChapter;
