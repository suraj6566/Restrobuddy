import { Button } from "@mui/material";
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useState } from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function({allphotos, foodphotos, ambience}){

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  

  const [list,setList]=useState(allphotos)
  const [activeTab,setActiveTab]=useState("All")

  const showphotos=()=>{

    return(<div style={{display:'flex',marginLeft:matches?72:200,marginTop:5}}>
      <div>
      <div style={{fontWeight:500,fontSize:matches?14:22}}>
      Param Food Complex Photos
      </div> 
      <div style={{marginTop:20}}>
      <Button onClick={()=> {setList(allphotos); setActiveTab("All")} } variant="outlined" sx={{textTransform:'none',border:'1px solid grey',borderRadius:1,fontSize:matches?12:14,fontWeight:100,
        
        background: activeTab === "All" ? "#ee5253" : "white",
        color: activeTab === "All" ? "white" : "gray" ,
        ":hover": activeTab === "All" ? {background:'red'} : { border: '1px solid red', color: 'red' }
      }}
      > All (6) </Button>

<Button onClick={()=> {setList(foodphotos); setActiveTab("Food")} } variant="outlined" sx={{textTransform:'none',marginLeft:2, border:'1px solid grey',color:'gray',borderRadius:1,fontSize:matches?12:14,fontWeight:100,
        background: activeTab === "Food" ? "#ee5253" : "white",
        color: activeTab === "Food" ? "white" : "gray" ,
        ":hover": activeTab === "Food" ? {background:'red'} : { border: '1px solid red', color: 'red' }

         
      }}
      > Food (6) </Button>

<Button onClick={()=> {setList(ambience); setActiveTab("Ambience") } } variant="outlined" sx={{textTransform:'none',marginLeft:2,border:'1px solid grey',color:'gray',borderRadius:1,fontSize:matches?12:14,fontWeight:100,
        ":hover": {border:'1px solid red',color:'red'},
        background: activeTab === "Ambience" ? "#ee5253" : "white",
        color: activeTab === "Ambience" ? "white" : "gray" ,
        ":hover": activeTab === "Ambience" ? {background:'red'} : { border: '1px solid red', color: 'red' }

       
      }}
      > Ambience (6) </Button>

      </div>

    <ImageList sx={{ width: matches?400:1115, height: matches?'auto':'auto' , overflow: 'hidden' ,marginTop:matches?3:5  }} cols={matches?4:5} rowHeight={matches?110:210} gap={matches?8:12}>
    {list.map((item) => (
      <ImageListItem key={item.img}
      >
        <img
          srcSet={`${item.img}`}
          src={`${item.img}`}
          loading="lazy"
          style={{height:180,borderRadius:10}}
        />
      </ImageListItem>
    ))}
  </ImageList>
  
      </div> 
  </div>)
  }

  return(<div>
    {showphotos()}
  </div>)
}