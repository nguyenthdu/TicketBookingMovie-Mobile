import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  SafeArray,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS, FONTSIZE } from "../theme/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { fetchDateShowTime, fetchAllCinemas } from "../api/ShowTimeAPI";
const { width, height } = Dimensions.get("window");
export default function ShowTime({ route, navigation }) {
  const data = [
    //thành phố ở việt nam
    { label: "Hà Nội", value: "Hà Nội" },
    { label: "Hồ Chí Minh", value: "Hồ Chí Minh" },
    { label: "Đà Nẵng", value: "Đà Nẵng" },
    { label: "Hải Phòng", value: "Hải Phòng" },
    { label: "Cần Thơ", value: "Cần Thơ" },
    { label: "Quảng Ninh", value: "Quảng Ninh" },
    { label: "Nghệ An", value: "Nghệ An" },
    { label: "Hà Tĩnh", value: "Hà Tĩnh" },
    { label: "Quảng Bình", value: "Quảng Bình" },
    { label: "Quảng Trị", value: "Quảng Trị" },
    { label: "Thừa Thiên Huế", value: "Thừa Thiên Huế" },
    { label: "Quảng Nam", value: "Quảng Nam" },
    { label: "Quảng Ngãi", value: "Quảng Ngãi" },
    { label: "Bình Định", value: "Bình Định" },
    { label: "Phú Yên", value: "Phú Yên" },
    { label: "Khánh Hòa", value: "Khánh Hòa" },
    { label: "Ninh Thuận", value: "Ninh Thuận" },
    { label: "Bình Thuận", value: "Bình Thuận" },
    { label: "Kon Tum", value: "Kon Tum" },
    { label: "Gia Lai", value: "Gia Lai" },
    { label: "Đắk Lắk", value: "Đắk Lắk" },
    { label: "Đắk Nông", value: "Đắk Nông" },
    { label: "Lâm Đồng", value: "Lâm Đồng" },
    { label: "Bình Phước", value: "Bình Phước" },
  ];
  const cinema_data = [
    { label: "CGV", value: "CGV" },
    { label: "BHD", value: "BHD" },
    { label: "Galaxy", value: "Galaxy" },
    { label: "Lotte", value: "Lotte" },
    { label: "MegaGS", value: "MegaGS" },
  ];
  const date_showtime = [
    "2024-04-17",
    "2024-04-21",
    "2024-04-22",
    "2024-04-23",
    "2024-04-24",
    "2024-04-25",
    "2024-04-26",
    "2024-04-27",
    "2024-04-28",
    "2024-04-29",
  ];
  const time_showtime = [
    {
      nameRoom: "Phòng 2D",
      time: [
        "08:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
      ],
    },
    {
      nameRoom: "Phòng 3D",
      time: [
        "08:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
      ],
    },
    {
      nameRoom: "Phòng 4D",
      time: [
        "08:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
      ],
    },
  ];
  const { movie } = route.params;

  const [location, setLocation] = useState(null);
  const [isFocusLocation, setIsFocusLocation] = useState(false);
  const [cinema, setCinema] = useState(null);
  const [isFocusCinema, setIsFocusCinema] = useState(false);
  const [dateShowTime, setDateShowTime] = useState(null);
  // const [selectedDate, setSelectedDate] = useState(null);

  const [isFocusDate, setisFocusDate] = useState(null);
  const [isFocusTime, setIsFocusTime] = useState(
    time_showtime.reduce((acc, room) => {
      acc[room.nameRoom] = null;
      return acc;
    }, {})
  );
  const handleTimeSelect = (roomName, time) => {
    setIsFocusTime((prevSelectedTimes) => {
      const newSelectedTimes = { ...prevSelectedTimes };
      for (const key in newSelectedTimes) {
        if (key !== roomName) {
          newSelectedTimes[key] = null;
        }
      }
      newSelectedTimes[roomName] = time;
      return newSelectedTimes;
    });
  };
  //handleBookSeat
  const handleBookSeat = () => {
    navigation.navigate("BookSeat");
  };
  // const [cinemas, setCinemas] = useState([]);
  // const [showTimes, setShowTimes] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const cinemasData = await fetchAllCinemas();
  //       setCinemas(cinemasData);

  //       const showTimesData = await fetchDateShowTime(movie.id, 1);
  //       setShowTimes(showTimesData);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

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
  const renderLabelcinema = () => {
    if (cinema || isFocusCinema) {
      return (
        <Text style={[styles.label, isFocusCinema && { color: COLORS.Orange }]}>
          Chọn rạp
        </Text>
      );
    }
    return null;
  };
  //chuyển thứ bằng tiếng anh sang tiếng việt, nếu ngày hôm nay thì hiển thị today
  const convertWeekday = (weekday, date) => {
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
  // Hàm phân chia mảng thành các mảng con có độ dài cho trước
  const chunkArray = (arr, chunkSize) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: 20,
          marginHorizontal: 16,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="arrow-back" size={30} color={COLORS.DarkGrey} />
        </TouchableOpacity>
        <Text
          //2 hàng
          numberOfLines={1}
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: COLORS.Orange,
            textAlign: "center",
          }}
        >
          {movie.name}
        </Text>
      </View>

      {/*TODO: Chọn vị trí */}
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
          data={data}
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
      {/* TODO: Chọn rạp */}
      <View
        style={{
          backgroundColor: COLORS.White,
          padding: 16,
          marginHorizontal: 16,
        }}
      >
        {renderLabelcinema()}
        <Dropdown
          style={[
            styles.dropdown,
            isFocusCinema && { borderColor: COLORS.Orange },
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={cinema_data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocusCinema ? "Rạp" : "..."}
          searchPlaceholder="Chọn rạp..."
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

      {/* TODO: lấy danh sách ngày chiếu */}
      <View
        style={{
          marginTop: 16,
          marginHorizontal: 16,
          height: height * 0.1,
        }}
      >
        <FlatList
          data={date_showtime}
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
                onPress={() => setisFocusDate(item)}
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
      {/* TODO: hiển thị danh sách giờ chiếu của phòng */}
      <View
        style={{
          flex: 1,
          marginTop: 10,
          marginHorizontal: 16,
        }}
      >
        <FlatList
          //có thể cuộn
          data={time_showtime}
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
                  {item.nameRoom}
                </Text>
                <FlatList
                  data={chunkArray(item.time, 4)} // Phân chia mảng thời gian thành các mảng con có độ dài là 4
                  keyExtractor={(timeChunk, index) => index.toString()}
                  renderItem={({ item: timeChunk }) => (
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                      {timeChunk.map((time) => {
                        const isSelected = isFocusTime[item.nameRoom] === time;
                        return (
                          <TouchableOpacity
                            key={time}
                            onPress={() =>
                              handleTimeSelect(item.nameRoom, time)
                            }
                            disabled={isSelected}
                            style={{
                              backgroundColor: isSelected
                                ? COLORS.Orange
                                : COLORS.White,
                              padding: 8,
                              borderRadius: 8,
                              margin: 8,
                              borderWidth: 1,
                              borderColor: isSelected
                                ? COLORS.Orange
                                : COLORS.BlackRGB10,
                            }}
                          >
                            <Text
                              style={{
                                color: isSelected ? COLORS.White : COLORS.Black,
                                fontSize: 16,
                              }}
                            >
                              {time}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  )}
                />
              </View>
            );
          }}
        />
      </View>
      <TouchableOpacity
        onPress={handleBookSeat}
        style={{
          backgroundColor: COLORS.Orange,
          borderRadius: 24,
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 16,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: FONTSIZE.size_20,
            color: COLORS.White,
          }}
        >
          Tiếp tục
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.Orange,
    marginTop: 16,
  },
  showTimeButton: {
    backgroundColor: COLORS.Orange,
    borderRadius: 5,
    marginTop: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
  },
  showTimeText: {
    fontSize: 20,
    color: COLORS.White,
    fontFamily: "Roboto",
  },
});
