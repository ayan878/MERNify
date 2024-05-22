import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

;

const router = createBrowserRouter([
  { path: "/", element:<Username></Username> },
  { path: "/register", element: <div>Register Route</div> },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
