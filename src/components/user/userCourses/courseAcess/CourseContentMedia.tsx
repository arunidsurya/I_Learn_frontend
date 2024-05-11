import React, { useEffect, useState } from "react";
import CoursePlayer from "../../../services/CoursePlayer";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import defaultImage from "../../../../assets/profile.png";
import { toast } from "react-hot-toast";
import { addAnswer, addQuestion } from "../../../services/Api/userApi";
import { formatCreatedAt } from "../../../services/formats/FormatDate";
import { BiMessage } from "react-icons/bi";
import { Textarea } from "@nextui-org/react";
import Livechat from "./Livechat";
import { Socket } from "socket.io-client";

type Props = {
  data: any;
  courseId: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  updateCourseData: () => void;
  updateCourseData2: () => void;
  socket:Socket
};

const CourseContentMedia: React.FC<Props> = ({
  data,
  courseId,
  activeVideo,
  setActiveVideo,
  user,
  updateCourseData,
  updateCourseData2,
  socket
}) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [answerSuccess, setSetAnswerSuccess] = useState(false);
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");

  const isReviewExists = data?.reviews?.find(
    (item: any) => item.user._id === user._id
  );



  const handleQuestion = async () => {
    if (question.length === 0) {
      toast.error("Question can't be empty");
    } else {
      const contentId = data[activeVideo]._id;

      // console.log(data[activeVideo]._id, courseId, question);

      const res = await addQuestion(courseId, contentId, question);
      if (res?.data.success) {
        setIsSuccess(true);
        toast.success(res.data.message);
      } else {
        setIsSuccess(false);
        toast.error("Question submission failed!!");
      }
    }
  };

  useEffect(() => {
    console.log("parent");
    
    // console.log("useEffect-courseContentMedia component");
    if (isSuccess===true) {
      setQuestion("");
      
      updateCourseData2();
      setIsSuccess(false);
    }
    if (answerSuccess===true) {
      setAnswer("");
      console.log("answer call");
      
      updateCourseData();
      setSetAnswerSuccess(false);
    }
  }, [isSuccess, answerSuccess]);

  const handleAnswerSubmit = async () => {
    // console.log("called handleAnswerSubmit");
    // courseId, contentId, questionId, answer;
    const contentId = data[activeVideo]._id;
    const res = await addAnswer(courseId, contentId, questionId, answer);
    console.log(res);
    if (res?.data.success) {
      setSetAnswerSuccess(true);
    }
  };

  // console.log(questionId);

  return (
    <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
      <CoursePlayer videoUrl={data[activeVideo].videoUrl} width="100%" />
      <div className="w-full flex items-center justify-between my-3">
        <div
          className={`!min-h-[40px] !py-[unset] ${
            activeVideo === 0 && "!cursor-no-drop opacity-[0.8]"
          } bg-blue-500 flex items-center justify-center rounded-full p-2 text-white`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-2" />
          Prev Lesson
        </div>
        <div
          className={`!min-h-[40px] !py-[unset] ${
            data.length - 1 === activeVideo && "!cursor-no-drop opacity-[0.8]"
          } bg-blue-500 flex items-center justify-center rounded-full p-2 text-white`}
          onClick={() =>
            setActiveVideo(
              data && data.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          Next Lesson
          <AiOutlineArrowRight className="ml-2" />
        </div>
      </div>
      <h1 className="pt-2 text-[25px] font-[600] mb-10 mt-8">
        {data[activeVideo].title}
      </h1>
      <div className="w-full p-2 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
        {["Overview", "Resources", "Q&A", "Reviews" ,"Live Chat"].map(
          (text: any, index: number) => (
            <h5
              key={index}
              className={`800px:text-[20px] cursor-pointer font-bold mb-8 ${
                activeBar === index && "text-red-500"
              }`}
              onClick={() => setActiveBar(index)}
            >
              {text}
            </h5>
          )
        )}
      </div>
      {activeBar === 0 && (
        <p className="text-[18px] whitespace-pre-line mb-3 mt-8">
          {data[activeVideo]?.description}
        </p>
      )}
      {activeBar === 1 && (
        <div className="mt-4">
          {data[activeVideo]?.links.map((item: any, index: number) => (
            <div className="mb-5">
              <h2 className="800px:text-[20px] 800px:inline-block">
                {item.title && item.title + " : "}
              </h2>
              <a
                href={item.url}
                className="inline-block text-[#4395c4] 800px:text-[20px] 800pc:pl-2 ml-4"
              >
                {item.url}
              </a>
            </div>
          ))}
        </div>
      )}
      {activeBar === 2 && (
        <>
          <div className="flex w-full mt-8">
            <img
              src={user?.avatar ? user.avatar.url : defaultImage}
              alt=""
              width={50}
              height={50}
              className="rounded-full w-[50px] h-[50px] object-cover"
            />
            <textarea
              name=""
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              id=""
              cols={40}
              rows={5}
              placeholder="Write your question"
              className=" p-2 ml-3 border border-gary-400 rounded 800px:w-[90%] 800px:text-[18px] font-Poppins"
            ></textarea>
          </div>
          <div className="w-full flex justify-end ">
            <div
              className="text-[18px] mt-5 800px:mr-0 mr-2 !w-[120px] !h-[40px] bg-green-500 flex justify-center text-center items-center rounded-md text-white cursor-pointer hover:opacity-80"
              onClick={handleQuestion}
            >
              Submit
            </div>
          </div>
          <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
          <div>
            <CommentReply
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              setQuestionId={setQuestionId}
            />
          </div>
        </>
      )}
      {activeBar === 3 && (
        <div className="w-full">
          <>
            {!isReviewExists && (
              <>
                <div className="flex w-full">
                  <img
                    src={user?.avatar ? user.avatar.url : defaultImage}
                    alt=""
                    width={50}
                    height={50}
                    className="rounded-full w-[50px] h-[50px] object-cover"
                  />
                  <div className="w-full">
                    <h5 className="pl-3 text-[20px] font-[500]">
                      Give a Rating <span className="text-red-500">*</span>
                    </h5>
                    <div className="flex w-full ml-2 pb-3">
                      {[1, 2, 3, 4, 5].map((i) =>
                        rating >= i ? (
                          <AiFillStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        ) : (
                          <AiOutlineStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        )
                      )}
                    </div>
                    <textarea
                      name=""
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      id=""
                      cols={40}
                      rows={5}
                      placeholder="Write your comment..."
                      className="outline-none bg-transparent 800px:ml-3 border border-gray-500 w-[90%] 800px:w-full p-2 rounded text-[18px] font-Poppins"
                    />
                  </div>
                </div>
                <div className="w-full flex justify-end ">
                  <div className="text-[18px] mt-5 800px:mr-0 mr-2 !w-[120px] !h-[40px] bg-green-500 flex justify-center text-center items-center rounded-md text-white">
                    Submit
                  </div>
                </div>
              </>
            )}
          </>
        </div>
      )}
      {activeBar === 4 &&(
        <>
        <Livechat socket={socket} courseId={courseId} user={user}/>
        </>
      )}
    </div>
  );
};

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  setQuestionId,
}: any) => {
  return (
    <>
      <div className="w-full-my-3">
        {data[activeVideo].questions.map((item: any, index: any) => (
          <CommentItem
            key={index}
            data={data}
            activeVideo={activeVideo}
            item={item}
            index={index}
            answer={answer}
            setAnswer={setAnswer}
            setQuestionId={setQuestionId}
            handleAnswerSubmit={handleAnswerSubmit}
          />
        ))}
      </div>
    </>
  );
};

