import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { serverURL } from '../../../services/FetchNodeServices';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Login from './userslogin/Login';
import SignUp from "./userslogin/SignUp"
import Otp from "./userslogin/Otp"
import { useState } from 'react';
export default function AccountCart() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    const [loginOpen,setLoginOpen]=useState(false)
    const [signOpen,setSignOpen]=useState(false)
    const [otpOpen,setOtpOpen]=useState(false)
    const [otpValue,setOtpValue]=useState('')
    const [userData,setUserData]=useState({})
    const [statusScreen,setStatusScreen]=useState('')

  return (
    <div style={{position:'relative' ,width:matches?'80%':"80%",height:'auto',padding: "20px",display: "flex",justifyContent:'center',alignItems:'center',backgroundColor: "#fff",boxShadow: "0 2px 8px rgba(0,0,0,0.1)"}}>
     <div style={{position: 'absolute',top: '15%',left:'-30px',backgroundColor: '#000',padding: '5px',color: '#fff'}}>
        <PersonOutlineIcon style={{fontSize:35}}/>
      </div>
      <div>
      <div style={{ marginBottom: "15px",marginLeft:'4%',width:'100%'}}>
      <div style={{ fontWeight: "bold", fontSize: "20px",marginTop:15 }}>Account</div>
          <div style={{ fontSize: "16px", color:'rgba(2,6,12,.6)',fontWeight:530,marginTop:4}}>
            To place your order now, log in to your existing account or sign up.
          </div>
      </div>

      <div style={{ display: "flex", gap: "20px",height:'auto',marginTop:'8%',marginLeft:'4%',height:'50px'}}>
          <div onClick={()=>setLoginOpen(true)} style={{border: "1px solid #1ba672",textAlign: "center", cursor: "pointer",width:matches?'50%':'30%',padding:5}}>
            <div style={{ color: "#1ba672", fontSize:matches?'10px':"14px",fontWeight:550 }}>Have an account?</div>
            <div style={{ fontWeight: "bold", color: "#1ba672"}}>LOG IN</div>
          </div>

          <div  onClick={()=>setSignOpen(true)}  style={{backgroundColor: "#1ba672",textAlign: "center",color: "#fff",cursor: "pointer",width:'36%',padding:5}}>
            <div style={{ fontSize:matches?'10px':"14px",fontWeight:550}}>New to Swiggy?</div>
            <div style={{ fontWeight: "bold" }}>SIGN UP</div>
          </div>
      </div>
      </div>

     {matches?<></>: <div style={{ marginLeft:'12%',marginTop:'2%'}}>
      
       <img
          src={`${serverURL}/images/foodpic.png`}
          style={{ width: "150px", height: "auto"}}
        />
      </div>}
    <div>
        <Login setOtpOpen={setOtpOpen} otpOpen={otpOpen} loginOpen={loginOpen} setLoginOpen={setLoginOpen} setOtpValue={setOtpValue} otpValue={otpValue} userData={userData} setUserData={setUserData} setStatusScreen={setStatusScreen} statusScreen={statusScreen}/>
        <SignUp setOtpOpen={setOtpOpen} otpOpen={otpOpen} signOpen={signOpen} setSignOpen={setSignOpen} setOtpValue={setOtpValue} otpValue={otpValue} userData={userData} setUserData={setUserData} setStatusScreen={setStatusScreen} statusScreen={statusScreen} />
        <Otp setOtpOpen={setOtpOpen} otpOpen={otpOpen} setOtpValue={setOtpValue} otpValue={otpValue} userData={userData} setUserData={setUserData} setStatusScreen={setStatusScreen} statusScreen={statusScreen} />
        
    </div>
    </div>
  );
}
