import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import { GameInfo } from "./pages/GameInfo";

import "./styles/main.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:gameTitle/:gameId",
    element: <GameInfo />,
    loader: async ({ params }) => {
      let data;
      await axios(
        `${import.meta.env.VITE_API_URL}/games/${params.gameId}/ads`
      ).then((response) => {
        data = response.data;
      });
      return data;
    },
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
