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

export const calculatorFinalPrice = (price, selectedPromotionBill) => {
  if (
    selectedPromotionBill &&
    selectedPromotionBill.promotionDiscountDetailDto
  ) {
    const { typeDiscount, discountValue, maxValue } =
      selectedPromotionBill.promotionDiscountDetailDto;
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

export const calculatePriceAfterPromotion = (
  totalPrice,
  selectedPromotionBill
) => {
  console.log(
    "selectedPromotionBill trong calculator: ",
    selectedPromotionBill
  );
  if (
    !selectedPromotionBill ||
    totalPrice < selectedPromotionBill.promotionDiscountDetailDto.minBillValue
  ) {
    // Nếu không có khuyến mãi hoặc tổng số tiền nhỏ hơn mức tối thiểu của khuyến mãi
    return totalPrice;
  } else {
    // Tính toán số tiền được giảm dựa trên loại khuyến mãi
    let discountAmount = 0;
    if (
      selectedPromotionBill.promotionDiscountDetailDto.typeDiscount ===
      "PERCENT"
    ) {
      // Nếu khuyến mãi giảm theo phần trăm
      discountAmount =
        totalPrice *
        (selectedPromotionBill.promotionDiscountDetailDto.discountValue / 100);
      if (
        discountAmount >
        selectedPromotionBill.promotionDiscountDetailDto.maxValue
      ) {
        // Nếu số tiền giảm vượt quá giá trị tối đa được giảm
        discountAmount =
          selectedPromotionBill.promotionDiscountDetailDto.maxValue;
      }
    } else {
      // Nếu khuyến mãi giảm theo số tiền cố định
      discountAmount =
        selectedPromotionBill.promotionDiscountDetailDto.discountValue;
    }
    // Tính tổng số tiền sau khi áp dụng khuyến mãi
    const totalPriceAfterPromotion = totalPrice - discountAmount;
    return totalPriceAfterPromotion > 0 ? totalPriceAfterPromotion : 0;
  }
};
