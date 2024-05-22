import React from "react";
import CourseAnalytics from "./analytics/CourseAnalytics";
import OrderAnalytics from "./analytics/OrderAnalytics";
import UserAnalytics from "./analytics/UserAnalytics";

const AdminDashBoard: React.FC = () => {
  return (
    <div>
      <CourseAnalytics  />
      <UserAnalytics isDashboard={true} />
      <OrderAnalytics isDashboard={true} />
    </div>
  );
};

export default AdminDashBoard;
