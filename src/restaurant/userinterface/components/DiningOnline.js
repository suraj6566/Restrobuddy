import { useNavigate } from "react-router-dom"
import DiningOnlineImage from "./DiningOnlineImage"
export default function DiningOnline({data})
{   var navigate=useNavigate()
    const showList=()=>
    { return data.map((item)=>{
        return(<DiningOnlineImage item={item} />)
    })
    }

    return(<div style={{width:'100%',display:'flex',justifyContent:'center'}} >
        {showList()}
    </div>)
}