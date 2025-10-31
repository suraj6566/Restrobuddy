import { Card,Grid2,FormControl,TextField,FormLabel, Button } from "@mui/material"
import { useStyles } from "./LoginAdminCss"
import restrologo from "../../../assets/restrologo.png"
import {postData} from "../../../services/FetchNodeServices"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
export default function LoginAdmin(){
    const classes = useStyles()
    const [id,setId]=useState()
    const [password,setPassword]=useState()
    const navigate=useNavigate()
    const handleSubmit = async() => {
        var body = { id, password };
        var res = await postData('admin/chk_admin_login', body);
        
       /* console.log("API Response:", res); // <-- Check response here*/
    
        if(res.status) {
            navigate("/admindashboard");
            localStorage.setItem('ADMIN',JSON.stringify(res.data))
        } else {
            Swal.fire({
                icon: "error",
                title: res.message || "Invalid credentials",
                showConfirmButton: false,
                timer: 3000,
                toast: true,
               
            });
        }
    };
    
    
    return(<div className={classes.root}>
        <Card sx={{ maxWidth:345 , padding:3 }}>
           <Grid2 container spacing={2}>
            <Grid2>
                <img src={restrologo} style={{width:80}}/>
            </Grid2>
            <Grid2 size={12}>
             Restro Buddy
            </Grid2>
            <Grid2 size={12}>
                <div style={{fontSize:34}}>
                    Sign in
                </div>
            </Grid2>
            <Grid2 size={12}>
            <FormControl fullWidth>
              <FormLabel>Email</FormLabel>
              <TextField
                placeholder="your@email.com"
                autoFocus
                fullWidth
                onChange={(e)=>setId(e.target.value)}
                variant="outlined"
               />
            </FormControl>
            </Grid2>

            <Grid2 size={12}>
            <FormControl fullWidth>
              <FormLabel>Password</FormLabel>
              <TextField
                autoFocus
                fullWidth
                onChange={(e)=>setPassword(e.target.value)}
                variant="outlined"
                type="password"
               />
            </FormControl>
            </Grid2>
            
            <Grid2 size={12}>
                <Button fullWidth style={{color:"#fff",background:"#000"}} variant="contained" onClick={handleSubmit}>Sign in</Button>
            </Grid2>


           </Grid2>
        </Card>

    </div>)
}