import { createBrowserRouter } from "react-router-dom";
import Protected from "../features/auth/components/Protected.jsx";
import PageNotFound from "../pages/PageNotFound";
import Home from "../pages/Home";
import CreateContestPage from "../pages/CreateContestPage";
import JoinContestPage from "../pages/JoinContestPage";
import ProfilePage from "../pages/ProfilePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import PopularsPage from "../pages/PopularsPage.jsx";
import RandomProfilePage from "../pages/RandomProfilePage.jsx";

export const theme = {
  dark: {
    bg: "var(--bgD)",
    bg2: "var(--bg2D)",
    bgBlue: "var(--bluebgD)",
    bgGreen: "var(--greenbgD)",
    text: "var(--textD)",
    text2: "var(--textBlueD)",
    border: "var(--borderD)",
  },
  light: {
    bg: "var(--bgL)",
    bg2: "var(--bg2L)",
    bgBlue: "var(--bluebgL)",
    bgGreen: "var(--greenbgL)",
    text: "var(--textL)",
    text2: "var(--textL)",
    border: "var(--borderL)",
  },
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <Protected>
      <Home />
      // </Protected>
    ),
  },
  {
    path: "/join-contest",
    element: (
        <JoinContestPage />
    ),
  },
  {
    path: "/popular-users",
    element: <PopularsPage />,
  },
  {
    path: "/create-contest",
    element: (
        <CreateContestPage />
    ),
  },
  {
    path: "/profile",
    element: (
        <ProfilePage />
    ),
  },
  {
    path: "/profile/user",
    element: <RandomProfilePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
