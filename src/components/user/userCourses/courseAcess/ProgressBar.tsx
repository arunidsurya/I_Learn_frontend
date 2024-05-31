import React from "react";

type Props={
    progress:number
}

const ProgressBar:React.FC<Props> = ({ progress}) => {
  const cappedProgress = Math.min(progress, 100);
  return (
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        className="bg-blue-600 h-4 rounded-full"
        style={{ width: `${cappedProgress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
