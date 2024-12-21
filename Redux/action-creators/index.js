export const logIn = (states) => {
  return (dispatch) => {
    dispatch({
      type: "login",
      payload: states,
    });
  };
};

export const logOut = () => {
  return (dispatch) => {
    dispatch({
      type: "logout",
    });
  };
};
export const forgot = (states) => {
  return (dispatch) => {
    dispatch({
      type: "forgot",
      payload: states,
    });
  };
};

export const removeForgot = () => {
  return (dispatch) => {
    dispatch({
      type: "removeForgot",
    });
  };
};

export const updateProfile = (states) => {
  return (dispatch) => {
    dispatch({
      type: "updateprofile",
      payload: states,
    });
  };
};

export const updateName = (states) => {
  return (dispatch) => {
    dispatch({
      type: "updatename",
      payload: states,
    });
  };
};
