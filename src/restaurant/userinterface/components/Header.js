import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { Grid2 } from '@mui/material';

export default function Header() {
    return (
        <div style={{
            color: '#fff',
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px 0'
        }}>
            <Grid2 container spacing={2} alignItems="center" justifyContent="center">
                <Grid2 item xs={12} sm={6} md={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight:620, fontSize:13}}>
                    <PhoneIphoneIcon fontSize="xs" /> <span style={{ marginLeft: 5 }}>Get the App</span>
                </Grid2>
                <Grid2 item xs={12} sm={6} md={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize:15 }}>
                    Add restaurant
                </Grid2>
                <Grid2 item xs={12} sm={6} md={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft:10, fontSize:15 }}>
                    Log in
                </Grid2>
                <Grid2 item xs={12} sm={6} md={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft:10, fontSize:15 }}>
                    Sign up
                </Grid2>
            </Grid2>
        </div>
    );
}
