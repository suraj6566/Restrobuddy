import React from "react";
import gps from "../../../assets/gps.png";
import search from "../../../assets/search.png";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function SearchBarComponent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <div
      style={{
        width: isMobile ? "90%" : isTablet ? "80%" : "100%",
        height: "auto",
        padding: isMobile ? "6px" : "10px",
        borderRadius: "10px",
        border: "1px solid #ccc",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#fff",
        gap: isMobile ? "6px" : "10px",
        boxShadow: "0 3px 8px rgba(0,0,0,0.08)",
        flexWrap: isMobile ? "wrap" : "nowrap",
      }}
    >
      {/* GPS + Location Input (Hidden on Mobile) */}
      {!isMobile && (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <img
              src={gps}
              alt="GPS"
              style={{
                width: 26,
                objectFit: "contain",
              }}
            />
            <input
              type="text"
              placeholder="Enter location"
              style={{
                flexGrow: 1,
                height: 36,
                fontSize: 14,
                color: "grey",
                outline: "none",
                border: 0,
                background: "transparent",
                width: 200,
              }}
            />
          </div>

          {/* Divider */}
          <div
            style={{
              height: "30px",
              width: "1px",
              background: "#ddd",
            }}
          ></div>
        </>
      )}

      {/* Search Icon + Input */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexGrow: 1,
          gap: "8px",
        }}
      >
        <img
          src={search}
          alt="Search"
          style={{
            width: isMobile ? 22 : 24,
            objectFit: "contain",
            marginLeft: isMobile ? 4 : 0,
          }}
        />
        <input
          type="text"
          placeholder="Search for restaurant, cuisine, or dish"
          style={{
            flexGrow: 1,
            height: isMobile ? 30 : 36,
            fontSize: isMobile ? 13 : 14,
            color: "grey",
            outline: "none",
            border: 0,
            background: "transparent",
          }}
        />
      </div>
    </div>
  );
}
