import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  LinkAuthenticationElement,
  PaymentElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useDispatch } from "react-redux";
import { SaveUser } from "../../../../../redux/features/loginSlice";


type Props = {
  setOpen: any;
  courseId:string
};

const CheckoutPremium: React.FC<Props> = ({ setOpen}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [orderData, setOrderData] = useState<any>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    if (error) {
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setIsLoading(false);
      axios
        .post(
          "http://localhost:5000/api/v1/user/create-premium-order",
          { payment_info: paymentIntent },
          {
            withCredentials: true,
          }
        )
        .then((res: any) => {
          if (res.data.success) {
            console.log(res.data);

            setOrderData(res.data.result.newOrder);
            dispatch(SaveUser(res.data.result.user));
          }
        })
        .catch((error: any) => {
          console.log(error);
          setError(error);
        });
    }
  };
  useEffect(() => {
    if (orderData) {
      setOpen(false);
      // redirect(`/course-access/${course._id}`)
    //   navigate(`/course-access/${course._id}`);
    }
    if (error) {
      console.log(error);
    }
  }, [orderData, error]);

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement id="payment-element" />
      <div className="flex justify-between mt-4">
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  mt-8 rounded-full focus:outline-none focus:shadow-outline"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner">
                Paying
              </div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="bg-red-500 hover:bg-gray-700 text-white font-bold py-2 px-4 mt-8 rounded-full focus:outline-none focus:shadow-outline "
        >
          Cancel
        </button>
      </div>
      {/* Show any error or success messages */}
      {/* {message && <div id="payment-message">{message}</div>} */}
    </form>
  );
};

export default CheckoutPremium;
