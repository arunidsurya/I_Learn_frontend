import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CouseDetails from "./CouseDetails";
import { loadStripe } from "@stripe/stripe-js";
import socketIo from "socket.io-client";

const baseUrl = import.meta.env.VITE_SOCKET_SERVER_URL;
const socket = socketIo(baseUrl, { transports: ["websocket"] });

const CourseDetailsPage = () => {
  const [course, setCourse] = useState<any>();
  const [error, setError] = useState("");
  const [publishablekey, setPublishablekey] = useState("");
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");

  const params = useParams();

    useEffect(() => {
      socket.on("connect", () => {
        console.log("Socket connected");
      });

      // Clean up the socket connection when component unmounts
      // return () => {
      //   socket.disconnect();
      // };
    }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/user/getCourse/${params._id}`, {
        withCredentials: true,
      })
      .then((res: any) => {
        // console.log(res.data.result.course);
        return new Promise((resolve, reject) => {
          if (res.data) {
            setCourse(res.data.result.course);
            resolve(res.data.result.course);
          } else {
            setError(res.data.message);
            reject(res.data.message);
          }
        });
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

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
    if (course) {
      const amount = Math.round(course.price * 100);
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
    }
  }, [publishablekey, course]);

//   console.log(course);
//   console.log("publishablekey:",publishablekey);
//   console.log("clientSecret :",clientSecret);
//   console.log("stripePromise:",stripePromise);

  return (
    <div>
      {stripePromise && (
        <CouseDetails
          course={course}
          stripePromise={stripePromise}
          clientSecret={clientSecret}
          error={error}
          socket={socket}
        />
      )}
    </div>
  );
};

export default CourseDetailsPage;
