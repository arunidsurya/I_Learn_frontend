import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import LiveClass from "./LiveClass";
import {
  handleCoursePayment,
  handleGetStripePublishablekey,
} from "../../../../services/api/userApi";

type Props = {
  courseId: string;
};

const LiveVideoPage: React.FC<Props> = ({ courseId }) => {
  const [publishablekey, setPublishablekey] = useState("");
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");

  const getStripeKey = async () => {
    const res = await handleGetStripePublishablekey();
    if (res?.data) {
      setPublishablekey(res.data.publishablekey);
    }
  };

  useEffect(() => {
    getStripeKey();
  }, []);

  const makePayment = async () => {
    if (publishablekey) {
      setStripePromise(loadStripe(publishablekey));
    }

    const amount = Math.round(500);
    // console.log("amount:", amount);

    const res = await handleCoursePayment(amount);
    if (res?.data) {
      setClientSecret(res.data.client_secret);
    }
  };

  useEffect(() => {
    makePayment();
  }, [publishablekey]);

  return (
    <div className="mt-5">
      {stripePromise && (
        <LiveClass
          stripePromise={stripePromise}
          clientSecret={clientSecret}
          courseId={courseId}
        />
      )}
    </div>
  );
};

export default LiveVideoPage;
