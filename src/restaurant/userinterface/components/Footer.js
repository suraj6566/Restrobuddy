import React from "react";
import {
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Grid2,
  Typography,
  Box,
} from "@mui/material";

import logo from "../../../assets/footerlogo.png";
import flag from "../../../assets/indiaflag.png";
import flag2 from "../../../assets/uaeflag.png";
import global from "../../../assets/globalimage.png";
import appstoreimg from "../../../assets/appstoreimage.png";
import googleplayimg from "../../../assets/googleplayimage.png";
import twitter from "../../../assets/twitter.png";
import insta from "../../../assets/insta.png";
import fb from "../../../assets/fb.png";
import youtube from "../../../assets/youtube.png";
import linkedin from "../../../assets/linkedin.png";

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#f8f8f8",
        py: 6,
        px: { xs: 3, md: 10 },
      }}
    >
      <Grid2
        container
        spacing={4}
        justifyContent="space-between"
        sx={{ maxWidth: "1200px", mx: "auto" }}
      >
        {/* Column 1 */}
        <Grid2 xs={12} sm={6} md={3}>
          <img src={logo} alt="RestroBuddy Logo" style={{ width: 160, height: 70 }} />
          <Typography
            sx={{ fontWeight: 600, mt: 3, letterSpacing: "1px" }}
          >
            ABOUT RESTROBUDDY
          </Typography>
          {[
            "Who We Are",
            "Blog",
            "Work With Us",
            "Investor Relations",
            "Report Fraud",
            "Press Kit",
            "Contact Us",
          ].map((item) => (
            <Typography key={item} sx={{ mt: 1, fontSize: 14 }}>
              {item}
            </Typography>
          ))}
        </Grid2>

        {/* Column 2 */}
        <Grid2 xs={12} sm={6} md={3}>
          <Typography sx={{ fontWeight: 600, letterSpacing: "1px", mb: 2 }}>
            RESTROVERSE
          </Typography>
          {[
            "RestroBuddy",
            "Blinkit",
            "District",
            "Feeding India",
            "Hyperpure",
            "RestroBuddy Live",
            "Restroland",
            "Weather Union",
          ].map((item) => (
            <Typography key={item} sx={{ mt: 1, fontSize: 14 }}>
              {item}
            </Typography>
          ))}
        </Grid2>

        {/* Column 3 */}
        <Grid2 xs={12} sm={6} md={3}>
          <Typography sx={{ fontWeight: 600, letterSpacing: "1px", mb: 2 }}>
            FOR RESTAURANTS
          </Typography>
          <Typography sx={{ mt: 1, fontSize: 14 }}>Partner With Us</Typography>
          <Typography sx={{ mt: 1, fontSize: 14 }}>Apps For You</Typography>

          <Typography sx={{ fontWeight: 600, mt: 4, letterSpacing: "1px" }}>
            LEARN MORE
          </Typography>
          <Typography sx={{ mt: 1, fontSize: 14 }}>Privacy</Typography>
          <Typography sx={{ mt: 1, fontSize: 14 }}>Security</Typography>
          <Typography sx={{ mt: 1, fontSize: 14 }}>Terms</Typography>
        </Grid2>

        {/* Column 4 */}
        <Grid2 xs={12} sm={6} md={3}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Country Select */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Country</InputLabel>
              <Select label="Country" defaultValue={1}>
                <MenuItem value={1}>
                  <img
                    src={flag}
                    style={{ width: 22, height: 18, marginRight: 8 }}
                    alt="India"
                  />
                  India
                </MenuItem>
                <MenuItem value={2}>
                  <img
                    src={flag2}
                    style={{ width: 22, height: 18, marginRight: 8 }}
                    alt="UAE"
                  />
                  UAE
                </MenuItem>
              </Select>
            </FormControl>

            {/* Language Select */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Language</InputLabel>
              <Select label="Language" defaultValue={1}>
                <MenuItem value={1}>
                  <img
                    src={global}
                    style={{ width: 18, height: 18, marginRight: 8 }}
                    alt="English"
                  />
                  English
                </MenuItem>
                <MenuItem value={2}>
                  <img
                    src={global}
                    style={{ width: 18, height: 18, marginRight: 8 }}
                    alt="Hindi"
                  />
                  हिंदी
                </MenuItem>
              </Select>
            </FormControl>

            {/* Social Links */}
            <Typography sx={{ fontWeight: 600, mt: 3, letterSpacing: "1px" }}>
              SOCIAL LINKS
            </Typography>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <img src={linkedin} alt="LinkedIn" style={{ width: 20 }} />
              <img src={insta} alt="Instagram" style={{ width: 20 }} />
              <img src={twitter} alt="Twitter" style={{ width: 20 }} />
              <img src={youtube} alt="YouTube" style={{ width: 26 }} />
              <img src={fb} alt="Facebook" style={{ width: 22 }} />
            </Box>

            {/* App Links */}
            <Box sx={{ mt: 2 }}>
              <img src={appstoreimg} alt="App Store" style={{ width: 140, }} />
              <img src={googleplayimg} alt="Google Play" style={{ width: 140,  }} />
            </Box>
          </Box>
        </Grid2>
      </Grid2>

      <Box sx={{ borderTop: "1px solid #dfe6e9", mt: 5, pt: 2 }}>
        <Typography
          sx={{
            fontSize: 13,
            color: "#666",
            textAlign: "center",
            px: { xs: 2, md: 10 },
          }}
        >
          By continuing past this page, you agree to our Terms of Service, Cookie Policy,
          Privacy Policy and Content Policies. All trademarks are properties of their
          respective owners. 2008–2025 © RestroBuddy™ Ltd. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
