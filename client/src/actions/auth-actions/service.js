/*
@
 This file contains the requests ( services )
@
*/

import axiosInstance from "../../config/axios-instance";

function logoutRequest() {
  return axiosInstance({
    method: "get",
    url: "auth/logout",
    data: null
  });
}

function signinRequest(body) {
  return axiosInstance({
    method: "post",
    url: "authenticate",
    data: body
  });
}

function signupRequest(body) {
  return axiosInstance({
    method: "post",
    url: "/register-client",
    data: body
  });
}
function signupExpertRequest(body) {
  return axiosInstance({
    method: "post",
    url: "/register-expert",
    data: body
  });
}

function getAuthUserRequest() {
  return axiosInstance({
    method: "get",
    url: "user"
  });
}

function getUserByIdRequest(id) {
  return axiosInstance({
    method: "get",
    url: "/user/"+id
  });
}


const AuthServices = {
  signinRequest,
  signupRequest,
  logoutRequest,
  getAuthUserRequest,
  signupExpertRequest,
  getUserByIdRequest
};

export default AuthServices;
