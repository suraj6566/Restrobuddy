import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function RestaurantFilter({ data }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const showFilter = () => {
    return data.map((item) => {
      return (
        <Button
          style={{
            padding: "0.5rem 0.7rem",
            textTransform: "none",
            background: "#fff",
            border: "1px solid rgb(207, 207, 207)",
            color: "rgb(156, 156, 156)",
            letterSpacing: "1px",
            marginLeft: 20,
            marginTop: 60,
            fontWeight: 100,
            lineHeight: matches ? 1.1 : 1.2,
            fontSize: matches ? 10 : 14,
          }}
        >
          {item.img ? (
            <img src={item.img} style={{ width: matches?15:20, marginRight: 5 }} />
          ) : (
            ""
          )}{" "}
          {item.title}
        </Button>
      );
    });
  };
  return (
    <div style={{ display: "flex", marginLeft: matches ? 50 : 180 }}>
      {showFilter()}
    </div>
  );
}
