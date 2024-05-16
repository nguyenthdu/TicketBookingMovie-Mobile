import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
export const COLORS = {
  Black: "#000000",
  BlackRGB10: "rgba(0,0,0,0.1)",
  LightBlue: "#84B1E8",
  Orange: "#FE3323",
  OrangeRGBA0: "rgba(255,85,36,0)",
  Grey: "#DDDDDD",
  DarkGrey: "#B4B4B8",
  LightGrey: "#f0f0f0",
  Yellow: "#E1CD17",
  White: "#FFFFFF",
  Pink: "#FF1493",
  Purple: "#86469C",
  WhiteRGBA75: "rgba(255,255,255,0.75)",
  WhiteRGBA50: "rgba(255,255,255,0.50)",
  WhiteRGBA32: "rgba(255,255,255,0.32)",
  WhiteRGBA15: "rgba(255,255,255,0.15)",
  warning: "#FFC107",
  error: "#FF0000",
};

export const SPACING = {
  space_2: 2,
  space_4: 4,
  space_8: 8,
  space_10: 10,
  space_12: 12,
  space_15: 15,
  space_16: 16,
  space_18: 18,
  space_20: 20,
  space_24: 24,
  space_28: 28,
  space_32: 32,
  space_36: 36,
};

export const SIZES = {
  height: height,
  width: width,
  font1: 16,
  font2: 18,
  font3: 24,
  font4: 32,

  padding1: 5,
  padding2: 10,
  padding3: 12,
  padding4: 15,

  margin1: 10,
  margin2: 15,
  margin3: 20,
  margin4: 25,

  radius1: 12,
  radius2: 18,
  radius3: 22,
  radius4: 90,
};

export const FONTSIZE = {
  size_8: 8,
  size_10: 10,
  size_12: 12,
  size_14: 14,
  size_16: 16,
  size_18: 18,
  size_20: 20,
  size_24: 24,
  size_30: 30,
};

export const BORDERRADIUS = {
  radius_4: 4,
  radius_8: 8,
  radius_10: 10,
  radius_15: 15,
  radius_20: 20,
  radius_25: 25,
};

const appTheme = { COLORS, SIZES, SPACING, FONTSIZE, BORDERRADIUS };

export default appTheme;
