import food from "../../../assets/restt.jpg";
import Header from "./Header";
import SearchBarComponent from "./SearchBarComponent";
import logo from "../../../assets/footerlogo.png";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Typography } from "@mui/material";

export default function ImageHeaderComponent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLaptop = useMediaQuery(theme.breakpoints.between("md", "lg"));

  return (
    <Box
      sx={{
        width: "100vw",
        height: isMobile ? "380px" : isTablet ? "480px" : "600px",
        position: "relative",
        overflow: "hidden",
        margin: 0,
        padding: 0,
        left: 0,
        right: 0,
      }}
    >
      {/* Background Image */}
      <Box
        component="img"
        src={food}
        alt="Food background"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(80%)",
          display: "block",
          margin: 0,
          padding: 0,
        }}
      />

      {/* Header Navbar */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 2,
        }}
      >
        <Header />
      </Box>

      {/* Centered Content */}
      <Box
        sx={{
          position: "absolute",
          top: isMobile ? "25%" : isTablet ? "30%" : "35%",
          left: 0,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 2,
          zIndex: 3,
        }}
      >
        {/* Logo */}
        <Box
          component="img"
          src={logo}
          alt="RestroBuddy logo"
          sx={{
            width: isMobile ? "140px" : isTablet ? "200px" : "250px",
            height: "auto",
            mb: 2,
          }}
        />

        {/* Heading Text */}
        <Typography
          sx={{
            color: "#fff",
            fontWeight: 600,
            fontSize: isMobile ? "18px" : isTablet ? "26px" : "32px",
            letterSpacing: 0.5,
            mb: 3,
          }}
        >
          Discover the best food & drinks in Gwalior
        </Typography>

        {/* Search Bar */}
        <Box
          sx={{
            width: isMobile ? "90%" : isTablet ? "70%" : "50%",
          }}
        >
          <SearchBarComponent />
        </Box>
      </Box>
    </Box>
  );
}
