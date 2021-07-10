import React, { Component } from 'react';
import "./styles.css";
import API from "../../utils/API";

class Wrapper extends Component {
  state = { 
    users: [],
    search: "",
    sort: "",
    col: ""
   };

componentMount() {
  API.getUsers()
  .then(res => {
    const users = res.data.results.map(user => {
      return {
        first: user.name.first,
        last: user.name.last,
        email: user.email,
        dob: user.dob.date,
        image: user.picture.medium
      };
    });
    this.setState({ users: users});
  })
  .catch(err => console.log(err));
}




  render() { 
    return (  );
  }
}
 
export default Wrapper;