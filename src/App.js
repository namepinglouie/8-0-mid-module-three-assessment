import { Component } from "react";
import productData from "./data/productData";
import formatAPrice from "./helpers/formatPrice";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: productData,
      cart: [],
      subtotal: 0,
      tax: 0,
      total: 0,

      firstName: "",
      lastName: "",
      email: "",
      creditCard: "",
      zipCode: "",
    }
  }

  calculateTax = (num) => {
    return num * 0.05;
  }

  handleProductClick = (product) => {
    let subTotalNum = this.state.subtotal + product.price;
    let taxTotalNum = this.calculateTax(subTotalNum);
    let totalNum = subTotalNum + taxTotalNum;
    this.setState({
      cart: [...this.state.cart, product],
      subtotal: subTotalNum,
      tax: taxTotalNum,
      total: totalNum,
    })
  }

  handleUserInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmitForm = (e) => {
    let {firstName, lastName, email, creditCard, zipCode, total} = this.state;
    e.preventDefault();
    if(firstName === "" || lastName === "" || email === "") {
      alert("Input is not valid");
    } 
    if(creditCard.length < 16 || !creditCard.match(/^[0-9]+$/)) {
      alert("Credit card number is not valid");
    } 
    if(zipCode.length < 5 || !zipCode.match(/^[0-9]+$/)) {
      alert("Zip code is not valid");
    }
    if(firstName && lastName && email && creditCard && zipCode) {
      alert(`Purchase complete! You will be charged ${formatAPrice(total)}`);
    }
  }

  displayTax = () => {
    let totalTax = this.calculateTax(this.state.subtotal);
    this.setState({
      tax: totalTax
    })
  }

  render() {
    let {subtotal, tax, total, firstName, lastName, email, creditCard, zipCode} = this.state;

    let displayProduct = this.state.data.map((product) => {
      return (
        <div className="product-display">
          <h3>{product.name}</h3>
          <p>Price: {formatAPrice(product.price)}</p>
          <button type ="submit" onClick={()=>this.handleProductClick(product)}>Add To Cart</button>
          <br />
          <img src={product.img} alt={product.name} />
          <p>{product.description}</p>
        </div>
      )
    })

    let displayCart = this.state.cart.map((item) => {
      return <li>{item.name}: {formatAPrice(item.price)}</li>
    })

    return(
      <div id="container">
        <h1>My Garage Sale</h1>
        <section className="products">{displayProduct}</section>
        <div id="cart-form-container">
          <section className="cart">
            <h2>Cart</h2>
            <ul>{displayCart}</ul>
            <h3>Subtotal: {formatAPrice(subtotal)}</h3>
            <h3>Tax: {formatAPrice(tax)}</h3>
            <h3>Total: {formatAPrice(total)}</h3>
          </section>
          <section className="checkout-form">
            <h2>Checkout</h2>
            <form onSubmit={this.handleSubmitForm} id="checkout">
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
          </section>
        </div>
      </div>
    )
  }
}


export default App;
