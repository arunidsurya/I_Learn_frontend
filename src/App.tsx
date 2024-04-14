import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import UsersView from "./components/admin/users/UsersView";
import UserHome from "./components/user/userHome/UserHome";
import UserCourses from "./components/user/userCourses/UserCourses";
import UserLayout from "./components/user/shared/UserLayout";
import AdminLayout from "./components/admin/shared/AdminLayout";
import AdminDashBoard from "./components/admin/dashboard/AdminDashBoard";
import UserLogin from "./components/user/userLogin/UserLogin";
import UserRegister from "./components/user/userRegister/Register";
import UserActivation from "./components/user/userActivation/UserActivation";
import AboutPage from "./components/user/about/AboutPage";
import Policy from "./components/user/policy/Policy";
import ProtectiveRoute from "./components/admin/utils/protectiveRoute";
import AdminLogin from "./components/admin/login/AdminLogin";
import ConfirmEmail from "./components/user/userActivation/ConfimEmail";

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
          </Route>

          <Route path="instructor/" element="" />

          <Route path="admin_login/" element={<AdminLogin />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
