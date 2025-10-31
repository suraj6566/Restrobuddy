import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function DeliveryFilter({ data }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const showFilter = () =>
    data.map((item, index) => (
      <Button
        key={index}
        style={{
          background: "#fff",
          border: "1px solid rgb(207, 207, 207)",
          color: "rgb(130, 130, 130)",
          letterSpacing: "0.5px",
          marginLeft: matches ? 10 : 20,
          marginTop: matches ? 20 : 30,
          fontWeight: 400,
          fontSize: matches ? 10 : 13,
          textTransform: "none",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          gap: matches ? 3 : 6,
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
          padding: matches ? "0.3rem 0.6rem" : "0.5rem 0.9rem",
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
        marginLeft: matches ? 0 : 150,
        marginRight: matches ? 0 : 150,
        marginBottom: matches ? 10 : 20,
      }}
    >
      {showFilter()}
    </div>
  );
}
