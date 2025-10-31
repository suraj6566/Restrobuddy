import { Button } from '@mui/material'
import gps from '../../../../assets/gps.png'
import { useEffect, useState } from 'react'
import Address from "./Address"
import { useSelector,useDispatch } from 'react-redux'
import { postData } from '../../../../services/FetchNodeServices'
export default function ShowAllAddAddress({address}){
     const [getScale,setScale]=useState(false)
    
    var dispatch=useDispatch()
const handleClick=(item)=>{
 dispatch({type:'USER_ADDRESS',payload:[item]})
}    
const showAddress=()=>{
  return address.map((item)=>{

return(<div      style={{ width:'100%',height:'auto',display:'flex'}} onClick={()=>handleClick(item)}>


    <div  onMouseEnter={() => setScale(true)} onMouseLeave={() => setScale(false)} style={{background:'#fff',padding:20,  transition: 'transform 0.3s, box-shadow 0.3s',transform: getScale ? 'scale(1.02)' : 'scale(1)',  boxShadow: getScale ? '0 8px 16px rgba(0, 0, 0, 0.2)' : '0 4px 8px rgba(0, 0, 0, 0.1)',}}>

<div style={{display:'flex',justifyContent:'flex-start',marginBottom:10,flexDirection:'column'}}>
<div style={{flexDirection:'row',display:'flex'}}>
    <img src={gps}  style={{width:'12%'}}/>
    <div style={{marginLeft:10,fontWeight:700}}>
        Address
    </div>
  </div>
    <div  style={{ fontSize:10,color:'#000',display:'flex',flexDirection:'column', marginLeft:10,width:'100%',borderColor: '#4cd137',   '&:hover': { borderColor: '#4cd137',backgroundColor: 'rgba(76, 209, 55, 0.04)'}}}>
    <div>{item?.fullname}</div>
    <div>{item?.addressone},</div>
    <div>{item?.addresstwo},</div>
    <div>{item?.city},{item?.state}</div>
    <div>{item?.pincode}</div>
</div>

</div>
    </div>

</div>)   
  })
}

 return(<div  style={{display:'flex',marginLeft:10}}>
  
   {showAddress()}
 </div>) 
}