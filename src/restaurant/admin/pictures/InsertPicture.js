import { Grid2,TextField,FormControl,InputLabel,Select,MenuItem, Button,Avatar,FormHelperText } from "@mui/material"
import TitleBar from "../../components/TitleBar";
import foodpic from"../../../assets/food.png"
import { CloudUpload } from "@mui/icons-material";
import { useState,useEffect } from "react";
import { useStyles } from "./InsertPictureCss"
import Swal from "sweetalert2";
import { getData, postData } from "../../../services/FetchNodeServices";
export default function InsertPicture() { 
    const classes = useStyles();
    var ADMIN=JSON.parse(localStorage.getItem("ADMIN"))
    const [restaurantPicture,setRestaurantPicture]=useState([])
    const [restaurantId,setRestaurantId]=useState(ADMIN.restaurantid)
    const [pictureType,setPictureType]=useState('')
   
    const [error,setError]=useState('')
    const handleError=(label,errorMessage)=>{
    
        setError((prev) =>({ ...prev,[label]: errorMessage}));
    }
    const validate=()=>{
        var err=false
        if (restaurantId.length==0)
        {
            handleError('restaurantId','Restaurant Id should not blank..')
            err=true
        }
       
            
        }
    const handleDishChange=(event)=>{
         console.log(event.target.files)
        setRestaurantPicture(Object.values(event.target.files))
         
    }
    const showPictureList=()=>{
        return restaurantPicture?.map((item)=>{
            return <div style={{display:'inline',width:40,height:50,flexWrap:'wrap',background:'grey'}}>
                <div>
                <img src={`${URL.createObjectURL(item)}`} style={{width:30,height:30}}/>
                </div>
            </div>

        })

    }
    const handleReset=()=>{
        setRestaurantId('')
        
        
        setRestaurantPicture([])
        

    }



    const handleSubmit=async()=>{
        var err=validate()
        if(!err)
        {

        
        var formData=new FormData()
        
        
        
        
        formData.append("restaurantid",restaurantId)
        formData.append("picturetype",pictureType)
        restaurantPicture.map((item,i)=>{
            formData.append(`f${i}`,item)
        })

        var response=await postData('restaurantpictures/submit_picture',formData)
    console.log(response.status)
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
    }
    
    return(<div>

        <div className={classes.root}>
                    <div className={classes.box}>
                        <TitleBar title="Insert Picture" />
                        <Grid2 container spacing={2}>
                        <Grid2 item size={12}>
                            <TextField onFocus={()=>handleError('restaurantId','')}  error={error.restaurantId} helperText={error.restaurantId} value={restaurantId} onChange={(e)=>setRestaurantId(e.target.value)}
                              label="Restaurant Id" fullWidth/>
                        </Grid2>
                        <Grid2 item size={12}>
                            <FormControl fullWidth>
                                <InputLabel>Picture Type</InputLabel>
                                <Select label="Picture Type" onChange={(e)=>setPictureType(e.target.value)}>
                                    <MenuItem value="Food">Food</MenuItem>
                                    <MenuItem value="Ambience">Ambience</MenuItem>
                                    <MenuItem value="Menu">Menu</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid2>
                        
                        <Grid2 item size={6} className={classes.center}>
                         {restaurantPicture?.length!=0?showPictureList():<></>}
                        </Grid2>
                       <Grid2 item size={6} className={classes.center}>
                       
                            
                            <Button variant="contained"
                             startIcon={<CloudUpload />} 
                             component="label"
                             onFocus={()=>handleError('foodPicture','')}
                             fullWidth
                             >
                                
                            UPLOAD ICON
                            <input onChange={handleDishChange} type='file' accept="image/*" multiple hidden />
                            </Button>
                            <div className={classes.errorText}>{error.foodPicture}</div>
                            </Grid2>
        
                            <Grid2 size={6}>
                            <Button  fullWidth onClick={handleSubmit} variant="contained">Submit</Button>
        
                        </Grid2>
                        <Grid2 size={6}>
                            <Button  fullWidth onClick={handleReset} variant="contained">Reset</Button>
        
                        </Grid2>
                        </Grid2>
                    </div>
        </div>
        </div>)
}




// import { Grid2,TextField,FormControl,InputLabel,Select,MenuItem, Button,Avatar,FormHelperText } from "@mui/material"
// import TitleBar from "../../components/TitleBar";
// import foodpic from"../../../assets/food.png"
// import { CloudUpload } from "@mui/icons-material";
// import { useState,useEffect } from "react";
// import { useStyles } from "./InsertPictureCss"
// import Swal from "sweetalert2";
// import { getData, postData } from "../../../services/FetchNodeServices";

// export default function InsertPicture(){
//    const classes=useStyles()
//    const [restaurantId,setRestaurantId]=useState('')
//    const [restaurantPicture,setRestaurantPicture]=useState([])
//    const [error,setError]=useState('')

//    handleError=(label,errorMessage)=>{
//         setError((prev)=>({...prev,[label]:errorMessage}));
//    }

//    const validate=()=>{
//     const err=false
//     if(restaurantId.length===0)
//     {
//         handleError('restaurantId',"restaurantId should not be blank")
//         err=true
//     }
//    }
//    const handleDishChange=(event)=>{
//     console.log(event.target.files)
//     setRestaurantPicture(Object.values(event.target.files))
//    }
//    const showPictureList=()=>{
//     return restaurantPicture?.map((item)=>{
//         return <div style={{display:'inline',width:40,height:50,flexWrap:'wrap',background:'grey'}}>
//                  <div>
//                  <img src={`${URL.createObjectURL(item)}`} style={{width:30,height:30}}/>
//                  </div>
//              </div>
//     })
//    }

//   const handleReset=()=>{
//     setRestaurantId('')
//     setRestaurantPicture([])

//   }

//   const handleSubmit=async()=>{
//     var err=validate

//     if(!err)
//     {

//     var formData=new formData()

//     formData.append('restauranid',restaurantId)
//     restaurantPicture.map((item,i)=>{
//         formData.append(`f${i}`,index)
//     })
//     var response=await postData('restaurantpictures/submit_pictures',formData)
//      console.log(response.status)
//         if(response.status)
//     {
//         Swal.fire({
//             icon: "success",
//             title: response.message,
//             showConfirmButton: false,
//             timer: 3000,
//             toast:true
//           });
//           handleReset()
//     }
//     else
//     {
//         Swal.fire({
            
//             icon: "error",
//             title: response.message,
//             showConfirmButton: false,
//             timer: 3000,
//             toast:true
//           });
//         }
// }
//   }

//     return(<div>
//         <div className={classes.root}>
//             <div className={classes.box}>
//                 <TitleBar title="insert picture" />
//                 <Grid2 container spacing={2}>
//                     <Grid2 item size={12}>
//                         <TextField 
//                         label="RestaurantId" fullWidth />
//                     </Grid2>
//                     <Grid2 item size={6} className={classes.center}>
//                         {restaurantPicture?.length!=0?showPictureList():<></>}
//                     </Grid2>
//                     <Grid2 item size={6} className={classes.center}>
//                         <Button variant="contained"
//                         startIcon={<CloudUpload />}
//                         component="label"
//                         fullWidth >
//                             Upload Icon
//                             <input type="file" accept="*/image" multiple hidden />
//                         </Button>
//                          <div className={classes.errorText}>{error.foodPicture}</div>
//                             </Grid2>
        
//                            <Grid2 size={6}>
//                              <Button  fullWidth onClick={handleSubmit} variant="contained">Submit</Button>
        
//                          </Grid2>
//                          <Grid2 size={6}>
//                              <Button  fullWidth onClick={handleReset} variant="contained">Reset</Button>
        
//                          </Grid2>
//                          </Grid2>
//                      </div>
                    

                
//             </div>
//         </div>
//   )
// }