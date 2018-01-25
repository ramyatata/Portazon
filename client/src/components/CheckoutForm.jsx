import React from 'react';
import {injectStripe, CardCVCElement} from 'react-stripe-elements';

// import AddressSection from './AddressSection.jsx';
import CardSection from './CardSection.jsx';
import axios from 'axios';


class CheckoutForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        var customerName = 'Jenny Rosen';
        var paymentAmount = 100;

        this.props.stripe.createToken({name: customerName}).then(({token}) => {
            console.log('Received Stripe token', token); 
 
            var paymentButton =  document.getElementById("paymentButton");  
            paymentButton.innerHTML = "Processing Payment ...";
            paymentButton.style.backgroundColor = 'orange';

            axios.post('/payment', 
                {
                    stripeToken: token,
                    paymentAmount: paymentAmount
                }
            )
            .then(function (response) {
                paymentButton.style.backgroundColor = 'green';
                paymentButton.innerHTML = 'Payment Successful! Thanks for your Order!'
                paymentButton.disabled =  true;
                console.log(response);
            })
            .catch(function (error) {
                paymentButton.style.backgroundColor = 'red';
                paymentButton.innerHTML = 'Payment Failed! Refresh Page and Try Again'
                paymentButton.disabled =  true;
                console.log(error);
            })
        });
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                {/* <AddressSection/> */}
                
                <CardSection/>
                
                <button id="paymentButton"> Confirm and Pay  </button>
            </form>
        );
    }

}

export default injectStripe(CheckoutForm);