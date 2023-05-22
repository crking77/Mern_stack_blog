import * as api from "../api/index";
import { AUTH } from "../constant/actionTypes";
export const signin = (formData, navigate) => async (dispatch) => {
  try {
    // Log in Home
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
export const signup = (formData, navigate) => async (dispatch) => {
  try {
    // Log up  User
    const data = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
