import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import NotificationMain, {
  CustomAlert,
} from "../../components/Notification/NotificationMain";
import {
  doSetSelectedCinema,
  doSetSelectedFoods,
  doSetSelectedMovie,
  doSetSelectedPromotionBill,
  doSetSelectedPromotionFood,
  doSetSelectedPromotionSeat,
  doSetSelectedSeats,
  doSetSelectedShowTime,
  doSetTotalPrice,
} from "../../redux/booking/bookingSlice";
import { fetchAllCinemas } from "../../services/CinemaAPI";
import { fetchDateShowTime, fetchShowTime } from "../../services/ShowTimeAPI";
import { COLORS } from "../../theme/theme";
import {
  convertWeekday,
  filterAndSortDates,
  filterAndSortShowTimes,
  formatTime,
  groupShowTimesByRoom,
} from "../../utils/formatData";
import { locations } from "../../utils/locations";
import styles from "./Styles";

const { width, height } = Dimensions.get("window");

export default function ShowTime({ route, navigation }) {
  const { movie } = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(doSetSelectedMovie(movie));
  }, [movie]);

  const { showAlert, modalVisible, message, hideAlert } = NotificationMain();

  const [location, setLocation] = useState(locations[0]?.value);
  const [cinemas, setCinemas] = useState([]);
  const [showDate, setShowDate] = useState([]);
  const [showTimes, setShowTimes] = useState([]);
  const [isFocusLocation, setIsFocusLocation] = useState(false);
  const [cinema, setCinema] = useState(null);
  const [isFocusCinema, setIsFocusCinema] = useState(false);

  const [isFocusDate, setIsFocusDate] = useState(null);
  const [isFocusTime, setIsFocusTime] = useState({});

  useEffect(() => {
    if (showDate.length <= 0) {
      setShowTimes([]);
      dispatch(doSetSelectedShowTime({}));
      setIsFocusTime({});
    }
  }, [showDate]);

  // fetch data rạp theo vị trí
  useEffect(() => {
    fetchCinemas(location);
  }, [location]);

  const fetchCinemas = async (location) => {
    try {
      const cinemasData = await fetchAllCinemas(location);
      const options = cinemasData.map((cinema) => {
        return { label: cinema.name, value: cinema.id };
      });
      setCinema(options[0]?.value);
      setCinemas(options);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // fetch ngày chiếu theo phim và rạp
  useEffect(() => {
    if (cinemas.length > 0) {
      fetchShowDate(movie.id, cinema || cinemas[0]?.value);
    }
  }, [cinema, cinemas]);

  const fetchShowDate = async (movieId, cinemaId) => {
    const resShowDate = await fetchDateShowTime(movieId, cinemaId);
    const dataFormat = filterAndSortDates(resShowDate);
    setShowDate(dataFormat);
    setIsFocusDate(dataFormat[0]);
  };

  // fetch giờ chiếu theo phim, rạp và ngày chiếu
  useEffect(() => {
    if (isFocusDate) {
      fetchDataShowTime(movie.id, cinema, isFocusDate);
    }
  }, [isFocusDate]);

  const fetchDataShowTime = async (movieId, cinemaId, date) => {
    const resShowTime = await fetchShowTime(movieId, cinemaId, date);
    const dataFormat = filterAndSortShowTimes(resShowTime);
    const groupTimeByRoom = groupShowTimesByRoom(dataFormat);
    setShowTimes(groupTimeByRoom);
  };

  const handleTimeSelect = (roomName, time) => {
    const newSelectedTimes = { ...isFocusTime };
    for (const key in newSelectedTimes) {
      if (key !== roomName) {
        newSelectedTimes[key] = null;
      }
    }
    newSelectedTimes[roomName] = time;
    setIsFocusTime(newSelectedTimes);
    dispatch(doSetSelectedShowTime(time));
  };

  useEffect(() => {
    dispatch(doSetSelectedSeats([]));
    dispatch(doSetSelectedFoods([]));
    dispatch(doSetSelectedPromotionBill({}));
    dispatch(doSetSelectedPromotionSeat({}));
    dispatch(doSetSelectedPromotionFood({}));
    dispatch(doSetTotalPrice({}));
  }, [isFocusTime]);

  useEffect(() => {
    if (cinema) {
      dispatch(doSetSelectedCinema(cinema));
    }
  }, [cinema]);

  const handleBookSeat = () => {
    if (Object.keys(isFocusTime).length === 0) {
      showAlert("Vui lòng chọn giờ chiếu trước khi tiếp tục");
      return;
    }
    navigation.navigate("BookSeat", { cinemaId: cinema });
  };

  const renderLabelLocation = () => {
    if (location || isFocusLocation) {
      return (
        <Text
          style={[styles.label, isFocusLocation && { color: COLORS.Orange }]}
        >
          Chọn vị trí
        </Text>
      );
    }
    return null;
  };

  const renderLabelCinema = () => {
    if (cinema || isFocusCinema) {
      return (
        <Text style={[styles.label, isFocusCinema && styles.color]}>
          Chọn rạp
        </Text>
      );
    }
    return null;
  };

  const handleSelectedDate = (date) => {
    setIsFocusDate(date);
    dispatch(doSetSelectedShowTime({}));
    setIsFocusTime({});
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "top",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            paddingHorizontal: 10,
          }}
        >
          <MaterialIcons name="arrow-back" size={30} color={COLORS.DarkGrey} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: COLORS.Orange,
            textAlign: "center",
            width: width * 0.8,
            flexWrap: "wrap",
          }}
        >
          {movie.name}
        </Text>
      </View>
      {/* Chọn vị trí */}
      <View
        style={{
          backgroundColor: COLORS.White,
          padding: 16,
          marginHorizontal: 16,
        }}
      >
        {renderLabelLocation()}
        <Dropdown
          style={[
            styles.dropdown,
            isFocusLocation && { borderColor: COLORS.Orange },
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={locations}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocusLocation ? "Vị trí" : "..."}
          searchPlaceholder="Thành phố..."
          value={location}
          onFocus={() => setIsFocusLocation(true)}
          onBlur={() => setIsFocusLocation(false)}
          onChange={(item) => {
            setLocation(item.value);
            setIsFocusLocation(false);
          }}
          renderLeftIcon={() => (
            <MaterialIcons
              name="location-pin"
              size={24}
              color={COLORS.Orange}
            />
          )}
        />
      </View>
      {/* Chọn rạp */}
      <View
        style={{
          backgroundColor: COLORS.White,
          padding: 16,
          marginHorizontal: 16,
        }}
      >
        {renderLabelCinema()}
        <Dropdown
          style={[
            styles.dropdown,
            isFocusCinema && { borderColor: COLORS.Orange },
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={cinemas}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocusCinema ? "Rạp" : "..."}
          searchPlaceholder="Chọn rạp..."
          // nếu cinema null thì lấy cinemas
          // value={cinema || cinemas[0]?.value}
          value={cinema}
          onFocus={() => setIsFocusCinema(true)}
          onBlur={() => setIsFocusCinema(false)}
          onChange={(item) => {
            setCinema(item.value);
            setIsFocusCinema(false);
          }}
          renderLeftIcon={() => (
            <MaterialIcons name="movie" size={24} color={COLORS.Orange} />
          )}
        />
      </View>
      {/* lấy danh sách ngày chiếu */}
      <View
        style={{
          marginTop: 16,
          marginHorizontal: 16,
          height: height * 0.1,
        }}
      >
        <FlatList
          data={showDate}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            const weekday = new Date(item).toLocaleDateString("en", {
              weekday: "long",
            });
            const isSelected = isFocusDate === item;
            return (
              <TouchableOpacity
                onPress={() => handleSelectedDate(item)}
                style={{
                  backgroundColor: isSelected ? COLORS.Orange : COLORS.White,
                  marginLeft: 8,
                  height: 70,
                  padding: 16,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: isSelected ? COLORS.Orange : COLORS.BlackRGB10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: isSelected ? COLORS.White : COLORS.Black,
                  }}
                >
                  {item.split("-")[2]}/{item.split("-")[1]}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: isSelected ? COLORS.White : COLORS.DarkGrey,
                  }}
                >
                  {convertWeekday(weekday, item)}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      {/* Hiển thị danh sách giờ chiếu */}
      <View
        style={{
          flex: 1,
          marginTop: 10,
          marginHorizontal: 16,
          marginBottom: 10,
        }}
      >
        <FlatList
          //có thể cuộn
          data={showTimes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <View style={{ marginHorizontal: 16 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: COLORS.Black,
                  }}
                >
                  {item.roomName}
                </Text>
                <FlatList
                  style={{
                    flexWrap: "wrap",
                    flexDirection: "row",
                  }}
                  data={item.time}
                  keyExtractor={(timeItem, index) => index.toString()}
                  renderItem={({ item: time }) => (
                    <TouchableOpacity
                      onPress={() => {
                        handleTimeSelect(item.roomName, time);
                      }}
                      style={{
                        backgroundColor:
                          isFocusTime[item.roomName] &&
                          isFocusTime[item.roomName].showTime === time.showTime
                            ? COLORS.Orange
                            : COLORS.White,
                        padding: 8,
                        borderRadius: 8,
                        margin: 8,
                        borderWidth: 1,
                        borderColor:
                          isFocusTime[item.roomName] &&
                          isFocusTime[item.roomName].showTime === time.showTime
                            ? COLORS.Orange
                            : COLORS.BlackRGB10,
                      }}
                    >
                      <Text
                        style={{
                          color:
                            isFocusTime[item.roomName] &&
                            isFocusTime[item.roomName].showTime ===
                              time.showTime
                              ? COLORS.White
                              : COLORS.Black,
                          fontSize: 16,
                        }}
                      >
                        {/* hiện đến phút */}
                        {formatTime(time.showTime)}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            );
          }}
        />
      </View>
      <TouchableOpacity onPress={handleBookSeat} style={styles.btnContinue}>
        <Text style={styles.textBtnContinue}>Tiếp tục</Text>
      </TouchableOpacity>
      <CustomAlert
        modalVisible={modalVisible}
        message={message}
        hideAlert={hideAlert}
      />
    </SafeAreaView>
  );
}
