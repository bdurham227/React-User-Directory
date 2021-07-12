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
  .sort(this.arrangeUsers)
  .map((user, index) => {
    return (
      <tr key={index}>
        <td>
          <img src={user.image} alt="user"></img>
        </td>
        <td>{user.first}</td>
        <td>{user.last}</td>
        <td>{user.email}</td>
        <td>{new Date(user.dob).toDateString()}</td>
      </tr>
     
    );
  });
};

handleHeaderClass = col => {
  return this.state.col === col ? `clickable ${this.state.sort}` : `clickable`;
};

handleArrangeFormat = col => {
  this.state.col === col && this.state.sort === "ascending"
      ? this.setState({ sort: "descending", col: col })
      : this.setState({ sort: "ascending", col: col });
}



arrangeUsers = (a, b) => {
  if(a[this.state.col] < b[this.state.col]) {
    return this.state.sort === 'ascending' ? -1 : 1;
  } else if (a[this.state.col] > b[this.state.col]) {
    return this.state.sort === 'ascending' ? 1: -1;
  }
  return 0;
};



  render() { 
    return ( 
      <>
      <div className="input-group justify-content-center">
        <div className="input-group-prepend"></div>
        <input
          onChange={this.handleInputChange}
          type="search"
          className="form-control m-3"
          placeholder="Search"
          aria-label="SearchBox"
          aria-describedby="basic-addon1"
        />
      </div>
      <div className="table m-3">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">
                <span
                  className={this.handleHeaderClass("first")}
                  onClick={() => {
                    this.handleArrangeFormat("first");
                  }}
                >
                  First
                </span>
              </th>
              <th scope="col">
                <span
                  className={this.handleHeaderClass("last")}
                  onClick={() => this.handleArrangeFormat("last")}
                >
                  Last
                </span>
              </th>
              <th scope="col">
                <span
                  className={this.handleHeaderClass("email")}
                  onClick={() => this.handleArrangeFormat("email")}
                >
                  Email
                </span>
              </th>
              <th scope="col">
                <span
                  className={this.handleHeaderClass("dob")}
                  onClick={() => this.handleArrangeFormat("dob")}
                >
                  DOB
                </span>
              </th>
            </tr>
          </thead>
          <tbody>{this.renderUsers()}</tbody>
        </table>
      </div>
    </>
     );
  }
}
 
export default Wrapper;