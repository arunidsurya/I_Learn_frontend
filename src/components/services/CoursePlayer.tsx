import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";

type Props = {
  videoUrl: string;
  title?: string;
  width: string;
  handleVideoEnd?: (id:string) => void;
  id?:string;
};

const CoursePlayer: React.FC<Props> = ({ videoUrl, title, width, handleVideoEnd ,id}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  // console.log(videoUrl);
  const onVideoEnd=()=>{
    if(handleVideoEnd){
      handleVideoEnd(id)
    }
  }

  return (
    <>
      <div>
        <ReactPlayer
          url={videoUrl}
          controls={true}
          width={width}
          height={500}
          className="bg-dark overflow-hidden "
          onEnded={onVideoEnd}
        />
      </div>
      
    </>
  );
};

export default CoursePlayer;
