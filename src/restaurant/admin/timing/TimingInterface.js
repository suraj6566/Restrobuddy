import { Grid2,TextField,FormLabel, FormControl,Button,MenuItem,Select, InputLabel} from "@mui/material";
import { useStyles } from "./TimingInterfaceCss";
import { useState } from "react";

import TitleBar from "../../components/TitleBar";

import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import swal from "sweetalert2";
import { postData } from "../../../services/FetchNodeServices";

export default function TimingInterface()
{    
    const classes = useStyles();
    var ADMIN=JSON.parse(localStorage.getItem("ADMIN"))
    const [status,setStatus]=useState(true)
    const [statusLable,setStatusLable]=useState('Open')
    const [restaurantId,setRestaurantId]=useState(ADMIN.restaurantid)
    const [timingClose,setTimingClose]=useState('')
    const [timingOpen,setTimingOpen]=useState('')
    const [openAm,setOpenAm]=useState('')
    const [closeAm,setCloseAm]=useState('')
    

    const handleSwitchChange=(event)=>{
        const isChecked=event.target.checked
        setStatus(isChecked)
        setStatusLable(isChecked? "Open" : "Close")
    }

    const handleReset=()=>{
        setRestaurantId('')
        setStatus(true)
        setTimingClose('')
        setTimingOpen('')
        setStatusLable('open')
    }
    const handleOpenChange=(event)=>{
        setOpenAm(event.target.value)
    }

    const handleCloseChange=(event)=>{
        setCloseAm(event.target.value)
    }

    const handleSubmit=async()=>{
        var body={"restaurantid":restaurantId,"status":status,"timingopen":`${timingOpen} ${openAm}`,"timingclose":`${timingClose} ${closeAm}`}
        var response=await postData('timing/submit_timing',body)

        if(response.status)
                                {
                                    swal.fire({
                                        icon: "success",
                                        title: response.message,
                                        showConfirmButton: false,
                                        timer: 3000
                                      });
                    
                                }
                                else
                                {
                                    swal.fire({
                                        icon: "error",
                                        title: response.message,
                                        showConfirmButton: false,
                                        timer: 3000
                                      });
                                }
    }

    const handleTimeChange=()=>{
        return(<div>
            <Grid2 container spacing={2}>
           <Grid2 item size={12}>
                    <div >Open Time</div>
                </Grid2>
                <Grid2 item size={6}>                  
                    <TextField onChange={(e)=> setTimingOpen(e.target.value)} value={timingOpen} label="Enter Open Time" fullWidth/>
                </Grid2>
                <Grid2 item size={6}> 
                <FormControl fullWidth>
                    <InputLabel>Select</InputLabel>
                    <Select onChange={handleOpenChange}>
                        <MenuItem value="Am">Am</MenuItem>
                        <MenuItem value="Pm">Pm</MenuItem>
                    </Select>
                    </FormControl>
                </Grid2>

                <Grid2 item size={12}>
                    <div style={{display:'flex',alignItems:'center',paddingTop:15}} >Close Time</div>
                </Grid2>
                <Grid2 item size={6}>                  
                    <TextField onChange={(e)=> setTimingClose(e.target.value)} value={timingClose} label="Enter Close Time" fullWidth/>
                    </Grid2>
                <Grid2 item size={6}>
                <FormControl fullWidth>
                    <InputLabel>Select</InputLabel>
                    <Select onChange={handleCloseChange}>
                        <MenuItem value="am">am</MenuItem>
                        <MenuItem value="pm">pm</MenuItem>
                    </Select>
                    </FormControl>
                </Grid2>
                </Grid2>
        </div>)
    }

    


    return(<div className={classes.root}>
        <div className={classes.box}>
            <TitleBar title="Add Food Timing"/>
            <Grid2 container spacing={2}>
                <Grid2 item size={12}>
                    <TextField value={restaurantId} onChange={(e)=> setRestaurantId(e.target.value)} label="Restaurant id" fullWidth/>     
                </Grid2>
                <Grid2 item size={12}>
                        <FormGroup>
                            <FormLabel>Status</FormLabel>
                            <FormControlLabel required control={<Switch checked={status} onChange={handleSwitchChange} />} label={statusLable}  />
                        </FormGroup>
                </Grid2>
                <Grid2 item size={12}>
                    {!status? <b></b> :handleTimeChange()}
                </Grid2>
                <Grid2 item size={6}>
                        <Button onClick={handleReset} fullWidth variant="contained" >Reset</Button>
                    </Grid2>
                    <Grid2 item size={6}>
                        <Button onClick={handleSubmit} fullWidth variant="contained" >Submit</Button>
                    </Grid2>


            </Grid2>
        </div>

    </div>)
}