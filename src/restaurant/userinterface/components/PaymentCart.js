import WalletIcon from '@mui/icons-material/Wallet';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { serverURL } from '../../../services/FetchNodeServices';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function PaymentCart(){
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
    <div style={{display:'flex',position:'relative' ,width: "80%",height:'70px',marginTop:'5%',padding: "20px",display: "flex",backgroundColor: "#fff"}}>
     <div style={{position: 'absolute',top: '30%',left:'-30px',backgroundColor: '#fff',boxShadow: '2px 4px 6px grey' ,padding: '5px',color: '#fff'}}>
        <WalletIcon style={{fontSize:30,color:'#000'}}/>
      </div>
      <div style={{ marginBottom: "15px",marginLeft:'4%',width:'100%'}}>
      <div style={{ fontWeight: "bold", fontSize: "20px",marginTop:15,color:'rgba(2,6,12,.5)'}}>Payment</div>
      <div>
        {keys.length!=0?<Button onClick={()=>handlePayment()}>Make Payment</Button>:<></>
        }
      </div>
      </div>
      </div>

)}