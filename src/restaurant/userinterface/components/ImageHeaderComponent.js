import food from "../../../assets/restt.jpg"
import Header from "./Header"
import SearchBarComponent from "./SearchBarComponent"
import logo from "../../../assets/footerlogo.png"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
export default function ImageHeaderComponent()
{
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    return(<div style={{width:'100%',position:'relative'}}>
        <img src={food} style={{objectFit:'cover',width:'100%',height:'50%'}} />
       <div style={{position:'absolute',left:0,top:0,width:'100%'}}>
         <Header />
        </div>
       <div style={{position:'absolute',left:'38%',top:'6%', marginTop:'100px'}}>
          <img src={logo} style={{objectFit:'contain',maxWidth:matches?'50%':'100%'}} /> 
        </div>
         <div style={{position:'absolute',left:'28%',top:'23%',color:'#fff',letterSpacing:0.5,fontSize:34,fontWeight:500, marginTop:'100px'}}>
            Discover the best food & drinks in Gwalior
        </div>

        <div style={{position:'absolute',left:'25%',top:'30%',width:'50%', marginTop:'100px'}}>
            <SearchBarComponent/>
        </div>
    </div>)
}