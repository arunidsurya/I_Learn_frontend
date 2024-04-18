import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import UsersView from "./components/admin/users/UsersView";
import UserHome from "./components/user/userHome/UserHome";
import UserCourses from "./components/user/userCourses/UserCourses";
import UserLayout from "./components/user/shared/UserLayout";
import AdminLayout from "./components/admin/shared/AdminLayout";
import UserLogin from "./components/user/userLogin/UserLogin";
import UserRegister from "./components/user/userRegister/Register";
import UserActivation from "./components/user/userActivation/UserActivation";
import AboutPage from "./components/user/about/AboutPage";
import Policy from "./components/user/policy/Policy";
import ProtectiveRoute from "./components/admin/utils/protectiveRoute";
import AdminLogin from "./components/admin/login/AdminLogin";
import ConfirmEmail from "./components/user/userActivation/ConfimEmail";
import UserAccountLayout from "./components/user/shared/UserAccountLayout";
import MyAccount from "./components/user/userAccount/MyAccount";
import ChangePassword from "./components/user/userAccount/ChangePassword";
import EnrolledCourses from "./components/user/userAccount/EnrolledCourses";
import UserAuthRoute from "./components/user/utils/UserAuthRoute";
import AdminDashBoard from "./components/admin/dashboard/AdminDashBoard";
import AddUser from "./components/admin/users/AddUser";
import EditUser from "./components/admin/users/EditUser";
import InstLayout from "./components/instructor/shared/InstLayout";
import InstDashBoard from "./components/instructor/dashboard/InstDashBoard";
import InstLogin from "./components/instructor/login/InstLogin";
import InstRegister from "./components/instructor/login/InstRegister";
import InstAuthRoute from "./components/instructor/utils/InstAuthRoute";
import MembersView from "./components/admin/mannageTeam/MembersView";
import EditMember from "./components/admin/mannageTeam/EditMember";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<UserHome />} />
            <Route path="login/" element={<UserLogin />} />
            <Route path="register/" element={<UserRegister />} />
            <Route path="courses/" element={<UserCourses />} />
            <Route path="activation/" element={<UserActivation />} />
            <Route path="about/" element={<AboutPage />} />
            <Route path="policy/" element={<Policy />} />
            <Route path="account_verify/" element={<ConfirmEmail />} />
            <Route
              path="manage_account/"
              element={
                <UserAuthRoute>
                  <UserAccountLayout />{" "}
                </UserAuthRoute>
              }
            >
              <Route index element={<MyAccount />} />
              <Route path="change_password/" element={<ChangePassword />} />
              <Route path="enrolled_courses/" element={<EnrolledCourses />} />
            </Route>
          </Route>

          <Route path="admin/" element={<AdminLayout />}>
            <Route
              index
              element={
                <ProtectiveRoute>
                  <AdminDashBoard />
                </ProtectiveRoute>
              }
            />
            <Route
              path="users/"
              element={
                <ProtectiveRoute>
                  <UsersView />
                </ProtectiveRoute>
              }
            />
            <Route
              path="addUser/"
              element={
                <ProtectiveRoute>
                  <AddUser />
                </ProtectiveRoute>
              }
            />
            <Route
              path="editUser/"
              element={
                <ProtectiveRoute>
                  <EditUser />
                </ProtectiveRoute>
              }
            />
            <Route path="manage_members/" element={<MembersView />} />
            <Route path="edit_member/" element={<EditMember />} />
          </Route>

          <Route path="instructor/" element={<InstLayout />}>
            <Route
              index
              element={
                <InstAuthRoute>
                  <InstDashBoard />
                </InstAuthRoute>
              }
            />
          </Route>

          <Route path="admin_login/" element={<AdminLogin />} />
          <Route path="inst_login/" element={<InstLogin />} />
          <Route path="tutor_register/" element={<InstRegister />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
