export default function RestaurantCategory({data})
{
    const showCategory=()=>{
        return data.map((item)=>{
            return(<div style={{display:'flex',alignSelf:'center',cursor:'pointer'}}>
                <div style={{display:"flex",width:45,flexDirection:'column'}} >
                
                <img src={item.img}/> </div>
                <div style={{letterSpacing:'1px',marginLeft:'10px',marginRight:90,marginTop:13,color:'rgb(105, 105, 105)',fontSize:18}}>
                {item.Title} </div>
            </div>)
        })
    }
    return(<div style={{display:"flex",flexWrap:'wrap',marginTop:50,marginLeft:250,}}>
    {showCategory()}
    </div>)
}