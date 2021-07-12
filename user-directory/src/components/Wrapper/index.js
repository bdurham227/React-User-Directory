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

handleInputChange = event => {
  this.setState({ search: event.target.value });
};

filterUsers() {
  const search = this.state.search.toLowerCase();
  return this.state.users.filter(user => {
    return (
      user.first.toLowerCase().includes(search) || user.last.toLowerCase().includes(search)
    );
  });
}

renderUsers = () => {
  return this.filterUsers()
  .sort(this.sortUsers)
  .map((user, index) => {
    return (
      <tr key={index}>
        <td>
          <img src={user.image} alt="user"></img>
        </td>
        <td>{user.first}</td>
        <td>{user.last}</td>
        <td>{user.email}</td>
      </tr>
     
    )
  })
}



  render() { 
    return (  );
  }
}
 
export default Wrapper;