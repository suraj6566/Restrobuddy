import { Paper } from "@mui/material"
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
export default function PopularRestaurant({data,title}){
    
    const showList=()=>{
        return data.map((item)=>{
            return(<Paper style={{height:'auto',width:320,padding:15,margin:10,display:'flex'}}>
               <div>
               <div style={{fontSize:18}}>{item.restaurantname}</div> 
               <div style={{fontSize:14,color:'grey',marginTop:5}}>{item.address}</div>
               </div>
               <div style={{alignSelf:'center',marginLeft:"auto"}}>
                <KeyboardArrowRightOutlinedIcon style={{fontSize:16,fontWeight:100}} />
               </div>
            </Paper>)
        })
    }
    return(
    <div style={{display:'flex',justifyContent:'center',alignItems:'center', flexDirection:'column',width:'100%'}}>
    <div style={{width:'72%',marginLeft:10,marginTop:10,marginBottom:10,fontSize:28,fontWeight:500}}>
        {title}
    </div>
    <div style={{display:'flex',flexWrap:'wrap',width:'84%',justifyContent:'center'}}>
        {showList()}
    </div>
    </div>
    )
}