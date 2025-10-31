import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function ExploreComponent({data,title})
{
    var heading=Object.keys(data)

    const sublist=(item,index)=>{
        return data[item].map((items)=>{
            return(<span style={{display:'flex',width:'auto'}}>
                {index<=1?<div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'row'}}><span style={{fontSize:16,fontWeight:300,color:'grey'}}>{items} near me</span><span style={{fontSize:22,marginLeft:5,marginRight:5,paddingBottom:10}}>.</span></div>:<span style={{fontSize:16,fontWeight:300,color:'grey',marginRight:10}}>{items}</span>}            
                </span>)
        })
        
    }

    const listExplore=()=>{
        return heading.map((item,index)=>{
            return(
            <div style={{marginTop:20}}>
            <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <div style={{fontSize:20,fontFamily:'Open Sans',fontWeight:380}}>{item}</div>
            </AccordionSummary>
            <AccordionDetails style={{display:'flex'}}>
              {sublist(item,index)}
            </AccordionDetails>
          </Accordion> 
          </div>
            )
        })
    }
    return( <div style={{width:'72%',display:'flex',justifyContent:"center",flexDirection:'column',marginTop:25,marginBottom:10}}>
        <div  style={{fontSize:28,fontWeight:500,marginBottom:15}}>
            {title}
        </div>
       {listExplore()}
        </div>)
}