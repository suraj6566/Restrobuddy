import { grey } from "@mui/material/colors"
import gps from "../../../assets/gps.png"
import search from "../../../assets/search.png"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
export default function SearchBarComponent(){

        const theme = useTheme();
      const matches = useMediaQuery(theme.breakpoints.down('md'));

    return(<div style={{width:matches?'60%':"100%",height:matches?20:40,padding:10,borderRadius:5,border:'1px solid grey',display:'flex',alignItems:'center',background:'#fff'}}>
       <div>
        <img src={gps} style={{maxWidth:matches?25:30,objectFit:'contain'}} />
       </div>
       <div>
        <input type="text" style={{marginLeft:5,width:200,height:30,fontSize:14,color:'grey',outline:'none',border:0}} />
       </div>
       <div>
        <div style={{width:1,height:30,border:'0.5px solid #dcdcdc'}}></div>
       </div>
       <div>
        <img src={search} style={{maxWidth:25,objectFit:'contain',marginLeft:10}} />
       </div>
       <div>
        <input type="text" placeholder="Search for restaurant, Cuisine or a dish" style={{marginLeft:15,width:300,height:30,fontSize:14,color:'grey',outline:'none',border:0}} />
       </div>
    </div>)
}