function Cover({ comic }) {
  return (
    <img
      src={comic.cover}
      alt={comic.name}
      className="aspect-[7/10] w-full rounded object-cover object-center"
    />
  );
}

export default Cover;
