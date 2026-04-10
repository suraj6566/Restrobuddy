import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import DiningHeader from "../DiningHeader";
import RestaurantList from "../RestaurantList";
import DeliveryList from "../DeliveryList";
import { serverURL } from "../../../../services/FetchNodeServices";
import Login from "../userslogin/Login";
import SignUp from "../userslogin/SignUp";
import Otp from "../userslogin/Otp";

export default function DiningAndDelivery() {
  const [value, setValue] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);
  const [signOpen, setSignOpen] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [userData, setUserData] = useState({});
  const [statusScreen, setStatusScreen] = useState("");
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const searchText = searchValue || location?.state?.search || "";
  console.log("params", params);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearchSubmit = () => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    if (normalizedSearch === "param food") {
      navigate("/restaurantfooddetails/22/Param Food");
    }
  };

  // ✅ Icon container for each tab
  const iconStyle = (icon, bg) => {
    return (
      <Box
        sx={{
          backgroundColor: bg,
          width: { xs: 45, sm: 55, md: 60 },
          height: { xs: 45, sm: 55, md: 60 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
        }}
      >
        <img
          src={`${serverURL}/images/${icon}`}
          alt="tab icon"
          style={{ width: 28, height: 28, objectFit: "contain" }}
        />
      </Box>
    );
  };

  // ✅ Tabs Section
  const renderTabs = () => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,
          px: { xs: 2, sm: 4 },
        }}
      >
        <Box sx={{ width: { xs: "100%", sm: "90%", md: "75%" } }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            TabIndicatorProps={{
              style: { background: "red", height: 3 },
            }}
            sx={{
              "& .MuiTab-root": {
                minWidth: { xs: 100, sm: 160 },
                fontSize: { xs: 13, sm: 15, md: 16 },
                fontWeight: 500,
                textTransform: "none",
              },
              "& .MuiTabs-flexContainer": {
                justifyContent: { xs: "space-around", sm: "center" },
              },
            }}
          >
            <Tab
              icon={iconStyle(
                value === 0 ? "colorplate.png" : "diningplate.png",
                value === 0 ? "rgb(229, 243, 243)" : "rgb(248, 248, 248)"
              )}
              iconPosition="start"
              label="Dining Out"
              sx={{ color: value === 0 ? "red" : "grey" }}
            />
            <Tab
              icon={iconStyle(
                value === 1 ? "colorscooter.png" : "scooter.png",
                value === 1 ? "rgb(252, 238, 192)" : "rgb(248, 248, 248)"
              )}
              iconPosition="start"
              label="Delivery"
              sx={{ color: value === 1 ? "red" : "grey" }}
            />
            <Tab
              icon={iconStyle(
                value === 2 ? "colorbottle.png" : "diningbottle.png",
                value === 2 ? "rgb(237, 244, 255)" : "rgb(248, 248, 248)"
              )}
              iconPosition="start"
              label="Nightlife"
              sx={{ color: value === 2 ? "red" : "grey" }}
            />
          </Tabs>
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ height: "100%", backgroundColor: "#fff" }}>
      {/* ✅ Header */}
      <DiningHeader
        onLoginClick={() => setLoginOpen(true)}
        onSignupClick={() => setSignOpen(true)}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* ✅ Tabs */}
      {renderTabs()}

      {/* ✅ Dynamic Content */}
      <Box sx={{ mt: 3, px: { xs: 2, sm: 4, md: 10 }, pb: 4 }}>
        {value === 0 && <RestaurantList city={params} searchText={searchText} />}
        {value === 1 && <DeliveryList city={params} searchText={searchText} />}
        {value === 2 && (
          <Box
            sx={{
              textAlign: "center",
              py: 5,
              color: "grey",
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            Nightlife section coming soon 🍸
          </Box>
        )}
      </Box>
      <Login
        setOtpOpen={setOtpOpen}
        otpOpen={otpOpen}
        loginOpen={loginOpen}
        setLoginOpen={setLoginOpen}
        setOtpValue={setOtpValue}
        otpValue={otpValue}
        userData={userData}
        setUserData={setUserData}
        setStatusScreen={setStatusScreen}
        statusScreen={statusScreen}
      />
      <SignUp
        setOtpOpen={setOtpOpen}
        otpOpen={otpOpen}
        signOpen={signOpen}
        setSignOpen={setSignOpen}
        setOtpValue={setOtpValue}
        otpValue={otpValue}
        userData={userData}
        setUserData={setUserData}
        setStatusScreen={setStatusScreen}
        statusScreen={statusScreen}
      />
      <Otp
        setOtpOpen={setOtpOpen}
        otpOpen={otpOpen}
        setOtpValue={setOtpValue}
        otpValue={otpValue}
        userData={userData}
        setStatusScreen={setStatusScreen}
        statusScreen={statusScreen}
      />
    </Box>
  );
}
