import React, { useState } from 'react';
import { Grid2, Button, TextField, FormControl, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import close from '../../../../assets/close.png';
import google from '../../../../assets/google.png';
import { useDispatch } from 'react-redux';
import { generateOtp,postData } from '../../../../services/FetchNodeServices';
export default function SignUP({signOpen,setSignOpen,setOtpOpen,otpOpen,setOtpValue,otpValue,userData,setUserData,statusScreen,setStatusScreen}) {
      const [mobileno,setMobileno]=useState('') 
  const [email_id,setEmail_id]=useState('') 
  const [userName,setUserName]=useState('') 
  var dispatch=useDispatch() 

      const handleOpenOtp =async() => {
        var res=await postData('userinterface/search_user',{email_id,mobileno})
          if(res.status)
          { 
            alert('Emailid/Mobile No Already Registered...')
          }
          else
          {
     
      var otp=generateOtp()
      alert(otp)
      setOtpValue(otp)
      setOtpOpen(true)
      setSignOpen(false);
      setStatusScreen('SignUp')
      setUserData({mobileno,email_id,username:userName})
          } 
       };

      const handleClose = () => {
      setSignOpen(false);
      };

      return (
         <div style={{ display: 'flex', justifyContent: 'center',         alignItems: 'center', width: '100%', height: '100%' }}>
     
           <Dialog open={signOpen}   maxWidth="xs"    fullWidth >
             <DialogTitle>
            <div style={{ display: 'flex', justifyContent: 'space-between',    alignItems: 'center' }}>
             <span style={{ fontSize: 30 }}>Sign Up</span>
              <Button onClick={handleClose} style={{ padding: 0 }}>

              <img src={close} style={{ width: 20,marginLeft:'auto' }}/>
               </Button>
               </div>

                </DialogTitle>
                <DialogContent>
                 <Grid2 container spacing={0}>
                   <Grid2 size={12}>
                <FormControl style={{ marginBottom: 20 }} fullWidth>
                <TextField onChange={(e)=>setMobileno(e.target.value)} placeholder="Mobile Number"  variant="outlined" />
                </FormControl>
                </Grid2>
                <Grid2 size={12}>
                <FormControl style={{ marginBottom: 20 }} fullWidth>
                <TextField onChange={(e)=>setUserName(e.target.value)} placeholder="Full Name"  variant="outlined" />
                </FormControl>
                </Grid2>
                <Grid2 size={12}>
              
                <FormControl fullWidth>
                <TextField  onChange={(e)=>setEmail_id(e.target.value)} placeholder="Email"  variant="outlined" />
                 </FormControl>

          
                 </Grid2>
                 <Grid2 style={{ marginTop: 20 }} size={12}>
                <Button onClick={handleOpenOtp} variant='outlined' style={{ backgroundColor: '#dcdcdc', height: 50, width: '100%', color: '#fff',       fontSize: 16 }}>
                Send Create Account
                 </Button>
                </Grid2>
               <div style={{ width: '100%', border: 'none', color: '#dcdcdc', fontSize: 24 }}>
               _________________or___________________
                </div>
                <Grid2 size={12}>
                <Button variant='outlined' style={{ height: 50, width: '100%', color: '#fff', fontSize: 14, marginTop: 28, color: '#000' }}>
                <img src={google} style={{ objectFit: 'contain',width:20,height:25, margin: 8 }}/> Sign in with Google
                </Button>
                </Grid2>
               <Grid2 size={12}>
              <div style={{ width: '100%', border: 'none', color: '#dcdcdc', fontSize: 24 }}>
              _______________________________________
              </div>
              </Grid2>
              <Grid2 style={{ marginTop: 10 }} size={12}>
              <span style={{ fontSize: 18, color: '#363636', margin: 7 }}>Already have an account?</span>
              <span style={{ fontSize: 20, color: 'rgb(239, 79, 95)' }}>Login</span>
              </Grid2>
               </Grid2>
              </DialogContent>
               </Dialog>
             </div>  );}