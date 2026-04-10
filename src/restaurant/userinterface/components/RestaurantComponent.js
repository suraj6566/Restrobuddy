import { Paper } from "@mui/material";
import { Star } from "@mui/icons-material";
import {
  getImageUrl,
  handleImageError,
} from "../../../services/FetchNodeServices";
import { useNavigate } from "react-router-dom";
export default function RestaurantComponent({ data }) {
  var navigate=useNavigate()
  const PARAM_FOOD_IMAGE =
    "https://restrobuddybackend-production-d28f.up.railway.app/images/cee5cee7-1d52-4a99-bf8c-6883b221b6bc.png";

  const getRestaurantImage = (item) => {
    if (item?.restaurantname?.toLowerCase() === "param food") {
      return PARAM_FOOD_IMAGE;
    }

    const pictureList = item?.pictures
      ? item.pictures.split(",").map((picture) => picture?.trim()).filter(Boolean)
      : [];

    return (
      pictureList[0] ||
      pictureList[1] ||
      item?.image ||
      item?.img ||
      item?.filelogo
    );
  };

  const uniqueData = data.filter((item, index, self) => {
    const itemId = item?._id || item?.id || item?.restaurantid;

    if (!itemId) {
      return (
        index ===
        self.findIndex(
          (t) =>
            t?.restaurantname === item?.restaurantname &&
            t?.address === item?.address
        )
      );
    }

    return (
      index ===
      self.findIndex(
        (t) => (t?._id || t?.id || t?.restaurantid) === itemId
      )
    );
  });

  return (
    <div style={{ width: "100%", textAlign: "center", marginTop: "2px" }}>
    <div style={{fontSize: "clamp(26px, 4vw, 30px)",fontWeight: "600",marginBottom: "34px",display: "flex",justifyContent: "flex-start",marginLeft: "clamp(20px, 13vw, 180px)",paddingRight:20}}>
    Restaurants in {uniqueData[0]?.cityname}
    </div>

    <div style={{display: "flex",flexWrap: "wrap",justifyContent: "center",gap: "28px",marginTop: "20px",width: "100%",marginBottom: 50,padding:"0 12px"}}>
    {uniqueData.map((item) => (
    <Paper onClick={()=>navigate(`/restaurantfooddetails/${item?.restaurantid}/${item?.restaurantname}`)}  key={item?._id || item?.id || item?.restaurantid || item?.restaurantname} elevation={3} style={{borderRadius: "18px",cursor:'pointer', overflow: "hidden",width: "min(100%, 350px)",display: "flex",flexDirection: "column",transition:"transform 0.2s ease, box-shadow 0.2s ease",boxShadow:"0 8px 24px rgba(15,23,42,0.10)"}}>
    <img src={getImageUrl(getRestaurantImage(item))} onError={handleImageError} style={{ width: "100%", height: "220px", objectFit: "cover",background:"#f1f5f9" }}/>

     <div style={{padding: "14px",display: "flex",flexDirection: "column",gap: "8px",}}>
     <div style={{display: "flex",justifyContent: "space-between",alignItems: "center",}}>
     <div style={{ fontSize: "18px", fontWeight: "700",textAlign:"left",paddingRight:8 }}>
     {item.restaurantname}
     </div>
     <div style={{display: "flex",alignItems: "center",background: "#4CAF50",color: "white",padding: "2px 8px",borderRadius: "12px",fontSize: "14px",}}>
     {5}
     <Star style={{ fontSize: "16px", marginLeft: "4px" }} />
     </div>
     </div>

     <div style={{display: "flex",justifyContent: "space-between",fontSize: "14px"}}>
     <span style={{ color: "#666",textAlign:"left" }}>{item.item_name || item.foodname || item.category}</span>
     <span style={{ fontWeight: "600" }}>{item.price}</span>
     </div>
     <div style={{display: "flex",justifyContent: "space-between",fontSize: "14px",color: "#666",}}>
     <span style={{textAlign:"left"}}>{item.address}, {item.cityname}</span>
     <span>2 km</span>
     </div>
     <div style={{display: "flex",justifyContent: "space-between",fontSize: "14px",color: "red",}}>
      Opens at {item.timingopen || item.opentime || "11:00am"}
     </div>
     </div>
     </Paper>
        ))}
      </div>
    </div>
  );
}
