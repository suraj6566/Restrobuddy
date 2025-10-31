import { Paper } from "@mui/material"
import gps from "../../../assets/gps.png"
import search from "../../../assets/search.png"
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
export default function RestroSearchBar({screen}){
    var theme = useTheme();
    var user=useSelector((state)=>state.user)
   
    const matches = useMediaQuery(theme.breakpoints.down("md"));
const searchBar=()=>{
   
    return(
        <div style={{padding:10,width:matches?'70%':'60%',height:32,borderRadius:5,border:'1px solid #dcdcdc',display:'flex',alignItems:'center',background:'#fff',boxShadow:'0px 0px 8px #ddd',borderRadius:10}}>
       <div>
        <img src={gps} style={{objectFit:'contain',maxWidth:'2rem'}}/>
        </div>
        <div>
            <input type="text" style={{width:'10vw', height:30,fontSize:14,color:'grey',outline:'none',border:0}}/>
        </div>
        <div style={{width:0.1,height:28,border:'0.5px solid #dcdcdc'}}></div>

        <div>
            <img src={search} style={{objectFit:'contain',maxWidth:'1.4rem',marginLeft:'2vw',marginTop:'0.3vw'}}/>
        </div>

        <div style={{width:'100%'}}>
        <input type="text"  placeholder='Search for restaurant cuisine or a dish' style={{ marginLeft:'1vw',width:'90%',height:30,fontSize:14,color:'grey',outline:'none',border:0}}/>
        </div>
    </div>
    )
}  

return(<div>
<div style={{display:'flex',width:'100%',marginTop:10,flexGrow: 1,marginBottom:5}}>
       <div style={{display:'flex',width:'75%',justifyContent:'space-between'}}>
        <span style={{marginLeft:'14%',fontSize:28,fontWeight:'900',marginTop:10}}>RestroBuddy</span>
        
         {screen=='ViewCart'?<></>:matches?<></>:searchBar()}
         </div>
        <div style={{marginLeft:'5%',width:matches?'35%':'10%',display:'flex',justifyContent:'space-between',marginRight:matches?15:0,alignItems:'center',marginTop:10}}>
        {user==undefined?<>
        <span style={{color:'#828282',fontSize:18}}>Log in</span>
        <span style={{color:'#828282',fontSize:18}}>Sign up</span></>:
        <span style={{color:'#828282',fontSize:18}}>{user?.username}</span>}
        </div>

 </div>

{screen=='ViewCart'?<></>:
       <div style={{display:'flex',width:'100%',justifyContent:'center'}}>
       {matches?searchBar():<></>}
       </div>}

       {screen=='ViewCart'?<></>:<div style={{marginLeft:'4%',marginTop:'2vw'}}>
            <span  style={{marginLeft:'10vw',color:'#828282',cursor:'pointer',fontSize:12}}>Home</span>
            <span  style={{marginLeft:'0.5vw',fontSize:12,color:'#696969'}}>/</span>
            <span style={{marginLeft:'0.5vw',color:'#828282',cursor:'pointer',fontSize:12}}>India</span>
            <span  style={{marginLeft:'0.5vw',fontSize:12,color:'#696969',fontSize:12}}>/</span>
            <span style={{marginLeft:'0.5vw',color:'#9C9C9C',fontSize:12}}>Delhi NCR Restaurant</span>
            </div>}
    </div>
    
    
)
}