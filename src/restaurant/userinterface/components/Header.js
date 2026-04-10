import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

export default function Header({ onLoginClick, onSignupClick }) {
    return (
        <div style={{
            color: '#fff',
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '14px 18px'
        }}>
            <div style={{
                width: '100%',
                maxWidth: 1200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 12
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap', fontSize: 15 }}>
                    <div style={{ display: 'flex', alignItems: 'center', fontSize: 13 }}>
                        <PhoneIphoneIcon fontSize="xs" /> <span style={{ marginLeft: 5 }}>Get the App</span>
                    </div>
                    <div style={{ opacity: 0.95 }}>
                        Add restaurant
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginLeft: 'auto', flexWrap: 'wrap' }}>
                    <div onClick={onLoginClick} style={{ fontSize:15, cursor:'pointer' }}>
                        <div style={{padding:'8px 18px', border:'1px solid rgba(255,255,255,0.65)', borderRadius:999, background:'rgba(255,255,255,0.08)'}}>
                        Log in
                        </div>
                    </div>
                    <div onClick={onSignupClick} style={{ fontSize:15, cursor:'pointer' }}>
                        <div style={{padding:'8px 18px', borderRadius:999, background:'#ef4f5f', boxShadow:'0 10px 25px rgba(239,79,95,0.28)'}}>
                        Sign up
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
