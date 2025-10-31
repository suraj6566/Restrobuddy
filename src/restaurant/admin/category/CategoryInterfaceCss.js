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
      width:600,
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
    display_box:
    {
      width:1000,
      height:'auto',
      border:'0.5px solid #576574',
      borderRadius:10,
      padding:10,
      margin:5
    },
    pic_styale:
    {
      width:40,
      height:40,
      borderRadius:8,
    }
}));
export {useStyles}
