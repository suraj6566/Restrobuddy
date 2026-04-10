import { Paper } from "@mui/material"
import { serverURL } from "../../../services/FetchNodeServices"
import { useState } from "react"
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
export default function DiningOnlineImage({item})
{const [getScale,setScale]=useState('scale(1)')
   var theme=useTheme()
   var navigate=useNavigate()
   const matches = useMediaQuery(theme.breakpoints.down('sm'));
   
    
     
    
            return(<Paper onClick={()=>navigate(item.url)} onMouseLeave={()=>setScale('scale(1)')} onMouseOver={()=> setScale('scale(1.04)')} style={{transition: '0.35s ease' , transform:getScale,width:matches?'92%':'min(100%, 565px)',height:matches?248:300,display:'flex',flexDirection:'column',cursor:'pointer', borderRadius:24,margin:0,overflow:'hidden',boxShadow:'0 10px 24px rgba(15,23,42,0.10)'}}>
               <div>
                <img src={`${serverURL}/images/${item.image}`} style={{objectFit:'cover',width:'100%', height:matches?145:188,borderTopRightRadius:24,borderTopLeftRadius:24}}/>
               </div>
               <div style={{marginTop:18,fontSize:matches?26:24,fontWeight:700, marginLeft:24, marginRight:24,lineHeight:1.15}}>
                {item.title}
               </div>
               <div style={{marginTop:10,fontSize:matches?17:16,fontWeight:500, marginLeft:24, marginRight:24,color:'grey',lineHeight:1.35}}>
                {item.description}
               </div>
            </Paper>)

      
    
}
