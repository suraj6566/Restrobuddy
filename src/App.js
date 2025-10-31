import { Route,Routes,BrowserRouter as Router } from "react-router-dom";
import LoginAdmin from "./restaurant/admin/auth/LoginAdmin";
import AdminDashboard from "./restaurant/admin/auth/AdminDashboard";
import RestaurantList from "./restaurant/userinterface/components/RestaurantList";
import RestroBuddyApp from "./restaurant/userinterface/components/RestroBuddyApp";
import Footer from "./restaurant/userinterface/components/Footer";
import HomePage from "./restaurant/userinterface/components/screens/HomePage";
import Header from "./restaurant/userinterface/components/Header";
import DeliveryList from "./restaurant/userinterface/components/DeliveryList";
import DiningAndDelivery from "./restaurant/userinterface/components/screens/DiningAndDelivery";
import RestaurantDetails from "./restaurant/userinterface/components/RestaurantDetails";
import RestaurantFoodDetails from "./restaurant/userinterface/components/screens/RestaurantFoodDetails";
import OrderOnline from "./restaurant/userinterface/components/OrderOnline";
import OrderOnlineFoodList from "./restaurant/userinterface/components/OrderOnlineFoodList";
import Sweets from "./restaurant/userinterface/components/Sweets";
import NextNation from "./restaurant/userinterface/components/NextNation"
import InsertPicture from "./restaurant/admin/pictures/InsertPicture";
import DialogFoodDetails from "./restaurant/userinterface/components/DialogFoodDetails"
import RestaurantLoginAdmin from "./restaurant/admin/restaurant_admin/RestaurantLoginAdmin";
import RestaurantDashboard from "./restaurant/admin/restaurant_admin/RestaurantAdminDashboard";
import ViewCart from "./restaurant/userinterface/components/screens/ViewCart"


function App() {
  return (
    <div style={{fontFamily:'Open Sans'}}>
      <Router>
        <Routes>
          
          <Route element={<LoginAdmin />} path="/loginadmin" />
          <Route element={<AdminDashboard />} path="/admindashboard/*" />
          <Route element={<RestaurantList />} path="/restaurantlist" />
          <Route element={<RestroBuddyApp />} path="/restrobuddyapp" />
          <Route element={<Footer />} path="/footer" />
          <Route element={<HomePage />} path="/" />
          <Route element={<Header />} path="/header" />
          <Route element={<DeliveryList />} path="/deliverylist" />
          <Route element={<DiningAndDelivery/>} path="/dininganddelivery/:cityid/:cityname"/>
          <Route element={<RestaurantDetails />} path="/restaurantdetails" />
          <Route element={<RestaurantFoodDetails />} path="/restaurantfooddetails/:restaurantid/:restaurantname" />
          <Route element={<OrderOnline />} path="/orderonline" />
          <Route element={<OrderOnlineFoodList />} path="/orderonlinefoodlist" />
          <Route element={<Sweets />} path="/sweets" />
          <Route element={<NextNation />} path="/nextnation" />
          <Route element={<InsertPicture />} path="insertpicture" />
          <Route element={<DialogFoodDetails />} path="dialogfooddetails" />
          <Route element={<RestaurantDashboard />} path="restaurantdashboard" />
          <Route element={<RestaurantLoginAdmin />} path="restaurantloginadmin" />
          <Route element={<ViewCart />} path="viewcart" />
          
        </Routes>
      </Router> 
    </div>
  );
}

export default App;
