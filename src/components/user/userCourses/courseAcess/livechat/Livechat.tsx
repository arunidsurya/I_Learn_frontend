import React, { useEffect, useRef, useState } from "react";
import { MdOutlineSend } from "react-icons/md";
import { Socket } from "socket.io-client";
import { addChat, getChat } from "../../../../services/api/userApi";
import { formatCreatedAt } from "../../../../services/formats/FormatDate";

type Props = {
  socket: Socket;
  courseId: string;
  user: any;
};

export interface IChat extends Document {
  userId: string;
  userName: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

const Livechat: React.FC<Props> = ({ socket, courseId, user }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("");
  const [messageData, setMessageData] = useState<IChat[]>([]);

  const handleMessaging = async () => {
    const userId = user._id;
    const userName = user.name;

    const data = {
      _id:Math.random(),
      userName,
      userId,
      courseId,
      message,
      updatedAt:new Date().toISOString(),
      createdAt:new Date().toISOString()
    };

    // console.log(userName, userId, courseId, message);

    const res = await addChat(courseId, userId, userName, message);

    // console.log(res?.data);

    if (res?.data.success) {
      
      socket.emit("live-chat", data);
      setMessageData((prevData: any) => [...prevData, data]);
      setMessage("");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getChat(courseId);
        const chatData = result?.data.result.chat || [];
        setMessageData(chatData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [courseId]);

  // Function to handle receiving messages
  const receiveMessageHandler = (data: {
    courseId: string;
    currentMessage: string;
    name: string;
    updatedAt:string;
    createdAt:string
  }) => {
    setMessageData((prevData: any) => [...prevData, data]);
  };

  useEffect(() => {
    // Subscribe to "receive_message" event
    socket.on("receive_message", receiveMessageHandler);

    // Clean up subscription on unmount
    return () => {
      socket.off("receive_message", receiveMessageHandler);
    };
  }, [socket]);

  useEffect(() => {
    socket.emit("join_session", { courseId });
  }, [socket, courseId]);

  useEffect(() => {
    // Scroll to the bottom when messageData changes
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messageData]);

  // console.log(messageData);

  return (
    <div className="flex items-center justify-center w-full md:w-[90%} sm:w-[90%]">
      <div className="w-[80%] mt-5 mx-auto">
        <div
          ref={containerRef}
          className="w-full border shadow-lg border-gray-300 p-4 rounded max-h-[500px] overflow-auto flex flex-col relative "
          style={{ minHeight: "500px" }}
        >
          <div className="flex-grow">
            {messageData.map((data, index) => (
              <div
                key={index}
                className={`flex ${
                  data.userId === user._id ? "justify-end" : "justify-start"
                } mb-2 `}
              >
                <div
                  className={`${
                    data.userId === user._id
                      ? "bg-blue-500 text-white rounded-tl-lg rounded-bl-lg rounded-tr-lg p-3"
                      : "bg-gray-600 text-white rounded-tl-lg rounded-br-lg rounded-tr-lg p-3"
                  } min-w-[100px]`}
                >
                  <p className="text-sm font-medium sm:text-base">
                    {data.userName}
                  </p>
                  <p className="text-base sm:text-base">{data.message}</p>
                  <p className="text-base sm:text-[12px]">
                    {formatCreatedAt(data.updatedAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between p-4">
            <input
              type="text"
              placeholder="Your message..."
              className="flex-grow mr-2 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={(e: any) => setMessage(e.target.value)}
            />
            <button
              className="flex items-center justify-center bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-600"
              onClick={handleMessaging}
            >
              <MdOutlineSend size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Livechat;
