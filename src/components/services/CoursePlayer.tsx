import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";

type Props = {
  videoUrl: string;
  title?: string;
  width: string;
};

const CoursePlayer: React.FC<Props> = ({ videoUrl, title, width }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  // console.log(videoUrl);

  return (
    <div>
      <ReactPlayer
        url={videoUrl}
        controls={true}
        width={width}
        height={500}
        className="bg-dark overflow-hidden "
      />
    </div>
  );
};

export default CoursePlayer;
