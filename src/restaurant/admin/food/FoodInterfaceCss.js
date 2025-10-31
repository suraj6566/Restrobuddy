import { AutoAwesomeMosaic } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles(() => ({
    root: {
      display:'flex',
      
      alignItems:'center', 
      fontFamily:"Kanit, serif",
      justifyContent:'center'
    },
    box:
    {
      width:800,
      height:'auto',
      border:'0.5px solid #576574',
      borderRadius:10,
      padding:10,
      margin:5
    },
    center:
    {
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'column',
    },
    display_box:
    {
      width:1200,
      height:'auto',
      border:'0.5px solid #576574',
      borderRadius:10,
      padding:10,
      margin:5
    },
    errorText:
    {
      color:' #d32f2f',
      fontFamily: '\"Roboto\", \"Helvetica\", \"Arial\", sans-serif',
      fontWeight: '400',
      fontSize: '0.75rem',
      lineHeight: '1.66',
      letterSpacing: '0.03333em',
      textAlign: 'left',
      marginTop: '3px'
    },
    pic_styale:
    {
      width:40,
      height:40,
      borderRadius:8,
    }
    
}));
export {useStyles}
