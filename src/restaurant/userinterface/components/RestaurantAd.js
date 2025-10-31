import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function RestaurantAd({data})
{   
    
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

    const showAd=()=>{
    return data.map((item)=>{
        return(<div>
        <div style={{marginTop:45,display:'flex',justifyContent:"center",alignItems:'center'}}>
            <img src={item.img} style={{width:matches?'78%':'75%',marginLeft:20}} />
            </div>
            </div>
            
            )
    })
}
    return(<div>
        {
        showAd()
        }
    </div>)
}