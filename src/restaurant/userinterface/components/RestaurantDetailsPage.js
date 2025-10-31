import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import { serverURL } from "../../../services/FetchNodeServices";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import direction from "../../../assets/direction.png";
import share from "../../../assets/share.png";
import feedback from "../../../assets/feedback.png";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function RestaurantDetailsPage({ data }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const resimg = data?.pictures?.split(",")?.filter((x) => x?.trim() !== "");
  const imgs = [
    { cols: 3, rows: 2 },
    { cols: 1, rows: 1 },
    { cols: 1, rows: 2 },
    { cols: 1, rows: 1 },
  ];

  const showDetails = () => (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "73%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Breadcrumb */}
        <div
          style={{
            fontSize: matches ? 10 : 12,
            color: "grey",
            fontWeight: 350,
            marginTop: 10,
          }}
        >
          Home / India / Gwalior / Lashkar / {data.restaurantname} /
          <span style={{ color: "#bdc3c7" }}> Order Online</span>
        </div>

        {/* Restaurant Name + Rating */}
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "flex-start",
            marginTop: 10,
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: matches ? 20 : 34,
              fontWeight: 500,
              letterSpacing: 0.8,
              marginTop: 20,
            }}
          >
            {data.restaurantname}
          </div>

          {!matches && (
            <div
              style={{ display: "flex", alignItems: "center", marginTop: 18 }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "green",
                  color: "white",
                  fontWeight: 600,
                  width: 45,
                  height: 22,
                  borderRadius: 5,
                }}
              >
                4.2 <StarIcon style={{ fontSize: 14 }} />
              </div>
              <div style={{ marginLeft: 5 }}>
                <div style={{ fontWeight: 550, fontSize: 14 }}>398</div>
                <div
                  style={{
                    fontWeight: 100,
                    fontSize: 12,
                    borderBottom: "1px dashed grey",
                  }}
                >
                  Dining Ratings
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Categories + Address */}
        <div
          style={{
            fontSize: matches ? 10 : 16,
            color: "darkgrey",
            fontWeight: 350,
            marginTop: 5,
          }}
        >
          {data?.listcategory?.split(",")?.slice(0, 3)?.join(", ")}
        </div>
        <div
          style={{
            fontSize: matches ? 10 : 16,
            color: "grey",
            fontWeight: 350,
            marginTop: 5,
          }}
        >
          {data.address}
        </div>

        {/* Timing + Phone */}
        <div style={{ display: "flex" }}>
          <div
            style={{
              border: "1px solid grey",
              marginTop: 5,
              borderRadius: 15,
              fontSize: matches ? 10 : 15,
              padding: "2px 8px",
              color: "rgb(130,130,130)",
            }}
          >
            Open now - {data.timingopen} - {data.timingclose}
          </div>
          <div
            style={{
              width: 0,
              height: 12,
              marginTop: matches ? 9.5 : 12,
              marginLeft: 10,
              border: "1px solid rgb(179,171,171)",
            }}
          ></div>
          <div style={{ padding: "8px 10px" }}>
            <img
              src={`${serverURL}/images/phone.png`}
              width={matches ? 12 : 18}
            />
          </div>
          <div
            style={{
              color: "rgb(130,130,130)",
              fontSize: matches ? 10 : 14,
              fontWeight: 400,
              marginTop: 8,
              textDecoration: "underline rgb(130,130,130)",
            }}
          >
            {data.phonenumber}
          </div>
        </div>

        {/* Buttons */}
        <Stack spacing={1} direction="row">
          {[{ img: direction, label: "Direction" }, { img: share, label: "Share" }, { img: feedback, label: "Reviews" }].map(
            (b, i) => (
              <Button
                key={i}
                variant="outlined"
                style={{
                  borderRadius: 10,
                  textTransform: "none",
                  color: "rgb(28,28,28)",
                  borderColor: "grey",
                  marginTop: 13,
                  fontSize: matches ? 10 : 14,
                }}
              >
                <img
                  src={b.img}
                  style={{ width: matches ? 10 : 15, marginRight: 5 }}
                />
                {b.label}
              </Button>
            )
          )}
        </Stack>

        {/* ✅ Responsive Image Grid */}
        <Box sx={{ width: "100%", height: matches ? 230 : 330, marginTop: 2 }}>
          <ImageList
            variant="standard"
            cols={matches ? 2 : 5}
            rowHeight={matches ? 100 : 150}
            gap={6}
          >
            {resimg?.map((item, i) => (
              <ImageListItem
                key={i}
                cols={imgs[i]?.cols || 1}
                rows={imgs[i]?.rows || 1}
              >
                <img
                  src={`${serverURL}/images/${item}`}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </div>
    </div>
  );

  return <div>{showDetails()}</div>;
}
