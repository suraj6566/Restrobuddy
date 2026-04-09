import { Paper } from "@mui/material";
import { Star } from "@mui/icons-material";
import { serverURL } from "../../../services/FetchNodeServices";
import { useNavigate } from "react-router-dom";
export default function RestaurantComponent({ data }) {
  var navigate=useNavigate()
  return (
    <div style={{ width: "100%", textAlign: "center", marginTop: "2px" }}>
    <div style={{fontSize: "30px",fontWeight: "600",marginBottom: "60px",display: "flex",justifyContent: "flex-start",marginLeft: "13vw",}}>
    Restaurants in {data[0]?.cityname}
    </div>

    <div style={{display: "flex",flexWrap: "wrap",justifyContent: "center",gap: "40px",marginTop: "20px",width: "100%",marginBottom: 50}}>
    {data.map((item, index) => (
    <Paper onClick={()=>navigate(`/restaurantfooddetails/${item?.restaurantid}/${item?.restaurantname}`)}  key={index} elevation={3} style={{borderRadius: "15px",cursor:'pointer', overflow: "hidden",width: "350px",display: "flex",flexDirection: "column",}}>
    <img src={`${serverURL}/images/${item?.pictures?.split(",")[1]}`} style={{ width: "100%", height: "200px", objectFit: "cover" }}/>

     <div style={{padding: "12px",display: "flex",flexDirection: "column",gap: "8px",}}>
     <div style={{display: "flex",justifyContent: "space-between",alignItems: "center",}}>
     <div style={{ fontSize: "18px", fontWeight: "700" }}>
     {item.restaurantname}
     </div>
     <div style={{display: "flex",alignItems: "center",background: "#4CAF50",color: "white",padding: "2px 8px",borderRadius: "12px",fontSize: "14px",}}>
     {5}
     <Star style={{ fontSize: "16px", marginLeft: "4px" }} />
     </div>
     </div>

     <div style={{display: "flex",justifyContent: "space-between",fontSize: "14px"}}>
     <span style={{ color: "#666" }}>{item.item_name}</span>
     <span style={{ fontWeight: "600" }}>{item.price}</span>
     </div>
     <div style={{display: "flex",justifyContent: "space-between",fontSize: "14px",color: "#666",}}>
     <span>{item.address}, {item.cityname}</span>
     <span>2 km</span>
     </div>
     <div style={{display: "flex",justifyContent: "space-between",fontSize: "14px",color: "red",}}>
      Opens at {item.timingopen}
     </div>
     </div>
     </Paper>
        ))}
      </div>
    </div>
  );
}
