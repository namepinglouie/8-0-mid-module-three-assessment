import { Component } from "react";

class Form extends Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            creditCard: "",
            zipCode: "",
        }
    }

    handleUserInput = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        })
    }

    render() {
        let {firstName, lastName, email, creditCard, zipCode} = this.state;
        return(
            <form onSubmit={(e)=>this.props.handleSubmitForm(e, firstName, lastName, email, creditCard, zipCode)} id="checkout">
              <label htmlFor="firstName">First Name</label>
              <br />
              <input type="text" onInput={this.handleUserInput} value={firstName} name="firstName" id="firstName" />
              <br />
              <label htmlFor="lastName">Last Name</label>
              <br />
              <input type="text" onInput={this.handleUserInput} value={lastName} name="lastName" id="lastName" />
              <br />
              <label htmlFor="email">Email</label>
              <br />
              <input type="email" onInput={this.handleUserInput} value={email} name="email" id="email" />
              <br />
              <label htmlFor="creditCard" >Credit Card</label>
              <br />
              <input type="text" onInput={this.handleUserInput} value={creditCard} name="creditCard" id="creditCard" />
              <br />
              <label htmlFor="zipCode">Zip Code</label>
              <br />
              <input type="text" onInput={this.handleUserInput} value={zipCode} name="zipCode" id="zipCode" />
              <br />
              <button type="submit">Buy Now</button>
            </form>
        )
    }
}

export default Form;