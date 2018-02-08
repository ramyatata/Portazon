import React from 'react';

class RegisterUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      pwd: '',
      email: '',
      street: '',
      aptNo:'',
      city: '',
      state: '',
      zip: '',
      country: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(field, e) {
    this.setState({field: e.target.value});
  }


  render() {
    return (
      <div>
        <h3>Registration Form</h3>
        <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" onChange={e => {this.handleChange('firstName', e)}}/>
      </div>

    )
  }
}

export default RegisterUserForm;

