import { useDispatch } from "react-redux";
import {
  doSetSelectedPromotionBill,
  doSetTotalPrice,
} from "../redux/booking/bookingSlice";

export default BookingUtils = () => {
  const dispatch = useDispatch();

  const CalculateTotalPrice = (
    seats,
    foods,
    roomPrice,
    promotionBill,
    promotionSeat
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
    ApplyPromotionBill(newTotalPrice, promotionBill);
    ApplyPromotionSeat(seats, newTotalPrice, promotionSeat);
  };

  const ApplyPromotionSeat = (seats, totalPrice, promotionSeat) => {
    if (promotionSeat !== null) {
      ApplyTicket(seats, totalPrice, promotionSeat);
    } else {
      // Không có khuyến mãi
      dispatch(doSetTotalPrice(totalPrice));
    }
  };

  const ApplyPromotionBill = (totalPrice, promotionBill) => {
    if (promotionBill !== null) {
      switch (promotionBill.typePromotion) {
        case "DISCOUNT":
          ApplyDiscount(totalPrice, promotionBill);
          break;
        default:
          // Không áp dụng khuyến mãi nếu không phù hợp với bất kỳ loại nào
          dispatch(doSetTotalPrice(totalPrice));
          break;
      }
    } else {
      // Không có khuyến mãi
      dispatch(doSetTotalPrice(totalPrice));
    }
  };

  const ApplyDiscount = (totalPrice, promotionBill) => {
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

        dispatch(doSetTotalPrice(finalPrice));
      } else {
        dispatch(doSetSelectedPromotionBill({}));
        dispatch(doSetTotalPrice(totalPrice));
      }
    }
    // if (
    //   promotionBill.promotionDiscountDetailDto.typeDiscount === "AMOUNT"
    // )
    else {
      const discountValue =
        promotionBill.promotionDiscountDetailDto.discountValue;
      const finalPrice = totalPrice - discountValue;
      dispatch(doSetTotalPrice(finalPrice));
    }
  };

  const ApplyTicket = (seats, totalPrice, promotionSeat) => {
    console.log("promotionSeat: ", promotionSeat);
    // Kiểm tra nếu có thông tin về chi tiết khuyến mãi vé
    if (promotionSeat?.promotionTicketDetailDto) {
      const {
        typeSeatRequired,
        quantityRequired,
        typeSeatPromotion,
        quantityPromotion,
      } = promotionSeat?.promotionTicketDetailDto;

      // Kiểm tra các điều kiện của khuyến mãi vé
      if (typeSeatRequired && quantityRequired && typeSeatPromotion) {
        // Đếm số lượng ghế phù hợp với loại ghế yêu cầu
        const selectedRequired = seats.filter(
          (seat) => seat.seatTypeId === typeSeatRequired
        ).length;

        // Nếu số lượng ghế đạt yêu cầu
        if (selectedRequired > quantityRequired) {
          // Kiểm tra xem có ghế phù hợp với loại ghế khuyến mãi không
          const promotionSeats = seats.filter(
            (seat) => seat.seatTypeId === typeSeatPromotion
          );

          console.log("promotionSeats: ", promotionSeats);

          // Nếu có ghế phù hợp với loại ghế khuyến mãi
          if (
            promotionSeats.length > 0 &&
            promotionSeat.promotionTicketDetailDto.price > 0
          ) {
            // Tính toán giảm giá bằng số lượng ghế khuyến mãi nhân với giá của mỗi ghế
            const discountAmount =
              quantityPromotion * promotionSeat.promotionTicketDetailDto.price;

            // Trừ giảm giá từ tổng giá
            totalPrice -= discountAmount;
          } else {
            totalPrice -= quantityPromotion * promotionSeats[0].price;
          }
        }
      }
    }

    dispatch(doSetTotalPrice(totalPrice));
  };

  return { CalculateTotalPrice };

  const ApplyFood = () => {};
};
