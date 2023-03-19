import { Route, Routes } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ChatRoom from "../pages/ChatRoom";
import Login from "../pages/Login";
import Main from "../pages/Main";
import MovieDetail from "../pages/MovieDetail";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import PrivateRouter from "./PrivateRouter";

const AppRouter = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/details/:id" element={<PrivateRouter />}>
          <Route path="" element={<MovieDetail />} />
        </Route>
        <Route path="/profile" element={<PrivateRouter/>}>
          <Route path="" element={<Profile/>}/>
        </Route>
        <Route path="/chatroom" element={<PrivateRouter/>}>
          <Route path="" element={<ChatRoom/>}/>
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default AppRouter;
