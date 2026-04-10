import WalletIcon from '@mui/icons-material/Wallet';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { serverURL } from '../../../services/FetchNodeServices';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
export default function PaymentCart(){
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  var useraddress=useSelector((state)=>state.useraddress)
  var keys=Object.keys(useraddress)
  var food=useSelector((state)=>state.cart)
  var foodList=Object.values(food)
  var dispatch=useDispatch()
  var navigate=useNavigate()
  var total=foodList.reduce(function(total,item){

      var price
      if(item?.offerprice>0)
        price=(item?.price-item?.offerprice)*item?.qty
        else
        price=item?.price*item?.qty 
       return total+price
     },0) 
     var gst=total*5/100
     var dc=42
     var nettotal=total+gst+dc

 const handlePayment = async () => {
    const options = {
      key: "rzp_test_GQ6XaPC6gMPNwH",
      amount: nettotal*100,
      currency: "INR",
      name: "RestroBuddy",
      description: "Test Transaction",
      image: `${serverURL}/images/restrologo.png`,

      handler: async (res) => {
        console.log(res);
        dispatch({type:'CLEAR_CART'}) 
        navigate("/");
      },
      prefill: {
        name: useraddress?.fullname,
        email:useraddress?.emailid ,
        contact: useraddress?.mobileno,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);
    await rzp1.open();
  };
  useEffect(function () {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

 


return (
    <div style={{position:'relative' ,width: matches ? "100%" : "80%",minHeight:'92px',marginTop:'5%',padding: "20px",display: "flex",backgroundColor: "#fff",borderRadius:16,boxShadow:'0 12px 30px rgba(15,23,42,0.08)',overflow:'hidden'}}>
     <div style={{position: 'absolute',top: '28%',left:'12px',backgroundColor: '#fff',boxShadow: '0 8px 18px rgba(15,23,42,0.12)' ,padding: '8px',color: '#fff',borderRadius:12}}>
        <WalletIcon style={{fontSize:30,color:'#000'}}/>
      </div>
      <div style={{ marginBottom: "15px",marginLeft:'60px',width:'100%'}}>
      <div style={{ fontWeight: "bold", fontSize: "20px",marginTop:10,color:'rgba(2,6,12,.72)'}}>Payment</div>
      <div style={{fontSize:13,color:'#6b7280',marginTop:4}}>Confirm your saved address, then continue securely.</div>
      <div style={{marginTop:10}}>
        {keys.length!=0?<Button onClick={()=>handlePayment()} style={{background:'#ef4f5f', color:'#fff', borderRadius:10, padding:'8px 18px', textTransform:'none'}}>Make Payment</Button>:<></>
        }
      </div>
      </div>
      </div>

)}
