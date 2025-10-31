import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useRef } from "react";
import { serverURL } from "../../../services/FetchNodeServices"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

export default function BrandCircleComponent({data}){
    var theme=useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const sliderRef=useRef()
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows:false,

      };
      const showBrandList=()=>{
        return data.map((item)=>{
            return(<div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',padding:5,margin:5}}>

<div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100%'}}>
    <img src={`${serverURL}/images/${item.filelogo}`}  style={{objectFit:'cover',boxShadow:'1px 0px 1px 1px #dcdcdc',width:matches?'75%':'75%',height:matches?50:150,borderRadius:"50%"}}/>
</div>

<div style={{color:'rgb(54,54,54)',fontSize:matches?'2vw':'1.2vw',lineHeight:matches?'1.4rem':'2.2rem',fontWeight:matches?'bold':500,textAlign:'center',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',width:'100%'}}>
    {item.restaurantname}
</div>

<div style={{color:'rgb(28, 28, 28)',fontSize:matches?'1.5vw':'0.9vw',lineHeight:matches?'0.5rem':'1.2rem',fontWeight:matches?'bold':400,textAlign:'center',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',width:'100%'}}>
    {item.time}
</div>

            </div>)
        })

      }
      const handleRight=()=>{
        sliderRef.current.slickNext()
      }
      const handleLeft=()=>{
        sliderRef.current.slickPrev()
    }

return (<div style={{position:'relative',width:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',height:'25%',paddingTop:'3%',paddingBottom:'3%'}}>
   <div style={{color:'rgb(28, 28, 28)',
    fontSize: matches?'2.5vw':'2vw',
    lineHeight: 1.2,
    fontWeight:matches?'bold':500,
    margin: '0px 0px 1.8rem',width:'77%'}}>
Top Brands For You
   </div>
   
   {matches ?<></>: 
<div onClick={handleLeft} style={{cursor:'pointer',left:'10.5%',top:'46%',zIndex:2,position:'absolute',boxShadow:'2px 2px 2px grey',width:34,height:34,borderRadius:17,background:'#fff',display:'flex',justifyContent:'center',alignItems:'center'}}>
<KeyboardArrowLeftIcon />
</div>
}

    <div style={{width:'80%'}}>
    <Slider {...settings} ref={sliderRef}> 
    {showBrandList()}
    </Slider>
    </div>
    {matches?<></>:
    <div onClick={handleRight} style={{cursor:'pointer',right:'10.5%',top:'46%',zIndex:2,position:'absolute',boxShadow:'2px 2px 2px grey',width:34,height:34,borderRadius:17,background:'#fff',display:'flex',justifyContent:'center',alignItems:'center'}}>
<KeyboardArrowRightIcon />
</div>
}
</div>)

}