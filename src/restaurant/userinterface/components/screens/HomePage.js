import { useState, useEffect } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RestroBuddyApp from "../RestroBuddyApp";
import Footer from "../Footer";
import ImageHeaderComponent from "../ImageHeaderComponent";
import PopularRestaurant from "../PopularRestaurant";
import DiningOnline from "../DiningOnline";
import ExploreComponent from "../ExploreComponent";
import { postData } from "../../../../services/FetchNodeServices";
import Login from "../userslogin/Login";
import SignUp from "../userslogin/SignUp";
import Otp from "../userslogin/Otp";

export default function HomePage() {
  const [restaurantList, setRestaurantList] = useState([]);
  const [city, setCity] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [locationValue, setLocationValue] = useState("Gwalior");
  const [loginOpen, setLoginOpen] = useState(false);
  const [signOpen, setSignOpen] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [userData, setUserData] = useState({});
  const [statusScreen, setStatusScreen] = useState("");

  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  const fetchCityId = async () => {
    const res = await postData("userinterface/user_fetch_cityid", {
      cityname: "Gwalior",
    });
    if (res.status) {
      setCity(res.data);
      fetchAllRestaurant(res.data?.cityid);
    } else {
      alert("Unable to fetch restaurant details");
    }
  };

  const fetchAllRestaurant = async (cityid) => {
    const res = await postData("userinterface/user_fetch_restaurant_by_city", {
      cityid,
    });
    if (res.status) {
      setRestaurantList(res.data);
    } else {
      alert("Unable to fetch restaurant details");
    }
  };

  useEffect(() => {
    fetchCityId();
  }, []);

  const findMatchingRestaurant = (searchText) => {
    const normalizedSearch = `${searchText || ""}`.trim().toLowerCase();

    if (!normalizedSearch) return null;

    return restaurantList.find((item) =>
      [
        item?.restaurantname,
        item?.foodname,
        item?.category,
        item?.item_name,
        item?.listcategory,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch)
    );
  };

  const handleSearchSubmit = () => {
    const trimmedSearch = searchValue?.trim();

    if (!trimmedSearch || !city?.cityid) return;

    const matchedRestaurant = findMatchingRestaurant(trimmedSearch);

    if (matchedRestaurant?.restaurantid) {
      navigate(
        `/restaurantfooddetails/${matchedRestaurant.restaurantid}/${matchedRestaurant.restaurantname}`
      );
      return;
    }

    navigate(`/dininganddelivery/${city?.cityid}/${city?.cityname}`, {
      state: { search: trimmedSearch },
    });
  };

  const onlinedining = [
    {
      id: 1,
      image: "online.jpg",
      title: "Online Order",
      description: "Stay home and order to your doorstep",
      url: `/dininganddelivery/${city?.cityid}/${city?.cityname}`,
    },
    {
      id: 2,
      image: "dining.jpg",
      title: "Dining",
      description: "View the city's favourite dining venues",
      url: `/dininganddelivery/${city?.cityid}/${city?.cityname}`,
    },
  ];

  const explore = {
    "Popular cuisine near me": [
      "Bakery",
      "Coffee",
      "Drinks",
      "Muglai",
      "Chaap",
      "Momos",
      "Chiniese",
    ],
    "Popular restaurant types near me": [
      "Dhaba",
      "Cafe's",
      "Bars",
      "Food Court",
      "Fine Dining",
      "Sweet Shops",
      "Quick Bites",
    ],
    "Top restaurant chains": [
      "KFC",
      "Subway",
      "WOW Momos",
      "Dominos",
      "Pizza Hut",
      "Burger King",
      "Mc Donald",
    ],
    "City we deliver to": [
      "Agra",
      "Indore",
      "Gwalior",
      "Jhansi",
      "Noida",
      "Pune",
      "Chennai",
      "New Delhi",
    ],
  };

  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "hidden",
        bgcolor: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Header */}
      <Box sx={{ width: "100%", maxWidth: "1500px" }}>
        <ImageHeaderComponent
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onSearchSubmit={handleSearchSubmit}
          locationValue={locationValue}
          onLocationChange={setLocationValue}
          onLoginClick={() => setLoginOpen(true)}
          onSignupClick={() => setSignOpen(true)}
        />
      </Box>

      {/* Dining and Online */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "1500px",
          mt: { xs: 1, md: 2 },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: isMobile ? "column" : "row",
          px: isMobile ? 1 : 2,
          py: 2,
        }}
      >
        <DiningOnline data={onlinedining} />
      </Box>

      {/* Popular Restaurant */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "1500px",
          px: isMobile ? 1 : 2,
          py: 3,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <PopularRestaurant
          data={restaurantList}
          title="Popular Restaurant in and around Gwalior"
        />
      </Box>

      {/* App Section */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "1500px",
          px: isMobile ? 1 : 2,
          py: 3,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <RestroBuddyApp />
      </Box>

      {/* Explore */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "1500px",
          px: isMobile ? 1 : 2,
          py: 3,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ExploreComponent data={explore} title="Explore options near me" />
      </Box>

      {/* Footer */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "1500px",
          py: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Footer />
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
