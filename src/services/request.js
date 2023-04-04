import axios from "./axiosConfig";

let headers = {
  "content-type": "multipart/form-data",
};

export const loginApi = async (data) => {
  return axios.post(`/user/login`, data);
};

// user details api
export const getUserDetails = async (id) => {
  return axios.get(`/user/details?_id=${id}`);
};

export const updateUserDetails = async (id, payload) => {
  return axios.put(`/user/update/${id}`, payload);
};

export const getCheckExestingPassword = async (password, id) => {
  return axios.get(`/user/passwordCheck?password=${password}&_id=${id}`);
};

export const updateUserPassword = async (payload) => {
  return axios.put(`/user/resetpassword/`, payload);
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

export const createNewProjectApi = async (projectPayload) => {
  return axios.post(`/project/upload/`, projectPayload);
};

//document manager apis

export const uploadDocumentApi = (payload) => {
  return axios.post(`/document/uploadDocument`, payload, { headers });
};

export const updateDocumentApi = (docId, payload) => {
  return axios.put(`/document/updateDocument/${docId}`, payload);
};

export const getAllDocumentListApi = (
  pageNumber,
  limit,
  userId,
  projectId,
  searchValue
) => {
  return axios.get(
    `/document/getDocs?pageNumber=${pageNumber}&limit=${limit}&userId=${userId}&projectId=${projectId}&fileName=${
      searchValue || ""
    }`
  );
};

export const getSearchFileList = (userId, projectId, categoryType) => {
  return axios.get(
    `/document/getFileNames?userId=${userId}&projectId=${projectId}&categoryType=${categoryType}`
  );
};

export const deleteDocumentApi = (deleteItem) => {
  return axios.delete(`/document/deleteDocument/${deleteItem}`);
};

export const getNotifications = (userId, startDate, tz) => {
  return axios.get(
    `/document/getMeetingList?userId=${userId}&startDate=${startDate}&tz=${tz}`
  );
};

// contacts apis

export const getContactsList = async (ownerId, role) => {
  return axios.get(`/user/findrolebasedusers?ownerId=${ownerId}&role=${role}`);
};

export const createContactApi = async (payload) => {
  return axios.post(`/user/saveContractors`, payload);
};

export const createDailyLogApi = (payload) => {
  return axios.post(`/dailyLog/createDailyLogs`, payload);
};

//kreo apis
export const getKreoLoginApi = async () => {
  return axios.get(`/external/authenticate`);
};

export const uploadFiletoKero = async (payload) => {
  return axios.post(`/external/uploadToKreo`, payload, { headers });
};

export const getKreoProjectDetails = async (token, projectId, pageIndex) => {
  return axios.get(
    `/external/getProjectDetails?kreo_auth_access_token=${token}&projectId=${projectId}&pageIndex=${pageIndex}`
  );
};
