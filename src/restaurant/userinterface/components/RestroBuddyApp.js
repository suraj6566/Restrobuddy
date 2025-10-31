import { Button, TextField } from "@mui/material";
import { useState } from "react";
import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import playstore from "../../../assets/playstore.jpeg";
import applestore from "../../../assets/appstore.jpeg";
import phone from "../../../assets/app image.avif";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function RestroBuddyApp() {
  const [status, setStatus] = useState("email");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#fffbf7",
        padding: isMobile ? "30px 10px" : "60px 20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: isMobile ? "40px" : "0",
        }}
      >
        {/* Left Side - Phone Image */}
        <div
          style={{
            width: isMobile ? "100%" : isTablet ? "45%" : "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={phone}
            alt="Phone"
            style={{
              width: isMobile ? "70%" : isTablet ? "60%" : "50%",
              height: "auto",
              borderRadius: "20px",
            }}
          />
        </div>

        {/* Right Side - Text & Form */}
        <div
          style={{
            width: isMobile ? "100%" : isTablet ? "55%" : "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: isMobile ? "center" : "flex-start",
            textAlign: isMobile ? "center" : "left",
            padding: isMobile ? "0 10px" : "0 40px",
          }}
        >
          <div
            style={{
              fontSize: isMobile ? 24 : 38,
              fontWeight: 600,
              marginBottom: 15,
            }}
          >
            Get the RestroBuddy app
          </div>

          <div
            style={{
              color: "#444",
              marginBottom: 20,
              fontSize: isMobile ? 14 : 16,
              maxWidth: "400px",
            }}
          >
            We will send you a link, open it on your phone to download the app
          </div>

          {/* Radio Buttons */}
          <div
            style={{
              marginBottom: 20,
              display: "flex",
              justifyContent: isMobile ? "center" : "flex-start",
              width: "100%",
            }}
          >
            <RadioGroup
              row
              defaultValue="email"
              name="row-radio-buttons-group"
              onChange={handleStatusChange}
            >
              <FormControlLabel value="email" control={<Radio />} label="Email" />
              <FormControlLabel value="phone" control={<Radio />} label="Phone" />
            </RadioGroup>
          </div>

          {/* Input + Button */}
          <div
            style={{
              marginBottom: 25,
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
              justifyContent: isMobile ? "center" : "flex-start",
              gap: isMobile ? "10px" : "8px",
              width: "100%",
            }}
          >
            {status === "email" ? (
              <TextField
                variant="outlined"
                label="Email"
                style={{
                  width: isMobile ? "90%" : 320,
                  background: "#fff",
                  fontSize: 16,
                }}
              />
            ) : (
              <div
                style={{
                  width: isMobile ? "90%" : 298,
                  borderRadius: 6,
                  border: "1px solid grey",
                  display: "flex",
                  padding: 10,
                  alignItems: "center",
                  background: "#fff",
                }}
              >
                <select
                  style={{
                    border: "0px",
                    fontSize: 15,
                    outline: "none",
                    background: "transparent",
                  }}
                >
                  <option>+91</option>
                  <option>+44</option>
                  <option>+43</option>
                  <option>+46</option>
                </select>
                <div
                  style={{
                    width: 1,
                    height: 20,
                    border: "0.5px solid #dcdcdc",
                    marginLeft: 10,
                  }}
                ></div>
                <input
                  type="text"
                  placeholder="Phone number"
                  style={{
                    marginLeft: 10,
                    width: "100%",
                    height: 30,
                    fontSize: 14,
                    color: "grey",
                    border: 0,
                    outline: "none",
                  }}
                />
              </div>
            )}

            <Button
              variant="contained"
              style={{
                backgroundColor: "red",
                height: 56,
                width: isMobile ? "90%" : 150,
                color: "#fff",
              }}
            >
              Share App Link
            </Button>
          </div>

          {/* Download Section */}
          <div
            style={{
              color: "grey",
              fontSize: isMobile ? 14 : 16,
              width: "100%",
              textAlign: isMobile ? "center" : "left",
            }}
          >
            Download app from
            <div
              style={{
                marginTop: 15,
                display: "flex",
                justifyContent: isMobile ? "center" : "flex-start",
                gap: "10px",
              }}
            >
              <img
                src={playstore}
                alt="Playstore"
                style={{ width: isMobile ? "35%" : "25%", maxWidth: 150 }}
              />
              <img
                src={applestore}
                alt="Appstore"
                style={{ width: isMobile ? "35%" : "25%", maxWidth: 150 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
