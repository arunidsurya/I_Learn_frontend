const adminRoutes = {
  login: "/admin/login",
  logout: "/admin/logout",
  viewCategory: "/admin/get_categories",
  addCategory: "/admin/create_category",
  editCategory: "/admin/edit_category",
  deleteCategory: "/admin/delete_category",
  nonApprovedCourses: "/admin/non_approved_courses",
  courses: "/admin/courses",
  changeCourseStatus: "/admin/change_courses_status",
  editTutor: "/admin/editTutor",
  getTutors: "/admin/getTutors",
  tutorVerificaton: "/admin",
  getNotifications: "/admin/get-notifications",
  getCourseAnalytics: "/admin/course-analytics",
  getOrderAnalytics: "/admin/order-analytics",
  getUserAnalytics: "/admin/user-analytics",
  changeNotificationStatus: "/admin/change-notification-status",
};

export default adminRoutes;
