import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import LiveClass from './LiveClass';

type Props = {
  courseId: string;
};

const LiveVideoPage: React.FC<Props> = ({ courseId }) => {
  const [publishablekey, setPublishablekey] = useState("");
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/user/stripepublishablekey", {
        withCredentials: true,
      })
      .then((res: any) => {
        // console.log(res.data.result.course);

        if (res.data) {
          //   console.log(res.data);

          setPublishablekey(res.data.publishablekey);
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (publishablekey) {
      setStripePromise(loadStripe(publishablekey));
    }

    const amount = Math.round(500);
    // console.log("amount:", amount);

    axios
      .post(
        "http://localhost:5000/api/v1/user/payment",
        { amount },
        {
          withCredentials: true,
        }
      )

      .then((res: any) => {
        //   console.log(res.data);

        if (res.data) {
          // console.log(res.data);

          setClientSecret(res.data.client_secret);
        }
      })
      .catch((error: any) => {
        console.log("this is error");

        console.log(error);
      });
  }, [publishablekey]);

  return (
    <div className='mt-5'>
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

export default LiveVideoPage