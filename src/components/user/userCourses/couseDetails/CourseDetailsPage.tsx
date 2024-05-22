import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CouseDetails from "./CouseDetails";
import { loadStripe } from "@stripe/stripe-js";
import socketIo from "socket.io-client";
import {
  handleCoursePayment,
  handleGetOneCourse,
  handleGetStripePublishablekey,
} from "../../../services/api/userApi";

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

  const getCourse = async () => {
    const courseId = params._id || "";
    const res = await handleGetOneCourse(courseId);
    return new Promise((resolve, reject) => {
      if (res?.data) {
        setCourse(res.data.result.course);
        resolve(res.data.result.course);
      } else {
        setError(res?.data.message);
        reject(res?.data.message);
      }
    });
  };

  useEffect(() => {
    getCourse();
  }, []);

  const getStripepublishablekey = async () => {
    const res = await handleGetStripePublishablekey();
    if (res?.data) {
      setPublishablekey(res.data.publishablekey);
    }
  };

  useEffect(() => {
    getStripepublishablekey();
  }, []);

  const makePayment = async (amount: number) => {
    const res = await handleCoursePayment(amount);
    if (res?.data) {
      setClientSecret(res.data.client_secret);
    }
  };

  useEffect(() => {
    if (publishablekey) {
      setStripePromise(loadStripe(publishablekey));
    }
    if (course) {
      const amount = Math.round(course.price * 100);
      makePayment(amount);
    }
  }, [publishablekey, course]);


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
