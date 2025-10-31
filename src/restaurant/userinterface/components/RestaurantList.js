import rising from "../../../assets/rising.png"
import filter2 from "../../../assets/filter.png"
import biryani from "../../../assets/biryani.png"
import burger from "../../../assets/burger.png"
import add from "../../../assets/add.png"
import RestaurantFilter from "./RestaurantFilter";
import RestaurantComponent from "./RestaurantComponent";
import RestaurantAd from "./RestaurantAd";
import { useEffect, useState } from "react"
import { postData } from "../../../services/FetchNodeServices"


export default function RestaurantList({city})
{   
    const [RestaurantList,setRestaurantList]=useState([])
    const fetchAllRestaurant=async()=>{
        var res=await postData('userinterface/user_fetch_ambience_by_city',{cityid:city?.cityid})
        if(res.status)
        {
            setRestaurantList(res.data)
        }
        else{
            alert('Unable to fetch restaurant details')
        }
    }

    useEffect(function(){
        fetchAllRestaurant()
    },[])

    var filter=[{filterid:1,title:'Filters',img:filter2},
        {filterid:2,title:'Offers'},
        {filterid:3,title:'Rating: 4.5+'},
        {filterid:4,title:'Pet Friendly'},
        {filterid:5,title:'Outdoor Seating'},
        {filterid:6,title:'Serves Alcohol'},
        {filterid:7,title:'Open Now'},
    ]

    var restaurant=[
        {restaurantid:1,restaurantname:"Rising Star Hotel",rating:"3.9 ★",price:'₹500', distance:"1 Km", foodname:"Dhokla", category:"Indian Food",address:"Gol Pahadiya, Gwalior", img:rising },
        {restaurantid:2,restaurantname:'Biryani By Kilo',rating:"4.0 ★",price:'₹800',distance:'3 Km',foodname:'Biryani',category:'Indian Food',address:"City Center , Gwalior", img:biryani },
       {restaurantid:3,restaurantname:'Molecule',rating:"4.1 ★",price:'₹1000',distance:'5 Km',foodname:'Burger',category:'Chinese',address:"Lashkar , Gwalior", img:burger }
    ] 

    var ad=[{adid:1,img:add}]

    return(<div style={{width:'100%',height:'100%',display:"flex",flexDirection:'column'}} >
         <RestaurantFilter data={filter} />
         <RestaurantAd data={ad} />
         <RestaurantComponent data={RestaurantList} />
    </div>)
}