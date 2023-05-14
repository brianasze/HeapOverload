import axios from "axios"

/*
  This is the setup for the API calls to the application server.
  This sets up the url to call and the type of data that will be send and recieved.
*/
export default axios.create({
    baseURL: "http://34.125.134.2:5000/api",
    headers: {
      "Content-type": "application/json"
    }
  });