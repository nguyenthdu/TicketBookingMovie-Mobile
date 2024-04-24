import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchAllCinemas } from "../../services/CinemaAPI";
import { fetchDateShowTime, fetchShowTime } from "../../services/ShowTimeAPI";
import { COLORS, FONTSIZE } from "../../theme/theme";
import {
  convertWeekday,
  filterAndSortDates,
  filterAndSortShowTimes,
  formatTime,
  groupShowTimesByRoom,
} from "../../utils/convertWeekday";
import { locations } from "../../utils/locations";

const { width, height } = Dimensions.get("window");

export default function ShowTime({ route, navigation }) {
  const { movie } = route.params;

  const [location, setLocation] = useState(locations[0]?.value);
  const [cinemas, setCinemas] = useState([]);
  const [showDate, setShowDate] = useState([]);
  const [showTimes, setShowTimes] = useState([]);
  const [isFocusLocation, setIsFocusLocation] = useState(false);
  const [cinema, setCinema] = useState(null);
  const [isFocusCinema, setIsFocusCinema] = useState(false);

  const [isFocusDate, setIsFocusDate] = useState(null);
  const [isFocusTime, setIsFocusTime] = useState(
    showTimes.reduce((acc, cur) => {
      acc[cur.roomName] = null;
      return acc;
    }, {}) || {}
  );

  useEffect(() => {
    if (showDate.length <= 0) {
      setShowTimes([]);
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

  useEffect(() => {
    console.log("isFocusTime", isFocusTime);
  }, [isFocusTime]);

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

  const handleBookSeat = () => {
    const roomKey = Object.keys(isFocusTime)[0];
    navigation.navigate("BookSeat", { isFocusTime: isFocusTime[roomKey] });
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
          value={cinema || cinemas[0]?.value}
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
                onPress={() => setIsFocusDate(item)}
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
                        {/* {moment().format("HH:mm")} */}
                      </Text>
                    </TouchableOpacity>
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
    </SafeAreaView>
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
