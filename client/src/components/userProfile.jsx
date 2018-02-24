import React from 'react';
import ReactDom from 'react-dom';
import { Tabs, Tab, Panel } from 'react-bootstrap';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.renderPersonalInfo = this.renderPersonalInfo.bind(this);
  }

  componentWillMount() {

  }

  renderPersonalInfo() {
    let user = this.props.user;
    let num = '';
    if (user.aptNo !== 'undefined') {
      num = user.aptNo;
    }
    return(
      <div>
        <Panel bsStyle="info">
          <Panel.Heading>
            <Panel.Title componentClass="h3">Name</Panel.Title>
          </Panel.Heading>
          <Panel.Body>{user.firstname} {user.lastname}
          </Panel.Body>
        </Panel>
        <Panel bsStyle="info">
          <Panel.Heading>
            <Panel.Title componentClass="h3">Address</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <p>{user.street} {num}</p>
            <p>{user.city}, {user.state} {user.zip}</p>
          </Panel.Body>
        </Panel>
      </div>
    )
  }

  render() {
    console.log('user in user profile', this.props.user)
    return(
      <div className="user-profile container-fluid">
        <h3>Your Account</h3>
        <Tabs defaultActiveKey={1} id="user-profile-tabs">
          <Tab eventKey={1} title="Personal Info" >
            {this.renderPersonalInfo()}
          </Tab>
          <Tab eventKey={2} title="Orders">
            <h4>Your orders</h4>
          </Tab>
        </Tabs>
      </div>
    )
  }
}

export default UserProfile