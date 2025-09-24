import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import HomeI from "./components/HomeI";
import Login from "./components/Login";
import Login2 from "./components/Login2";
import Navbar from "./components/Navbar";
import HomeLayout from "./components/HomeLayout";
import Middlebar from "./components/Middlebar";
import Profile from "./components/Profile";

import EditProfilePage from "./components/EditProfilePage";
import ChangePasswordPage from "./components/ChangePasswordPage";
import UsersPage from "./components/Users";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <>
      <BrowserRouter>
         <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Middlebar />} />
            <Route path="profile" element={<Profile />} />
            <Route path="edit-profile" element={<EditProfilePage />} />
            <Route path="change-password" element={<ChangePasswordPage />} />
            <Route path="/sym/users" element={<UsersPage />} />
            <Route path="/sym/users/users/:id" element={<UserProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
       
      
    </>
  );
}

export default App;
