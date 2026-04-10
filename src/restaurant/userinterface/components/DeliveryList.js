import { useState, useEffect } from "react";
import DeliveryFilter from "./DeliveryFilter";
import FoodCircleComponent from "./FoodCircleComponent";
import BrandCircleComponent from "./BrandCircleComponent";
import DeliveryComponent from "./DeliveryComponent";
import filter2 from "../../../assets/filter.png";
import { postData } from "../../../services/FetchNodeServices";

export default function DeliveryList({ city, searchText = "" }) {
  const [restaurantList, setRestaurantList] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");

  const fetchAllRestaurant = async () => {
    try {
      const res = await postData("userinterface/user_fetch_restaurant_by_city", {
        cityid: city?.cityid,
      });
      if (res.status) setRestaurantList(res.data);
      else console.warn("Unable to fetch restaurant details");
    } catch (error) {
      console.error("Error fetching restaurant list:", error);
    }
  };

  const fetchAllRestaurantAmbience = async () => {
    try {
      const res = await postData("userinterface/user_fetch_ambience_by_city", {
        cityid: 100,
      });
      if (res.status) setRestaurantData(res.data);
      else console.warn("Unable to fetch ambience data");
    } catch (error) {
      console.error("Error fetching ambience data:", error);
    }
  };

  useEffect(() => {
    fetchAllRestaurant();
    fetchAllRestaurantAmbience();
  }, [city?.cityid]);

  const deliveryFilters = [
    { filterid: 1, title: "Open Now", img: filter2 },
    { filterid: 2, title: "Has Image" },
    { filterid: 3, title: "Top Rated" },
    { filterid: 4, title: "Veg Friendly" },
  ];

  const foodImages = [
    { foodimageid: 1, title: "Pizza", img: "pizza.png" },
    { foodimageid: 2, title: "Biryani", img: "biryani.png" },
    { foodimageid: 3, title: "Burger", img: "burger.png" },
    { foodimageid: 4, title: "Thali", img: "thali.png" },
    { foodimageid: 5, title: "Paneer", img: "paneer.png" },
    { foodimageid: 6, title: "North Indian", img: "northindian.png" },
    { foodimageid: 7, title: "Cake", img: "cake.png" },
    { foodimageid: 8, title: "Rolls", img: "rolls.png" },
    { foodimageid: 9, title: "Noodles", img: "noodles.png" },
  ];

  const brandImages = [
    { id: 1, title: "Pizza Hut", img: "pizzahut.png" },
    { id: 2, title: "Domino's Pizza", img: "domino.png" },
    { id: 3, title: "Burger King", img: "burgerking.png" },
    { id: 4, title: "Subway", img: "subway.png" },
    { id: 5, title: "Burger Buddy", img: "burgerbuddy.png" },
    { id: 6, title: "The Belgian Waffle Co.", img: "belgian.png" },
    { id: 7, title: "Burger Bytes", img: "burgerbytes.png" },
    { id: 8, title: "Xero Degrees", img: "xero.png" },
  ];

  const deliveryCards = [
    {
      restaurantid: 1,
      restaurantname: "ChotiWala Restaurant",
      rating: "3.9 ★",
      price: "₹150",
      time: "26 min",
      foodname: "Chinese",
      category: "North Indian",
      img: "chotiwala.png",
    },
    {
      restaurantid: 2,
      restaurantname: "La Pino'z Pizza",
      rating: "4.0 ★",
      price: "₹250",
      time: "28 min",
      foodname: "Italian",
      category: "Pizza, Pasta",
      address: "City Center, Gwalior",
      img: "lapizza.png",
    },
    {
      restaurantid: 3,
      restaurantname: "The Delight",
      rating: "4.1 ★",
      price: "₹1000",
      time: "22 min",
      foodname: "Biryani",
      category: "North Indian",
      address: "Lashkar, Gwalior",
      img: "delight.png",
    },
  ];
  const sourceRestaurantData = restaurantData.length ? restaurantData : deliveryCards;
  const getNumericRating = (value) => {
    const matchedValue = `${value || ""}`.match(/\d+(\.\d+)?/);
    return matchedValue ? Number(matchedValue[0]) : 0;
  };
  const normalizedSearch = searchText.trim().toLowerCase();
  const filteredRestaurantData = sourceRestaurantData.filter((item) => {
    const searchableText = [
      item?.restaurantname,
      item?.foodname,
      item?.category,
      item?.item_name,
      item?.address,
      item?.cityname,
      item?.listcategory,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch);
    const pictureList = item?.pictures
      ? item.pictures.split(",").map((picture) => picture?.trim()).filter(Boolean)
      : [];
    const hasImage = Boolean(pictureList[0] || pictureList[1] || item?.image || item?.img || item?.filelogo);
    const isOpenNow = Boolean(item?.timingopen || item?.opentime);
    const isTopRated = getNumericRating(item?.rating) >= 4;
    const isVegFriendly = /veg|vegetarian|south indian|sweets|paneer/i.test(
      [item?.foodname, item?.category, item?.listcategory, item?.item_name]
        .filter(Boolean)
        .join(" ")
    );

    if (selectedFilter === "Open Now" && !isOpenNow) return false;
    if (selectedFilter === "Has Image" && !hasImage) return false;
    if (selectedFilter === "Top Rated" && !isTopRated) return false;
    if (selectedFilter === "Veg Friendly" && !isVegFriendly) return false;

    return matchesSearch;
  });

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        paddingBottom: 30,
      }}
    >
      <div
        style={{
          margin: "0 auto",
          width: "min(100%, 1080px)",
          padding: "0 12px",
          color: "#6b7280",
          fontSize: 13,
        }}
      >
        Use filters for faster picks, then click any restaurant card to continue.
      </div>
      {/* Filter Bar */}
      <DeliveryFilter
        data={deliveryFilters}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />

      {/* Food Categories */}
      <FoodCircleComponent data={foodImages} />

      {/* Brands Section */}
      <BrandCircleComponent data={restaurantList.length ? restaurantList : brandImages} />

      {/* Delivery Restaurants */}
      <DeliveryComponent data={filteredRestaurantData} />
    </div>
  );
}
