import React, { useEffect, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";
import ProgressBar from "./courseAcess/ProgressBar";
import { log } from "console";

type Props = {
  data: any;
  activeVideo?: number;
  setActiveVideo?: any;
  isDemo?: boolean;
  user?: any;
  courseId: string;
};

const CourseContentList: React.FC<Props> = ({
  data,
  activeVideo,
  setActiveVideo,
  isDemo,
  user,
  courseId,
}) => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set<string>()
  );
const [progress, setProgress] = useState(0);

useEffect(()=>{
// console.log(user.courseProgress);
if(user){
    const courseProgressObj = user?.courseProgress.find(
      (progress: any) => progress.courseId === courseId
    );

    const currentProgress =
      ([...courseProgressObj.sectionId].length / [...data].length) * 100;

    setProgress(currentProgress);
    console.log("called");
}

   
  
},[user])
  // console.log(user.courseProgress);
  const isChecked = (id: string) => {
    const courseProgressObj = user?.courseProgress.find(
      (progress: any) => progress.courseId === courseId
    );
    if (!courseProgressObj) {
      return null;
    }
    return courseProgressObj.sectionId.includes(id);
  };

  // Find unique video sections
  const videoSections: string[] = [
    ...new Set<string>(data?.map((item: any) => item.videoSection)),
  ];

  let totalCount: number = 0; //Total count of videos from previous sections

  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSections);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }
    setVisibleSections(newVisibleSections);
  };

  return (
    <div
      className={`mt-[20px] w-full sm:flex sm:flex-col  sm:justify-center  ${
        !isDemo && "ml-[-30px] sticky top-24 left-0 z-30"
      }`}
    >
      <div className="mb-8">
        <h1 className="text-gray-600 font-bold">Your progress</h1>
        <ProgressBar progress={progress} />
      </div>
      {videoSections.map((section: string, sectionIndex: number) => {
        const isSectionVisible = visibleSections.has(section);

        //Filter videos by section
        const sectionVideos: any[] = data.filter(
          (item: any) => item.videoSection === section
        );

        const sectionVideoCount: number = sectionVideos.length;
        const sectionVideoLength: number = sectionVideos.reduce(
          (totalLength: number, item: any) => totalLength + item.videoLength,
          0
        );

        const sectionStartIndex: number = totalCount;
        totalCount += sectionVideoCount;

        const sectionContentHours: number = sectionVideoLength / 60;

        return (
          <div
            className={`${isDemo && "border-b border-[#ffffff8e] pb-2"}  `}
            key={section}
          >
            <div className="w-full flex">
              {/* Render video section */}

              <div className="w-full flex justify-between items-center">
                <h2 className="text-[20px]">{section}</h2>
                <button
                  className="mr-4 cursor-pointer"
                  onClick={() => toggleSection(section)}
                >
                  {isSectionVisible ? (
                    <BsChevronUp size={20} />
                  ) : (
                    <BsChevronDown size={20} />
                  )}
                </button>
              </div>
            </div>

            <h5>
              {sectionVideoCount} Lessons.
              {sectionVideoLength < 60
                ? sectionVideoLength
                : sectionContentHours.toFixed(2)}
              {sectionVideoLength > 60 ? "hours" : "minutes"}
            </h5>
            <br />
            {isSectionVisible && (
              <div className="w-full ">
                {sectionVideos.map((item: any, index: number) => {
                  const videoIndex: number = sectionStartIndex + index;
                  const contentLength: number = item.videoLength / 60;
                  return (
                    <div
                      className={`w-full ${
                        videoIndex === activeVideo ? "bg-blue-200" : ""
                      } cursor-pointer transition-all p-2`}
                      key={item.id}
                      onClick={() =>
                        isDemo ? null : setActiveVideo(videoIndex)
                      }
                    >
                      <div className="flex items-start">
                        <div>
                          <MdOutlineOndemandVideo
                            size={25}
                            className="mr-2"
                            color="#1cdada"
                          />
                        </div>
                        <div className="flex-1 flex justify-between items-center">
                          <h1 className="text-[18px] inline-block break-words">
                            {item.title}
                          </h1>
                          <input
                            type="checkbox"
                            checked={isChecked(item._id)}
                            className="w-[18px] h-[18px]"
                          />
                        </div>
                      </div>
                      <h5 className="pl-8">
                        {item.videoLength > 60
                          ? contentLength.toFixed(2)
                          : item.videoLength}
                        {item.videoLength > 60 ? "hours" : "minutes"}
                      </h5>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="border-b border-gray-300 my-4"></div>
          </div>
        );
      })}
    </div>
  );
};

export default CourseContentList;
