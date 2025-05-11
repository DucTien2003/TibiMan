import { Autocomplete } from "@mui/material";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import { useMemo } from "react";

import { genresApi } from "@/api";
import { useGetData } from "@/hooks";

function GenresSelector({ label, id, genres, setGenres, size = "medium" }) {
  const handleChange = (newValue) => {
    setGenres(newValue.map((option) => option.id));
  };

  const staticApis = useMemo(
    () => [
      {
        url: genresApi(),
        query: { orderBy: "name", order: "ASC" },
      },
    ],
    []
  );

  const staticResponse = useGetData(staticApis);

  if (staticResponse.loading) {
    return <h2 className="mt-16 w-full text-center">Loading...</h2>;
  }

  const [{ genres: genreArr }] = staticResponse.responseData;

  return (
    <div className="genres-selector">
      <Autocomplete
        multiple
        size={size}
        id={`${id}-autocomplete`}
        options={genreArr}
        getOptionLabel={(option) => option.name}
        value={genres.map((genreId) =>
          genreArr.find((genre) => genre.id === genreId)
        )}
        onChange={(event, newValue) => handleChange(newValue)}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label={label} />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              size={size}
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

export default GenresSelector;
