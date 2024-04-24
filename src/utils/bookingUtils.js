export const calculatorPrice = (selectedSeats, selectedFoods) => {
  let newTotalPrice = 0;
  selectedSeats.forEach((seat) => {
    newTotalPrice += seat.price;
  });

  selectedFoods.forEach((food) => {
    console.log("food: ", food.price);
    newTotalPrice += food.price * food.quantity;
  });

  return newTotalPrice;
};

export const calculatorFinalPrice = (price, selectedPromotion) => {
  if (selectedPromotion && selectedPromotion.promotionDiscountDetailDto) {
    const { typeDiscount, discountValue, maxValue } =
      selectedPromotion.promotionDiscountDetailDto;
    if (typeDiscount === "PERCENT") {
      let discountPrice = (price * discountValue) / 100;
      return discountPrice > maxValue
        ? price - maxValue
        : price - discountPrice;
    } else {
      return price - discountValue;
    }
  }
  return price; // Trả về giá gốc nếu không có promotion
};
