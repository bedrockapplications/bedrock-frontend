import axios from "./axiosConfig";

//Task Api start
export const getMeetingsList = async (uId) => {
  return axios.get(`/document/getMeetings?userId=${uId}`);
};

export const createMeetingApi = async (payload) => {
  return axios.post(`/document/createMeeting`, payload);
};

export const deleteMeetingApi = async (tId) => {
  return axios.delete(`/document/deletemeeting/${tId}`);
};



//Task Api End

export const getAllProjectList = async (uId) => {
  return axios.get(`/project/getprojects?userId=${uId}`);
};

export const getProjectDetails = async (pId) => {
  return axios.get(`/project/getprojectdetailsbyid?_id=${pId}`);
};
