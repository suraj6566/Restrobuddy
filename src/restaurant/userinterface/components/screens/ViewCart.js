import { serverURL } from "../../../../services/FetchNodeServices";
import AccountCart from "../AccountCart";
import DeliveryCart from "../DeliveryCart";
import PaymentCart from "../PaymentCart";
import { useState } from "react";

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useSelector } from "react-redux";
import FoodListCart from "../FoodListCart";
import RestroSearchBar  from "../RestroSearchBar"
export default function ViewCart() {
  const theme = useTheme();
  var cart=useSelector((state)=>state.cart)
  var user=useSelector((state)=>state.user)
  var userkeys=Object.keys(user).length
  const [refresh,setRefresh]=useState(false)
  const [openAddress,setOpenAddress]=useState(false)
  var foodList=Object.values(cart)
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  return (
     <div style={{display:'flex',flexDirection:'column'}}>
      <RestroSearchBar screen={'ViewCart'} />
    <div style={{  display: 'flex',justifyContent:'center', flexDirection:matches?'column':'row', width:'100%', background:'#e9ecee',height:'100%'}}>
      
      <div style={{ flexDirection:'column', display:'flex',alignItems:'center', width: '90%',margin:20}}>

      {userkeys==0?<AccountCart />:<></>}
        <DeliveryCart openAddress={openAddress} setOpenAddress={setOpenAddress}/>
        <PaymentCart />
      </div>
      
      <div style={{width:matches?'90%':'30%',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <FoodListCart foodList={foodList} refresh={refresh} setRefresh={setRefresh}/>
      </div>
    </div>
    </div>
  );
}
