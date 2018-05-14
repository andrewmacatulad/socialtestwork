import axios from "axios";

import {
  GET_PROFILE,
  PROFILE_LOADING,
  SET_CURRENT_USER,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS
} from "./types";

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("api/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(profile => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Account and Profile
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? You want to delete your account")) {
    axios
      .delete("/api/profile")
      .then(account =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Add Experience
export const addExperience = (experienceData, history) => dispatch => {
  axios
    .post("/api/profile/experience", experienceData)
    .then(experience => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Education
export const addEducation = (educationData, history) => dispatch => {
  axios
    .post("/api/profile/education", educationData)
    .then(education => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Experience
export const deleteExperience = id => dispatch => {
  if (window.confirm("Are you sure? You want to delete Experience")) {
    axios
      .delete(`/api/profile/experience/${id}`)
      .then(experience =>
        dispatch({
          type: GET_PROFILE,
          payload: experience.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Delete Experience
export const deleteEducation = id => dispatch => {
  if (window.confirm("Are you sure? You want to delete Education")) {
    axios
      .delete(`/api/profile/education/${id}`)
      .then(education =>
        dispatch({
          type: GET_PROFILE,
          payload: education.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
