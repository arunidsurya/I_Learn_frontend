import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5';
import CheckoutPremium from './CheckoutPremium';

type Props = {
    price:number;
    open:boolean;
  setOpen: any;
};

const PremiumAccountPay:React.FC<Props> = ({open,setOpen,price}) => {
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

      const amount = price;
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
}

export default PremiumAccountPay