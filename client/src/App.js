import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Username from "./components/Username";
import Register from "./components/Register";
import Password from "./components/Password";
import Recovery from "./components/Recovery";
import Reset from "./components/Reset";
import PageNotFound from "./components/PageNotFound";
import Profile from "./components/Profile";

const router = createBrowserRouter([
  { path: "/", element: <Username></Username> },
  { path: "/register", element: <Register></Register> },
  { path: "/password", element: <Password></Password> },
  { path: "/recovery", element: <Recovery></Recovery> },
  { path: "/reset", element: <Reset></Reset> },
  { path: "/profile", element: <Profile></Profile> },
  { path: "*", element: <PageNotFound></PageNotFound> },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
