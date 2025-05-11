export const statusList = [
  { value: "ongoing", title: "Đang phát hành" },
  { value: "dropped", title: "Ngừng phát hành" },
  { value: "completed", title: "Hoàn thành" },
];

export const statusListForFilter = [
  { value: "all", title: "Tất cả" },
  ...statusList,
];

export const orderByList = [
  { value: "updated_at", title: "Mới cập nhật" },
  { value: "created_at", title: "Thời gian" },
  { value: "views", title: "Lượt xem" },
  { value: "rating", title: "Đánh giá" },
  { value: "bookmarks", title: "Lượt theo dõi" },
  { value: "number_of_chapters", title: "Số chương" },
];
