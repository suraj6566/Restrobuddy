import footerlogo from "../../../assets/footerlogo.png"
import { Grid2  } from "@mui/material";
import { useStyles } from "./AdminDashboardCss";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import res from "../../../assets/res.png"
import category from "../../../assets/cat.png"
import food from "../../../assets/food.png"
import time from "../../../assets/time.png"
import sub from "../../../assets/sub.png"
import logout from "../../../assets/user-logout.png"
import dashboard from "../../../assets/ui.png" 
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Route,Routes } from "react-router-dom";
import RestaurantInterface from "../restaurant/RestaurantInterface";
import DisplayAllRestaurant from "../restaurant/DisplayAllRestaurant";
import CategoryInterface from "../category/CategoryInterface";
import DisplayAllCategory from "../category/DisplayAllCategory";
import SubCategoryInterface from "../subcategory/SubCategoryInterface";
import DisplayAllSubCategory from "../subcategory/DisplayAllSubCategory";
import FoodInterface from "../food/FoodInterface";
import DisplayAllFood from "../food/DisplayAllFood"; 
import TimingInterface from "../timing/TimingInterface";
import InsertPicture from "../pictures/InsertPicture";
import { useNavigate } from "react-router-dom";
import picture from "../../../assets/picture.png"
import { serverURL } from "../../../services/FetchNodeServices";
export default function AdminDashboard()
{
    const classes=useStyles()
    const navigate=useNavigate()

    // const location=useLocation()
    // console.log("location:",location)
    // const admin=location.state
    
    const admin=JSON.parse(localStorage.getItem("ADMIN"))
    
    return(<div className={classes.root}>
        <div className={classes.box}>
        <Box sx={{ flexGrow: 1,marginBottom:3 }}>
      <AppBar position="static" style={{background:"#fff"}}>
        <Toolbar>
          <div  style={{ flexGrow: 1 }}>
            <img src={footerlogo} style={{width:120}} />
          </div>
          <div style={{color:'#000',width:'10%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
            <img src={`${serverURL}/images/${admin?.picture}`} style={{borderRadius:10,maxWidth:35,objectFit:'contain'}} />
          <div style={{fontSize:13,color:'#000'}}>{admin?.adminname}</div>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
        <Grid2 container spacing={2}>
        <Grid2 size={2} >
        <List>
            <ListItem>
                <ListItemIcon>
                    <img src={dashboard} style={{width:35}}/>
                </ListItemIcon>
                <ListItemText>
                    DashBoard
                </ListItemText>
            </ListItem>
            <Divider/>

            <ListItem>
                <ListItemButton onClick={()=>navigate("/admindashboard/displayallrestaurant")}>
                <ListItemIcon>
                    <img src={res} style={{width:35}}/>
                </ListItemIcon>
                <ListItemText>
                    Restaurant
                </ListItemText>
                </ListItemButton>
            </ListItem>

            <ListItem>
                <ListItemButton onClick={()=>navigate("/admindashboard/displayallcategory")}>
                <ListItemIcon>
                    <img src={category} style={{width:35}}/>
                </ListItemIcon>
                <ListItemText>
                    Category
                </ListItemText>
                </ListItemButton>
            </ListItem>
            
            <ListItem>
                <ListItemButton onClick={()=>navigate("/admindashboard/displayallsubcategory")}>
                <ListItemIcon>
                    <img src={sub} style={{width:35}}/>
                </ListItemIcon>
                <ListItemText>
                    SubCategory
                </ListItemText>
                </ListItemButton>
            </ListItem>
            
            <ListItem>
                <ListItemButton onClick={()=>navigate("/admindashboard/displayallfood")}>
                <ListItemIcon>
                    <img src={food} style={{width:30}}/>
                </ListItemIcon>
                <ListItemText>
                    Food
                </ListItemText>
                </ListItemButton>
            </ListItem>
            
            <ListItem>
                <ListItemButton onClick={()=>navigate("/admindashboard/timinginterface")}>
                <ListItemIcon>
                    <img src={time} style={{width:30}}/>
                </ListItemIcon>
                <ListItemText>
                    Time
                </ListItemText>
                </ListItemButton>
            </ListItem>
            

             <ListItem>
                <ListItemButton onClick={()=>navigate("/admindashboard/insertpicture")}>
                <ListItemIcon>
                    <img src={picture} style={{width:30}}/>
                </ListItemIcon>
                <ListItemText>
                    Add Images
                </ListItemText>
                </ListItemButton>
            </ListItem>
            <Divider/>

            <ListItem>
                <ListItemButton onClick={()=>navigate("/loginadmin")} >
                <ListItemIcon>
                    <img src={logout} style={{width:30}}/>
                </ListItemIcon>
                <ListItemText>
                    Logout
                </ListItemText>
                </ListItemButton>
            </ListItem>
  
        </List>
        </Grid2>

        <Grid2 size={10}>
            <Routes>
            <Route element={<RestaurantInterface />} path="/restaurantinterface" />
            <Route element={<DisplayAllRestaurant />} path="/displayallrestaurant" /> 
            <Route element={<CategoryInterface />} path="/categoryinterface" />
            <Route element={<DisplayAllCategory />} path="/displayallcategory" /> 
            <Route element={<SubCategoryInterface />} path="/subcategoryinterface" />
            <Route element={<DisplayAllSubCategory />} path="/displayallsubcategory" />
            <Route element={<FoodInterface />} path="/foodinterface" />
            <Route element={<DisplayAllFood />} path="/displayallfood" />
            <Route element={<TimingInterface />} path="/timinginterface" /> 
            <Route element={<InsertPicture />} path="/insertpicture" />
            </Routes>
        </Grid2>

        </Grid2>
        </div>
     </div>)
}
