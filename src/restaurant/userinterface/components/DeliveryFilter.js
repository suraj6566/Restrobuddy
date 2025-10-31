import { Button } from "@mui/material"
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function DeliveryFilter({data})
{
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    const showFilter=()=>{
        
        return data.map((item)=>{
            return(<Button style={{background:'#fff',border:'1px solid grey', color:'grey',letterSpacing:'1px', marginLeft:20, marginTop:30,fontWeight:50,fontSize:matches?10:12 }}>
           {item.img ? <img src={item.img} style={{width:matches?15:20,marginRight:5}}/> :"" }  {item.title}
            </Button>)
        })

    }
    return(<div style={{display:'flex',marginLeft:matches?50:165,marginBottom:20}}>
         {showFilter() }
    </div>)
}