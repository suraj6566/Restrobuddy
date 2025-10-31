import FmdGoodIcon from '@mui/icons-material/FmdGood';
import WalletIcon from '@mui/icons-material/Wallet';
import AddAddress from '../components/userslogin/AddAddress'
import ShowAllAddAddress from './userslogin/ShowAllAddress';
import { useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import { postData } from '../../../services/FetchNodeServices';
export default function DeliveryCart({openAddress,setOpenAddress}){
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
    <div style={{display:'flex',position:'relative' ,width: "80%",height:'auto',marginTop:'5%',padding: "20px",display: "flex",backgroundColor: "#fff",boxShadow: "0 2px 8px rgba(0,0,0,0.1)"}}>
     <div style={{position: 'absolute',top: '30%',left:'-30px',backgroundColor:'#fff',boxShadow: '2px 4px 6px grey' ,padding: '5px',color: '#fff'}}>
      <FmdGoodIcon style={{fontSize:30,color:'#000'}}/>
      </div>
      <div style={{ marginBottom: "15px",marginLeft:'4%',width:'100%'}}>
      <div style={{display:'flex', fontWeight: "bold", fontSize: "20px",marginTop:15,color:'rgba(2,6,12,.5)'}}>Delivery address</div>
     
      <div style={{display:'flex'}}>
        <div style={{width:'30%',height:'100%' }}> 
        <AddAddress openAddress={openAddress} setOpenAddress={setOpenAddress}/>
        </div>
        <div style={{width:'30%',height:'100%'}}> 
        <ShowAllAddAddress address={address}/>
        </div>
      </div>

      </div>
      </div>

)}