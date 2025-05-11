import Collapse from "@mui/material/Collapse";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

import AppIconButton from "@/components/common/buttons/AppIconButton";
import DefaultButton from "@/components/common/buttons/DefaultButton";
import AppSelectInput from "@/components/common/form/AppSelectInput";
import GenresSelector from "@/components/specific/GenresSelector";
import {
  getUrlParams,
  HiSortAscending,
  HiSortDescending,
  MdFilterAlt,
  MdFilterAltOff,
  orderByList,
  statusListForFilter,
} from "@/utils";

function FilterForm({ children }) {
  //  Hooks
  const [params, setSearchParams] = useSearchParams();

  // Variables
  const {
    search,
    order,
    status,
    genres: genreString,
    orderBy,
  } = getUrlParams(params);

  const methods = useForm({
    defaultValues: {
      status: status,
      orderBy: orderBy,
    },
  });

  // States
  const [genres, setGenres] = useState(
    genreString ? genreString.split(",") : []
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isAscending, setIsAscending] = useState(order === "ASC");

  // Functions
  const onSubmit = (data) => {
    console.log({ ...data, genres, isAscending });
    setSearchParams({
      ...data,
      genres: genres.join(","),
      order: isAscending ? "ASC" : "DESC",
      page: 1,
      search,
    });
  };

  const onReset = () => {
    setGenres([]);
    setIsAscending(false);
    methods.setValue("status", statusListForFilter[0].value);
    methods.setValue("orderBy", orderByList[0].value);
    setSearchParams({
      page: 1,
      orderBy: orderByList[0].value,
      search,
    });
  };

  return (
    <div className="mb-4">
      <div className="flex justify-end gap-2">
        {/* Children */}
        {children}

        {/* Filter */}
        <Tooltip title={"Lọc"}>
          <div>
            <DefaultButton
              variant={isOpen ? "contained" : "outlined"}
              onClick={() => setIsOpen((prev) => !prev)}>
              <MdFilterAlt size={24} />
            </DefaultButton>
          </div>
        </Tooltip>
      </div>

      {/* Main */}
      <Collapse in={isOpen}>
        <FormProvider {...methods}>
          <div className="flex flex-col justify-end pt-4">
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                {/* Genres */}
                <GenresSelector
                  id="genres"
                  label="Thể loại"
                  size="small"
                  genres={genres}
                  setGenres={setGenres}
                />

                {/* Status */}
                <AppSelectInput
                  id="status"
                  name="Trạng thái"
                  label="Trạng thái"
                  list={statusListForFilter}
                  size="small"
                />

                <div className="flex items-center gap-2">
                  {/* Order by */}
                  <AppSelectInput
                    id="orderBy"
                    name="Sắp xếp theo"
                    label="Sắp xếp theo"
                    list={orderByList}
                    size="small"
                  />

                  {/* Ascending */}
                  <AppIconButton
                    tooltip={isAscending ? "Tăng dần" : "Giảm dần"}
                    onClick={() => setIsAscending((prev) => !prev)}>
                    {isAscending ? <HiSortAscending /> : <HiSortDescending />}
                  </AppIconButton>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-end gap-2">
                <DefaultButton
                  type="button"
                  onClick={onReset}
                  variant="outlined"
                  className="flex items-center gap-2">
                  <MdFilterAltOff />
                  <span>Bỏ lọc</span>
                </DefaultButton>

                <DefaultButton
                  type="submit"
                  className="flex items-center gap-2">
                  <MdFilterAlt />
                  <span>Lọc</span>
                </DefaultButton>
              </div>
            </form>
          </div>
        </FormProvider>
      </Collapse>
    </div>
  );
}

export default FilterForm;
