import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import DiningHeader from "../DiningHeader";
import RestaurantList from "../RestaurantList";
import DeliveryList from "../DeliveryList";
import { serverURL } from "../../../../services/FetchNodeServices";

export default function DiningAndDelivery() {
  const [value, setValue] = useState(0);
  const params = useParams();
  console.log("params", params);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
      <DiningHeader />

      {/* ✅ Tabs */}
      {renderTabs()}

      {/* ✅ Dynamic Content */}
      <Box sx={{ mt: 3, px: { xs: 2, sm: 4, md: 10 } }}>
        {value === 0 && <RestaurantList city={params} />}
        {value === 1 && <DeliveryList city={params} />}
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
    </Box>
  );
}
