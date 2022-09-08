// import axios from "axios";

// const apiClient = axios.create({
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("token")}`,
//   },
// });

type TClient = {
  get<T = any>(endpoint: string): Promise<T>;
  post<T = any>(endpoint: string, body: object): Promise<T>;
};

type TAuthResponse = { userId: string; email: string; token: string };

const getToken = () => localStorage.getItem("vb_token");

const apiClient: TClient = {
  async post(endpoint: string, body: object) {
    const res = await fetch(endpoint, {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    });
    return res.json();
  },
  async get(endpoint: string) {
    const res = await fetch(endpoint, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    });
    return res.json();
  },
};

export const authenticate = async (email: string, password: string) => {
  try {
    const data = await apiClient.post<TAuthResponse>("/api/v1/auth/login", { email, password });
    localStorage.setItem("vb_token", data.token);
    return data.userId;
  } catch (err) {
    console.log(err);
  }
};

export const verifyToken = async (token = localStorage.getItem("vb_token")) => {
  if (!token) return;
  let userId;
  try {
    const data = await apiClient.get<{ success: string; userId: string }>(
      "/api/v1/auth/verify-token"
    );
    userId = data.userId;
  } catch (error: any) {
    console.log(error.message);
  }
  return userId || false;
};
