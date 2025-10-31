import {useStyles} from "../food/FoodInterfaceCss"
import TitleBar from "../../components/TitleBar"
import { Switch,Avatar,Stack,Typography,FormGroup,Radio,RadioGroup,FormControlLabel, Grid2,TextField,FormControl,InputLabel,Select,MenuItem,Button,FormHelperText, FormLabel} from "@mui/material"
import { CloudUpload } from "@mui/icons-material";
import { Dialog,DialogContent,DialogTitle,DialogActions} from "@mui/material"
import MaterialTable from "@material-table/core";
import { useState,useEffect} from "react";
import food from "../../../assets/category.png"
import { getData,postData,serverURL} from "../../../services/FetchNodeServices";
import swal from "sweetalert2"
import { useNavigate } from "react-router-dom";
export default function DisplayAllFood()
{   const classes = useStyles()
    const navigate= useNavigate()
    const [open,setOpen] = useState()
    const [foodData,setFooData] =useState([])

    //fetch all food data 
    const fetchAllFoodData=async()=>{
        var res=await getData('food/fetch_all_food_data')
        setFooData(res.data)
    }

    //fill data in table
    const openDialog=(rowData)=>{
        const statusValue=JSON.parse(rowData.statustype)
        setOpen(true)
        setRestaurantId(rowData.restaurantid)
        setCategoryId(rowData.categoryid)
        fetchAllSubcategory(rowData.categoryid)
        setSubcategoryId(rowData.subcategoryid)
        setFoodId(rowData.foodid)
        setFoodName(rowData.foodname)
        setPrice(rowData.price)
        setOfferPrice(rowData.offerprice)
        setIngredients(rowData.ingredients)
        setStatas(rowData.status)
        handleSwitchSet(statusValue)
    }

    //function for set the edit value in switch
     const handleSwitchSet=(isChecked)=>{
        setStatusType(isChecked)
        setStatusLable(isChecked? "Vegitarian" : "Non-Vegitarian")
     }

    //function for close edit table
    const handleClose=()=>{
        setOpen(false)
    }
    /**************food data edit function and table****************/

    const [restaurantId,setRestaurantId]=useState('')
    const [categoryId,setCategoryId]=useState('')
    const [subcategoryId,setSubcategoryId]=useState('')
    const [foodId,setFoodId]=useState('')
    const [foodName,setFoodName]=useState('')
    const [price,setPrice]=useState('')
    const [statas,setStatas]=useState()
    const [statusType,setStatusType]=useState()
    const [ingredients,setIngredients]=useState('')
    const [offerPrice,setOfferPrice]=useState('')
    const [categories,setCategories]=useState([])
    const [subcategories,setSubCategories]=useState([])
    const [iconPicture,setIconPicture]=useState({file:'',bytes:''})
    const [statusLable,setStatusLable]= useState()
    const [tempPicture,setTempPicture]=useState('')
    const [pictureOpen,setPictureOpen]=useState(false)
    const [buttonState,setButtonState]=useState(true)
    const [error,setError]=useState({})


    //fetch all category======================================
    const fetchAllCategory=async()=>{
        var response= await getData("food/fetch_all_category")
        setCategories(response.data)
    }
    useEffect(function(){fetchAllCategory()},[])
    //fill all categories in dropdown=================
    const fillCategory=()=>{
        return categories.map((item)=>{
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }
    const handleCategoryChange=(event)=>{
        setCategoryId(event.target.value)
        fetchAllSubcategory(event.target.value)
    }
    //fetch all subcategory====================================
    const fetchAllSubcategory=async(categoryid)=>{
        var response=await postData("food/fetch_all_subcategory",{categoryid:categoryid})
        setSubCategories(response.data)
    }
    //fill subcategory dropdown===============
    const fillSubcategory=()=>{
        return subcategories.map((item)=>{
            return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        })
    }

    //function for switch button
    const handleSwitchChange=(event)=>{
        const isChecked=event.target.checked
        setStatusType(isChecked)
        setStatusLable(isChecked? "Vegitarian" : "Non-Vegitarian")
    }
    //function for radio button
    const handleRadioChange=(event)=>{
        setStatas(event.target.value)
    }

    //check casess aplyee
    const handleError=(label,errorMessage)=>{
        var e=error[label]=errorMessage
        setError((prev)=>({...prev,[label]:errorMessage}))
    }

    //function for check validations
    const validate=()=>{
        var err=false
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
        if(subcategoryId.length==0)
        {
            handleError("subcategoryId","Pls select SubCategory....")
            err=true
        }
        if(foodName.length==0)
        {   handleError('foodName','Food name should not blank.....')
            err=true
        } 
        if(ingredients.length==0)
        {   handleError('ingredients','ingredients should not blank.....')
            err=true
        }  
        var prices=/^[0-9]+(\.[0-9]+)?$/
        if(!prices.test(price))
        {
            handleError("price","Pls input food price....")
            err=true
        }
        var offer_Price=/^[0-9]+(\.[0-9]+)?$/
        if(!offer_Price.test(offerPrice))
        {
            handleError("offerPrice","Pls input offer price....")
            err=true
        }
        return(err)
    }
    
    /***************************************************************/

    //relod page after fetching data
    useEffect(function(){fetchAllFoodData()},[])

    //set all values for edit picture
    const handleEditPicture=(fid,picture)=>{
        setIconPicture({file:picture,bytes:''})
        setTempPicture(picture)
        setFoodId(fid)
        setPictureOpen(true)
     }

    const handlePictureChange=(event)=>{
        setIconPicture({
            file:URL.createObjectURL(event.target.files[0]),
            bytes:event.target.files[0]
        })
        setButtonState(!buttonState)
    }

    //function for show save and cancel button  
    const showSaveEditButton=()=>{
        return(<div style={{display:'flex',justifyContent:'space-between',width:400}}>
            <Button style={{marginRight:5}} onClick={handleEditImageSave} variant="contained" fullWidth>Save</Button>
            <Button style={{marginLeft:5}} onClick={handleCancel} variant="contained" fullWidth>Cancel</Button>
        </div>)
    }

    //function for don't edit picture and click the cancel button so remove the select pic and set old save pic
    const handleCancel=()=>{
        setButtonState(true)
        setIconPicture({file:tempPicture,bytes:''})
    }

    //function for close the picture edit dialog
    const handleEditPictureClose=()=>{
        setPictureOpen(false)
    }

    //edit image save function
    const handleEditImageSave=async()=>{
        var formData =new FormData()
        formData.append('foodid',foodId)
        formData.append('icon',iconPicture.bytes)
        var res = await postData('food/edit_food_image',formData)
         
        if(res.status)
        {
            swal.fire({
            icon: "success",
            title: res.message,
            showConfirmButton: false,
            timer: 3000
            });
        }
        else
        {
            swal.fire({
            icon: "error",
            title: res.message,
            showConfirmButton: false,
            timer: 3000
            });        
        }
            setButtonState(!buttonState)
            handleEditPictureClose()
            fetchAllFoodData()
    }

    const dialogEditPicture=()=>{
        return(<div>
            <Dialog open={pictureOpen} onClose={handleEditPictureClose}>
                <DialogTitle>Edit Icon</DialogTitle>
                <DialogContent>
                    <div style={{width:400}}>
                        <Grid2 container spacing={2}>
                            <Grid2 item size={12} className={classes.center}>
                                <Avatar alt="Icon" src={iconPicture.file} sx={{width:100,height:100,marginBottom:3}} variant="rounded" />
                                {buttonState?
                                <Button variant="contained" startIcon={<CloudUpload />} component="label" fullWidth>
                                    Upload Icon
                                    <input onChange={handlePictureChange} type="file" accept="image/" multiple hidden />
                                </Button>:showSaveEditButton()}
                            </Grid2>
                        </Grid2>
                    </div>
                </DialogContent>
                <DialogActions>
                <Button onClick={()=>setPictureOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>)
    }

    //function for Delete the food
    const handleDelete=async()=>{
        var err=validate()
        if(err==false)
        {
            swal.fire({
                title: "Do you want to delete the Food ?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Delete",
                denyButtonText: `Don't Delete`
            }).then(async(result) =>{
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed)
                    {
                        var body={"foodid":foodId}
                        var response=await postData('food/delete_food_data',body)
                        if(response.status)
                        {
                            fetchAllFoodData()
                            swal.fire("Deleted!","","success")
                        }
                    
                        else
                        {
                            swal.fire({
                            icon:"error",
                            title:response.message,
                            showConfirmButton: false,
                            timer:3000
                            })
                        }
                    }
                    else if(result.isDenied)
                    {
                        swal.fire("Food not Delete", "", "info")
                    }
                    
                    fetchAllFoodData()
            })
            handleClose()
        }
    }

    //function for data edit
    const handleEdit=async()=>{
        var err = validate()
        if(err == false)
        { 
            var body={"restaurantid":restaurantId,
                "categoryid":categoryId,
                "subcategoryid":subcategoryId,
                "foodname":foodName,
                "price":price,
                "offerprice":offerPrice,
                "status":statas,
                "statustype":`${statusType}`,
                "ingredients":ingredients,
                "foodid":foodId,
                "updatedat":new Date()}
            var response=await postData('food/edit_food_data',body)
            if(response.status)
            {
                swal.fire({
                icon: "success",
                title: response.message,
                showConfirmButton: false,
                timer: 3000
                });
                        
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
            handleClose()
            fetchAllFoodData()
        }
    }

    //function for display 
    const displayFoodDetails=()=>
    {
        return(<div>
            <Dialog open={open}>
                <DialogTitle>List Of Food</DialogTitle>
                <DialogContent><div>
                            <div>
                                <TitleBar title='Edit Food Details'/>
                                <Grid2 container spacing={2}>
                                    <Grid2 item size={4}>
                                        <TextField onFocus={()=>handleError('restaurantId','')} error={error.restaurantId} helperText={error.restaurantId} value={restaurantId} onChange={(e)=>setRestaurantId(e.target.value)} label="Restaureat Id" fullWidth />
                                    </Grid2>
                                    <Grid2 item size={4}>
                                        <FormControl fullWidth error={error.categoryId}>
                                            <InputLabel>Category</InputLabel>
                                            <Select value={categoryId} onFocus={()=>handleError('categoryId','')} label='Category' onChange={handleCategoryChange}>
                                                {fillCategory()}
                                            </Select>
                                            <FormHelperText>{error.categoryId}</FormHelperText>
                                        </FormControl>
                                    </Grid2>
                                    <Grid2 item size={4}>
                                        <FormControl fullWidth error={error.subcategoryId}>
                                            <InputLabel>Subcategory</InputLabel>
                                            <Select value={subcategoryId} onFocus={()=>handleError('subcategoryId','')} onChange={(e)=>setSubcategoryId(e.target.value)} label='Subcategory'>
                                                {fillSubcategory()}
                                            </Select>
                                            <FormHelperText>{error.subcategoryId}</FormHelperText>
                                        </FormControl>
                                    </Grid2>
                
                                    <Grid2 item size={4}>
                                        <TextField onFocus={()=>handleError('foodName','')} error={error.foodName} helperText={error.foodName} value={foodName} onChange={(e)=>setFoodName(e.target.value)} label="Food Name" fullWidth />
                                    </Grid2>
                                    <Grid2 item size={4}>
                                        <TextField onFocus={()=>handleError('price','')} error={error.price} helperText={error.price} value={price} onChange={(e)=>setPrice(e.target.value)} label="Price" fullWidth />
                                    </Grid2>
                                    <Grid2 item size={4}>
                                        <TextField onFocus={()=>handleError('offerPrice','')} error={error.offerPrice} helperText={error.offerPrice} value={offerPrice} onChange={(e)=>setOfferPrice(e.target.value)} label="Offer Price" fullWidth />
                                    </Grid2>
                
                                    <Grid2 item size={6}>
                                        <FormControl fullWidth>
                                            <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
                                            <RadioGroup value={statas} onChange={handleRadioChange} row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                                                <FormControlLabel value="Available" control={<Radio />} label="Available"/>
                                                <FormControlLabel value="Non-Available" control={<Radio />} label="Non-Available"/>
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid2>
                                    <Grid2 item size={6}>
                                        <FormGroup>
                                            <FormLabel>Status Type</FormLabel>
                                            <FormControlLabel  control={<Switch checked={statusType} onChange={handleSwitchChange} />} label={statusLable} />
                                        </FormGroup>
                                    </Grid2>
                
                                    <Grid2 item size={12}>
                                        <TextField onFocus={()=>handleError('ingredients','')} error={error.ingredients} helperText={error.ingredients} value={ingredients} onChange={(e)=>setIngredients(e.target.value)} label="Ingredients" fullWidth />
                                    </Grid2>
        
                                    <Grid2 size={6}>
                                        <Button onClick={handleDelete} fullWidth variant="contained" >Delete</Button>
                                    </Grid2>
                                    <Grid2 size={6}>
                                        <Button  fullWidth onClick={handleEdit} variant="contained" >Edit</Button>
                                    </Grid2>
                                </Grid2>
                            </div>
                        </div>
                        </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>)
    }

    function displayAll()
    {
        return(<MaterialTable 
        title="List Of Food"
        columns={[{title:"Id",render:(rowData)=><div>{rowData.foodid}</div>},
            {title:"Restaurant",render:(rowData)=><div>{rowData.restaurantname}</div>},
            {title:"Category",render:(rowData)=><div>{rowData.categoryname}</div>},
            {title:"Subcategory",render:(rowData)=><div>{rowData.subcategoryname}</div>},
            {title:"Food",render:(rowData)=><div>{rowData.foodname}</div>},
            {title:"Rate",render:(rowData)=><div>
                <div><b style={{paddingRight:8}}>Price:</b>{rowData.price}</div>
                <div><b style={{paddingRight:8}}>Offer_Price:</b>{rowData.offerprice}</div></div>},
            {title:"status",render:(rowData)=><div>
                <div>{rowData.status}</div>
                <div>{rowData.statustype=='true' ? "Vegitarian" : "Non-Vegitarian"}</div></div>},
            {title:"Ingredients",render:(rowData)=><div>{rowData.ingredients}</div>},
            {title:"icon",render:(rowData)=><div>
                <img 
                title="icon" 
                style={{cursor:'pointer'}} 
                src={`${serverURL}/images/${rowData.icon}`} 
                className={classes.pic_styale}
                onClick={()=>handleEditPicture(rowData.foodid,`${serverURL}/images/${rowData.icon}`)}
                />
                </div>}
        ]}
        data={foodData}
        actions={[
            {
                icon:'edit',
                tooltip: 'Edit Food Details',
                onClick: (event, rowData) => openDialog(rowData)
            },
            {
              icon: 'add',
              isFreeAction:true,
              tooltip: 'Add New Food',
              onClick: (event, rowData) => navigate('/admindashboard/foodinterface') 
            }
        ]}
        />)
    }
    return(<div className={classes.root}>
        <div className={classes.display_box}>
            <TitleBar title="All Foods" />
            {displayAll()}
            {displayFoodDetails()}
            {dialogEditPicture()}
        </div>
    </div>)
}
 