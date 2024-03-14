import api from './index'

export const signup = async (email, password) => {
  try {
    const { data } = await api.post("/signup", {
      email,
      password,
    });
    return data;
  } catch (e) {
    return Promise.reject(e.response.data);
  }
};

export const signin = async (email, password) => {
  try {
    const { data } = await api.post("/signin", {
      email,
      password,
    });
    console.log("data", data)
    if (data.success) {
      localStorage.setItem("token", data.token)
    }
    
    return data;
  } catch (e) {
    return Promise.reject(e.response.data);
  }
};

export const authLogin = async () => {
  {
    const token =  localStorage.getItem("token");
    if (token !== null) {
      return token;
    } else {
      throw new Error("no token");
    }
  }
};

export const autoLogout = async () => {
  {
     localStorage.setItem("token");
  }
};