import logo from "../../assets/logo.png"
import Report from "../../assets/Report.png"
import { useNavigate } from "react-router-dom"
export default function TitleBar({title,url})
{   const navigate=useNavigate()
    return(<div style={{width:'98.6%',background:'#dcdde1',borderRadius:10, height:60, display:'flex', padding:5, marginBottom:10}}>
     <div style={{display:'flex',alignItems:'center',flexDirection:'column'}}>

        <div style={{display:'flex',alignItems:'center'}}>
            <img src={logo} style={{width:30,height:30}} />
            <div style={{marginLeft:10,fontSize:24}}>
                RestroBuddy
            </div>
        </div>

        <div style={{background:'#fff',width:'100%', height:30,borderRadius:5,color:'#636e72',justifyContent:'center',display:'flex'}}>
        {title}
        </div>
     </div>
     <div onClick={()=>navigate(url)} style={{marginLeft:'auto', marginRight:10, display:'flex', alignItems:'center',cursor:'pointer'}}>
      <img src={Report} style={{width:40,height:40}} />
     </div>

    </div>)
}