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
      credentials: "include",
      method: "post",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  },
  async get(endpoint: string) {
    const res = await fetch(endpoint, {
      credentials: "include",
      headers: {
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

export const verifyToken = async () => {
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

export const logout = async () => {
  return apiClient.get("/api/v1/auth/logout");
};

export const getUsers = async () => {
  try {
    const data = await apiClient.get("/api/v1/users");
    return data.users;
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (formData: FormData) => {
  const res = await fetch("/api/v1/posts", {
    credentials: "include",
    method: "post",
    body: formData,
  });
  return res.json();
};
