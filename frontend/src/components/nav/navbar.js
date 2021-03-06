import React from 'react';
import Modal from '../modal/modal';
import Tutorial from '../tutorial/tutorial';
import { withRouter } from 'react-router-dom';
import { calculateDays } from './../../util/calculations';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          day: calculateDays(new Date(this.props.currentUser.date), Date.now())
        }
        this.props.saveDay({ day: this.state.day });
        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
    }

    componentDidMount() {
      // Makes event listener to close dropdown onclick of document when refreshing page
      let dropdown = document.getElementById("dropdown"); 
      let dropdownParent = document.getElementsByClassName("dropdown-parent")[0];
      if(!!dropdownParent) {
        document.addEventListener('mouseup', e => {
          if ((e.target !== dropdownParent) && (!Array.from(dropdownParent.children).includes(e.target))) {
            dropdown.style.display = "none";
          }
        })
      }
      if (!this.props.loggedIn) {
        document.getElementsByClassName("navbar")[0].classList.add("onsplash");
        document.getElementsByClassName("logo")[0].classList.add("altcolor");
      } else {
        document.getElementsByClassName("navbar")[0].classList.remove("onsplash");
        document.getElementsByClassName("logo")[0].classList.remove("altcolor");
      }
    }

    componentDidUpdate(preProps) {
      // Makes event listener to close dropdown onclick of document when navigating back to page
      let dropdown = document.getElementById("dropdown");
      let dropdownParent = document.getElementsByClassName("dropdown-parent")[0];
      if (!!dropdownParent) {
        document.addEventListener('mouseup', e => {
          if ((e.target !== dropdownParent) && (!Array.from(dropdownParent.children).includes(e.target))) {
            dropdown.style.display = "none";
          }
        })
      }

      if (!this.props.loggedIn) {
        document.getElementsByClassName("navbar")[0].classList.add("onsplash");
        document.getElementsByClassName("logo")[0].classList.add("altcolor");
      } else {
        document.getElementsByClassName("navbar")[0].classList.remove("onsplash");
        document.getElementsByClassName("logo")[0].classList.remove("altcolor");
      }

      if(this.props.currentUser && preProps.currentUser) {
        if(this.props.currentUser.date !== preProps.currentUser.date) {
          this.setState({ day: calculateDays(new Date(this.props.currentUser.date), Date.now())} )
        }
      }
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout()
        this.props.history.push("/");
    }

    handleDropdown() {
        let dropdown = document.getElementById("dropdown");
        if (dropdown.style.display === "block") {
          dropdown.style.display = "none";
        } else {
          dropdown.style.display = "block";
        }
    }

    handleClick() {
      if(this.props.loggedIn) {
        this.props.history.push("/dashboard");
      } else {
        this.props.history.push("/");
      }
    }

    incrementDay() {
      let updatedUser = this.props.currentUser;
      let newDate = new Date(updatedUser.date);
      newDate.setDate(newDate.getDate() - 1);
      updatedUser.date = newDate;
      this.props.updateUser(updatedUser)
        .then(data => {
          this.setState({ day: calculateDays(new Date(data.user.date), Date.now()) }, () => this.props.saveDay({ day: this.state.day }))
      });
    }

    // Selectively render links dependent on whether the user is logged in
    getLinks() {
        if (this.props.loggedIn) {
            return (
              <div className="dropdown-parent">
                <img
                  onClick={this.handleDropdown.bind(this)}
                  className="thumbnail"
                  alt=""
                  src="../../../image/pfp.png"
                ></img>
                <div id="dropdown">
                  <ul className="dropdown-list">
                    <li className='dropdown-name'>Welcome, {this.props.currentUser.username}</li>
                    <li className="dropdown-logout" onClick={this.logoutUser}>Logout</li>
                  </ul>
                </div>
              </div>
            );
        } else {
            return (
                <nav className="login-signup">
                    <button className="login" onClick={this.props.login}>Login</button>
                    &nbsp;or&nbsp;
                    <button className="signup" onClick={this.props.signup}>Signup</button>
                </nav>
            );
        }
    }

    render() {
      let clock;
      let incrementDay;
      // if (!!this.props.currentUser) {
      //   if (Object.keys(this.props.currentUser).length > 0) {
      //     incrementDay = <i onClick={this.incrementDay.bind(this)} className="fa fa-plus-circle"></i>
        // clock = <h1 className="days-counter">Day: {this.state.day} {incrementDay}</h1>
      //   }
      // }
        return (
          <div className="navbar">
            <h1 className="logo" onClick={this.handleClick.bind(this)}>
              SWEETT
            </h1>

            <Modal />
            {this.props.status === "show" && this.props.category ? <Tutorial category={this.props.category} /> : null}
            {this.props.location.pathname === "/" ? null : <h1 className="days-counter">Day: {this.state.day} {incrementDay}</h1>}
            {this.getLinks()}
          </div>
        );
    }
}

export default withRouter(NavBar);