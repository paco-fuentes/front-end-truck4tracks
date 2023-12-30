import axios from "axios";

const HOST_URL = `http://localhost:4000/api`;

// guest API calls
export const getAllBands = async () => {
  return await axios.get(`${HOST_URL}/band/all`);
};

export const getBandByParams = async (id) => {
  return await axios.get(`${HOST_URL}/band/${id}`);
};

// user API calls
export const registerCall = async (body) => {
  return await axios.post(`${HOST_URL}/user/register`, body);
};

export const loginCall = async (body) => {
  return await axios.post(`${HOST_URL}/user/login`, body);
};

export const profileCall = async (token) => {
  return await axios.get(`${HOST_URL}/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProfileCall = async (body, token) => {
  return await axios.put(`${HOST_URL}/user/profile`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllActivitiesCall = async () => {
  return await axios.get(`${HOST_URL}/user/allactivities`);
};

// messages
export const getAllBandMessages = async (id) => {
  return await axios.get(`${HOST_URL}/messages/band/${id}`);
};

export const postMessage = async (id, body, token) => {
  return await axios.post(`${HOST_URL}/messages/band/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteMessageCall = async (id, body, token) => {
  return await axios.delete(`${HOST_URL}/messages/band/${id}`, {
    data: body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


// band
export const createBandCall = async (body, token) => {
  return await axios.post(`${HOST_URL}/band/register`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const joinBandCall = async (body, token) => {
  return await axios.post(`${HOST_URL}/user/joinband`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const leaveBandCall = async (body, token) => {
  return await axios.post(`${HOST_URL}/user/leaveband`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getBandMembers = async (id, token) => {
  return await axios.get(`${HOST_URL}/user/bandmembers/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const checkIfBandMemberCall = async (id, token) => {
  return await axios.get(`${HOST_URL}/user/ismember/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// admin
export const getAllUsersCall = async (token) => {
  return await axios.get(`${HOST_URL}/admin/allusers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// resulto problema en el que no reconoce el token con este formato data: {id} dentro
export const deleteUserByBodyIdCall = async (id, token) => {
  return await axios.delete(`${HOST_URL}/admin/usertoremove`, {
    data: { id },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// create multitrack
export const createMultitrackCall = async (id, body, token) => {
  return await axios.post(`${HOST_URL}/multitrack/create/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// create track on current multitrack as bandmember
export const createTrackCall = async (id, body, token) => {
  return await axios.post(`${HOST_URL}/multitrack/loadtrack/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
