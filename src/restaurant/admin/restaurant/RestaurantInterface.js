import { Avatar, Grid2,TextField,InputLabel,FormControl,Select,MenuItem,Button,FormHelperText } from "@mui/material"
import { useStyles } from "./RestaurantInterfaceCss"
import { CloudUpload } from "@mui/icons-material";
import TitleBar from "../../components/TitleBar";
import { useState,useEffect } from "react";
import fssaipic from "../../../assets/fssai.png"
import shop from "../../../assets/shop.png"
import restaurant from "../../../assets/restaurant.png"
import { getData,postData } from "../../../services/FetchNodeServices";
import Swal from "sweetalert2";
export default  function RestaurantInterface()
{ const classes = useStyles();
    const [fssaiPicture,setFssaiPicture]=useState({file:fssaipic,bytes:''})
    const [shopActPicture,setShopActPicture]=useState({file:shop,bytes:''})
    const [logo,setLogo]=useState({file:restaurant,bytes:''})
    const [states,setStates]=useState([])
    const [city,setCity]=useState([])
    const [restaurantName,setRestaurantName]=useState('')
    const [ownerName,setOwnerName]=useState('')
    const [phoneNumber,setPhoneNumber]=useState('')
    const [mobileNumber,setMobileNumber]=useState('')
    const [emailId,setEmailId]=useState('')
    const [url,setURL]=useState('')
    const [fssai,setFssai]=useState('')
    const [gstNo,setGstNo]=useState('')
    const [gstType,setGstType]=useState('')
    const [address,setAddress]=useState('')
    const [latLong,setLatLong]=useState('')
    const [stateId,setStateId]=useState('')
    const [cityId,setCityId]=useState('')
    const [error,setError]=useState({})
    const handleError=(label,errorMessage)=>{

          setError((prev) => ({ ...prev, [label]: errorMessage}));
    }
    
    const validate=()=>{
        var err=false
        if(restaurantName.length==0)
        { handleError('restaurantName','Restaurant should not be blank...')
          err=true
        }
        if(ownerName.length==0)
            { handleError('ownerName','Owner name should not be blank...')
              err=true
            }
        
        if(address.length==0)
            { handleError('address','Address should not be blank...')
                err=true
            }
        if(latLong.length==0)
        { handleError('latLong','Lat Long should not be blank...')
          err=true
        }
        
        if(phoneNumber.length==0)
            { handleError('phoneNumber','Phone Number should not be blank...')
                err=true
            }
        
        if(fssai.length==0)
            { handleError('fssai','Fssai should not be blank...')
                err=true
            }
       
        if(stateId.length==0)
            { handleError('stateId','Pls select state...')
                err=true
            }
        if(cityId.length==0)
            { handleError('cityId','Pls select city...')
                err=true
            }
        if(gstType.length==0)
            {
                handleError('gstType','pls select GstType...')
            }
        if(shopActPicture.bytes.length == 0)
            {
                handleError('shopActPicture','pls select Shop act picture...')
            }
        if(fssaiPicture.bytes.length == 0)
            {
                handleError('fssaiPicture','pls select Fssai picture...')
            }
        if(logo.bytes.length == 0)
           {
                handleError('logo','pls select Logo...')
           }

        var url_pattern=/^[http://|https://][^\s]+\.[^\s]{2,}/g

        if(!url_pattern.test(url))
           {
            handleError("url",'Pls input valid Url...')
            err=true;
           }

        var email_pattern=/^[A-Za-z0-9._-]+[@]{1}[A-Za-z0-9]{1,256}\.[^\s]{2,}/g

        if(!email_pattern.test(emailId))
           {
            handleError('emailId','Pls input valid Email...')
            err=true;
           }

        var mobile_pattern=/^[0-9]{10}$/

        if(!mobile_pattern.test(mobileNumber)) 
          {
           handleError('mobileNumber','Pls input valid Mobile Number')
           err=true;
          }

        var gst_pattern=/^[0-9]{15}$/

        if(!gst_pattern.test(gstNo)) 
          {
           handleError('gstNo','Pls input valid Gst Number...')
           err=true;
          }
        
        return err;
    }
    
  
    const fetchAllStates=async()=>{
        var response=await getData('statecity/fetch_all_state')
        setStates(response.data)
    }

    const fetchAllCities=async(stateid)=>{
        var response=await postData('statecity/fetch_all_city',{stateid:stateid})
        setCity(response.data)
    }

    useEffect (function(){
     fetchAllStates()
    },[])
      const handleFssaiChange=(event)=>{
        setFssaiPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
      }
      const handleShopActChange=(event)=>{
        setShopActPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
      }
      const handleLogoChange=(event)=>{
        setLogo({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
      }

      const handleStateChange=(event)=>{
         setStateId(event.target.value)
        fetchAllCities(event.target.value)

      }

      const fillStates=()=>{

        return states.map((item)=>{
            return <MenuItem value={item.stateid}>{item.statename}</MenuItem>
        })
        
      }

      const fillCity=()=>{
        return city.map((item)=>{
            return <MenuItem value={item.cityid}>{item.cityname}</MenuItem>
        })
      }
    
    const handleReset=()=>{
    setLatLong('')
    setRestaurantName('')
    setOwnerName('')
    setPhoneNumber('')
    setMobileNumber('')
    setEmailId('')
    setURL('')
    setFssai('')
    setGstNo('')
    setAddress('')
    setFssaiPicture({
        file: fssaipic,
        bytes:"",
    });
    setShopActPicture({
        file: shop,
        bytes:"",
    })
    setLogo({
        file: restaurant,
        bytes:"",
    });
    setStateId('')
    setCityId('')
    setGstType('')
    }

   const handleSubmit=async()=>{
   var err=validate();
   if(err == false)
   {

   var formData=new FormData()
   formData.append("restaurantname",restaurantName)
   formData.append("ownername",ownerName)
   formData.append("phonenumber",phoneNumber)
   formData.append("mobilenumber",mobileNumber)
   formData.append("emailid",emailId)
   formData.append("url",url)
   formData.append("fssai",fssai)
   formData.append("gstno",gstNo)
   formData.append("gsttype",gstType)
   formData.append("filefssai",fssaiPicture.bytes)
   formData.append("fileshopact",shopActPicture.bytes)
   formData.append("filelogo",logo.bytes)
   formData.append("address",address)
   formData.append("stateid",stateId)
   formData.append("cityid",cityId)
   formData.append("latlong",latLong)
   formData.append("password","12345")
   formData.append("createdat",new Date())
   formData.append("updatedat",new Date())
   formData.append("status",0)
   var response=await postData('restaurant/submit_restaurant',formData)
   if(response.status)
    {
      Swal.fire({
      
        icon: "success",
        title: response.message,
        showConfirmButton: false,
        timer: 3000,
        toast:true
      });
      handleReset()
    }
    else
    {

      
      Swal.fire({
      
        icon: "error",
        title: response.message,
        showConfirmButton: false,
        timer: 3000,
        toast:true
      });
    }
   }
  };

    return(<div className={classes.root}>
        <div className={classes.box}>
         <TitleBar title="New Restaurant" url={'/admindashboard/displayallrestaurant'} />
         <Grid2 container spacing={2}>
            <Grid2 item size={4}>
                <TextField onFocus={()=>handleError('restaurantName','')} error={error.restaurantName} helperText={error.restaurantName} value={restaurantName} onChange={(e)=>setRestaurantName(e.target.value)} label="Restaurant Name" fullWidth/>
            </Grid2>
            <Grid2 item size={4}>
                <TextField onFocus={()=>handleError('ownerName','')} error={error.ownerName} helperText={error.ownerName} value={ownerName} onChange={(e)=>setOwnerName(e.target.value)} label="Owner Name" fullWidth/>
            </Grid2>
            <Grid2 item size={4}>
                <TextField onFocus={()=>handleError('url','')} error={error.url} helperText={error.url} value={url} onChange={(e)=>setURL(e.target.value)} label="Website URL" fullWidth/>
            </Grid2>
            <Grid2 item size={12}>
                <TextField onFocus={()=>handleError('address','')} error={error.address} helperText={error.address} value={address} onChange={(e)=>setAddress(e.target.value)} label="Address" fullWidth/>
            </Grid2>
            <Grid2 item size={4}>
                <FormControl fullWidth error={error.stateId}>
                    <InputLabel>State</InputLabel>
                    <Select value={stateId} onFocus={()=>handleError('stateId','')} onChange={handleStateChange} label="State">
                        {fillStates()}
                    </Select>
                    <FormHelperText>{error.stateId}</FormHelperText>
                </FormControl>
            </Grid2>

            <Grid2 item size={4}>
                <FormControl fullWidth error={error.cityId}>
                    <InputLabel>City</InputLabel>
                    <Select value={cityId} onFocus={()=>handleError('cityId','')} onChange={(e=>setCityId(e.target.value))} label="City">
                        {fillCity()}
                    </Select>
                    <FormHelperText>{error.cityId}</FormHelperText>
                </FormControl>
            </Grid2>

            <Grid2 item size={4}>
                <TextField onFocus={()=>handleError('latLong','')} error={error.latLong} helperText={error.latLong} value={latLong} onChange={(e)=>setLatLong(e.target.value)} label="Latitude/Longitude" fullWidth/>
            </Grid2>

            <Grid2 item size={4}>
                <TextField onFocus={()=>handleError('mobileNumber','')} error={error.mobileNumber} helperText={error.mobileNumber} value={mobileNumber} onChange={(e)=>setMobileNumber(e.target.value)} label="Mobile Number" fullWidth/>
            </Grid2>
            <Grid2 item size={4}>
                <TextField onFocus={()=>handleError('phoneNumber','')} error={error.phoneNumber} helperText={error.phoneNumber} value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} label="Phone Number" fullWidth/>
            </Grid2>
            <Grid2 item size={4}>
                <TextField onFocus={()=>handleError('emailId','')} error={error.emailId} helperText={error.emailId} value={emailId} onChange={(e)=>setEmailId(e.target.value)} label="Email Address" fullWidth/>
            </Grid2>
            <Grid2 item size={4}>
                <TextField onFocus={()=>handleError('fssai','')} error={error.fssai} helperText={error.fssai} value={fssai} onChange={(e)=>setFssai(e.target.value)} label="Fssai Number" fullWidth/>
            </Grid2>
            <Grid2 item size={4}>
                <TextField onFocus={()=>handleError('gstNo','')} error={error.gstNo} helperText={error.gstNo} value={gstNo} onChange={(e)=>setGstNo(e.target.value)} label="GST Number" fullWidth/>
            </Grid2>
            <Grid2 item size={4}>
                <FormControl fullWidth error={error.gstType}>
                    <InputLabel>GST Type</InputLabel>
                    <Select onFocus={()=>handleError('gstType','')} onChange={(e)=>setGstType(e.target.value)} 
                    label="GST Type"
                     value={gstType}   
                    >
                        <MenuItem value="5">Non Grade</MenuItem>
                        <MenuItem value="18">3 Star</MenuItem>
                        <MenuItem value="28">5 Star</MenuItem>
                    </Select>
                    <FormHelperText>{error.gstType}</FormHelperText>
                </FormControl>
            </Grid2>

            <Grid2 item size={4} className={classes.center}>

            <Avatar
            alt="Fssai"
            src={fssaiPicture.file}
            sx={{ width: 56, height: 56, marginBottom:1  }}
            variant="rounded"
            />
            <Button
            variant="contained"
            startIcon={<CloudUpload />}
            component="label"
            onFocus={()=>handleError('fssaiPicture','')}
            fullWidth>
            Upload Fssai
            <input onChange={handleFssaiChange} type="file" accept="image/*" multiple hidden/>
            </Button>
            <div className={classes.errorText}>{error.fssaiPicture}</div>
            </Grid2>

            <Grid2 item size={4} className={classes.center}>
            <Avatar
            alt="Shop Act"
            src={shopActPicture.file}
            sx={{ width: 56, height: 56, marginBottom:1}}
            variant="rounded"
            />
            <Button
            variant="contained"
            startIcon={<CloudUpload />}
            component="label"
            onFocus={()=>handleError('shopActPicture','')}
            fullWidth
            >
            Shop registration
            <input onChange={handleShopActChange} accept="image*/" type="file" hidden multiple/>
            </Button>
            <div className={classes.errorText}>{error.shopActPicture}</div>
            </Grid2>

            <Grid2 item size={4} className={classes.center}>
            <Avatar
            alt="Logo"
            src={logo.file}
            sx={{ width: 56, height: 56,marginBottom:1}}
            variant="rounded"
            />
            <Button
            variant="contained"
            startIcon={<CloudUpload />}
            component="label"
            onFocus={()=>handleError('logo','')}
            fullWidth>
            Logo
            <input onChange={handleLogoChange} accept="image*/" type="file" hidden multiple/>
            </Button>
            <div className={classes.errorText}>{error.logo}</div>
            </Grid2>

            <Grid2 size={6}>
            <Button onClick={handleSubmit} fullWidth variant="contained">
              Submit
            </Button>
          </Grid2>
          <Grid2 size={6}>
            <Button onClick={handleReset} fullWidth variant="contained">
              Reset
            </Button>
          </Grid2>

         </Grid2>
        </div>

    </div>)
}