import { DialogContent,Dialog, Button, TextField } from "@mui/material";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { postData } from "../../../../services/FetchNodeServices";

export default function Address({openAddress,setOpenAddress}){

    const [mobileno,setMobileno]=useState('') 
    const [emailid,setEmailid]=useState('')
    const [fullname,setFullname]=useState('') 
    const [state,setState]=useState('') 
    const [city,setCity]=useState('') 
    const [addressone,setAddressOne]=useState('')
    const [addresstwo,setAddressTwo]=useState('') 
    const [landmark,setLandMark]=useState('') 
    const [pincode,setPincode]=useState('')

     const handleSubmit=async()=>{
     var  body={mobileno, emailid, fullname, state, city, addressone, addresstwo, landmark, pincode}
     var response=await postData('userinterface/submit_user_address',body)
     if(response.status)
     {
        alert('Address Submitted')
        setOpenAddress(false)
     }
     else
     {
        alert('Fail to Submit Address')
     }

     }

    const handleclose=()=>{
        setOpenAddress(false)
    }

return(<div >
    
<Dialog open={openAddress}   sx={{
      "& .MuiDialog-container": {
        "& .MuiPaper-root": {
          width: "100%",
          maxWidth: "500px",  
        },
      },
    }}   PaperProps={{ sx: { borderRadius: "10px",width:'80%' } }}  onClose={handleclose}>
   <DialogContent  >
   <div style={{fontSize:'22px',fontWeight:520,color:' rgb(79, 79, 79)',fontFamily:'Okra, Helvetica, sans-serif',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',marginBottom:20}}>
    Address
    <div style={{boxShadow:'2px 2px 5px 0px #bcbcbc',borderRadius:'50%',display:'flex',justifyContent:'center',marginLeft:'auto',width:'6%',cursor:'pointer'}} onClick={handleclose}><CloseIcon />
</div>
   </div>

    <TextField onChange={(e)=>setFullname(e.target.value)} style={{marginBottom:10}} fullWidth label='Full Name'  type='text' />

    <TextField onChange={(e)=>setEmailid(e.target.value)} style={{marginBottom:10}} fullWidth label='Email' type='email' />

    <TextField onChange={(e)=>setMobileno(e.target.value)} style={{marginBottom:10}} fullWidth label='Phone Number' type='text' />

    <TextField onChange={(e)=>setState(e.target.value)} style={{marginBottom:10}} fullWidth label='State' type='text' />

    <TextField onChange={(e)=>setCity(e.target.value)} style={{marginBottom:10}} fullWidth label='City' type='text' />

    <TextField onChange={(e)=>setAddressOne(e.target.value)} style={{marginBottom:10}} fullWidth label='Address Line One' type='text' />

    <TextField onChange={(e)=>setAddressTwo(e.target.value)} style={{marginBottom:10}} fullWidth label='Address Line Two' type='text' />

    <TextField onChange={(e)=>setLandMark(e.target.value)} style={{marginBottom:15}} fullWidth label='Landmark' type='text' />
    <TextField onChange={(e)=>setPincode(e.target.value)} style={{marginBottom:15}} fullWidth label='Pincode' type='text' />    


<div>
    <Button onClick={handleSubmit} variant='contained' style={{width:'40%',marginLeft:20,marginRight:20}}> Submit</Button>
    <Button variant='contained' style={{width:'40%',background:'red',marginLeft:10}}> Reset</Button>
</div>

    </DialogContent> 
</Dialog>


</div>)



}