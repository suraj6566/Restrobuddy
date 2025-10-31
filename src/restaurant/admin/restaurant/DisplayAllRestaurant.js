import MaterialTable from "@material-table/core";
import { useStyles } from "./RestaurantInterfaceCss"
import { useState,useEffect } from "react";
import { Dialog,DialogActions,DialogContent,DialogTitle,dialogActions } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import TitleBar from "../../components/TitleBar";

import fssaipic from "../../../assets/fssai.png"
import shop from "../../../assets/shop.png"
import restaurant from "../../../assets/restaurant.png"
import { getData,postData,serverURL } from "../../../services/FetchNodeServices";
import Swal from "sweetalert2";
import { Avatar, Grid2,TextField,InputLabel,FormControl,Select,MenuItem,Button,FormHelperText } from "@mui/material";
import { use } from "react";
import { useNavigate } from "react-router-dom";

export default function DisplayAllRestaurant(){
    const classes = useStyles();
    const navigate=useNavigate();
    const [restaurantId,setRestaurantId]=useState('');
    const [restaurants,setRestaurants]=useState([])
    const [open,setOpen]=useState(false)

    /******Restaurant States******/

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
    const [pictureOpen,setPictureOpen]=useState(false)
    const [editPicture,setEditPicture]=useState({file:'',bytes:''})
    const [tempPicture,setTempPicture]=useState('')
    const [title,setTitle]=useState('')
    const [buttonState,setButtonState]=useState(true)

    const handleEditImage=async()=>{
      var formData=new FormData()
      formData.append('restaurantid',restaurantId)
      formData.append('picture',editPicture.bytes)
      formData.append('whichimage',title)
      var res=await postData('restaurant/edit_restaurant_images',formData)
      alert(res.status)
      fetchAllRestaurant()
    }


    const showSaveEditButton=()=>{
      return(<div style={{display:'flex',width:200, justifyContent:'space-between'}}>
        <Button variant="contained" onClick={handleEditImage}>Save</Button>
        <Button variant="contained" onClick={handleCancel}>Cancle</Button>

      </div>)
    }

    const handleCancel=()=>{
      setButtonState(true)
      setEditPicture({file:tempPicture,bytes:''})
    }

    const handleEditPicture=(rid,picture,title)=>{

      setEditPicture({file:picture,bytes:'' })
      setTempPicture(picture)
      setTitle(title)
      setRestaurantId(rid)
      setPictureOpen(true)
    }
    const handleEditPictureClose=()=>{
      setPictureOpen(!buttonState)
    } 

    const handlePictureChange=(event)=>{
      setEditPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
      setButtonState(!buttonState)
    }

    const dialogEditPicture=()=>{
      return <div>
        <Dialog open={pictureOpen} onClose={handleEditPictureClose}>
          <DialogTitle>Edit {title}</DialogTitle>
          <DialogContent>
            <div style={{width:400}}>
            <Grid2 container spacing={2}>
            <Grid2 item size={12} className={classes.center}>
    
                <Avatar
                alt="Fssai"
                src={editPicture.file}
                sx={{ width: 56, height: 56, marginBottom:1  }}
                variant="rounded"
                />

                {buttonState?
                <Button
                variant="contained"
                startIcon={<CloudUpload />}
                component="label"
                onFocus={()=>handleError('fssaiPicture','')}
                fullWidth>
                Upload 
                <input onChange={handlePictureChange} type="file" accept="image/*" multiple hidden/>
                </Button>:showSaveEditButton()}
                <div className={classes.errorText}>{error.fssaiPicture}</div>
                </Grid2>
                </Grid2>
                </div>
          </DialogContent> 
          <DialogActions>
            <Button onClick={()=>setPictureOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    }

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

    
    const handleDelete=async()=>{

      Swal.fire({
        title: "Do you want to delete the restaurant?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Delete",
        denyButtonText: `Don't Delete`
      }).then(async(result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          var body={ "restaurantid":restaurantId}
      
      var response=await postData('restaurant/delete_restaurant_data', body)
          if(response.status){
            fetchAllRestaurant()
          Swal.fire("Deleted!", "", "success");
      }
        else{
          Swal.fire({
            icon: "error",
            title: response.message,
            showConfirmButton: false,
            timer: 3000,
            toast:true
          });
        }
        } else if (result.isDenied) {
          Swal.fire("Restaurant not delete", "", "info");
        }
      });      
    };

   const handleSubmit=async()=>{
   var err=validate();
   if(err == false)
   {
   var body={ "restaurantid":restaurantId,"restaurantname":restaurantName,"ownername":ownerName,"phonenumber":phoneNumber,"mobilenumber":mobileNumber,"emailid":emailId,"url":url,"fssai":fssai,"gstno":gstNo,"gsttype":gstType,"address":address,"stateid":stateId,"cityid":cityId,"latlong":latLong,"createdat":new Date(),"updatedat":new Date() }
   
   var response=await postData('restaurant/edit_restaurant_data', body)
   if(response.status)
    {
      Swal.fire({
        icon: "success",
        title: response.message,
        showConfirmButton: false,
        timer: 3000,
        toast:true
      });
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
   fetchAllRestaurant()
  };

   /***************************/

    const handleClose=()=>{
      setOpen(false)
    }

    const openDialog=(rowData)=>{
      setOpen(true)
      setRestaurantId(rowData.restaurantid)
      fetchAllCities(rowData.stateid)
      setRestaurantName(rowData.restaurantname)
      setOwnerName(rowData.ownername)
      setURL(rowData.url)
      setAddress(rowData.address)
      setLatLong(rowData.latlong)
      setStateId(rowData.stateid)
      setCityId(rowData.cityid)
      setMobileNumber(rowData.mobilenumber)
      setPhoneNumber(rowData.phonenumber)
      setEmailId(rowData.emailid)
      setFssai(rowData.fssai)
      setGstNo(rowData.gstno)
      setGstType(rowData.gsttype)
      
    }

    const displayRestaurantDetails=()=>{
      return(<div>
        <Dialog open={open} onClose={handleClose} >

          <DialogContent>
          <div>
        <div>
         <TitleBar title="Edit Restaurant" />
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

            <Grid2 size={6}>
            <Button onClick={handleSubmit} fullWidth variant="contained">
              Edit
            </Button>
          </Grid2>
          <Grid2 size={6}>
            <Button onClick={handleDelete} fullWidth variant="contained">
              Delete
            </Button>
          </Grid2>

         </Grid2>
        </div>

    </div>
          </DialogContent>
          <dialogActions>
            <Button onClick={handleClose}>Close</Button>
          </dialogActions>
        </Dialog>
      </div>)
    }

    const fetchAllRestaurant=async()=>{
        var res=await getData('restaurant/display_all')
        setRestaurants(res.data)
    }
    useEffect(function(){fetchAllRestaurant()},[])

    function displayAll() {
        return (
          <MaterialTable
            title="List of Restaurant"
            columns={[
                {title:'Id',field:'restaurantid'},
                {title:'Name',render:(rowData)=><div><div>{rowData.restaurantname}</div><div>{rowData.ownername}</div><div>{rowData.url}</div></div>},
                {title:'Address',render:(rowData)=><div><div>{rowData.address}</div><div>{rowData.cityname},{rowData.statename}<div>{rowData.latlong}</div></div></div>},
                {title:'Contact',render:(rowData)=><div><div>{rowData.emailid}</div><div>{rowData.mobilenumber},{rowData.phonenumber}</div></div>},
                {title:'Licences',render:(rowData)=><div><div><b>Fssai:</b>{rowData.fssai}</div><div><b>Gstn:</b>{rowData.gstno},{rowData.gsttype}</div></div>},
                {title:'Pictures',render:(rowData)=><div>
                <img src={`${serverURL}/images/${rowData.filefssai}`} title="Fssai" className={classes.picStyle} 
                style={{cursor:'pointer'}}
                onClick={()=>handleEditPicture(rowData.restaurantid,`${serverURL}/images/${rowData.filefssai}`,"Fssai")}
                />
                <img src={`${serverURL}/images/${rowData.fileshopact}`} title="shop Act" className={classes.picStyle} 
                 style={{cursor:'pointer'}}
                 onClick={()=>handleEditPicture(rowData.restaurantid,`${serverURL}/images/${rowData.fileshopact}`,"Shop Act")}
                />
                <img src={`${serverURL}/images/${rowData.filelogo}`} title="Logo" className={classes.picStyle} 
                 style={{cursor:'pointer'}}
                 onClick={()=>handleEditPicture(rowData.restaurantid,`${serverURL}/images/${rowData.filelogo}`,"Logo")}
                />
                </div>},
                
            ]}
            data={restaurants}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Restaurant Details',
                onClick: (event, rowData) => openDialog(rowData),
              },
              
                {
                  icon: 'add',
                  isFreeAction:true,
                  tooltip: 'Add New Restaurant',
                  onClick: (event, rowData) => navigate('/admindashboard/restaurantinterface'),
                }
            
            ]}
          />
        )
      }

    return(<div className={classes.root}>
    <div className={classes.display_box}>
    {displayAll()}
    {displayRestaurantDetails()}
    {dialogEditPicture()}
    </div>
    </div>)

}