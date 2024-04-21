export const convertWeekday = (weekday, date) => {
  const today = new Date();
  const itemDate = new Date(date);
  if (
    today.getFullYear() === itemDate.getFullYear() &&
    today.getMonth() === itemDate.getMonth() &&
    today.getDate() === itemDate.getDate()
  ) {
    return "Hôm nay";
  }

  switch (weekday) {
    case "Monday":
      return "Thứ 2";
    case "Tuesday":
      return "Thứ 3";
    case "Wednesday":
      return "Thứ 4";
    case "Thursday":
      return "Thứ 5";
    case "Friday":
      return "Thứ 6";
    case "Saturday":
      return "Thứ 7";
    case "Sunday":
      return "Chủ nhật";
    default:
      return "";
  }
};

// format ngày tháng từ nhỏ đến lớn, và loại bỏ các ngày nhỏ hơn ngày hiện tại
export const filterAndSortDates = (dateArray) => {
  // Lấy ngày hiện tại, bỏ qua giờ phút
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  // Lọc ra các ngày lớn hơn hoặc bằng ngày hiện tại
  const filteredDates = dateArray.filter((date) => {
    const dateObject = new Date(date);
    dateObject.setHours(0, 0, 0, 0); // Bỏ qua giờ phút
    return dateObject >= currentDate;
  });

  // Sắp xếp các ngày từ nhỏ đến lớn
  filteredDates.sort((a, b) => new Date(a) - new Date(b));

  // const formatDate = filteredDates.map((date) => dateFormat(new Date(date)));
  return filteredDates;
};
