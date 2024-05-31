import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import CheckoutPremium from "./CheckoutPremium";
import { handleCoursePayment, handleGetStripePublishablekey } from "../../../services/api/userApi";

type Props = {
  price: number;
  open: boolean;
  setOpen: any;
};

const PremiumAccountPay: React.FC<Props> = ({ open, setOpen, price }) => {
  const [publishablekey, setPublishablekey] = useState("");
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");

  const getStripePublishableKry = async () => {
    const res = await handleGetStripePublishablekey();
    if (res?.data) {
      setPublishablekey(res.data.publishablekey);
    }
  };

  useEffect(() => {
    axios;
    getStripePublishableKry();
  }, []);


  const userPremiumPayment = async()=>{
        const amount = price;
      const res = await handleCoursePayment(amount)
              if (res?.data) {
                setClientSecret(res.data.client_secret);
              }
  }

  useEffect(() => {
    if (publishablekey) {
      setStripePromise(loadStripe(publishablekey));
    }
    userPremiumPayment();

  }, [publishablekey]);
  return (
    <div>
      {open && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center">
          <div className="bg-[#00000036] w-full h-full absolute top-0 left-0"></div>
          <div className="w-[500px] h-[500px] bg-white rounded-xl shadow p-3 relative">
            <div className="absolute top-0 right-0">
              <IoCloseOutline
                size={40}
                className="text-black cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <div className="w-full">
              {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutPremium setOpen={setOpen} />
                </Elements>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumAccountPay;
