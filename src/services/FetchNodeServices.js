import axios from "axios";
const serverURL="http://localhost:5000"

function generateOtp(){
    var otp=parseInt((Math.random()*899999)+100000)
    return(otp)
}

async function getData (url)
{
    try
    {
        var response=await axios.get(`${serverURL}/${url}`)
       var json=response.data
        return json
    }
     catch(e)
    {
          return({data:[],message:'Database error, Pls contact database administrator...',status:false})
    }
}

async function postData(url,body)
{
    try
    {
        var response=await axios.post(`${serverURL}/${url}`,body)
       var json=response.data
        return json
    }
     catch(e)
    {    
         if(e.status==401)
         {
            return({data:[],message:'Mobile No or EmailId Already Exist...',status:false})
         }
         else
         {
            return({data:[],message:'Database error, Pls contact database administrator...',status:false})
         }
      
    }
}
export {serverURL, getData, postData, generateOtp};