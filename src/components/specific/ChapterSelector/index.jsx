import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState } from "react";
import { Link } from "react-router-dom";

import { chapterUrl } from "@/routes";

export default function ChapterSelector({
  comicId,
  listChapters,
  initialChapter,
}) {
  const [chapter, setChapter] = useState(initialChapter);

  const handleChange = (event) => {
    setChapter(event.target.value);
  };

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
              to={chapterUrl(comicId, chapter.id)}
              className="w-full px-4 py-2">
              {chapter.name}
            </Link>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
