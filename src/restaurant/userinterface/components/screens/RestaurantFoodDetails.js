import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams } from "react-router-dom";
import { postData } from "../../../../services/FetchNodeServices";

import RestaurantDetailsPage from "../RestaurantDetailsPage";
import OrderOnline from "../OrderOnline";
import Photos from "../Photos";

import tabel from "../../../../assets/table3.png";
import tabel2 from "../../../../assets/tabel2.png";
import thali from "../../../../assets/thali.png";
import gallery from "../../../../assets/gallery.png";
import p1 from "../../../../assets/photo1.png";
import p2 from "../../../../assets/photo2.png";
import p3 from "../../../../assets/photo3.png";
import p4 from "../../../../assets/photo4.png";
import p5 from "../../../../assets/photo5.png";
import p6 from "../../../../assets/photo6.png";
import p7 from "../../../../assets/photo7.png";

export default function RestaurantFoodDetails() {
  const [value, setValue] = useState(0);
  const [categoryId, setCategoryId] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [foodList, setFoodList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [restaurantData, setRestaurantData] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [selectedFoodFilter, setSelectedFoodFilter] = useState("");

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const { restaurantid, restaurantname } = useParams();

  const normalizeRestaurantData = (value) => {
    if (Array.isArray(value)) {
      const firstItem = value[0] || {};
      const mergedPictures = value
        .flatMap((item) => [
          ...(item?.pictures
            ? item.pictures
                .split(",")
                .map((picture) => picture?.trim())
                .filter(Boolean)
            : []),
          ...(item?.image ? [item.image] : []),
          ...(item?.img ? [item.img] : []),
          ...(item?.filelogo ? [item.filelogo] : []),
        ])
        .filter((item, index, self) => item && self.indexOf(item) === index)
        .join(",");

      return {
        ...firstItem,
        pictures: mergedPictures || firstItem?.pictures,
      };
    }

    return value || {};
  };

  // ✅ Fetch restaurant details
  const fetchRestaurantDetails = async () => {
    const res = await postData(
      "userinterface/user_fetch_ambience_by_restaurantid",
      { restaurantid }
    );
    if (res.status) {
      const normalizedData = normalizeRestaurantData(res.data);

      setRestaurantData({
        ...normalizedData,
        restaurantid: normalizedData?.restaurantid || restaurantid,
        restaurantname:
          normalizedData?.restaurantname ||
          decodeURIComponent(restaurantname || ""),
      });
    } else {
      alert("Unable to fetch restaurant details");
    }
  };

  // ✅ Fetch categories for restaurant
  const fetchAllCategory = async () => {
    const res = await postData("userinterface/fetch_category_count", {
      restaurantid,
    });
    if (res.status) {
      setCategoryList(res.data);
      setCategoryId(res?.data[0]?.categoryid);
    } else {
      alert("Unable to fetch categories");
    }
  };

  // ✅ Fetch food by selected category
  const fetchAllFood = async () => {
    const res = await postData("userinterface/fetch_all_food_by_category", {
      restaurantid,
      categoryid: categoryId,
    });
    if (res.status) setFoodList(res.data);
  };

  useEffect(() => {
    setCategoryId(null);
    setCategoryList([]);
    setFoodList([]);
    setRestaurantData({});

    fetchRestaurantDetails();
    fetchAllCategory();
  }, [restaurantid, restaurantname]);

  useEffect(() => {
    if (restaurantid && categoryId) fetchAllFood();
  }, [restaurantid, categoryId]);

  useEffect(() => {
    if (!categoryList.length) return;

    setRestaurantData((prev) => ({
      ...prev,
      listcategory:
        prev?.listcategory ||
        categoryList.map((item) => item.categoryname).join(", "),
    }));
  }, [categoryList]);

  const allphotos = [
    { id: 1, img: tabel },
    { id: 2, img: tabel2 },
    { id: 3, img: gallery },
    { id: 4, img: thali },
    { id: 5, img: p1 },
    { id: 6, img: p2 },
    { id: 7, img: p3 },
    { id: 8, img: p4 },
    { id: 9, img: p5 },
    { id: 10, img: p6 },
    { id: 11, img: p7 },
  ];

  const foodphotos = [
    { id: 1, img: thali },
    { id: 2, img: p1 },
    { id: 3, img: p2 },
    { id: 4, img: p3 },
    { id: 5, img: p4 },
    { id: 6, img: p5 },
    { id: 7, img: p6 },
    { id: 8, img: p7 },
  ];

  const ambience = [
    { id: 1, img: tabel },
    { id: 2, img: tabel2 },
    { id: 3, img: gallery },
  ];

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderTabs = () => (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div
        style={{
          width: matches ? "92%" : "73%",
          borderBottom: "1px solid grey",
          marginBottom: 10,
          overflowX: "auto",
        }}
      >
        <Tabs
          value={value}
          onChange={handleTabChange}
          variant={matches ? "scrollable" : "standard"}
          scrollButtons="auto"
          allowScrollButtonsMobile
          TabIndicatorProps={{
            style: { background: "rgb(239, 79, 95)" },
          }}
        >
          <Tab
            value={0}
            label="Order Online"
            style={{
              color: value === 0 ? "rgb(239, 79, 95)" : "rgb(105, 105, 105)",
              textTransform: "none",
              fontSize: matches ? 12 : 18,
              letterSpacing: 0.5,
              marginBottom: 3,
              minWidth: matches ? 110 : undefined,
            }}
          />
          <Tab
            value={1}
            label="Reviews"
            style={{
              color: value === 1 ? "rgb(239, 79, 95)" : "rgb(105, 105, 105)",
              textTransform: "none",
              fontSize: matches ? 12 : 17.5,
              marginLeft: matches ? 14 : 18,
              letterSpacing: 0.5,
              marginBottom: 3,
              minWidth: matches ? 90 : undefined,
            }}
          />
          <Tab
            value={2}
            label="Photos"
            style={{
              color: value === 2 ? "rgb(239, 79, 95)" : "rgb(105, 105, 105)",
              textTransform: "none",
              fontSize: matches ? 12 : 17.5,
              marginLeft: matches ? 14 : 18,
              letterSpacing: 0.5,
              marginBottom: 3,
              minWidth: matches ? 90 : undefined,
            }}
          />
          <Tab
            value={3}
            label="Menu"
            style={{
              color: value === 3 ? "rgb(239, 79, 95)" : "rgb(105, 105, 105)",
              textTransform: "none",
              fontSize: matches ? 12 : 17.5,
              marginLeft: matches ? 14 : 18,
              letterSpacing: 0.5,
              marginBottom: 3,
              minWidth: matches ? 80 : undefined,
            }}
          />
        </Tabs>
      </div>
    </div>
  );

  return (
    <div>
      <RestaurantDetailsPage data={restaurantData} />
      {renderTabs()}
      {value === 0 && (
        <OrderOnline
          data={categoryList}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          foodList={foodList}
          refresh={refresh}
          setRefresh={setRefresh}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          selectedFoodFilter={selectedFoodFilter}
          setSelectedFoodFilter={setSelectedFoodFilter}
        />
      )}
      {value === 2 && (
        <Photos
          allphotos={allphotos}
          foodphotos={foodphotos}
          ambience={ambience}
        />
      )}
    </div>
  );
}
