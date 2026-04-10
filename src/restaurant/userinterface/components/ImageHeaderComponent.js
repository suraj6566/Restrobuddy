import food from "../../../assets/restt.jpg";
import Header from "./Header";
import SearchBarComponent from "./SearchBarComponent";
import logo from "../../../assets/footerlogo.png";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Typography } from "@mui/material";

export default function ImageHeaderComponent({
  searchValue,
  onSearchChange,
  onSearchSubmit,
  locationValue,
  onLocationChange,
  onLoginClick,
  onSignupClick,
}) {
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
        <Header onLoginClick={onLoginClick} onSignupClick={onSignupClick} />
      </Box>

      {/* Centered Content */}
      <Box
        sx={{
          position: "absolute",
          top: isMobile ? "25%" : isTablet ? "30%" : "35%",
          left: 0,
          width: "100%",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 2,
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
            filter: "brightness(0) invert(1)",
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
            textShadow: "0 10px 30px rgba(0,0,0,0.24)",
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
          <SearchBarComponent
            value={searchValue}
            onChange={onSearchChange}
            onSubmit={onSearchSubmit}
            locationValue={locationValue}
            onLocationChange={onLocationChange}
          />
        </Box>
      </Box>
    </Box>
  );
}
