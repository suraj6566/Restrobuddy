import { useEffect, useState } from "react";
import rising from "../../../assets/rising.png";
import filter2 from "../../../assets/filter.png";
import biryani from "../../../assets/biryani.png";
import burger from "../../../assets/burger.png";
import add from "../../../assets/add.png";
import RestaurantFilter from "./RestaurantFilter";
import RestaurantComponent from "./RestaurantComponent";
import RestaurantAd from "./RestaurantAd";
import { postData } from "../../../services/FetchNodeServices";

export default function RestaurantList({ city, searchText = "" }) {
  const [restaurantList, setRestaurantList] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");

  const fetchAllRestaurant = async () => {
    try {
      const res = await postData("userinterface/user_fetch_ambience_by_city", {
        cityid: city?.cityid,
      });

      if (res.status) {
        setRestaurantList(res.data);
      } else {
        console.warn("Unable to fetch restaurant details");
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  useEffect(() => {
    fetchAllRestaurant();
  }, [city?.cityid]);

  const filters = [
    { filterid: 1, title: "Open Now", img: filter2 },
    { filterid: 2, title: "Has Image" },
    { filterid: 3, title: "Top Rated" },
    { filterid: 4, title: "Veg Friendly" },
  ];

  const defaultRestaurants = [
    {
      restaurantid: 1,
      restaurantname: "Rising Star Hotel",
      rating: "3.9 ★",
      price: "₹500",
      distance: "1 Km",
      foodname: "Dhokla",
      category: "Indian Food",
      address: "Gol Pahadiya, Gwalior",
      img: rising,
    },
    {
      restaurantid: 2,
      restaurantname: "Biryani By Kilo",
      rating: "4.0 ★",
      price: "₹800",
      distance: "3 Km",
      foodname: "Biryani",
      category: "Indian Food",
      address: "City Center, Gwalior",
      img: biryani,
    },
    {
      restaurantid: 3,
      restaurantname: "Molecule",
      rating: "4.1 ★",
      price: "₹1000",
      distance: "5 Km",
      foodname: "Burger",
      category: "Chinese",
      address: "Lashkar, Gwalior",
      img: burger,
    },
  ];

  const ads = [{ adid: 1, img: add }];
  const sourceRestaurants = restaurantList.length ? restaurantList : defaultRestaurants;
  const getNumericRating = (value) => {
    const matchedValue = `${value || ""}`.match(/\d+(\.\d+)?/);
    return matchedValue ? Number(matchedValue[0]) : 0;
  };
  const normalizedSearch = searchText.trim().toLowerCase();
  const filteredRestaurants = sourceRestaurants.filter((item) => {
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
        Tap a filter to narrow your choices, or open a card to see its full menu.
      </div>
      {/* Filter Section */}
      <RestaurantFilter
        data={filters}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />

      {/* Advertisement Section */}
      <RestaurantAd data={ads} />

      {/* Restaurants Section */}
      <RestaurantComponent data={filteredRestaurants} />
    </div>
  );
}
