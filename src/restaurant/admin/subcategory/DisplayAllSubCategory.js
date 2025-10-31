import { useStyles } from "../subcategory/SubCategoryInterfaceCss"
import TitleBar from "../../components/TitleBar"
import { CloudUpload } from "@mui/icons-material";
import { Dialog,DialogContent,DialogTitle,DialogActions} from "@mui/material"
import { Avatar, Grid2,TextField,FormControl,InputLabel,Select,MenuItem,Button,FormHelperText} from "@mui/material"
import swal from "sweetalert2"
import { useState,useEffect } from "react";
import MaterialTable from "@material-table/core";
import { getData,postData, serverURL } from "../../../services/FetchNodeServices";
import { useNavigate } from "react-router-dom";
//main function
export default function DisplayAllSubCategory()
{   const classes = useStyles()
    const navigate= useNavigate()
    const [open,setOpen] = useState()
    const [subcategory,setSubcategory]=useState([])

    //fetch all subcategory data
    const fetchAllSubcategoryData=async()=>{
        var res=await getData('subcategory/fetch_all_subcategory_data')
        setSubcategory(res.data)
    }

    //relod page after fetching data
    useEffect(function(){fetchAllSubcategoryData()},[])
    /*****************Subcategory Table function and states********/
    const [restaurantId,setRestaurantId]=useState('')
    const [Category,setCategory]=useState([])
    const [subCategoryName,setSubCategoryName]=useState('')
    const [subcategoryId,setSubcategoryId]=useState('')
    const [categoryId,setCategoryId]=useState('')
    const [iconPicture,setIconPicture]=useState({file:'',bytes:''})
    const [tempPicture,setTempPicture]=useState('')
    const [pictureOpen,setPictureOpen]=useState(false)
    const [buttonState,setButtonState]=useState(true)
    const [error,setError]=useState({})
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

    //check cashes aplyee
    const handleError=(label,errorMessage)=>{
        var e=error[label]=errorMessage
        setError((prev)=>({...prev,[label]:errorMessage}))
    }
    //function for validations
    const validate=()=>{
        var err=false
        if(subCategoryName.length==0)
        {   handleError('subCategoryName','Subcategory name should not blank.....')
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

    const handleDelete=()=>{
            var err=validate()
                      if(err==false)
                      {
                        swal.fire({
                            title: "Do you want to delete the Subcategory?",
                            showDenyButton: true,
                            showCancelButton: true,
                            confirmButtonText: "Delete",
                            denyButtonText: `Don't Delete`
                          }).then(async(result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                var body={"subcategoryid":subcategoryId}
                                var response=await postData('subcategory/delete_data',body)
                                if(response.status)
                                    {fetchAllSubcategoryData()
                              swal.fire("Deleted!", "", "success");
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
                            else if (result.isDenied) {
                              swal.fire("Subcategory not Delete", "", "info");
                            }
                            handleClose()
                            fetchAllSubcategoryData()
                          });
                    }
          }
        // function for edit data 
        const handleEdit=async()=>{
            var err=validate()
            if(err == false)
            {
                var body={"restaurantid":restaurantId,
                    "subcategoryname":subCategoryName,
                    "categoryid":categoryId,
                    "subcategoryid":subcategoryId,
                    "updatedat":new Date()}
                var response=await postData('subcategory/edit_subcategory_data',body)
            
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
                        fetchAllSubcategoryData()
            }
        }
    /**************************************************************/
    //fill the in edit page
    const openDialog=(rowData)=>{
        setOpen(true)
        setRestaurantId(rowData.restaurantid)
        setCategoryId(rowData.categoryid)
        setSubCategoryName(rowData.subcategoryname)
        setSubcategoryId(rowData.subcategoryid)
    }

     //for closint the edit page
     const handleClose=()=>{
        setOpen(false)
     }

     //set all values for edit picture
        const handleEditPicture=(sid,picture)=>{
            setIconPicture({file:picture,bytes:''})
            setTempPicture(picture)
            setSubcategoryId(sid)
            setPictureOpen(true)
         }
     
         //function for change the picture on edit time
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
             formData.append('subcategoryid',subcategoryId)
             formData.append('icon',iconPicture.bytes)
             var res = await postData('subcategory/edit_subcategory_image',formData)
     
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
                 fetchAllSubcategoryData()
         }

    const dialogEditPicture=()=>{
            return(<div>
                <Dialog open={pictureOpen} onClose={handleEditPictureClose}>
                    <DialogTitle>Edit Icon</DialogTitle>
                    <DialogContent>
                        <div style={{width:400}}>
                            <Grid2 container spacing={2}>
                                <Grid2 item size={12} className={classes.center}>
                                    <Avatar alt="Icon" src={iconPicture.file} sx={{width:10,height:10,marginBottom:3}} variant="rounded" />
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


    //data edit details page function
    const displaySubcategoryDetails=()=>{
        return(<div>
            <Dialog open={open}>
                <DialogTitle>Subcategory Details</DialogTitle>
                <DialogContent>
                <div>
        <div>
            <TitleBar title={'Edit Subcategory Data'} />
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
                    <TextField onFocus={()=>handleError('subCategoryName','')} error={error.subCategoryName} helperText={error.subCategoryName} value={subCategoryName} onChange={(e)=>setSubCategoryName(e.target.value)} label="Subcategory Name" fullWidth />
                </Grid2>
                    <Grid2 size={6}>
                        <Button  fullWidth onClick={handleDelete} variant="contained" >Delete</Button>
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
            title="List Of Subcategory"
            columns={[{title:'Subcategory Id',render:(rowData)=><div>{rowData.subcategoryid}</div>},
                {title:'Restaurant Name',render:(rowData)=><div>{rowData.restaurantname}</div>},
                {title:'category Name',render:(rowData)=><div>{rowData.categoryname}</div>},
                {title:'Subcategory Name',render:(rowData)=><div>{rowData.subcategoryname}</div>},
                {title:'Icon',render:(rowData)=><div>
                    <img 
                    title='icon'
                    style={{cursor:'pointer'}}  
                    src={`${serverURL}/images/${rowData.icon}`}
                    className={classes.pic_styale}
                    onClick={()=>handleEditPicture(rowData.subcategoryid,`${serverURL}/images/${rowData.icon}`)}
                    /></div>}
            ]}
            data={subcategory}
            actions={[
                {
                    icon: 'edit',
                    tooltip: 'Edit Subcategory Details',
                    onClick: (event, rowData) => openDialog(rowData)
                },
                {
                  icon: 'add',
                  isFreeAction:true,
                  tooltip: 'Add New SubCategory',
                  onClick: (event, rowData) => navigate('/admindashboard/subcategoryinterface')
                }
            ]}
            />)
    }
    return(<div className={classes.root}>
        <div className={classes.display_box}>
            <TitleBar title="All Subcategory" />
            {displayAll()}
            {displaySubcategoryDetails()}
            {dialogEditPicture()}
        </div>
    </div>)
}