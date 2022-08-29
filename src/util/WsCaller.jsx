import axios from "axios";

const configHomesonoAPI = {
  baseURL: process.env.REACT_APP_HOMESONO_API_FROM_COMPUTER_AND_IPHONE,
  timeout: 10000,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

export const HomesonoAPI = axios.create(configHomesonoAPI);
