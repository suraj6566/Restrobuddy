import gps from "../../../assets/gps.png";
import search from "../../../assets/search.png";
import { serverURL } from "../../../services/FetchNodeServices";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function DiningSearchBarComponent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div style={{ width: "100%", backgroundColor: "#fff" }}>
      {/* ---------- HEADER BAR ---------- */}
      <div
        style={{
          display: "flex",
          justifyContent: isMobile ? "space-between" : "center",
          alignItems: "center",
          padding: "10px 20px",
          flexWrap: "wrap",
        }}
      >
        {/* ---------- LOGO ---------- */}
        <img
          src={`${serverURL}/images/headerlogo.png`}
          alt="RestroBuddy"
          style={{
            width: isMobile ? "28%" : 125,
            height: isMobile ? 42 : 48,
            marginRight: isMobile ? 0 : 30,
          }}
        />

        {/* ---------- SEARCH BAR (Desktop) ---------- */}
        {!isMobile && (
          <div
            style={{
              width: "46%",
              height: 50,
              padding: "0 10px",
              borderRadius: 6,
              border: "1px solid grey",
              display: "flex",
              alignItems: "center",
              background: "#fff",
            }}
          >
            {/* Location */}
            <img src={gps} alt="gps" style={{ width: 25, height: 25 }} />
            <input
              type="text"
              placeholder="Location"
              style={{
                marginLeft: 5,
                width: 120,
                height: 30,
                fontSize: 14,
                color: "grey",
                outline: "none",
                border: 0,
              }}
            />

            {/* Divider */}
            <div
              style={{
                width: 1,
                height: 30,
                backgroundColor: "#dcdcdc",
                margin: "0 10px",
              }}
            ></div>

            {/* Search */}
            <img
              src={search}
              alt="search"
              style={{ width: 25, height: 25, marginRight: 10 }}
            />
            <input
              type="text"
              placeholder="Search for restaurant, cuisine or a dish"
              style={{
                flex: 1,
                height: 30,
                fontSize: 14,
                color: "grey",
                outline: "none",
                border: 0,
              }}
            />
          </div>
        )}

        {/* ---------- LOGIN & SIGNUP ---------- */}
        {!isMobile && (
          <>
            <div style={{ fontSize: 18, color: "grey", marginLeft: 60 }}>
              Log in
            </div>
            <div style={{ fontSize: 18, color: "grey", marginLeft: 40 }}>
              Sign up
            </div>
          </>
        )}
      </div>

      {/* ---------- MOBILE SEARCH BAR ---------- */}
      {isMobile && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "8px 0",
          }}
        >
          <div
            style={{
              width: "85%",
              height: 40,
              padding: "0 10px",
              borderRadius: 6,
              border: "1px solid grey",
              display: "flex",
              alignItems: "center",
              background: "#fff",
            }}
          >
            <img
              src={search}
              alt="search"
              style={{
                width: 22,
                height: 22,
                objectFit: "contain",
                marginRight: 8,
              }}
            />
            <input
              type="text"
              placeholder="Search for restaurant, cuisine or a dish"
              style={{
                flex: 1,
                height: 30,
                fontSize: 14,
                color: "grey",
                outline: "none",
                border: 0,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
