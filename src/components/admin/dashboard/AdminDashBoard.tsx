import React from "react";
import CourseAnalytics from "./analytics/CourseAnalytics";
import OrderAnalytics from "./analytics/OrderAnalytics";
import UserAnalytics from "./analytics/UserAnalytics";

const AdminDashBoard: React.FC = () => {
  return (
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
  );
};

export default AdminDashBoard;
