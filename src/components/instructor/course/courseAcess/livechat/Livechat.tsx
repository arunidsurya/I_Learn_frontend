import React, { useEffect, useRef, useState } from "react";
import { MdOutlineSend } from "react-icons/md";
import { Socket } from "socket.io-client";
import { addChat, getChat } from "../../../../services/api/userApi";

type Props = {
  socket: Socket;
  courseId: string;
  user: any;
};

const Livechat: React.FC<Props> = ({ socket, courseId, user }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("");
  const [messageData, setMessageData] = useState<
    { userName: string; userId: string; message: string; courseId: string }[]
  >([]);

  const handleMessaging = async () => {
    const userId = user._id;
    const userName = user.name;

    const data = {
      userName,
      userId,
      courseId,
      message,
    };

    console.log(userName, userId, courseId, message);

    const res = await addChat(courseId, userId, userName, message);

    console.log(res?.data);

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
        const filteredData = chatData.map(
          ({ _id, createdAt, ...rest }: { _id: string; createdAt: Date }) =>
            rest
        ); // Explicitly define types for _id and createdAt
        setMessageData(filteredData);
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

  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-[50%] mt-5 mx-auto">
        <div
          ref={containerRef}
          className="w-full border border-gray-400 rounded max-h-[500px] overflow-auto flex flex-col relative p-2"
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
                  <p className="text-sm font-medium">{data.userName}</p>
                  <p className="text-base">{data.message}</p>
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
