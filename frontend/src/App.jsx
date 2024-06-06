import { useState } from "react";
import { Button, Flex, ButtonGroup } from "@chakra-ui/react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
// import './App.css'

function App() {
  return <RouterProvider router={router} />;
}

export default App;