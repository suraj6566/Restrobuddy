import Card from '@mui/material/Card';
import { Grid2,Button, DialogContent,DialogTitle,DialogActions,Dialog} from "@mui/material";
import close from '../../../../assets/close.png'
import indianflage from '../../../../assets/indianflag.jpg'
import email from '../../../../assets/email.png'
import google from '../../../../assets/google.png'
import { useState } from 'react';
import { postData,generateOtp } from '../../../../services/FetchNodeServices';
import { useDispatch } from 'react-redux';
export default function Login({setOtpOpen,otpOpen,loginOpen,setLoginOpen,setOtpValue,otpValue,statusScreen,setStatusScreen,setUserData,userData}) {
  const [mobileno,setMobileno]=useState('') 
  
  const handleOpenOtp =async() => {
        var res=await postData('userinterface/search_user_mobileno',{mobileno})
          if(res.status)
          { 
         
      var otp=generateOtp()
      alert(otp)
      setOtpValue(otp)
      setOtpOpen(true)
      setLoginOpen(false);
      setUserData(res.data)
      setStatusScreen('Login')
          } 
          else
          {
            alert('Mobile number not exist')
          }
       };
  
    const handleClose = () => {
      setLoginOpen(false);
    };
return(

  <div style={{display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
    height:'100%',
     background:'#1C1C1C'
     }}>
          
          <Dialog open={loginOpen} onClose={handleClose}  maxWidth="xs" fullWidth>
           <DialogTitle>
          <div style={{ display: 'flex', justifyContent: 'space-between',alignItems: 'center' }}>
        <span style={{ fontSize: 30 }}>Sign Up</span>
        <Button onClick={handleClose} style={{ padding: 0 }}>
              <img src={close} style={{ width: 20,marginLeft:'auto' }}/>
        </Button>
        </div>
        </DialogTitle>
          <DialogContent>
                   <Grid2  size={12}>
                   <div style={{padding:10,height:30,border:'1px solid #dcdcdc',display:'flex',alignItems:'center',background:'#fff',borderRadius:5,marginBottom:25}}>
          <div style={{width:'30%', display:"flex",justifyContent:'space-between'}}>
                      <img src={indianflage} style={{objectFit:'contain',maxWidth:'2rem'}}/>
              <p style={{marginRight:10}}>+91</p>
              </div>
              <div style={{width:0.01,height:30,border:'0.5px solid #dcdcdc'}}></div>
              <div>     
                <input onChange={(e)=>setMobileno(e.target.value)} type="text"placeholder="Phone " style={{width:'70%', height:30,fontSize:20,color:'grey',outline:'none',border:0 ,marginLeft:10}}/>
               </div>
               </div>
               </Grid2>
               <Grid2 size={12}>
                   
                      
              <Grid2 size={12}>
             <Button onClick={handleOpenOtp} variant='outlined' style={{backgroundColor:'rgb(239, 79, 95)',height:50 ,width:'100%',color:'#fff',textTransform:'capitalize',fontSize:16}}>Send One Time Password</Button>
              </Grid2>
                </Grid2>

                <Grid2 size={12}>
                <div style={{width:'100%',border:'none',color:'#dcdcdc',fontSize:24,
               }}>
              _________________or__________________
               </div>
              </Grid2>

             <Grid2 size={12}>
             <Button variant='outlined' style={{height:50 ,width:'100%', color:'#fff',textTransform:'capitalize',fontSize:16,    marginTop:25,color:'#000'}}><img src={email} style={{objectFit:'contain',maxWidth:'1.2rem',margin:8}}/>Continue with Email </Button>
               </Grid2>

                <Grid2 size={12}>
                <Button variant='outlined' style={{height:50 ,width:'100%',color:'#fff',textTransform:'capitalize',fontSize:16,marginTop:28,color:'#000'}}><img src={google} style={{objectFit:'contain',maxWidth:'1.2rem',margin:8}}/> Sign in with google </Button>
               </Grid2>

               <Grid2 size={12}>
               <div style={{width:'100%',border:'none',color:'#dcdcdc',fontSize:24,marginBottom:10}}>
               _______________________________________
              </div>
              </Grid2>

              <Grid2 size={12}>
              <span style={{fontsize:'16px',color:'#3636363',}}> New To Zomato?</span>
              <span style={{fontsize:'16px',color:'#3636363',color:'rgb(239, 79, 95)'}}> Create Account  </span>
              </Grid2>
             </DialogContent>
             <DialogActions>
             <Button onClick={handleClose} color="primary">
             Close
             </Button>
           </DialogActions>
          </Dialog>

    </div>)
}
