import React from "react";
import UserAnalytics from "./analytics/studentsAnalytics";
import OrderAnalytics from "./analytics/OrderAnalytics";
import CourseAnalytics from "./analytics/CourseAnalytics";

const InstDashBoard: React.FC = () => {
  return (
    <>
      <div>
        <CourseAnalytics />
        <div className="flex">
          <div className="flex-1">
            <UserAnalytics isDashboard={true} />
          </div>
          <div className="flex-1">
            <OrderAnalytics isDashboard={true} />
          </div>
        </div>
      </div>
    </>
  );
};

export default InstDashBoard;
