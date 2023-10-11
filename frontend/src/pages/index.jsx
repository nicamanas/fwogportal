import { RoleListingAPI } from "../apis/rolelistingAPI";
import RoleListingCard from "../components/RoleListingCard";
import { useEffect, useState } from "react";
import HomePage from "../components/HomePage";
import Typography from "@mui/material/Typography";
import LoginPage from "../components/LoginPage";

export default function Home() {
  const mockUser = null;
  if (mockUser == null) {
    return <LoginPage/>
  }
  return <HomePage></HomePage>
}
