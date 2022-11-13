import axios from "./axiosConfig";

let headers = {
  "content-type": "multipart/form-data",
};

//Task Api start
export const getMeetingsList = async (uId, startDate) => {
  return axios.get(
    `/document/getMeetings?userId=${uId}&startDate=${startDate}`
  );
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

//document manager apis

export const uploadDocumentApi = (payload) => {
  return axios.post(`/document/uploadDocument`, payload, { headers });
};

export const updateDocumentApi = (docId, payload) => {
  return axios.put(`/document/updateDocument/${docId}`, payload);
};

export const getAllDocumentListApi = (pageNumber, limit, userId, projectId) => {
  return axios.get(
    `/document/getDocs?pageNumber=${pageNumber}&limit=${limit}&userId=${userId}&projectId=${projectId}`
  );
};

export const deleteDocumentApi = (deleteItem) => {
  return axios.delete(
    `/document/deleteDocument?mediaId=${deleteItem.mediaId}&_id=${deleteItem._id}`
  );
};
