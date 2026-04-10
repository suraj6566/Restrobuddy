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
     <div style={{display:'flex',flexDirection:'column', background:'#f8fafc', minHeight:'100vh'}}>
      <RestroSearchBar screen={'ViewCart'} />
    <div style={{  display: 'flex',justifyContent:'center', flexDirection:matches?'column':'row', width:'100%', background:'#f8fafc',height:'100%', gap:matches?12:8}}>
      
      <div style={{ flexDirection:'column', display:'flex',alignItems:'center', width: matches ? '100%' : '90%',margin:matches?0:20,padding:matches?'0 8px':'0'}}>

      {userkeys==0?<AccountCart />:<></>}
        <DeliveryCart openAddress={openAddress} setOpenAddress={setOpenAddress}/>
        <PaymentCart />
      </div>
      
      <div style={{width:matches?'100%':'30%',display:'flex',alignItems:'flex-start',justifyContent:'center',padding:matches?'0 8px 20px 8px':'0'}}>
      <FoodListCart foodList={foodList} refresh={refresh} setRefresh={setRefresh}/>
      </div>
    </div>
    </div>
  );
}
