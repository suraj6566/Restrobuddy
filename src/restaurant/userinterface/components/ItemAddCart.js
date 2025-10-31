import { DialogContent,Dialog,DialogActions, Button } from "@mui/material"
import veg from '../../assets/veg.webp'
import close from '../../assets/cancel.png'
import Checkbox from '@mui/material/Checkbox';
import { useState } from "react";
export default function ItemAddCart(){
    const [checked,setChecked]=useState('')
    const [open,setOpen]=useState(false)
   const handleOpenDialog=()=>{
        setOpen(true)
    }
    const handleCloseDialog=()=>{
        setOpen(false)
    }
 const handleChange = (event) => {
    setChecked(event.target.checked);
  };
    return(<div>
        <Button style={{background:'pink'}} onClick={handleOpenDialog}>Add Button</Button>
    
    <Dialog open={open}  style={{padding:0}} PaperProps={{ sx: { borderRadius: "20px",width:'100%' } }} onClose={handleCloseDialog} >

    <DialogContent style={{display:'flex',justifyContent:'center',alignItems:'center',margin:0,padding:0}}>
               <div style={{display:'flex',flexDirection:'column',borderRadius:20,border:'1px solid #dcdcdc',width:'100%',background:'#f5f6fa'}} >




<div style={{  minHeight:'75px',borderBottom: '1px solid', borderColor:'divider'}} 
>

<div style={{display: 'flex', alignItems: 'center'}}>
<div style={{marginLeft:13,marginTop:20,fontSize:'14px',fontWeight:500,color:'grey'}}>
 Butter Masala Dosa • ₹215
</div>
  <img src={close} onClick={handleCloseDialog} style={{width:25,height:25,background:'#fff',borderRadius:'50%',marginLeft:'auto',boxShadow:'5px 5px 5px -8px ',cursor:'pointer',marginRight:10}} />
</div>

<div style={{marginLeft:13,marginTop:2,fontSize:'18px',fontWeight:800,color:'#000'}}>
    Customise as per your taste
</div>

</div>

<div style={{marginLeft:13,marginTop:8,marginBottom:5,fontSize:'16px',fontWeight:600,color:'#000'}}>
Quantity
</div>

<div style={{width:'100%',height:'auto',display:'flex',justifyContent:'center',flexDirection:'column',marginBottom:10,alignItems:'center'}}>

<div style={{display:'flex',flexDirection:'row', width: '90%',background:'#fff'}}>

<div style={{marginLeft:15,marginTop:10}}> 
   <img src={veg} style={{width:20,height:20}} />
</div>

<div style={{marginLeft:15,marginTop:10}}>
    Half
    </div>

<div style={{marginLeft:'auto'}} >
    <Checkbox checked={checked} onChange={handleChange} />
    </div>

</div>

<div style={{display:'flex',flexDirection:'row', width: '90%',background:'#fff'}}>

<div style={{marginLeft:15,marginTop:10}}> 
   <img src={veg} style={{width:20,height:20}} />
</div>

<div style={{marginLeft:15,marginTop:10}}>
  Medium
    </div>



  

<div style={{marginLeft:'auto'}}>
       ₹50 <Checkbox checked={checked} onChange={handleChange} />
    </div>

</div>

<div style={{display:'flex',flexDirection:'row', width: '90%',background:'#fff'}}>

<div style={{marginLeft:15,marginTop:10}}> 
   <img src={veg} style={{width:20,height:20}} />
</div>

<div style={{marginLeft:15,marginTop:10}}>
   Full
    </div>

    
   

<div style={{marginLeft:'auto'}}>
  ₹50  <Checkbox checked={checked}  onChange={handleChange} />
    </div>

</div>

</div>

<div style={{marginTop:30}}>

<div style={{display: 'flex', alignItems: 'center',justifyContent:'center'}}>

<div style={{marginLeft:13,fontSize:'18px',fontWeight:800,color:'black'}}>
₹215.00
</div>

<Button  style={{background:'green',color:'#fff',marginLeft:'auto',width:'50%'}}>Add Item to cart</Button>
</div>

<div style={{marginLeft:13,marginTop:2,fontSize:'14px',fontWeight:700,color:'red',marginBottom:10}}>
    View Customized Item
</div>

</div>


    </div>
    </DialogContent>
  
    </Dialog>
    </div>)
}



