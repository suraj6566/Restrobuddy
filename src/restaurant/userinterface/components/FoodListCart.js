import { serverURL } from "../../../services/FetchNodeServices";
import PlusMinusComponent from "../components/PlusMinusComponent";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import FoodComponentPaymentCart from "./FoodComponentPaymentCart";

export default function FoodListCart({foodList,refresh,setRefresh})
{
     const theme = useTheme();
     var total=foodList.reduce(function(total,item){
      var price
      if(item?.offerprice>0)
        price=(item?.price-item?.offerprice)*item?.qty
        else
        price=item?.price*item?.qty 
       return total+price
     },0) 
     var gst=total*5/100
     var dc=42
     var nettotal=total+gst+dc
      const matches = useMediaQuery(theme.breakpoints.down("md"));
      const showFoodList=()=>{
        return foodList?.map((item)=>{
        return <FoodComponentPaymentCart item={item} refresh={refresh} setRefresh={setRefresh}/>

        })
      }
  return(<div style={{
    marginTop: '3%',width:"80%",height: 'auto',padding: "16px",fontSize: "14px",color: "#282c3f",boxShadow: "0 2px 8px rgba(0,0,0,0.1)",background:'#fff'}}>
          
        <div style={{ display: "flex", marginBottom: "16px" }}>
          <img src={`${serverURL}/images/${foodList[0]?.filelogo}`} style={{ width: "64px", height: "64px", borderRadius: "4px", marginRight: "10px" }} />
          <div>
            <div style={{ fontWeight: "bold", fontSize: "16px" }}>{foodList[0]?.restaurantname}</div>
            <div style={{ color: "#686b78", fontSize: "13px" }}>{foodList[0]?.address}</div>
          </div>
        </div>
          
        {showFoodList()}

        <div style={{ backgroundColor: "#f1f1f6", padding: "12px", fontSize: "13px", marginBottom: "16px" }}>
          Any suggestions? We will pass it on...
        </div>

        <div style={{ border: "1px solid #d4d5d9", padding: "10px", marginBottom: "16px" }}>
          <input type="checkbox" style={{ marginRight: "8px" }} />
          <span style={{ fontWeight: "bold" }}>Opt in for No-contact Delivery</span>
          <div style={{ marginTop: "8px", color: "#686b78", fontSize: "13px", marginLeft: 25 }}>
            Unwell, or avoiding contact? Please select no-contact delivery. Partner will safely place the order outside your door (not for COD)
          </div>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <div style={{ fontWeight: "bold", marginBottom: "10px", fontSize: '13px' }}>Bill Details</div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: '13px' }}>
            <span>Item Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: '13px' }}>
            <span>Delivery Fee | 2.1 kms</span>
            <span>₹{dc.toFixed(2)}</span>
          </div>
          <div style={{ height: "1px", backgroundColor: "#e9e9eb", margin: "16px 0" }} />

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: '13px' }}>
            <span>Delivery Tip</span>
            <span style={{ color: "#fc8019", cursor: "pointer" }}>Add tip</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: '13px' }}>
            <span>GST & Other Charges</span>
            <span>₹{gst.toFixed(2)}</span>
          </div>
        </div>

        <div style={{ height: "2px", fontWeight: 'bold', backgroundColor: "#000", margin: "16px 0" }} />

        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "13px", marginTop: "12px", color: '#000' }}>
          <span>TO PAY</span>
          <span>₹{nettotal.toFixed(2)}</span>
        </div>
      </div>)
}