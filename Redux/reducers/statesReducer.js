import AsyncStorage from '@react-native-async-storage/async-storage';

const id = AsyncStorage.getItem('_id');
const userType = AsyncStorage.getItem("user_type");
const accessToken = AsyncStorage.getItem("accessToken");
const forgotToken = AsyncStorage.getItem("forgotToken");

const initialState = {
  id: id ? id : null,
  userType: userType ? userType : null,
  accessToken: accessToken ? accessToken : null,
  forgotToken: forgotToken ? forgotToken : null,
};

const reducer = (state = initialState, action) => {
  console.log(action.payload);
  if (action.type === "login") {
    // const serializedToken = JSON.stringify(action.payload.accessToken);

    // AsyncStorage.setItem("accessToken", serializedToken);

    // AsyncStorage.setItem("accessToken", action.payload.accessToken);
    // AsyncStorage.setItem("_id", action.payload.id);
    // AsyncStorage.setItem("user_type", action.payload.user_type);

    // return {
    //   ...state,
    //   accessToken: action.payload.accessToken,
    //   id: action.payload.id,
    //   user_type: action.payload.user_type,
    // };
  } else if (action.type === "updateprofile") {
    AsyncStorage.setItem("_id", action.payload.id);
    AsyncStorage.setItem("uType", action.payload.uType);
    AsyncStorage.setItem("uName", action.payload.uName);
    AsyncStorage.setItem("name", action.payload.name);
    return {
      ...state,
      id: action.payload.id,
      uType: action.payload.uType,
      uName: action.payload.uName,
      name: action.payload.name,
    };
  } else if (action.type === "updatename") {
    AsyncStorage.setItem("name", action.payload.name);
    return {
      ...state,
      name: action.payload.name,
    };
  } else if (action.type === "logout") {
    AsyncStorage.clear();
    return {
      ...state,
      accessToken: null,
      id: null,
      name: null,
    };
  } else if (action.type === "forgot") {
    AsyncStorage.setItem("forgotToken", action.payload.forgotToken);
    return {
      // ...state,
      forgotToken: action.payload.forgotToken,
    };
  } else if (action.type === "removeForgot") {
    AsyncStorage.removeItem("forgotToken");
    return {
      // ...state,
      forgotToken: null,
    };
  } else {
    return state;
  }
};
export default reducer;
