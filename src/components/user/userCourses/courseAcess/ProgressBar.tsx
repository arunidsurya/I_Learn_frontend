import React from "react";

type Props={
    progress:number
    isCourseAccess?:boolean
}

const ProgressBar:React.FC<Props> = ({ progress ,isCourseAccess}) => {
  const cappedProgress = Math.min(progress, 100);
  return (
    <>
      {isCourseAccess && (
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-600 h-4 rounded-full"
            style={{ width: `${cappedProgress}%` }}
          ></div>
        </div>
      )}
    </>
  );
};

export default ProgressBar;
