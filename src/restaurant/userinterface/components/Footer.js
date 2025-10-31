import logo from "../../../assets/footerlogo.png"
import flag from "../../../assets/indiaflag.png"
import flag2 from "../../../assets/uaeflag.png"
import global from "../../../assets/globalimage.png"
import appstoreimg from "../../../assets/appstoreimage.png"
import googleplayimg from "../../../assets/googleplayimage.png"
import twitter from "../../../assets/twitter.png"
import insta from "../../../assets/insta.png"
import fb from "../../../assets/fb.png"
import youtube from "../../../assets/youtube.png"
import linkedin from "../../../assets/linkedin.png"

import { FormControl, MenuItem, Select,InputLabel,Grid2 } from "@mui/material"
export default function Footer()
{
    const showFooter=()=>{
        return(<div style={{display:"flex",width:'80%',height:'80%',marginLeft:60,}}> 
        
        <Grid2>
            <Grid2 style={{marginLeft:100,marginTop:60}}>

           <img src={logo} style={{width:160,height:70}} />
           <Grid2 style={{fontWeight:'500',marginTop:30,letterSpacing:'2px',marginLeft:12}}>ABOUT RESTROBUDDY</Grid2>
           <Grid2 style={{marginTop:10,fontWeight:100,marginLeft:12}}>Who We Are </Grid2>
           <Grid2 style={{marginTop:5,fontWeight:100,marginLeft:12}}>Blog</Grid2>
           <Grid2 style={{marginTop:5,fontWeight:100,marginLeft:12}}>Work With Us</Grid2>
           <Grid2 style={{marginTop:5,fontWeight:100,marginLeft:12}}>Investor Relations</Grid2>
           <Grid2 style={{marginTop:5,fontWeight:100,marginLeft:12}}>Report Fraud</Grid2>
           <Grid2 style={{marginTop:5,fontWeight:100,marginLeft:12}}>Press Kit</Grid2>
           <Grid2 style={{marginTop:5,fontWeight:100,marginLeft:12}}>Contact Us</Grid2> </Grid2>

        <Grid2 style={{marginLeft:400,marginTop:-240}}> 
           <Grid2 style={{fontWeight:'500',marginTop:30,letterSpacing:'2px',marginLeft:12}}>RESTROVERSE </Grid2>
           <Grid2 style={{marginTop:10,fontWeight:100,marginLeft:12}}>RestroBuddy </Grid2>
           <Grid2 style={{marginTop:5,fontWeight:100,marginLeft:12}}>Blinkit</Grid2>
           <Grid2 style={{marginTop:5,fontWeight:100,marginLeft:12}}>District</Grid2>
           <Grid2 style={{marginTop:5,fontWeight:100,marginLeft:12}}>Feeding India</Grid2>
           <Grid2 style={{marginTop:5,fontWeight:100,marginLeft:12}}>Hyperpure</Grid2>
           <Grid2 style={{marginTop:5,fontWeight:100,marginLeft:12}}>RestroBuddy Live</Grid2>
           <Grid2 style={{marginTop:5,fontWeight:100,marginLeft:12}}>Restroland</Grid2>
           <Grid2 style={{marginTop:5,fontWeight:100,marginLeft:12}}>Weather Union</Grid2>
        </Grid2>

        <Grid2 style={{marginLeft:600,marginTop:-270}}> 
           <Grid2 style={{fontWeight:'500',marginTop:30,letterSpacing:'2px',marginLeft:12}}>FOR RESTAURANTS </Grid2>
           <Grid2 style={{marginTop:10,fontWeight:100,marginLeft:12}}>Partner With Us </Grid2>
           <Grid2 style={{marginTop:5,fontWeight:100,marginLeft:12}}>Apps For You</Grid2>
        </Grid2>

        <Grid2 style={{marginLeft:880,marginTop:-110}}> 
           <Grid2 style={{fontWeight:'500',marginTop:30,letterSpacing:'2px',marginLeft:12}}>LEARNE MORE </Grid2>
           <Grid2 style={{marginTop:10,fontWeight:100,marginLeft:12}}>Privacy</Grid2>
           <Grid2 style={{marginTop:5,fontWeight:100,marginLeft:12}}>Security</Grid2>  
           <Grid2 style={{marginTop:5,fontWeight:100,marginLeft:12}}>Terms</Grid2> 
        </Grid2>

        <Grid2 style={{height:150,width:150,marginLeft:1050,marginTop:-180}}> 
        <FormControl style={{minWidth:100}} size="small"> 
            <InputLabel>India</InputLabel>
            <Select label="India" >
             <MenuItem value={1}> <img src={flag} style={{width:22,height:18,marginRight:5}}/>India</MenuItem>
             <MenuItem value={2}> <img src={flag2} style={{width:22,height:18,marginRight:5}}/>UAE</MenuItem>
            </Select>
            
        </FormControl>
        </Grid2>
        
        <Grid2 style={{height:150,width:150,marginLeft:1180,marginTop:-150}}>
        <FormControl variant="outlined" style={{ minWidth: 100}} size="small"> 
            <InputLabel>English</InputLabel>
            <Select label="language"  autoWidth>
             <MenuItem value={1}>
             <img src={global} style={{width:18,height:18,marginRight:5}}/>English
             </MenuItem>
             <MenuItem value={2}>
             <img src={global} style={{width:18,height:18,marginRight:5}}/>हिंदी</MenuItem>
            </Select>
        </FormControl>
        </Grid2>
        
        <Grid2 style={{height:150,width:150,marginLeft:1100,marginTop:-105}}>
        <Grid2 style={{fontWeight:'500',marginTop:30,letterSpacing:'2px',marginLeft:12}}>SOCIAL LINKS</Grid2>  
        </Grid2>

        <Grid2 style={{height:150,width:150,marginLeft:1110,marginTop:-115}}>
            <img src={linkedin} style={{width:20}} />
        </Grid2>

        <Grid2 style={{height:150,width:150,marginLeft:1140,marginTop:-150}}>
            <img src={insta} style={{width:20}} />
        </Grid2>
        <Grid2 style={{height:150,width:150,marginLeft:1170,marginTop:-150}}>
            <img src={twitter} style={{width:20}} />
        </Grid2>
        <Grid2 style={{height:150,width:150,marginLeft:1190,marginTop:-159}}>
            <img src={youtube} style={{width:38}} />
        </Grid2>
        <Grid2 style={{height:150,width:150,marginLeft:1226,marginTop:-143}}>
            <img src={fb} style={{width:24}} />
        </Grid2>
        <Grid2 style={{height:150,width:150,marginLeft:1110,marginTop:-95}}>
            <img src={appstoreimg} style={{width:140}} />
        </Grid2>
        <Grid2 style={{height:150,width:150,marginLeft:1110,marginTop:-90}}>
            <img src={googleplayimg} style={{width:140}} />
        </Grid2>

        <Grid2 style={{marginLeft:108,width:'97%'}}>
        <hr color="#dfe6e9"/>
        </Grid2>

        <Grid2 style={{marginLeft:110,marginTop:20,fontWeight:100,fontSize:14}}>
        By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners. 2008-2025 © RestroBuddy™ Ltd. All rights reserved.
        </Grid2>

        </Grid2> 
           
        </div>)
    }
    return(<div style={{ backgroundColor: "rgb(248, 248, 248)", minHeight: "100vh" }}>
    {showFooter()}
    </div>)
}   