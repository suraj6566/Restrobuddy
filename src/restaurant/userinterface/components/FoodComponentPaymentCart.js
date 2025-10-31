import { serverURL } from "../../../services/FetchNodeServices";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import PlusMinusComponent from './PlusMinusComponent';
import ImageAddCart from './ImageAddCart'
import { useState } from 'react';
import FloatingCart from './FloatingCart';
import { useDispatch, useSelector } from 'react-redux';
export default function FoodComponentPaymentCart({item,setRefresh,refresh})
{
 
  var dispatch=useDispatch()
 
 
const handleQtyChange=(value,item)=>{
if(value>=1)  
{ item['qty']=value

  dispatch({type:'ADD_CART',payload:[item.foodid,item]})


}
else if(value==0)
{dispatch({type:'DELETE_CART',payload:[item.foodid]})

}
setRefresh(!refresh)
}

  
    return(   
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px",width:"100%" }}>
          <div style={{width:'40%', display: "flex", alignItems: "center", gap: "8px" }}>
           {(item?.foodtype).toLowerCase()=='veg'?<img src='/veg.png' style={{width:20,marginRight:5}}/>:<img src='/nonveg.png' style={{width:20,marginRight:5}}/>}
            <span>{item?.foodname}</span>
          </div>
          
        <div style={{cursor:'pointer',width:'40%'}}>
                 <PlusMinusComponent qty={item?.qty} onChange={(value)=>handleQtyChange(value,item)}  width={'5%'}  qtytype={item.quantitytype}/>
          </div>
          <div style={{width:'20%',display:'flex',justifyContent:'right'}}>{item.offerprice>0?<div style={{fontWeight:700,marginLeft:'5%'}}>&#8377;{((item?.price-item?.offerprice)*item?.qty).toFixed(2)}</div>:<div style={{fontWeight:700}}>&#8377;{(item?.price*item?.qty).toFixed(2)}</div>}</div>
        </div>

            </div>
    )
}