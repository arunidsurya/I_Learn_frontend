import React, { Suspense } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";

// Lazy-loaded imports for page components
const UserHomeLazy = React.lazy(
  () => import("./components/user/userHome/UserHome")
);
const UserLoginLazy = React.lazy(
  () => import("./components/user/userLogin/UserLogin")
);
const UserRegisterLazy = React.lazy(
  () => import("./components/user/userRegister/Register")
);
const UserCoursesLazy = React.lazy(
  () => import("./components/user/userCourses/UserCourses")
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

// Import UserLayout, UserAuthRoute, AdminLayout, ProtectiveRoute
import UserLayout from "./components/user/shared/UserLayout";
import UserAuthRoute from "./components/user/utils/UserAuthRoute";
import AdminLayout from "./components/admin/shared/AdminLayout";
import ProtectiveRoute from "./components/admin/utils/protectiveRoute";
import InstLayout from "./components/instructor/shared/InstLayout";

const App: React.FC = () => {
  return (
    <Router>
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
            path="login/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <UserLoginLazy />
              </Suspense>
            }
          />
          <Route
            path="register/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <UserRegisterLazy />
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
        </Route>

        <Route
          path="instructor/"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <InstLayout />
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
      </Routes>
    </Router>
  );
};

export default App;

// import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import "./App.css";
// import UsersView from "./components/admin/users/UsersView";
// import UserHome from "./components/user/userHome/UserHome";
// import UserCourses from "./components/user/userCourses/UserCourses";
// import UserLayout from "./components/user/shared/UserLayout";
// import AdminLayout from "./components/admin/shared/AdminLayout";
// import UserLogin from "./components/user/userLogin/UserLogin";
// import UserRegister from "./components/user/userRegister/Register";
// import UserActivation from "./components/user/userActivation/UserActivation";
// import AboutPage from "./components/user/about/AboutPage";
// import Policy from "./components/user/policy/Policy";
// import ProtectiveRoute from "./components/admin/utils/protectiveRoute";
// import AdminLogin from "./components/admin/login/AdminLogin";
// import ConfirmEmail from "./components/user/userActivation/ConfimEmail";
// import UserAccountLayout from "./components/user/shared/UserAccountLayout";
// import MyAccount from "./components/user/userAccount/MyAccount";
// import ChangePassword from "./components/user/userAccount/ChangePassword";
// import EnrolledCourses from "./components/user/userAccount/EnrolledCourses";
// import UserAuthRoute from "./components/user/utils/UserAuthRoute";
// import AdminDashBoard from "./components/admin/dashboard/AdminDashBoard";
// import AddUser from "./components/admin/users/AddUser";
// import EditUser from "./components/admin/users/EditUser";
// import InstLayout from "./components/instructor/shared/InstLayout";
// import InstDashBoard from "./components/instructor/dashboard/InstDashBoard";
// import InstLogin from "./components/instructor/login/InstLogin";
// import InstRegister from "./components/instructor/login/InstRegister";
// import InstAuthRoute from "./components/instructor/utils/InstAuthRoute";
// import MembersView from "./components/admin/mannageTeam/MembersView";
// import EditMember from "./components/admin/mannageTeam/EditMember";

// const App: React.FC = () => {
//   return (
//     <>
//       <Router>
//         <Routes>
//           <Route path="/" element={<UserLayout />}>
//             <Route index element={<UserHome />} />
//             <Route path="login/" element={<UserLogin />} />
//             <Route path="register/" element={<UserRegister />} />
//             <Route path="courses/" element={<UserCourses />} />
//             <Route path="activation/" element={<UserActivation />} />
//             <Route path="about/" element={<AboutPage />} />
//             <Route path="policy/" element={<Policy />} />
//             <Route path="account_verify/" element={<ConfirmEmail />} />
//             <Route
//               path="manage_account/"
//               element={
//                 <UserAuthRoute>
//                   <UserAccountLayout />{" "}
//                 </UserAuthRoute>
//               }
//             >
//               <Route index element={<MyAccount />} />
//               <Route path="change_password/" element={<ChangePassword />} />
//               <Route path="enrolled_courses/" element={<EnrolledCourses />} />
//             </Route>
//           </Route>

//           <Route path="admin/" element={<AdminLayout />}>
//             <Route
//               index
//               element={
//                 <ProtectiveRoute>
//                   <AdminDashBoard />
//                 </ProtectiveRoute>
//               }
//             />
//             <Route
//               path="users/"
//               element={
//                 <ProtectiveRoute>
//                   <UsersView />
//                 </ProtectiveRoute>
//               }
//             />
//             <Route
//               path="addUser/"
//               element={
//                 <ProtectiveRoute>
//                   <AddUser />
//                 </ProtectiveRoute>
//               }
//             />
//             <Route
//               path="editUser/"
//               element={
//                 <ProtectiveRoute>
//                   <EditUser />
//                 </ProtectiveRoute>
//               }
//             />
//             <Route path="manage_members/" element={<MembersView />} />
//             <Route path="edit_member/" element={<EditMember />} />
//           </Route>

//           <Route path="instructor/" element={<InstLayout />}>
//             <Route
//               index
//               element={
//                 <InstAuthRoute>
//                   <InstDashBoard />
//                 </InstAuthRoute>
//               }
//             />
//           </Route>

//           <Route path="admin_login/" element={<AdminLogin />} />
//           <Route path="inst_login/" element={<InstLogin />} />
//           <Route path="tutor_register/" element={<InstRegister />} />
//         </Routes>
//       </Router>
//     </>
//   );
// };

// export default App;