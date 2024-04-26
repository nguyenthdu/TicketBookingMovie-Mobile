import { useDispatch } from "react-redux";
import { doSetSelectedPromotionBill } from "../redux/booking/bookingSlice";

export default BookingUtils = () => {
  const dispatch = useDispatch();

  const CalculateTotalPrice = (
    seats,
    foods,
    roomPrice,
    promotionBill,
    setTotalPrice
  ) => {
    let newTotalPrice = 0;
    // Tính tổng tiền cho các ghế ngồi
    seats.forEach((seat) => {
      const seatPrice = seat.price;
      newTotalPrice += seatPrice + roomPrice;
    });

    // Tính tổng tiền cho các món đồ ăn
    foods.forEach((food) => {
      newTotalPrice += food.price * food.quantity;
    });

    // Áp dụng khuyến mãi nếu có
    ApplyPromotion(newTotalPrice, promotionBill, setTotalPrice);
  };

  const ApplyPromotion = (totalPrice, promotionBill, setTotalPrice) => {
    if (promotionBill !== null) {
      switch (promotionBill.typePromotion) {
        case "DISCOUNT":
          ApplyDiscount(totalPrice, promotionBill, setTotalPrice);
          break;
        case "FOOD":
          applyFood();
          break;
        case "TICKET":
          applyTicket();
          break;
        default:
          // Không áp dụng khuyến mãi nếu không phù hợp với bất kỳ loại nào
          setTotalPrice(totalPrice);
          break;
      }
    } else {
      // Không có khuyến mãi
      setTotalPrice(totalPrice);
    }
  };

  const ApplyDiscount = (totalPrice, promotionBill, setTotalPrice) => {
    if (promotionBill.promotionDiscountDetailDto.typeDiscount === "PERCENT") {
      const minBillValue =
        promotionBill.promotionDiscountDetailDto.minBillValue;
      if (totalPrice >= minBillValue) {
        const discountValue =
          promotionBill.promotionDiscountDetailDto.discountValue;
        const maxValue = promotionBill.promotionDiscountDetailDto.maxValue;
        const discountedPrice = totalPrice * (1 - discountValue / 100);

        // Kiểm tra nếu giá giảm đã bằng hoặc vượt quá maxValue thì giữ nguyên giá trị tổng giá
        const finalPrice =
          discountedPrice <= maxValue ? discountedPrice : totalPrice - maxValue;

        setTotalPrice(finalPrice);
      } else {
        dispatch(doSetSelectedPromotionBill({}));
        setTotalPrice(totalPrice);
      }
    }
    // if (
    //   promotionBill.promotionDiscountDetailDto.typeDiscount === "AMOUNT"
    // )
    else {
      const discountValue =
        promotionBill.promotionDiscountDetailDto.discountValue;
      const finalPrice = totalPrice - discountValue;
      setTotalPrice(finalPrice);
    }
  };

  return { CalculateTotalPrice };

  const ApplyFood = () => {};

  const ApplyTicket = () => {};
};
