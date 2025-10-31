import { Button } from '@mui/material'
import gps from '../../../../assets/gps.png'
import { useState } from 'react'
import Address from "./Address"
export default function AddAddress({setOpenAddress,openAddress}){
    const [getScale,setScale]=useState(false)
 const handleOpen=()=>{
    setOpenAddress(true)

 }

return(<div      style={{display:'flex',width:'100%',height:'100%'}}>


    <div  onMouseEnter={() => setScale(true)} onMouseLeave={() => setScale(false)} style={{background:'#fff',padding:20,  transition: 'transform 0.3s, box-shadow 0.3s',transform: getScale ? 'scale(1.02)' : 'scale(1)',  boxShadow: getScale ? '0 8px 16px rgba(0, 0, 0, 0.2)' : '0 4px 8px rgba(0, 0, 0, 0.1)',}}>

<div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',marginBottom:20}}>
    <img src={gps}  style={{width:'7%'}}/>
    <div style={{marginLeft:10,fontWeight:700}}>
        Add New Address
    </div>
    
</div>

<Button onClick={handleOpen} variant='outlined'  style={{color:'#4cd137',fontWeight:800,marginLeft:30,width:'60%',borderColor: '#4cd137',   '&:hover': { borderColor: '#4cd137',backgroundColor: 'rgba(76, 209, 55, 0.04)' }}}>
    Add New 
</Button>

    </div>
<Address openAddress={openAddress} setOpenAddress={setOpenAddress}/>
</div>)   
}