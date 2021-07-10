import axios from "axios";
const BASEURL = "https://randomuser.me/api/?results=200&nat=US";

export default {
  getUsers: function() {
    return axios.get(BASEURL);
  }
};