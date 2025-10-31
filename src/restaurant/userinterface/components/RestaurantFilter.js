import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function RestaurantFilter({ data }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const showFilter = () =>
    data.map((item, index) => (
      <Button
        key={index}
        style={{
          padding: matches ? "0.3rem 0.5rem" : "0.5rem 0.7rem",
          textTransform: "none",
          background: "#fff",
          border: "1px solid rgb(207, 207, 207)",
          color: "rgb(156, 156, 156)",
          letterSpacing: "0.5px",
          marginLeft: matches ? 10 : 20,
          marginTop: matches ? 25 : 60,
          fontWeight: 400,
          fontSize: matches ? 10 : 14,
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          gap: matches ? 3 : 6,
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        }}
      >
        {item.img && (
          <img
            src={item.img}
            alt={item.title}
            style={{ width: matches ? 15 : 20, objectFit: "contain" }}
          />
        )}
        {item.title}
      </Button>
    ));

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: matches ? "center" : "flex-start",
        marginLeft: matches ? 0 : 160,
        marginRight: matches ? 0 : 160,
      }}
    >
      {showFilter()}
    </div>
  );
}
