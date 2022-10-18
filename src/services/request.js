import axios from "./axiosConfig";

let headers = {
  "content-type": "multipart/form-data",
};

//Task Api start
export const getMeetingsList = async (uId, startDate) => {
  return axios.get(`/document/getMeetings?userId=${uId}&startDate=${startDate}`);
};

export const createMeetingApi = async (payload) => {
  return axios.post(`/document/createMeeting`, payload, { headers });
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
