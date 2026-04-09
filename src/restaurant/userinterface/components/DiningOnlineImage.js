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
   
    
     
    

            return(<Paper onClick={()=>navigate(item.url)} onMouseLeave={()=>setScale('scale(1)')} onMouseOver={()=> setScale('scale(1.05)')} style={{transition: '0.5s ease' , transform:getScale,width:'35%',height:matches?155:250,display:'flex',flexDirection:'column',cursor:'pointer', borderRadius:20,margin:20}}>
               <div>
                <img src={`${serverURL}/images/${item.image}`} style={{objectFit:'cover',width:'100%', height:matches?100:155,borderTopRightRadius:20,borderTopLeftRadius:20}}/>
               </div>
               <div style={{marginTop:10,fontSize:'1.5vw',fontWeight:700, marginLeft:20}}>
                {item.title}
               </div>
               <div style={{marginTop:10,fontSize:'1.4vw',fontWeight:500, marginLeft:20,color:'grey'}}>
                {item.description}
               </div>
            </Paper>)

      
    
}