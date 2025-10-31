import { serverURL } from "../../../services/FetchNodeServices"
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
export default function OrderOnlineFoodList({data}){

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    const showList=()=>{
        return data.map((item)=>{ 
        return(
        <div style={{display:'flex',marginTop:matches?5:10,marginLeft:matches?0:10,width:matches?350:500,height:'auto',marginBottom:matches?5:35}}>
           <div style={{marginLeft:10,height:125,width:130,borderRadius:10}}>
            <img src={`${serverURL}/images/${item.icon}`} style={{objectFit:"cover",borderRadius:10,height:matches?"60%":'100%',width:matches?"60%":'100%'}} />
           </div>

           <div>
           <div style={{fontWeight:550,fontSize:matches?13:18,marginLeft:matches?0:20}}>{item.foodname}</div>
           <div style={{fontWeight:370,fontSize:matches?12:15,marginLeft:matches?0:20,marginTop:5,marginBottom:5}}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <CurrencyRupeeIcon style={{ fontSize: matches?13:15, color:"#2d3436"}} />
            <span style={{ fontSize: matches?12:16 }}>{item.price}</span>
           </div>
           </div>
           <div style={{fontWeight:100,fontSize:matches?13:15,marginLeft:matches?0:20}}>{item.ingredients}</div>
           </div>
           </div>
            )
          })
    }
    return(<div>
        <div style={{fontWeight:550,fontSize:matches?12:22,marginLeft:21,marginBottom:15}}>Sweets</div>
        <div style={{fontWeight:500,fontSize:matches?10:16,marginLeft:20,color:'grey',marginBottom:25}}>Special Sweets</div>
        {showList()}
    </div>)
}