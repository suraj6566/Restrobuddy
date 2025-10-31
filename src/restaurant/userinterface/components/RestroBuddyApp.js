import { Button, TextField } from "@mui/material"
import { useState } from "react";
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import playstore from "../../../assets/playstore.jpeg"
import applestore from "../../../assets/appstore.jpeg"
import phone from "../../../assets/app image.avif"
export default function RestroBuddyApp({data}){
    const [status, setStatus] = useState('email')

    const handleStatusChange = (event) => {
        setStatus(event.target.value)
      }


    const showList=()=>
        { 

return(<div  style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center',background:'#fffbf7'}}>

<div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>

<div style={{width:'50%',height:541,display:'flex',justifyContent:'center',alignItems:'center'}}>
    <img src={phone} alt="Phone" style={{marginLeft:320,width:'50%',height:'auto'}} />
</div>


<div style={{width:'50%',height:541,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
   
    <div style={{ alignSelf: "flex-start",fontSize:38,fontWeight:500,marginTop:-60,marginBottom:15}}>
    Get the RestroBuddy app
    </div>

    <div style={{marginRight:'auto',marginBottom:15}}>
    We will send you a link, open it on your phone to download the app
    </div>

<div style={{marginRight:'auto',marginBottom:15}}>
<RadioGroup
        row
        defaultValue='email'
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={handleStatusChange}
      >
        <FormControlLabel value="email" control={<Radio />} label="Email" />
        <FormControlLabel value="phone" control={<Radio />} label="Phone" />
      </RadioGroup>
</div>

<div style={{marginRight:'auto',marginBottom:15,display:'flex'}} >
  {status =='email'?(  <TextField variant='outlined' style={{width:320,background:'#fff',fontSize:16}} label="Email"  />):( <div style={{width:298,borderRadius:5,border:'1px solid grey',display:'flex',padding:10,alignItems:'center',background:'#fff'}}>
      
      <div >
<select style={{border:'0px',fontSize:15,border:'none',outline:'none'}}>
 <option>+91</option>
 <option>+44</option>
 <option>+43</option>
 <option>+46</option>
</select>
       </div>
       <div>
         <div style={{width:0.1,height:20,border:'0.5px solid #dcdcdc',marginLeft:15}}></div>  
       </div>
       
       <div > 
           <input type="text"  style={{marginLeft:15,width:230,height:30,fontSize:14,color:'grey',border:0,outline:'none',marginLeft:5}} />
       </div>
   </div>)}   
  <Button variant='outlined' style={{backgroundColor:'red',height:56 ,width:150,color:'#fff',marginLeft:6}}>Share App Link</Button>
</div>

<div style={{marginRight:'auto',color:'grey'}}>
Download app from
<div style={{}}>
    <img src={playstore} style={{width:'25%',padding:1,marginTop:15}}/> 
    <img src={applestore} style={{width:'25%',padding:1}}/> 
</div>
</div>
   
    </div>

    </div>
</div>)
           
        }

        return(<div style={{width:'100%',justifyContent:'center',display:"flex",flexDirection:'column',alignItems:'center'}}>
               <div style={{display:"flex",flexWrap:'wrap',width:"100%"}}>
            {showList()}
            </div>
        </div>)
}