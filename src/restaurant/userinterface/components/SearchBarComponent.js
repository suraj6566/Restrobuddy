import React from "react";
import gps from "../../../assets/gps.png";
import search from "../../../assets/search.png";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function SearchBarComponent({
  value,
  onChange,
  onSubmit,
  locationValue,
  onLocationChange,
  compact,
  placeholder = "Search for restaurant, cuisine, or dish",
  showLocation = true,
  background = "#fff",
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const searchValue = value ?? "";
  const currentLocationValue = locationValue ?? "";

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSubmit?.();
    }
  };

  return (
    <div
      style={{
        width: isMobile ? "90%" : isTablet ? "80%" : "100%",
        height: "auto",
        padding: compact ? (isMobile ? "5px" : "8px") : isMobile ? "6px" : "10px",
        borderRadius: "10px",
        border: "1px solid #ccc",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background,
        gap: isMobile ? "6px" : "10px",
        boxShadow: "0 3px 8px rgba(0,0,0,0.08)",
        flexWrap: isMobile ? "wrap" : "nowrap",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
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
              value={currentLocationValue}
              onChange={(event) => onLocationChange?.(event.target.value)}
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

      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexGrow: 1,
          gap: "8px",
          minWidth: 0,
        }}
      >
        <img
          src={search}
          alt="Search"
          onClick={() => onSubmit?.()}
          style={{
            width: isMobile ? 22 : 24,
            objectFit: "contain",
            marginLeft: isMobile ? 4 : 0,
            cursor: onSubmit ? "pointer" : "default",
          }}
        />
        <input
          type="text"
          value={searchValue}
          onChange={(event) => onChange?.(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
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
