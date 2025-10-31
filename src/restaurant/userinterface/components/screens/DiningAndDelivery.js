import DiningHeader from "../DiningHeader"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import { serverURL } from '../../../../services/FetchNodeServices';
import RestaurantList from "../RestaurantList";
import DeliveryList from "../DeliveryList";
import { useParams } from "react-router-dom";
export default function DiningAndDelivery()
{   
    const [value, setValue] = useState(0);
    const params=useParams()
    console.log("params",params)

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

      const iconStyle=(icon,bk)=>{
        return(<div style={{background:bk,width:60,height:60,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:30}}>
            <img src={`${serverURL}/images/${icon}`} style={{width:30}} />
        </div>)
      }
      
      const tabStyle=()=>{
        return(<div style={{width:'100%',display:'flex',justifyContent:"center",marginTop:20}}>
          <div style={{width:'72%'}}>
          <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            style: {
                background:'red'
            }
          }}
        >
          <Tab icon={iconStyle(value==0?'colorplate.png':'diningplate.png', value==0?'rgb(229, 243, 243)':'rgb(248, 248, 248)')} iconPosition="start" label="Dining Out" style={{color:value==0?"red":'grey'}}/>
          <Tab  icon={iconStyle(value==1?'colorscooter.png':'scooter.png', value==1?'rgb(252, 238, 192)':'rgb(248, 248, 248)' )} iconPosition="start" label="Delivery" style={{color:value==1?"red":'grey'}}/>
          <Tab icon={iconStyle(value==2?'colorbottle.png':'diningbottle.png', value==2?'rgb(237, 244, 255)':'rgb(248, 248, 248)')} iconPosition="start" label="Nightlife" style={{color:value==2?"red":'grey'}}/>
        </Tabs>

        </div>
        </div>
        )
      }  

    return(<div style={{height:'100%'}}>
      <DiningHeader />
      {tabStyle()}
      <div>
        {value==0?<RestaurantList city={params} />:<></>}
        {value==1?<DeliveryList  city={params} />:<></>}
      </div>
    </div>) 
}