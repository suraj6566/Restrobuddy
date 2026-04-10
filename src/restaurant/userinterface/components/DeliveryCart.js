import FmdGoodIcon from '@mui/icons-material/FmdGood';
import AddAddress from '../components/userslogin/AddAddress'
import ShowAllAddAddress from './userslogin/ShowAllAddress';
import { useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import { postData } from '../../../services/FetchNodeServices';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
export default function DeliveryCart({openAddress,setOpenAddress}){
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    const [address,setAddress]=useState([])
    var user=useSelector((state)=>state.user)
    
    console.log("xxxxxxxxxxxxxxxxxx",user?.mobileno)
 const fetchAddress=async()=>{
    var response=await postData('userinterface/user_address',{mobileno:user?.mobileno})
    setAddress(response.data)
 }
 useEffect(function(){
    fetchAddress()
 },[user])
return (
    <div style={{position:'relative' ,width: matches ? "100%" : "80%",height:'auto',marginTop:'5%',padding: "20px",display: "flex",backgroundColor: "#fff",boxShadow: "0 12px 30px rgba(15,23,42,0.08)",borderRadius:16,overflow:'hidden'}}>
     <div style={{position: 'absolute',top: '28%',left:'12px',backgroundColor:'#fff',boxShadow: '0 8px 18px rgba(15,23,42,0.12)' ,padding: '8px',color: '#fff',borderRadius:12}}>
      <FmdGoodIcon style={{fontSize:30,color:'#000'}}/>
      </div>
      <div style={{ marginBottom: "15px",marginLeft:'60px',width:'100%'}}>
      <div style={{display:'flex', fontWeight: "bold", fontSize: "20px",marginTop:10,color:'rgba(2,6,12,.72)'}}>Delivery address</div>
      <div style={{fontSize:13,color:'#6b7280',marginTop:4}}>Add or choose the address where you want your order delivered.</div>
     
      <div style={{display:'flex', flexDirection:matches?'column':'row', gap:matches?12:20, marginTop:12}}>
        <div style={{width:matches?'100%':'30%',height:'100%' }}> 
        <AddAddress openAddress={openAddress} setOpenAddress={setOpenAddress}/>
        </div>
        <div style={{width:matches?'100%':'30%',height:'100%'}}> 
        <ShowAllAddAddress address={address}/>
        </div>
      </div>

      </div>
      </div>

)}
