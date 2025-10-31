import { useStyles } from "./FoodInterfaceCss"
import { Grid2,TextField,
    FormControl,
    InputLabel,Select,
    MenuItem, Button,
    Avatar,FormHelperText,FormLabel,
    FormGroup,
    RadioGroup,
    FormControlLabel,
    Switch,Radio } from "@mui/material"
import TitleBar from "../../components/TitleBar";
import dish from"../../../assets/dish.png"
import { CloudUpload } from "@mui/icons-material";
import { useState,useEffect } from "react";

import Swal from "sweetalert2";
import { getData, postData } from "../../../services/FetchNodeServices";
import { green } from "@mui/material/colors";




export default function FoodItemInterface(){
    const classes = useStyles(); 
    const [dishPicture,setDishPicture]=useState({file:dish,bytes:''})
    const [categories,setCategories]=useState([])
    const [subCategories,setSubCategories]=useState([])
    const [subCategoryName,setSubCategoryName]=useState('')
    const [foodName,setFoodName]=useState('')
    const [foodType,setFoodType]=useState('')
    const [price,setPrice]=useState('')
    const [offerPrice,setOfferPrice]=useState('')
    const [ingredients,setIngredients]=useState('')
    const [status,setStatus]=useState('')
    const [quantityType,setQuantityType]=useState('')
    const [restaurantId,setRestaurantId]=useState('')
    const [categoryId,setCategoryId]=useState('')
    const [subCategoryId,setSubCategoryId]=useState('')
    const [error,setError]=useState({categoryid:''})
    const [switchbtn,setSwitchBtn]=useState(true)
    const [foodLable,setFoodLable]=useState('veg')

    

  const handleChange = (event) => {
    setQuantityType(event.target.value);
  };
    const handleError=(label,errorMessage)=>{
        setError((prev) =>({ ...prev,[label]: errorMessage}));
        
    }
   const handleradio=(e)=>{
    setStatus(e.target.value)
   }
   const handleswitchbtn=(e)=>{
   
    setSwitchBtn((prev)=>{
        const checked= !prev;
        setFoodLable(checked? 'veg' : 'non-veg')
        return checked
    })
    

   }
    const fetchAllCategory=async()=>{
        var response=await getData("food/fetch_all_category")
        setCategories(response.data)
        
    }
    const fetchAllSubCategory=async(categoryid)=>{
        var response=await postData("food/fetch_all_subcategory",{categoryid:categoryid})
        setSubCategories(response.data)

    }
    useEffect(function(){
        fetchAllCategory()
    },[])
    const handleDishChange=(event)=>{
        setDishPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }

    const handleCategoryChange=(event)=>{
        setCategoryId(event.target.value)
        fetchAllSubCategory(event.target.value)

    }

    const fillCategories=()=>{
        return categories.map((item)=>{
            return<MenuItem value={item.categoryid}>
                {item.categoryname}
            </MenuItem>
        })

        
        
    };

    const fillSubCategories=()=>{
        return subCategories.map((item)=>{
            return<MenuItem value={item.subcategoryid}>
                {item.subcategoryname}
            </MenuItem>
        })
    }
    const validate=()=>{
        var err=false
        if(restaurantId.length==0)
        { handleError('restaurantId','Restaurant name should not be blank.....')
            err=true
        }
        if(categoryId.length==0)
            { handleError('categoryId','Category name should not be blank.....')
                err=true
            }
            if(subCategoryId.length==0)
                { handleError('subCategoryId','SubCategory name should not be blank.....')
                    err=true
                }
                if(foodName.length==0)
                    { handleError('foodName','Food Item name should not be blank.....')
                        err=true
                    }
                    if(price.length==0)
                        { handleError('price',' Pls Input Amount.....')
                            err=true
                        }
                        if(offerPrice.length==0)
                            { handleError('offerPrice',' Pls Input Offer price.....')
                                err=true
                            }
                            if(ingredients.length==0)
                                { handleError('ingredients',' Add ingredients.....')
                                    err=true
                                }
                if(dishPicture.bytes.length==0)
                    { handleError('dishPicture','Pls select picture.....')
                        err=true
                    }
        return err
    }

    const handleReset=()=>{
        setRestaurantId('')
        setCategoryId('')
        setSubCategoryId('')
        setFoodName('')
        setSubCategoryName('')
        setPrice('')
        setOfferPrice('')
        setIngredients('')
        setStatus('')
        setDishPicture({file:dish,bytes:'',});
        

    }
const handleSubmit = async () => {
  var err = validate()
  if (!err) {
    var formData = new FormData()
    formData.append("restaurantid", restaurantId)
    formData.append("categoryid", categoryId)
    formData.append("subcategoryid", subCategoryId)
    formData.append("foodname", foodName)
    formData.append("foodtype", foodLable) // ✅ send veg/non-veg
    formData.append("price", price)
    formData.append("offerprice", offerPrice)
    formData.append("ingredients", ingredients)
    formData.append("status", status)
    formData.append("icon", dishPicture.bytes)
    formData.append("createdat", new Date().toLocaleTimeString())
    formData.append("updatedat", new Date().toLocaleTimeString())
    formData.append("quantitytype", quantityType)

    var response = await postData('food/submit_food_data', formData)
    console.log("Submit response:", response)

    if (response && response.status) {
      Swal.fire({
        icon: "success",
        title: response.message,
        showConfirmButton: false,
        timer: 3000,
        toast: true
      })
      handleReset()
    } else {
      Swal.fire({
        icon: "error",
        title: response?.message || "Server error",
        showConfirmButton: false,
        timer: 3000,
        toast: true
      })
    }
  }
}




   return (<div className={classes.root}>
        <div className={classes.box}>
            <TitleBar title="Food Item" url={'/admindashboard/displayallfood'} />
                            <Grid2 container spacing={2}>
                            <Grid2 item size={4}>
                                <TextField onFocus={()=>handleError('restaurantId','')} error={error.restaurantId} helperText={error.restaurantId} value={restaurantId} onChange={(e)=>setRestaurantId(e.target.value)} label="Restaurant Id" fullWidth>
                                </TextField>
                            </Grid2>
                            <Grid2 item size={4}>
                <FormControl fullWidth error={error.categoryId}>
                    <InputLabel>Category Name</InputLabel>
                    <Select value={categoryId} onFocus={()=>handleError('categoryId','')} onChange={handleCategoryChange} label="Category Name" >
                       {fillCategories()}
                    </Select>
                    <FormHelperText>{error.categoryId}</FormHelperText>
                </FormControl>
            </Grid2>
            <Grid2 item size={4}>
                <FormControl fullWidth error={error.subcategoryId}>
                    <InputLabel>Subcategory Name</InputLabel>
                    <Select value={subCategoryId} onFocus={()=>handleError('subCategoryId','')} onChange={(e)=>setSubCategoryId(e.target.value)} label="SubCategory Name" >
                       {fillSubCategories()}
                    </Select>
                    <FormHelperText>{error.subcategoryId}</FormHelperText>
                </FormControl>
            </Grid2>
            <Grid2 item size={12}>
            <TextField onFocus={()=>handleError('foodName','')} error={error.foodName} helperText={error.foodName} value={foodName} onChange={(e)=>setFoodName(e.target.value)} label="Food Item Name" fullWidth>
            </TextField>
            </Grid2>
            <Grid2 item size={4}>
  <FormLabel>Food Type</FormLabel>
  
    <FormGroup>
     <FormControlLabel
        control={<Switch sx={{ m: 1 }} onChange={handleswitchbtn} />}
        label={foodLable} />
        
      
        </FormGroup> 
</Grid2>

    <Grid2 item size={4}>
        <TextField onFocus={()=>handleError('price','')}  error={error.price} helperText={error.price} value={price} onChange={(e)=>setPrice(e.target.value)} label="Price" fullWidth></TextField>
    </Grid2>
    <Grid2 item size={4}>
        <TextField onFocus={()=>handleError('offerPrice','')}  error={error.offerPrice} helperText={error.offerPrice} value={offerPrice} onChange={(e)=>setOfferPrice(e.target.value)}  label="Offer-Price"fullWidth ></TextField>
    </Grid2>
    <Grid2 item size={12}>
    <TextField onFocus={()=>handleError('ingredients','')}  error={error.ingredients} helperText={error.ingredients}  value={ingredients} onChange={(e)=>setIngredients(e.target.value)} label="Ingredients" fullWidth></TextField>
</Grid2>
<Grid2 item size={3}>

<FormControl>
      <FormLabel>Status</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={status} onChange={handleradio}>
        <FormControlLabel value="available" control={<Radio />} label="Available" />
        <FormControlLabel value="non-available" control={<Radio />} label="Non-Available" /> 
      </RadioGroup>
    </FormControl>
</Grid2>
<Grid2 item size={3}>
<FormControl fullWidth>
        <InputLabel>Quantity Type</InputLabel>
        <Select
          value={quantityType}
          label="Quantity Type"
          onChange={handleChange}
        >
          <MenuItem  value='Fixed'>Fixed</MenuItem>
          <MenuItem value='Half,Full'>Half,Full</MenuItem>
          <MenuItem value='250g,500g,1kg'>250g,500g,1kg</MenuItem>
        </Select>
      </FormControl>
</Grid2>

        <Grid2 item size={3} className={classes.center}>
           
        <Avatar
                alt="Dish"
                src={dishPicture.file}
                sx={{width:60,height:60,marginBottom:1}}
                variant="rounded"
                
                /> 
                <div className={classes.errorText}>{error.dishPicture}</div>
                </Grid2>   
                <Grid2 item size={3} className={classes.center}>
           <Button variant="contained"
            startIcon={<CloudUpload />} 
            component="label"
            onFocus={()=>handleError('dishPicture','')}
            fullWidth
            >
               
           UPLOAD ICON
           <input  
           
           onChange={handleDishChange}
           type='file'accept="image/*" 
            multiple hidden />
           </Button>
           
           </Grid2>


           <Grid2 size={6}>
           <Button  fullWidth onClick={handleSubmit}  variant="contained">Submit</Button>

       </Grid2>
       <Grid2 size={6}>
           <Button  fullWidth onClick={handleReset} variant="contained">Reset</Button>

       </Grid2>
        </Grid2>

</div>
</div>


)} 
