import gps from "../../../assets/gps.png"
import search from "../../../assets/search.png"
import { serverURL } from "../../../services/FetchNodeServices"
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
export default function DiningSearchBarComponent(){

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

    return(
    <div>
        <div style={{display:'flex',justifyContent:'center',padding:10}}>
        <img src={`${serverURL}/images/headerlogo.png`} style={{width:matches?'18%':125,height:matches?42:48,marginRight:matches?'20%':30}}/>
    
   {matches?<></>:<div style={{width:"46%",height:30,padding:10,borderRadius:5,border:'1px solid grey',display:'flex',alignItems:'center',justifyContent:"center"}}>
       <div>
        <img src={gps} style={{maxWidth:30,objectFit:'contain'}} />
       </div>
       <div>
        <input type="text" style={{marginLeft:5,width:120,height:30,fontSize:14,color:'grey',outline:'none',border:0}} />
       </div>
       <div>
        <div style={{width:0,height:30,border:'0.5px solid #dcdcdc'}}></div>
       </div>
       <div>
        <img src={search} style={{maxWidth:25,objectFit:'contain',marginLeft:10}} />
       </div>
       <div>
        <input type="text" placeholder="Search for restaurant, Cuisine or a dish" style={{marginLeft:15,width:matches?'20%':475,height:30,fontSize:14,color:'grey',outline:'none',border:0}} />
       </div>
    </div> }
    <div style={{fontSize:18,color:'grey',marginLeft:85,marginTop:12}}>
        Log in
    </div>
    <div style={{fontSize:18,color:'grey',marginLeft:60,marginTop:12}}>
        Sign up
    </div>
    </div>
    <div style={{display:'flex',justifyContent:'center',padding:10}}>
    {matches?<div style={{width:"70%",height:matches?26:30,padding:10,borderRadius:5,border:'1px solid grey',display:'flex',alignItems:'center',justifyContent:"center"}}>
       <div>
        <img src={gps} style={{maxWidth:matches?'22%':30,objectFit:'contain'}} />
       </div>
       <div>
        <input type="text" style={{marginLeft:5,width:matches?40:120,height:matches?20:30,fontSize:14,color:'grey',outline:'none',border:0}} />
       </div>
       <div>
        <div style={{width:0,height:30,border:'0.5px solid #dcdcdc'}}></div>
       </div>
       <div>
        <img src={search} style={{maxWidth:matches?20:25,objectFit:'contain',marginLeft:10}} />
       </div>
       <div>
        <input type="text" placeholder="Search for restaurant, Cuisine or a dish" style={{marginLeft:15,width:matches?150:475,height:30,fontSize:matches?12:14,color:'grey',outline:'none',border:0}} />
       </div>
    </div>:<></> }
    </div>
    </div>

    )
}