import DeliveryFilter from "./DeliveryFilter";
import FoodCircleComponent from "./FoodCircleComponent";
import BrandCircleComponent from "./BrandCircleComponent"
import DeliveryComponent from "./DeliveryComponent"
import filter2 from "../../../assets/filter.png"
import { useState,useEffect } from "react";
import { postData } from "../../../services/FetchNodeServices";


export default function DeliveryList({city})
{
    const [restaurantList,setRestaurantList]=useState([])
    const [restaurantData,setRestaurantData]=useState([])
    const fetchAllRestaurant=async()=>{
        var res=await postData('userinterface/user_fetch_restaurant_by_city',{cityid:city?.cityid})
        if(res.status)
        {
            setRestaurantList(res.data)}
        else
        {alert('unable to fetch restaurant details')}
    }

    const fetchAllRestaurantAmbience=async()=>{
        var res=await postData('userinterface/user_fetch_ambience_by_city',{cityid:100})
        if(res.status)
        {
            setRestaurantData(res.data)
        }
        else{
            alert('Unable to fetch restaurant details')
        }
    }

    var dfilter=[
        {filterid:1,title:'FILTERS',img:filter2},
        {filterid:2,title:'Pure Veg'},
        {filterid:3,title:'Cuisines'}
    ]
    var foodimage=[
        {foodimageid:1,title:"Pizza",img:'pizza.png'},
        {foodimageid:2,title:'Biryani',img:'biryani.png'},
        {foodimageid:3,title:'Burger',img:'burger.png'},
        {foodimageid:4,title:"Thali",img:'thali.png'},
        {foodimageid:5,title:'Paneer',img:'paneer.png'},
        {foodimageid:6,title:"North Indian",img:'northindian.png'},
        {foodimageid:7,title:'Cake',img:'cake.png'},
        {foodimageid:8,title:'Rolls',img:'rolls.png'},
        {foodimageid:9,title:"Noodles",img:'noodles.png'},   
    ]

    useEffect(function(){
        fetchAllRestaurant()
        fetchAllRestaurantAmbience()
    },[])
    var brandimage=[
      {id:1,title:"Pizza hut",img:'pizzahut.png'},
      {id:2,title:"Domino's Pizza",img:'domino.png'},
      {id:3,title:'Burger King',img:'burgerking.png'},
      {id:4,title:"Subway",img:'subway.png'},
      {id:5,title:'Burger Buddy',img:'burgerbuddy.png'},
      {id:6,title:"The Belgian Waffle Co.",img:'belgian.png'},
      {id:7,title:'Burger Bytes',img:'burgerbytes.png'},
      {id:8,title:'Xero Degrees',img:'xero.png'},  
  ]

  var deliverycard=[
          {restaurantid:1,restaurantname:"ChotiWala Restaurant",rating:"3.9 ★",price:'₹150',time:'26 min', foodname:"Chinese", category:"North Indian", img:'chotiwala.png' },
          {restaurantid:2,restaurantname:"La Pino'z Pizza",rating:"4.0 ★",price:'₹250',time:'28 min',foodname:'Italian',category:'Pizza, Pasta',address:"City Center , Gwalior", img:'lapizza.png' },
         {restaurantid:3,restaurantname:'The Delight',rating:"4.1 ★",price:'₹1000',time:'22 min',foodname:'Biryani',category:'North Indian',address:"Lashkar , Gwalior", img:'delight.png' }
      ]
    

    return(<div style={{height:'100%'}}>
         
    <DeliveryFilter data={dfilter} />  
    <FoodCircleComponent data={foodimage} />
    <BrandCircleComponent data={restaurantList} />
    <DeliveryComponent data={restaurantData} />
    </div>)
}