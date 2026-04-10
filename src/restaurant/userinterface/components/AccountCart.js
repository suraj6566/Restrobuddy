import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { serverURL } from '../../../services/FetchNodeServices';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Login from './userslogin/Login';
import SignUp from "./userslogin/SignUp"
import Otp from "./userslogin/Otp"
import { useState } from 'react';

export default function AccountCart() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    
    const [loginOpen, setLoginOpen] = useState(false)
    const [signOpen, setSignOpen] = useState(false)
    const [otpOpen, setOtpOpen] = useState(false)
    const [otpValue, setOtpValue] = useState('')
    const [userData, setUserData] = useState({})
    const [statusScreen, setStatusScreen] = useState('')

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: isMobile ? '100%' : '85%',
            height: 'auto',
            padding: isMobile ? '16px' : '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: "#fff",
            boxShadow: "0 12px 30px rgba(15,23,42,0.08)",
            borderRadius: 16,
            overflow: 'hidden',
            boxSizing: 'border-box'
        }}>
            {/* Icon Box */}
            <div style={{
                position: 'absolute',
                top: isMobile ? '20%' : '28%',
                left: isMobile ? '12px' : '12px',
                backgroundColor: '#fff',
                width: isMobile ? 36 : 42,
                height: isMobile ? 36 : 42,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 12,
                boxShadow: '0 8px 18px rgba(15,23,42,0.12)'
            }}>
                <PersonOutlineIcon style={{ fontSize: isMobile ? 22 : 28, color: '#000' }} />
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, width: '100%' }}>
                {/* Header Text */}
                <div style={{ marginBottom: isMobile ? '12px' : '15px', marginLeft: isMobile ? '50px' : '60px', width: 'auto' }}>
                    <div style={{ fontWeight: "bold", fontSize: isMobile ? "18px" : "20px", marginTop: isMobile ? 10 : 15 }}>
                        Account
                    </div>
                    <div style={{
                        fontSize: isMobile ? "13px" : "16px",
                        color: 'rgba(2,6,12,.6)',
                        fontWeight: 530,
                        marginTop: 4,
                        lineHeight: 1.4
                    }}>
                        {isMobile ? "Login or Sign up to place order" : "To place your order now, log in to your existing account or sign up."}
                    </div>
                </div>

                {/* Buttons Section */}
                <div style={{
                    display: "flex",
                    gap: isMobile ? "10px" : "20px",
                    height: 'auto',
                    marginTop: isMobile ? '6%' : '8%',
                    marginLeft: isMobile ? '50px' : '60px',
                    flexWrap: 'wrap',
                    flexDirection: isMobile ? 'row' : 'row',
                    alignItems: 'center',
                    maxWidth: '100%'
                }}>
                    {/* Login Button */}
                    <div onClick={() => setLoginOpen(true)} style={{
                        border: "1px solid #ef4f5f",
                        borderRadius: 8,
                        textAlign: "center",
                        cursor: "pointer",
                        width: isMobile ? '100px' : '150px',
                        padding: isMobile ? '6px 4px' : '10px 8px',
                        transition: 'all 0.2s ease',
                        backgroundColor: '#fff'
                    }}>
                        <div style={{
                            color: "#ef4f5f",
                            fontSize: isMobile ? "9px" : "12px",
                            fontWeight: 550
                        }}>
                            Have an account?
                        </div>
                        <div style={{
                            fontWeight: "bold",
                            color: "#ef4f5f",
                            fontSize: isMobile ? "11px" : "14px"
                        }}>
                            LOG IN
                        </div>
                    </div>

                    {/* Sign Up Button */}
                    <div onClick={() => setSignOpen(true)} style={{
                        backgroundColor: "#ef4f5f",
                        textAlign: "center",
                        color: "#fff",
                        cursor: "pointer",
                        width: isMobile ? '100px' : '150px',
                        padding: isMobile ? '6px 4px' : '10px 8px',
                        borderRadius: 8,
                        boxShadow: '0 12px 24px rgba(239,79,95,0.20)',
                        transition: 'all 0.2s ease'
                    }}>
                        <div style={{
                            fontSize: isMobile ? "9px" : "12px",
                            fontWeight: 550
                        }}>
                            New here?
                        </div>
                        <div style={{
                            fontWeight: "bold",
                            fontSize: isMobile ? "11px" : "14px"
                        }}>
                            SIGN UP
                        </div>
                    </div>
                </div>
            </div>

            {/* Image Section - Hide on mobile, show on larger screens */}
            {!isMobile && (
                <div style={{ marginLeft: '8%', marginTop: '2%', flexShrink: 0 }}>
                    <img
                        src={`${serverURL}/images/foodpic.png`}
                        style={{ width: "130px", height: "auto" }}
                        alt="food"
                    />
                </div>
            )}

            {/* Modals */}
            <div>
                <Login
                    setOtpOpen={setOtpOpen}
                    otpOpen={otpOpen}
                    loginOpen={loginOpen}
                    setLoginOpen={setLoginOpen}
                    setOtpValue={setOtpValue}
                    otpValue={otpValue}
                    userData={userData}
                    setUserData={setUserData}
                    setStatusScreen={setStatusScreen}
                    statusScreen={statusScreen}
                />
                <SignUp
                    setOtpOpen={setOtpOpen}
                    otpOpen={otpOpen}
                    signOpen={signOpen}
                    setSignOpen={setSignOpen}
                    setOtpValue={setOtpValue}
                    otpValue={otpValue}
                    userData={userData}
                    setUserData={setUserData}
                    setStatusScreen={setStatusScreen}
                    statusScreen={statusScreen}
                />
                <Otp
                    setOtpOpen={setOtpOpen}
                    otpOpen={otpOpen}
                    setOtpValue={setOtpValue}
                    otpValue={otpValue}
                    userData={userData}
                    setUserData={setUserData}
                    setStatusScreen={setStatusScreen}
                    statusScreen={statusScreen}
                />
            </div>
        </div>
    );
}