import Header from "../Header";
import RestroBuddyApp from "../RestroBuddyApp";
import Footer from "../Footer";
import ImageHeaderComponent from "../ImageHeaderComponent";
import PopularRestaurant from "../PopularRestaurant";
import DiningOnline from "../DiningOnline";
import ExploreComponent from "../ExploreComponent";
import { useState, useEffect } from "react";
import { postData } from "../../../../services/FetchNodeServices";
export default function HomePage() {
  const [restaurantList, setRestaurantList] = useState([]);
  const [city, setCity] = useState([]);
  const fetchCityId=async()=>{
    var res = await postData("userinterface/user_fetch_cityid", {
      cityname:'Gwalior' ,
    });
    if (res.status) {
      setCity(res.data)
      fetchAllRestaurant(res.data?.cityid)
    } else {
      alert("Unable to fetch restaurant details");
    }
  };

  
  const fetchAllRestaurant = async (cityid) => {
    var res = await postData("userinterface/user_fetch_restaurant_by_city", {
      cityid
    });
    if (res.status) {
      setRestaurantList(res.data);
    } else {
      alert("Unable to fetch restaurant details");
    }
  };
  useEffect(function () {
    fetchCityId()
  }, []);


  var onlinedining = [
    {
      id: 1,
      image: "online.jpg",
      title: "Online Order",
      description: "Stay home and order to your doorstep",
      url:`/dininganddelivery/${city?.cityid}/${city?.cityname}`
    },
    {
      id: 2,
      image: "dining.jpg",
      title: "Dining",
      description: "View the city's favourite dining venues",
      url:`/dininganddelivery/${city?.cityid}/${city?.cityname}`
    },
  ];

  var explore = {
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
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
         
        }}
      >
        <ImageHeaderComponent />
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DiningOnline data={onlinedining} />
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PopularRestaurant
          data={restaurantList}
          title="Popular Restaurant in and around Gwalior"
        />
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <RestroBuddyApp />
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ExploreComponent data={explore} title="Explore options near me" />
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Footer />
      </div>
    </div>
  );
}
