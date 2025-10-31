import { useState, useEffect } from "react";
import { Box, Stack, useMediaQuery } from "@mui/material";
import Header from "../Header";
import RestroBuddyApp from "../RestroBuddyApp";
import Footer from "../Footer";
import ImageHeaderComponent from "../ImageHeaderComponent";
import PopularRestaurant from "../PopularRestaurant";
import DiningOnline from "../DiningOnline";
import ExploreComponent from "../ExploreComponent";
import { postData } from "../../../../services/FetchNodeServices";

export default function HomePage() {
  const [restaurantList, setRestaurantList] = useState([]);
  const [city, setCity] = useState([]);

  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:900px)");

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
        <ImageHeaderComponent />
      </Box>

      {/* Dining and Online */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "1500px",
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
    </Box>
  );
}