const CommentItem = ({
  setQuestionId,
  item,

  answer,
  setAnswer,
  handleAnswerSubmit,
}: any) => {
  const [replyActive, setReplyActive] = useState(false);
  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          <div>
            <img
              src={item.user.avatar ? item.user.avatar.url : defaultImage}
              alt=""
              width={50}
              height={50}
              className="rounded-full w-[50px] h-[50px] object-cover"
            />
          </div>
          <div className="pl-3">
            <h5 className="text-[20px]">{item?.user.name}</h5>
            <p>{item?.question}</p>
            <small className="text-gray-500">
              {formatCreatedAt(item?.createdAt)}
            </small>
          </div>
        </div>
        <div className="w-full flex">
          <span
            className="800px:pl-16 cursor-pointer mr-2 text-gray-500"
            onClick={() => {
              setReplyActive(!replyActive);
              setQuestionId(item._id);
            }}
          >
            {!replyActive
              ? item?.questionReplies?.length !== 0
                ? "All Replies"
                : "Add Reply"
              : "Hide Replies"}
          </span>
          <BiMessage size={18} className="cursor-pointer" fill="#808080" />
          <span className="pl-1 mt-[-8px] cursor-pointer text-[#808080]">
            {item.questionReplies.length}
          </span>
        </div>
        {replyActive && (
          <>
            {item.questionReplies.map((item: any) => (
              <div className="w-full flex 800px:ml-16 my-5">
                <div>
                  <img
                    src={item.user.avatar ? item.user.avatar.url : defaultImage}
                    alt=""
                    width={50}
                    height={50}
                    className="rounded-full w-[50px] h-[50px] object-cover"
                  />
                </div>
                <div className="pl-2">
                  <h5 className="text-[20px]">{item?.user?.name}</h5>
                  <p>{item.answer}</p>
                  <small className="text-gray-400">
                    {formatCreatedAt(item.createdAt)}
                  </small>
                </div>
              </div>
            ))}
            <>
              <div className="w-full flex relative">
                <input
                  type="text"
                  placeholder="Enter your answer..."
                  value={answer}
                  onChange={(e: any) => setAnswer(e.target.value)}
                  className="block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-gray-500 p-[5px] w-[95%]"
                />
                <button
                  type="submit"
                  className="absolute right-0 bottom-1"
                  onClick={handleAnswerSubmit}
                  disabled={answer === ""}
                >
                  Submit
                </button>
              </div>
            </>
          </>
        )}
      </div>
    </>
  );
};

export default CourseContentMedia;
