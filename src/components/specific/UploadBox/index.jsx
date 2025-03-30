import clsx from "clsx";
import { FilePond } from "react-filepond";
import { ReactSortable } from "react-sortablejs";
import {
  useRef,
  Fragment,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

import "./uploadBox.scss";
import "filepond/dist/filepond.min.css";

import { FaPlus, MdEdit, IoClose } from "@/utils";

const UploadBox = (
  {
    allowMultiple = true,
    label = "",
    isSingle = false,
    showName = true,
    initialData = [],
  },
  ref
) => {
  const pondRef = useRef(null);
  const [empty, setEmpty] = useState(false);
  const [files, setFiles] = useState(initialData);

  useEffect(() => {
    if (initialData.length > 0) {
      setFiles(initialData);
    }
  }, [initialData]);

  const fileInputRef = useRef(null);
  const [editIndex, setEditIndex] = useState(null);

  useImperativeHandle(ref, () => ({
    checkEmpty() {
      if (files.length === 0) {
        setEmpty(true);
        return true;
      } else {
        setEmpty(false);
      }
    },

    getFiles() {
      return files;
    },

    resetFiles() {
      setFiles(initialData);
    },

    setFiles(newFiles) {
      setFiles(newFiles);
    },
  }));

  const handleUpdateFiles = (fileItems) => {
    setFiles((prevFiles) => [
      ...prevFiles,
      ...fileItems
        .slice(0, fileItems.length - prevFiles.length)
        .map((fileItem) => fileItem.file),
    ]);
  };

  const handleRemoveFile = (index) => {
    const newFiles = Array.from(files);
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleClickEditFile = (index) => {
    setEditIndex(index);
    fileInputRef.current.click();
  };

  const handleEditFiles = (event) => {
    if (editIndex !== null) {
      const newFile = event.target.files[0];
      setFiles((prevFiles) => {
        const updatedFiles = [...prevFiles];
        updatedFiles[editIndex] = newFile;
        return updatedFiles;
      });
      setEditIndex(null);
    }
  };

  const handleSortEnd = (evt) => {
    const { oldIndex, newIndex } = evt;
    const newFiles = Array.from(files);
    const movedItem = newFiles.splice(oldIndex, 1)[0];
    newFiles.splice(newIndex, 0, movedItem);
    setFiles(newFiles);
  };

  return (
    <Fragment>
      <ReactSortable
        list={files}
        setList={() => {}}
        className="flex w-full flex-wrap gap-8"
        animation={200}
        delayOnTouchStart={false}
        delay={0}
        scroll={true}
        scrollSensitivity={60}
        filter=".ignore-move"
        onEnd={handleSortEnd}>
        {files.map((file, index) => (
          <div
            key={index}
            className="relative flex aspect-[7/10] w-[130px] cursor-pointer items-center justify-center rounded-sm border border-gray-200 shadow-xl">
            {/* Image */}
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="select-none object-cover"
            />
            {/* Name */}
            {showName && (
              <div className="absolute bottom-1 left-0 px-1">
                <p className="limit-line-1 max-w-full select-none break-all rounded-full bg-black bg-opacity-70 px-1 py-[2px] text-xs text-white">
                  {file.name}
                </p>
              </div>
            )}
            {/* Actions */}
            <div
              className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 rounded-full bg-black bg-opacity-70 p-1"
              onClick={() => handleRemoveFile(index)}>
              <IoClose className="text-lg text-white hover:text-red-500" />
            </div>

            <div
              className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black bg-opacity-70 p-1"
              onClick={() =>
                handleClickEditFile(
                  index,
                  new File(["new content"], "new-file-name.jpg")
                )
              }>
              <MdEdit className="text-lg text-white hover:text-yellow-400" />
            </div>
          </div>
        ))}
        {/* Upload box */}
        <div
          className={clsx(
            { "border-red-500": empty, "border-gray-500": !empty },
            { hidden: isSingle && files.length > 0 },
            "ignore-move relative aspect-[7/10] w-[130px] cursor-pointer rounded-md border border-dashed"
          )}>
          <FilePond
            ref={pondRef}
            files={files}
            allowMultiple={isSingle ? false : allowMultiple}
            onupdatefiles={handleUpdateFiles}
            instantUpload={false}
            labelIdle={label}
          />

          {!label && (
            <FaPlus className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 text-xl text-gray-700" />
          )}
        </div>
      </ReactSortable>

      {/* Edit input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleEditFiles}
      />
    </Fragment>
  );
};

export default forwardRef(UploadBox);
