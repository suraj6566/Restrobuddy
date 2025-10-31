import { Avatar, Grid2,TextField,FormControl,InputLabel,Select,MenuItem,Button,FormHelperText} from "@mui/material"
import { useStyles } from "../subcategory/SubCategoryInterfaceCss"
import TitleBar from "../../components/TitleBar" 
import { CloudUpload } from "@mui/icons-material";
import category from "../../../assets/category.png"
import { useState,useEffect } from "react";
import { postData,getData } from "../../../services/FetchNodeServices";
import swal from "sweetalert2"

export default function SubCategoryInterface() 
{   const classes = useStyles()
    var ADMIN=JSON.parse(localStorage.getItem("ADMIN"))
    const [restaurantId,setRestaurantId]=useState(ADMIN.restaurantid)
    const [Category,setCategory]=useState([])
    const [SubCategoryName,setSubCategoryName]=useState('')
    const [iconPicture,setIconPicture]=useState({file:category,bytes:''})
    const [error,setError]=useState({})
    const [categoryId,setCategoryId]=useState('')
    // uploded icon picture show
    const handleIconChange=(event)=>{
        setIconPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }
    //fetch all category function
    const fetchAllCategory=async()=>{
        var response=await getData("subcategory/fetch_all_category")
        setCategory(response.data)
    }
    useEffect(function(){fetchAllCategory()},[])
    //fill all category in drop down 
    const fillCategory=()=>{
        return Category.map((item)=>{
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }
    const handleCategoryChange=(event)=>{
        setCategoryId(event.target.value)
    }
    // function for reset
    const handleReset=()=>{
        setCategoryId('')
        setIconPicture({file:category,bytes:''})
        setRestaurantId('')
        setSubCategoryName('')
    }
    //check cashes aplyee
    const handleError=(label,errorMessage)=>{
        var e=error[label]=errorMessage
        setError((prev)=>({...prev,[label]:errorMessage}))
    }
    //function for validations
    const validate=()=>{
        var err=false
        if(iconPicture.bytes.length==0)
        {   handleError('iconPicture','Pls select icon.....')
            err=true
        }
        if(SubCategoryName.length==0)
        {   handleError('SubCategoryName','Subcategory name should not blank.....')
            err=true
        }
            var restaurant_Id=/^[1-9][0-9]*$/
        if(!restaurant_Id.test(restaurantId))
        {
            handleError("restaurantId","Pls input valid  Restaurant Id....")
            err=true
        }
        if(categoryId.length==0)
        {
            handleError("categoryId","Pls select Category....")
            err=true
        }
            return err
    }
    
    // function for data submit
    const handleSubmit=async()=>{
        var err=validate()
        if(err==false)
        {
        var formData= new FormData()
        formData.append("restaurantid",restaurantId)
        formData.append("categoryid",categoryId)
        formData.append("subcategoryname",SubCategoryName)
        formData.append("icon",iconPicture.bytes)
        formData.append("createdat",new Date())
        formData.append("updatedat",new Date())
        var response=await postData('subcategory/submit_subcategory',formData)

        if(response.status)
                {
                    swal.fire({
                        icon: "success",
                        title: response.message,
                        showConfirmButton: false,
                        timer: 3000
                      });
                      handleReset()
                }
                else
                {
                    swal.fire({
                        icon: "error",
                        title: response.message,
                        showConfirmButton: false,
                        timer: 3000
                      });
                }
        }
    }
    return(
    <div className={classes.root}>
        <div className={classes.box}>
            <TitleBar title={'Add New Subcategory'} url={'/admindashboard/displayallsubcategory'}/>
            <Grid2 container spacing={2}>
                <Grid2 item size={12}>
                    <TextField onFocus={()=>handleError('restaurantId','')} error={error.restaurantId} helperText={error.restaurantId} value={restaurantId} onChange={(e)=>setRestaurantId(e.target.value)} label="Restaurant Id" fullWidth />
                </Grid2>
                <Grid2 item size={12}>
                    <FormControl fullWidth error={error.categoryId}>
                        <InputLabel>Category</InputLabel>
                            <Select value={categoryId} onFocus={()=>handleError('categoryId','')} onChange={handleCategoryChange} label='Category'>
                                {fillCategory()}
                            </Select>
                        <FormHelperText>{error.categoryId}</FormHelperText>
                    </FormControl>
                </Grid2>
                <Grid2 item size={12}>
                    <TextField onFocus={()=>handleError('SubCategoryName','')} error={error.SubCategoryName} helperText={error.SubCategoryName} value={SubCategoryName} onChange={(e)=>setSubCategoryName(e.target.value)} label="Subcategory Name" fullWidth />
                </Grid2>
                <Grid2 item size={12} className={classes.center}>
                    <Avatar alt="iconPicture" src={iconPicture.file}  sx={{ width: 100, height: 100 }} variant="rounded"/>
                </Grid2>
                <Grid2 item size={12} className={classes.center}>
                    <Button onFocus={()=>handleError('iconPicture','')} variant="contained" startIcon={<CloudUpload />} component="label" fullWidth>
                        Upload Icon
                        <input onChange={handleIconChange}  type="file" multiple hidden/>
                    </Button>
                    <div className={classes.errorText}>{error.iconPicture}</div>
                </Grid2>
                    <Grid2 size={6}>
                        <Button onClick={handleReset} fullWidth variant="contained" >Reset</Button>
                    </Grid2>
                    <Grid2 size={6}>
                        <Button onClick={handleSubmit} fullWidth variant="contained" >Submit</Button>
                    </Grid2>
            </Grid2>
        </div>
    </div>)
}