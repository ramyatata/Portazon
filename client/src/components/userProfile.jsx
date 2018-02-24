import React from 'react';
import ReactDom from 'react-dom';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

  }



  render() {
    return(
      <div className="user-profile container-fluid">
        <h3>Welcome to your profile page!!</h3>
      </div>
    )
  }
}

export default UserProfile