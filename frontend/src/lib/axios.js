import axios from "axios"

// export const axiosinstance = axios.create({
//     baseURL:"http://localhost:5001/api",
//     withCredentials: true,
// })


export const axiosinstance = axios.create({
    baseURL: import.meta.env.MODE === "development"? "http://localhost:5001/api" : "/api",
    withCredentials: true, // Ensures cookies are sent with the request
  });
  