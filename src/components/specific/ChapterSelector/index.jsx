import { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Link, useParams } from "react-router-dom";

import { chapterUrl } from "@/routes";

export default function ChapterSelector({
  comicId,
  listChapters,
  initialChapter,
}) {
  const { comicName } = useParams();

  const [chapter, setChapter] = useState(initialChapter);

  const handleChange = (event) => {
    setChapter(event.target.value);
  };

  console.log(listChapters);

  return (
    <FormControl fullWidth>
      <InputLabel id="chapter-selector-label">Chapter</InputLabel>
      <Select
        labelId="chapter-selector-label"
        id="chapter-selector"
        value={chapter}
        label="Chapter"
        onChange={handleChange}>
        {listChapters.map((chapter, index) => (
          <MenuItem value={chapter.numberOrder} key={index}>
            <Link
              to={chapterUrl(comicName, comicId, chapter.name, chapter.id)}
              className="w-full px-4 py-2">
              {chapter.name}
            </Link>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
