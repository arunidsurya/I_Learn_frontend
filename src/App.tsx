import React, { Suspense } from "react";
import { NextUIProvider } from "@nextui-org/react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";

// Lazy-loaded imports for page components
const UserHomeLazy = React.lazy(
  () => import("./components/user/userHome/UserHome")
);

const UserCoursesLazy = React.lazy(
  () => import("./components/user/userCourses/UserCourses")
);
const UserCourseDetailsLazy = React.lazy(
  () => import("./components/user/userCourses/couseDetails/CourseDetailsPage")
);
const UserActivationLazy = React.lazy(
  () => import("./components/user/userActivation/UserActivation")
);
const AboutPageLazy = React.lazy(
  () => import("./components/user/about/AboutPage")
);
const PolicyLazy = React.lazy(() => import("./components/user/policy/Policy"));
const ConfirmEmailLazy = React.lazy(
  () => import("./components/user/userActivation/ConfimEmail")
);
const UserAccountLayoutLazy = React.lazy(
  () => import("./components/user/shared/UserAccountLayout")
);
const MyAccountLazy = React.lazy(
  () => import("./components/user/userAccount/MyAccount")
);
const ChangePasswordLazy = React.lazy(
  () => import("./components/user/userAccount/ChangePassword")
);
const EnrolledCoursesLazy = React.lazy(
  () => import("./components/user/userAccount/EnrolledCourses")
);
const UserCourseAccessLazy = React.lazy(
  () => import("./components/user/userCourses/courseAcess/CourseAccess")
);
const ActionCourseLazy = React.lazy(
  () => import("./components/admin/courses/CourseAction")
);

const AdminDashBoardLazy = React.lazy(
  () => import("./components/admin/dashboard/AdminDashBoard")
);
const UsersViewLazy = React.lazy(
  () => import("./components/admin/users/UsersView")
);
const AddUserLazy = React.lazy(
  () => import("./components/admin/users/AddUser")
);
const EditUserLazy = React.lazy(
  () => import("./components/admin/users/EditUser")
);
const MembersViewLazy = React.lazy(
  () => import("./components/admin/mannageTeam/MembersView")
);
const EditMemberLazy = React.lazy(
  () => import("./components/admin/mannageTeam/EditMember")
);
const InstDashBoardLazy = React.lazy(
  () => import("./components/instructor/dashboard/InstDashBoard")
);
const AdminLoginLazy = React.lazy(
  () => import("./components/admin/login/AdminLogin")
);
const InstLoginLazy = React.lazy(
  () => import("./components/instructor/login/InstLogin")
);
const InstRegisterLazy = React.lazy(
  () => import("./components/instructor/login/InstRegister")
);
const InstScheduleClassLazy = React.lazy(
  () => import("./components/instructor/course/liveclass/ScheduleLiveClass")
);
const AddCourseLazy = React.lazy(
  () => import("./components/instructor/course/addCourse/AddCourse")
);
const CategoriesViewLazy = React.lazy(
  () => import("./components/admin/categories/CategoriesView")
);
const EditCategoriesLazy = React.lazy(
  () => import("./components/admin/categories/EditCategory")
);
const AddCategoriesLazy = React.lazy(
  () => import("./components/admin/categories/AddCategory")
);

const CoursesViewLaZY = React.lazy(
  () => import("./components/admin/courses/ViewCourses")
);
const AllCoursesLazy = React.lazy(
  () => import("./components/instructor/course/Courses")
);
const EditCourseLazy = React.lazy(
  () => import("./components/instructor/course/editCourse/EditCourse")
);

const RecentUploadsLazy = React.lazy(
  () => import("./components/instructor/course/RecentUploads")
);
const InstStudentsLazy = React.lazy(
  () => import("./components/instructor/students/Students")
);
const InstCoursesHomeLazy = React.lazy(
  () => import("./components/instructor/course/courseTile/courseTileHome")
);
const InstCourseAccessLazy = React.lazy(
  () => import("./components/instructor/course/courseAcess/InstCourseAccess")
);
const CourseAnalyticsLazy = React.lazy(
  () => import("./components/admin/dashboard/analytics/CourseAnalytics")
);
const OrderAnalyticsLazy = React.lazy(
  () => import("./components/admin/dashboard/analytics/OrderAnalytics")
);
const UserAnalyticsLazy = React.lazy(
  () => import("./components/admin/dashboard/analytics/UserAnalytics")
);
const PremiumPackageViewLazy = React.lazy(
  () => import("./components/admin/premiumPackage/PremiumPackageView")
);
const AddPremiumPackageLazy = React.lazy(
  () => import("./components/admin/premiumPackage/AddPackage")
);
const CourseTileHomeLazy = React.lazy(
  () => import("./components/admin/courses/courseTile/courseTileHome")
);

const AdminCourseAccess = React.lazy(
  () => import("./components/admin/courses/courseAccess/AdminCourseAccess")
);
const AdminEditPackageLazy = React.lazy(
  () => import("./components/admin/premiumPackage/EditPackage")
);




// Import UserLayout, UserAuthRoute, AdminLayout, ProtectiveRoute
import UserLayout from "./components/user/shared/UserLayout";
import UserAuthRoute from "./components/user/utils/UserAuthRoute";
import AdminLayout from "./components/admin/shared/AdminLayout";
import ProtectiveRoute from "./components/admin/utils/protectiveRoute";
import InstLayout from "./components/instructor/shared/InstLayout";
import UserRegister from "./components/user/userRegister/Register";
import UserLogin from "./components/user/userLogin/UserLogin";
import InstAuthRoute from "./components/instructor/utils/InstAuthRoute";
import VideoCall from "./components/services/VideoCall";
import Error404 from "./components/errorPages/Error404";
import Error500 from "./components/errorPages/Error500";
import InstVideoCall from "./components/instructor/course/liveclass/InstVideoCall";

