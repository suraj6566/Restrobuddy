import { serverURL } from "../../../services/FetchNodeServices";
import search from "../../../assets/search.png"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function RestaurantDetailsSearchBar()
{
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  return(<div style={{height:'100%',width:'100%',display:'flex',justifyContent:'center',borderBottom:'0.1px solid #ecf0f1'}}>

     <div style={{height:'80%',width:'80%',display:'flex', justifyContent:'center',padding:10}}>
      <div>
    <img src={`${serverURL}/images/headerlogo.png`} style={{width:matches?100:135,height:matches?"85%":55,marginRight:matches?110:40}} />
      </div>

  {matches?<></>:<div style={{height:matches?45:52,width:matches?"60%":700,borderRadius:10,display:'flex',alignItems:'center',boxShadow:" 0px 2px 6px 1px rgba(0, 0, 0, 0.1)"}}> 
      <div style={{padding:"3px 5px 0px 10px"}}>
     <img src={`${serverURL}/images/gps.png`} style={{maxWidth:matches?12:16}} /> 
      </div>
     <div>
      { matches?<></>: <input type="text" style={{marginLeft:5,width:matches?<></>:160,height:30,fontSize:14,color:'grey',outline:'none',border:0}} /> }
       </div>
       <div>
        <div style={{width:0,height:20,border:'0.5px solid #dcdcdc'}}></div>
       </div>
       <div>
        <img src={`${serverURL}/images/search.png`} style={{width:25,padding:'14px 10px 10px 12px'}} />
       </div>
       <div>
        <input type="text" placeholder="Search for restaurant, Cuisine or a dish" style={{width:matches?'100%':'150%',height:25,fontSize:14,border:0,outline:'none',letterSpacing:0.5,}} />
       </div>
    </div> }

    <div style={{marginLeft:75,fontSize:matches?14:18,letterSpacing:0.5,color:'rgb(105, 105, 105)',marginTop:matches?12:14,lineHeight:'1.5',cursor:'pointer',fontWeight:350}}>
        Log in
    </div>
    <div style={{marginLeft:30,fontSize:matches?14:18,letterSpacing:0.5,color:'rgb(105, 105, 105)',marginTop:matches?12:14,lineHeight:'1.5',cursor:'pointer',fontWeight:350}}>
        Sign up
    </div>

    </div>

  </div>)
}