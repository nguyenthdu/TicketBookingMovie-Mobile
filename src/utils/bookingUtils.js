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
    promotionSeat,
    promotionFood
  ) => {
    let newTotalPrice = 0;
    // Tính tổng tiền cho các ghế ngồi
    seats.forEach((seat) => {
      const seatPrice = seat.price;
      newTotalPrice += seatPrice + roomPrice;
    });

    // Tính tổng tiền cho các món đồ ăn
    foods.forEach((food) => {
      newTotalPrice += food.price * food?.quantity;
    });

    // Áp dụng khuyến mãi nếu có
    finallyPrice = ApplyPromotion(
      newTotalPrice,
      promotionBill,
      seats,
      promotionSeat,
      foods,
      promotionFood
    );
    dispatch(doSetTotalPrice(finallyPrice));
  };

  const ApplyPromotion = (
    totalPrice,
    promotionBill,
    seats,
    promotionSeat,
    foods,
    promotionFood
  ) => {
    var newTotalPrice = totalPrice;

    if (promotionBill?.promotionDiscountDetailDto) {
      newTotalPrice = ApplyDiscount(newTotalPrice, promotionBill);
    }

    if (promotionSeat?.promotionTicketDetailDto) {
      newTotalPrice = ApplyTicket(seats, newTotalPrice, promotionSeat);
    }

    if (promotionFood?.promotionFoodDetailDto) {
      newTotalPrice = ApplyFood(foods, newTotalPrice, promotionFood);
    }

    return newTotalPrice;
  };

  const ApplyDiscount = (totalPrice, promotionBill) => {
    if (promotionBill?.promotionDiscountDetailDto?.typeDiscount === "PERCENT") {
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
        return finalPrice;
      } else {
        dispatch(doSetSelectedPromotionBill({}));
        return totalPrice;
      }
    }
    // if (
    //   promotionBill.promotionDiscountDetailDto.typeDiscount === "AMOUNT"
    // )
    else {
      const discountValue =
        promotionBill?.promotionDiscountDetailDto?.discountValue;
      const finalPrice = totalPrice - discountValue;
      return finalPrice;
    }
  };

  const ApplyTicket = (seats, totalPrice, promotionSeat) => {
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
        if (selectedRequired >= quantityRequired) {
          // Kiểm tra xem có ghế phù hợp với loại ghế khuyến mãi không
          const promotionSeats = seats.filter(
            (seat) => seat.seatTypeId === typeSeatPromotion
          );

          // Kiểm tra nếu có đủ ghế khuyến mãi, cùng loại với ghế yêu cầu
          // nếu ghế khuyến mãi cùng với loại ghế yêu cầu, thì cần trừ số ghế yêu cầu ra khỏi số ghế khuyến mãi đã chọn
          // nếu ghế khuyến mãi khác loại ghế yêu cầu, thì kiểm tra ghế số lượng ghế khuyến mãi đã chọn >= số lượng ghế khuyến mãi
          if (promotionSeats.length >= 0) {
            const promotionSeatPrice =
              promotionSeat.promotionTicketDetailDto.price > 0
                ? promotionSeat.promotionTicketDetailDto.price
                : promotionSeats[0].price;

            var discountAmount = 0;
            // nếu cùng loại ghế yêu cầu và ghế khuyến mãi
            if (typeSeatRequired === typeSeatPromotion) {
              // ghế khuyến mãi đã chọn - số ghế yêu cầu
              const promotionSeatQuantity =
                promotionSeats.length - quantityRequired;
              discountAmount =
                Math.min(quantityPromotion, promotionSeatQuantity) *
                promotionSeatPrice;
            } else {
              discountAmount =
                Math.min(quantityPromotion, promotionSeats.length) *
                promotionSeatPrice;
            }

            // Trừ giảm giá từ tổng giá
            totalPrice -= discountAmount;
          }
        }
      }
    }

    return totalPrice;
  };

  const ApplyFood = (foods, totalPrice, promotionFood) => {
    console.log("promotionFood: ", promotionFood);

    // Kiểm tra nếu có thông tin về chi tiết khuyến mãi đồ ăn
    if (promotionFood?.promotionFoodDetailDto) {
      const {
        foodRequired,
        quantityRequired,
        foodPromotion,
        quantityPromotion,
      } = promotionFood?.promotionFoodDetailDto;

      // kiểm tra các điều kiện của khuyến mãi đồ ăn
      if (foodRequired && quantityRequired && foodPromotion) {
        // Đếm số lượng món ăn phù hợp với loại món yêu cầu
        const selectedFoodRequired = foods.filter((food) => {
          if (food.id === foodRequired) {
            return food;
          }
        });

        // Nếu số lượng món ăn đạt yêu cầu
        if (selectedFoodRequired[0]?.quantity >= quantityRequired) {
          // Kiểm tra xem có món ăn phù hợp với loại món khuyến mãi không
          const promotionFoods = foods.filter((food) => {
            if (food.id === foodPromotion) {
              return food;
            }
          });

          // Kiểm tra nếu có đủ món ăn khuyến mãi, sản phẩm tặng khác loại sản phẩm yêu cầu
          if (promotionFoods[0]?.quantity >= 0) {
            const promotionFoodPrice =
              promotionFood.promotionFoodDetailDto.price > 0
                ? promotionFood.promotionFoodDetailDto.price
                : promotionFoods[0].price;

            var discountAmount = 0;

            // nếu cùng loại món yêu cầu và món khuyến mãi
            if (foodRequired === foodPromotion) {
              // món khuyến mãi đã chọn - số món yêu cầu
              const promotionFoodQuantity =
                promotionFoods[0].quantity - quantityRequired;
              discountAmount =
                Math.min(quantityPromotion, promotionFoodQuantity) *
                promotionFoodPrice;
            } else {
              discountAmount =
                Math.min(quantityPromotion, promotionFoods[0].quantity) *
                promotionFoodPrice;
            }

            // Trừ giảm giá từ tổng giá
            totalPrice -= discountAmount;
          }
        }
      }
    }

    return totalPrice;
  };

  return { CalculateTotalPrice };
};
