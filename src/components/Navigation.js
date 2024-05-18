// navigation.js
import { CommonActions } from "@react-navigation/native";

let navigationRef;

export const setNavigationRef = (ref) => {
  navigationRef = ref;
};

export const navigate = (name) => {
  navigationRef.dispatch(CommonActions.navigate(name));
};

export const goBack = () => {
  navigationRef.dispatch(CommonActions.goBack());
};
