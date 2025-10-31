import { serverURL } from "../../../services/FetchNodeServices"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { useRef } from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
export default function FoodCircleComponent({data})
{   const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    const sliderRef=useRef();
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows:'false'
      };
    const showFoodList=()=>{
        return data.map((item)=>{
            return(<div style={{display:'flex',flexDirection:'column',padding:5,margin:5,justifyContent:"center",alignItems:'center',flexWrap:'wrap'}} >
                <div style={{display:'flex',justifyContent:'center',width:'100'}}>
                <img src={`${serverURL}/images/${item.img}`} style={{objectFit:'cover',width:'80%',height:"80%",borderRadius:'50%',opacity:1}} />
                </div>
                <div style={{
                    color:'rgb(54, 54, 54)',
                    fontSize:'1.4vw',
                    lineHeight:'2.2rem',
                    fontWeight:'500',
                    textAlign:'center',
                    width:'100%',
                    overflow:"hidden",
                    textOverflow:'ellipsis',
                    whiteSpace:'nowrap'

                }}>
                    {item.title}
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
    return(<div style={{position:'relative', display:"flex",justifyContent:"center",width:'100%',height:'25%',alignItems:"center",background:'rgb(248, 248, 248)',flexDirection:"column",paddingTop:"3%",paddingBottom:"3%"}}>
    <div style={{color:"rgb(28, 28, 28)",
        fontSize:'2vw',
        lineHeight:1.2,
        fontWeight: matches?'bold':500 ,
        margin: '0px 0px 2rem',width:'77%'
    }}>
        Inspiration for your first order
    </div>
    {matches?<></>:<div onClick={handleLeft} style={{cursor:'pointer',position:'absolute',left:'10.6%',zIndex:2,top:'50%', boxShadow:'1.5px 1.5px 1.5px grey' ,height:34,width:34,borderRadius:17,background:'#ffffff',display:"flex",alignItems:'center',justifyContent:'center'}}>
        <KeyboardArrowLeftOutlinedIcon />
    </div>}
    <div style={{width:'80%'}}>
    <Slider {...settings} ref={sliderRef}>
    {showFoodList()}
    </Slider>
    </div>
   {matches?<></>:<div onClick={handleRight} style={{cursor:'pointer',position:'absolute',right:'10.6%',zIndex:2,top:'50%', boxShadow:'1.5px 1.5px 1.5px grey' ,height:34,width:34,borderRadius:17,background:'#ffffff',display:"flex",alignItems:'center',justifyContent:'center'}}>
        <KeyboardArrowRightOutlinedIcon />
    </div>}

    </div>)
}