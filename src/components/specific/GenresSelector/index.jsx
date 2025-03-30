import { Autocomplete } from "@mui/material";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";

import { genresApi } from "@/api";
import { useGetData } from "@/hooks";

function GenresSelector({ label, id, initialData = [] }, ref) {
  const [selectedGenres, setSelectedGenres] = useState(initialData);

  useImperativeHandle(ref, () => ({
    getValue() {
      return selectedGenres;
    },

    setValue(value) {
      setSelectedGenres(value);
    },

    resetValue() {
      setSelectedGenres(initialData);
    },
  }));

  useEffect(() => {
    console.log(selectedGenres);
  }, [selectedGenres]);

  const handleChange = (newValue) => {
    setSelectedGenres(newValue.map((option) => option.id));
  };

  const staticApis = useMemo(
    () => [
      {
        url: genresApi(),
        query: { orderBy: "name", sortType: "ASC" },
      },
    ],
    []
  );

  const staticResponse = useGetData(staticApis);

  if (staticResponse.loading) {
    return <h2 className="mt-16 w-full text-center">Loading...</h2>;
  }

  const [{ genres }] = staticResponse.responseData;

  return (
    <div className="genres-selector">
      <Autocomplete
        multiple
        id={`${id}-autocomplete`}
        options={genres}
        getOptionLabel={(option) => option.name}
        value={selectedGenres.map((genreId) =>
          genres.find((genre) => genre.id === genreId)
        )}
        onChange={(event, newValue) => handleChange(newValue)}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label={label} />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              label={option.name}
              {...getTagProps({ index })}
              key={option.id}
            />
          ))
        }
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {option.name}
          </li>
        )}
      />
    </div>
  );
}

export default forwardRef(GenresSelector);
