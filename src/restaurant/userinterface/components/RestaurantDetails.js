import RestaurantDetailsPage from "./RestaurantDetailsPage";
import RestaurantDetailsSearchBar from "./RestaurantDetailsSearchBar";
import { useState,useEffect } from "react";
import { postData } from "../../../services/FetchNodeServices";

export default function RestaurantDetails()

{   const [restaurantList,setRestaurantList]=useState([])

    const fetchAllRestaurantAmbience=async()=>{
            var res=await postData('userinterface/user_fetch_ambience_by_restaurantid',{restaurantid:22})
            
            if(res.status)
            {
                setRestaurantList(res.data)
            }
            else{
                alert('Unable to fetch restaurant details')
            }
        }
    
         useEffect(function(){
                fetchAllRestaurantAmbience()
            },[])
            
   
    return(<div> 
        <RestaurantDetailsSearchBar />
        <RestaurantDetailsPage data={restaurantList} />
    </div>)
}