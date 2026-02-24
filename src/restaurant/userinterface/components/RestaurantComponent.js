import { Paper } from "@mui/material";
import { Star } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../../../services/FetchNodeServices";

export default function RestaurantComponent({ data }) {
  const navigate = useNavigate();

  // ✅ safe image selector
  const getImageName = (pictures) => {
    if (!pictures) return null;

    const arr = pictures.split(",");

    // 2nd image try → fallback to 1st
    return arr[1] || arr[0];
  };

  return (
    <div style={{ width: "100%", textAlign: "center", marginTop: "2px" }}>
      
      {/* HEADING */}
      <div
        style={{
          fontSize: "30px",
          fontWeight: "600",
          marginBottom: "60px",
          display: "flex",
          justifyContent: "flex-start",
          marginLeft: "13vw",
        }}
      >
        Restaurants in {data?.[0]?.cityname}
      </div>

      {/* CARDS */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "40px",
          marginTop: "20px",
          width: "100%",
          marginBottom: 50,
        }}
      >
        {data?.map((item, index) => {
          const imageName = getImageName(item?.pictures);

          return (
            <Paper
              key={index}
              elevation={3}
              onClick={() =>
                navigate(
                  `/restaurantfooddetails/${item?.restaurantid}/${item?.restaurantname}`
                )
              }
              style={{
                borderRadius: "15px",
                cursor: "pointer",
                overflow: "hidden",
                width: "350px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              
              {/* IMAGE */}
              <img
                src={
                  imageName
                    ? `${serverURL}/images/${imageName}`
                    : "/assets/default.png"
                }
                onError={(e) => {
                  e.target.src = "/assets/default.png";
                }}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />

              {/* CONTENT */}
              <div
                style={{
                  padding: "12px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {/* TITLE + RATING */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontSize: "18px", fontWeight: "700" }}>
                    {item?.restaurantname}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      background: "#4CAF50",
                      color: "white",
                      padding: "2px 8px",
                      borderRadius: "12px",
                      fontSize: "14px",
                    }}
                  >
                    {item?.rating || 5}
                    <Star style={{ fontSize: "16px", marginLeft: "4px" }} />
                  </div>
                </div>

                {/* FOOD + PRICE */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "14px",
                  }}
                >
                  <span style={{ color: "#666" }}>
                    {item?.item_name || "Food Item"}
                  </span>
                  <span style={{ fontWeight: "600" }}>
                    ₹{item?.price || 0}
                  </span>
                </div>

                {/* ADDRESS */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "14px",
                    color: "#666",
                  }}
                >
                  <span>
                    {item?.address}, {item?.cityname}
                  </span>
                  <span>2 km</span>
                </div>

                {/* TIMING */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "14px",
                    color: "red",
                  }}
                >
                  Opens at {item?.timingopen || "N/A"}
                </div>
              </div>
            </Paper>
          );
        })}
      </div>
    </div>
  );
}