import gps from "../../../assets/gps.png";
import search from "../../../assets/search.png";
import { serverURL } from "../../../services/FetchNodeServices";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function DiningSearchBarComponent({
  onLoginClick,
  onSignupClick,
  searchValue = "",
  onSearchChange,
  onSearchSubmit,
}) {
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
          padding: "12px 20px",
          flexWrap: "wrap",
          borderBottom: "1px solid rgba(15,23,42,0.08)",
          background: "#fff",
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
              borderRadius: 12,
              border: "1px solid #d4d4d8",
              display: "flex",
              alignItems: "center",
              background: "#fff",
              boxShadow: "0 8px 24px rgba(15,23,42,0.06)",
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
              onClick={() => onSearchSubmit?.()}
              style={{ width: 25, height: 25, marginRight: 10 }}
            />
            <input
              type="text"
              value={searchValue}
              onChange={(event) => onSearchChange?.(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && onSearchSubmit?.()}
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
            <div onClick={onLoginClick} style={{ fontSize: 18, color: "grey", marginLeft: 60, cursor: "pointer" }}>
              Log in
            </div>
            <div onClick={onSignupClick} style={{ fontSize: 18, color: "grey", marginLeft: 40, cursor: "pointer" }}>
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
            background: "#fff",
          }}
        >
          <div
            style={{
              width: "85%",
              height: 40,
              padding: "0 10px",
              borderRadius: 10,
              border: "1px solid #d4d4d8",
              display: "flex",
              alignItems: "center",
              background: "#fff",
              boxShadow: "0 8px 24px rgba(15,23,42,0.06)",
            }}
          >
            <img
              src={search}
              alt="search"
              onClick={() => onSearchSubmit?.()}
              style={{
                width: 22,
                height: 22,
                objectFit: "contain",
                marginRight: 8,
              }}
            />
            <input
              type="text"
              value={searchValue}
              onChange={(event) => onSearchChange?.(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && onSearchSubmit?.()}
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
