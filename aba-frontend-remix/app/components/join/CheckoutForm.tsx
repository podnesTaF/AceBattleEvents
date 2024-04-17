import { useNavigate } from "@remix-run/react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { handleSubmit } = useForm();
  const navigate = useNavigate(); // For navigation after successful payment

  const onSubmit = async () => {
    if (!stripe || !elements) {
      console.log("Stripe has not been initialized yet.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      console.log("Card details are missing.");
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(`Payment error: ${error.message}`);
    } else {
      console.log("PaymentMethod", paymentMethod);
      // Process the payment on your server, handle success or failure
      navigate("/success"); // Redirect to a success page
    }
  };

  return (
    <div className="payment-form">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="card-details">
          <CardElement />
        </div>
        <button type="submit" className="submit-btn" disabled={!stripe}>
          Submit Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
