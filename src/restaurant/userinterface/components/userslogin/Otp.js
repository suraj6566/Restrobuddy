import close from "../../../../assets/close.png";
import { Dialog, Grid2, TextField, DialogActions, DialogTitle, DialogContent, Button } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { postData } from "../../../../services/FetchNodeServices";

export default function Otp({ setOtpOpen, otpOpen, setOtpValue, otpValue, userData, statusScreen, setStatusScreen }) {
  const [timer, setTimer] = useState(30);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [temp, setTemp] = useState([]);
  const dispatch = useDispatch();
  const inputRefs = useRef([]);

  const handleClose = () => {
    setOtpOpen(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const submitUserData = async () => {
    var response = await postData("userinterface/submit_user", userData);
    if (response.status) {
      dispatch({ type: "ADD_USER", payload: response.data });
      setOtpOpen(false);
    } else {
      alert(response.message);
    }
  };

  const handleInputChange = (index, event) => {
    const input = event.target;
    const value = input.value;

    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // move to next box automatically
      if (value !== "" && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }

      // check OTP when all digits filled
      if (newOtp.every((d) => d !== "")) {
        const input_otp = newOtp.join("");
        alert(input_otp + "," + otpValue);
        if (input_otp == otpValue) {
          alert("Otp Verified");
          if (statusScreen == "SignUp") {
            submitUserData();
          } else {
            dispatch({ type: "ADD_USER", payload: userData });
            setOtpOpen(false);
          }
        } else {
          alert("Invalid Otp");
        }
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', background: '#1C1C1C' }}>
      <Dialog open={otpOpen} onClose={handleClose}>
        <DialogTitle>
          <Grid2 container spacing={0}>
            <Grid2 style={{ marginBottom: 20 }} size={6}>
              <div style={{ fontSize: 30, color: 'rgb(79, 79, 79)', fontWeight: 500, marginLeft: 18, marginTop: 10, width: 280, letterSpacing: 1 }}>
                OTP Verification
              </div>
            </Grid2>
            <Grid2 size={6}>
              <img src={close} style={{ width: 20, marginLeft: '80%', padding: 10, marginTop: 12, cursor: 'pointer' }} onClick={handleClose} />
            </Grid2>
          </Grid2>
        </DialogTitle>
        <DialogContent>
          <Grid2 size={12}>
            <div style={{ color: 'rgb(105, 105, 105)', fontSize: 15, marginLeft: 100, marginTop: 18 }}>
              Check text messages for your OTP
            </div>
          </Grid2>
          <div style={{ marginLeft: 32, marginTop: 30 }}>
            {otp.map((digit, index) => (
              <TextField
                key={index}
                variant="outlined"
                value={digit}
                onChange={(event) => handleInputChange(index, event)}
                onKeyDown={(event) => handleKeyDown(index, event)}
                inputRef={(el) => (inputRefs.current[index] = el)}
                style={{ width: 50, marginRight: 18, textAlign: "center" }}
                inputProps={{ style: { textAlign: "center", fontSize: 20 } }}
              />
            ))}
          </div>
          <Grid2 size={12}>
            <h3 style={{ color: '#1C1C1C', fontSize: '30px', fontWeight: 15, marginTop: 20, display: 'flex', justifyContent: "center", alignItems: "center" }}>
              00:{timer < 10 ? `0${timer}` : timer}
            </h3>
          </Grid2>
          <Grid2 size={12} style={{ fontSize: '18px', marginLeft: '20%' }}>
            <span style={{ color: 'rgb(158,158,158)' }}> Not received OTP? </span>
            <span style={{ color: 'rgb(239, 79, 95)', cursor: 'pointer' }}>Resend Now</span>
          </Grid2>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
