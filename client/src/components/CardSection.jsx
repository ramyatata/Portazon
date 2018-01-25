import React from 'react';
import {CardElement} from 'react-stripe-elements';

class CardSection extends React.Component {
    render() {
        return (
            <label>
                <h1> Payment Information </h1>
                <h3> Please enter your Credit or Debit card details. </h3>
                <CardElement style={{base: {fontSize: '18px'}}} />
            </label>

        );
    }
};

export default CardSection;