import React, { useContext } from "react";
import StripeCheckout from "react-stripe-checkout";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Payments = () => {
  const { isAuth, fetchUser } = useContext(AuthContext);
  const handleToken = async (stripeToken) => {
    const result = await axios.post("/api/stripe", stripeToken);
    console.log(result);
    fetchUser(); //fetchingUser again to pull out new value of credits
  };
  return (
    <StripeCheckout
      name="Echo"
      description="5 credits for $5"
      amount={500} //500 cents is 5$
      token={(token) => handleToken(token)} //NOT API KEY -> token receives callback func
      //   callback is executed when we receive it from Stripe. It has
      //   data about payment, like Object of all infos {
      //         card: {id: "card_1IP4VlI6r4UAGMypYSbTCIWt", object: "card", address_city: null, address_country: null, address_line1: null, …}
      // client_ip: "192.38.130.125"
      // created: 1614338973
      // email: "hithere@gmail.com"
      // id: "tok_1IP4VlI6r4UAGMyp8eKrjX8y"
      // livemode: false
      // object: "token"
      // type: "card"
      // used: false
      // }
      stripeKey={process.env.REACT_APP_STRIPE_PUB_KEY}
    >
      <button className="btn">Add Credits</button>
    </StripeCheckout>
  );
};

export default Payments;