const App: React.FC = () => {
  return (
    <Router>
      <NextUIProvider>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <UserLayout />
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <UserHomeLazy />
                </Suspense>
              }
            />
            <Route
              path="courses/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <UserCoursesLazy />
                </Suspense>
              }
            />
            <Route
              path="course_details/:_id"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <UserCourseDetailsLazy />
                </Suspense>
              }
            />
            <Route
              path="course-access/:_id"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <UserCourseAccessLazy />
                </Suspense>
              }
            />
            <Route
              path="activation/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <UserActivationLazy />
                </Suspense>
              }
            />
            <Route
              path="about/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <AboutPageLazy />
                </Suspense>
              }
            />
            <Route
              path="policy/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <PolicyLazy />
                </Suspense>
              }
            />
            <Route
              path="account_verify/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <ConfirmEmailLazy />
                </Suspense>
              }
            />
            <Route
              path="manage_account/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <UserAuthRoute>
                    <UserAccountLayoutLazy />
                  </UserAuthRoute>
                </Suspense>
              }
            >
              <Route
                index
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <MyAccountLazy />
                  </Suspense>
                }
              />
              <Route
                path="change_password/"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <ChangePasswordLazy />
                  </Suspense>
                }
              />
              <Route
                path="enrolled_courses/"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <EnrolledCoursesLazy />
                  </Suspense>
                }
              />
            </Route>
            <Route
              path="room/:roomId"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <VideoCall />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="admin/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <AdminLayout />
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <ProtectiveRoute>
                    <AdminDashBoardLazy />
                  </ProtectiveRoute>
                </Suspense>
              }
            />
            <Route
              path="users/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <ProtectiveRoute>
                    <UsersViewLazy />
                  </ProtectiveRoute>
                </Suspense>
              }
            />
            <Route
              path="addUser/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <ProtectiveRoute>
                    <AddUserLazy />
                  </ProtectiveRoute>
                </Suspense>
              }
            />
            <Route
              path="editUser/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <ProtectiveRoute>
                    <EditUserLazy />
                  </ProtectiveRoute>
                </Suspense>
              }
            />
            <Route
              path="manage_members/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <MembersViewLazy />
                </Suspense>
              }
            />
            <Route
              path="edit_member/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <EditMemberLazy />
                </Suspense>
              }
            />
            <Route
              path="categories/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <CategoriesViewLazy />
                </Suspense>
              }
            />
            <Route
              path="edit_category/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <EditCategoriesLazy />
                </Suspense>
              }
            />
            <Route
              path="add_category/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <AddCategoriesLazy />
                </Suspense>
              }
            />
            <Route
              path="courses/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <CoursesViewLaZY />
                </Suspense>
              }
            />
            <Route
              path="course_action/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <ActionCourseLazy />
                </Suspense>
              }
            />
            <Route
              path="courses_analytics/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <CourseAnalyticsLazy />
                </Suspense>
              }
            />
            <Route
              path="orders_analytics/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <OrderAnalyticsLazy />
                </Suspense>
              }
            />
            <Route
              path="users_analytics/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <UserAnalyticsLazy />
                </Suspense>
              }
            />
            <Route
              path="premium/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <PremiumPackageViewLazy />
                </Suspense>
              }
            />
            <Route
              path="add_premium_package/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <AddPremiumPackageLazy />
                </Suspense>
              }
            />
            <Route
              path="course_tile_home/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <CourseTileHomeLazy />
                </Suspense>
              }
            />
            <Route
              path="course_access/:_id"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <AdminCourseAccess />
                </Suspense>
              }
            />
            <Route
              path="edit_package/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <AdminEditPackageLazy />
                </Suspense>
              }
            />
          </Route>

          <Route
            path="instructor/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <InstAuthRoute>
                  <InstLayout />
                </InstAuthRoute>
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <InstDashBoardLazy />
                </Suspense>
              }
            />
            <Route
              path="create_course/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <AddCourseLazy />
                </Suspense>
              }
            />
            <Route
              path="live_courses/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <AllCoursesLazy />
                </Suspense>
              }
            />
            <Route
              path="edit_course/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <EditCourseLazy />
                </Suspense>
              }
            />
            <Route
              path="schedule_class/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <InstScheduleClassLazy />
                </Suspense>
              }
            />
            <Route
              path="room/:roomId"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <InstVideoCall />
                </Suspense>
              }
            />
            <Route
              path="pending_courses/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <RecentUploadsLazy />
                </Suspense>
              }
            />
            <Route
              path="students/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <InstStudentsLazy />
                </Suspense>
              }
            />
            <Route
              path="courses/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <InstCoursesHomeLazy />
                </Suspense>
              }
            />
            <Route
              path="course_access/:_id"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <InstCourseAccessLazy />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="admin_login/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <AdminLoginLazy />
              </Suspense>
            }
          />
          <Route
            path="inst_login/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <InstLoginLazy />
              </Suspense>
            }
          />
          <Route
            path="tutor_register/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <InstRegisterLazy />
              </Suspense>
            }
          />
          <Route path="user_register/" element={<UserRegister />} />
          <Route path="login/" element={<UserLogin />} />
          <Route path="error404/" element={<Error404 />} />
          <Route path="error500/" element={<Error500 />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </NextUIProvider>
    </Router>
  );
};

export default App;

