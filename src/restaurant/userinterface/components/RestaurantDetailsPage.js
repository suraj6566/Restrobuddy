import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import {
  getImageUrl,
  handleImageError,
  serverURL,
} from "../../../services/FetchNodeServices";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";
import direction from "../../../assets/direction.png";
import share from "../../../assets/share.png";
import feedback from "../../../assets/feedback.png";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function RestaurantDetailsPage({ data }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const restaurantData = Array.isArray(data) ? data[0] || {} : data || {};
  const PARAM_FOOD_IMAGE =
    "https://restrobuddybackend-production-d28f.up.railway.app/images/cee5cee7-1d52-4a99-bf8c-6883b221b6bc.png";
  const shouldIgnoreGalleryImage = (imagePath) => {
    const value = `${imagePath || ""}`.toLowerCase();

    return (
      !value ||
      value.includes("placeholder") ||
      value.includes("picture.png") ||
      value.includes("restlogo") ||
      value.includes("headerlogo") ||
      value.includes("filelogo") ||
      value.includes("logo.png")
    );
  };
  const baseImages = [
    ...(restaurantData?.pictures
      ? restaurantData.pictures
          .split(",")
          .map((item) => item?.trim())
          .filter(Boolean)
      : []),
    ...(restaurantData?.image ? [restaurantData.image] : []),
    ...(restaurantData?.img ? [restaurantData.img] : []),
  ].filter(
    (item, index, self) =>
      item &&
      !shouldIgnoreGalleryImage(item) &&
      self.indexOf(item) === index
  );
  const resimg =
    restaurantData?.restaurantname?.toLowerCase() === "param food"
      ? [
          PARAM_FOOD_IMAGE,
          ...baseImages.filter((item) => item !== restaurantData?.filelogo),
        ].slice(0, 4)
      : baseImages;
  const galleryImages = [...resimg.slice(0, 4)];

  // Keep the gallery layout filled on restaurants that only have 2-3 images.
  if (galleryImages.length > 0) {
    while (galleryImages.length < 4) {
      galleryImages.push(galleryImages[galleryImages.length - 1]);
    }
  }

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
          width: matches ? "92%" : "73%",
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
          Home / India / Gwalior / Lashkar / {restaurantData.restaurantname} /
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
            {restaurantData.restaurantname}
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
          {restaurantData?.listcategory?.split(",")?.slice(0, 3)?.join(", ")}
        </div>
        <div
          style={{
            fontSize: matches ? 10 : 16,
            color: "grey",
            fontWeight: 350,
            marginTop: 5,
          }}
        >
          {restaurantData.address}
        </div>

        {/* Timing + Phone */}
        <div style={{ display: "flex" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
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
            Open now - {restaurantData.timingopen} - {restaurantData.timingclose}
          </div>
          <div
            style={{
              width: 0,
              height: 12,
              marginTop: matches ? 0 : 2,
              marginLeft: 2,
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
            {restaurantData.phonenumber}
          </div>
        </div>
        </div>

        {/* Buttons */}
        <Stack spacing={1} direction="row" sx={{ flexWrap: "wrap" }}>
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
        <Box
          sx={{
            width: "100%",
            marginTop: 2,
            overflow: "hidden",
            borderRadius: 3,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: matches ? "1fr 1fr" : "2.1fr 1fr 1fr",
              gridTemplateRows: matches ? "180px 180px" : "170px 170px",
              gap: 8,
            }}
          >
            {galleryImages.map((item, i) => (
              <div
                key={`${restaurantData?._id || restaurantData?.id || restaurantData?.restaurantid || restaurantData?.restaurantname}-${item}-${i}`}
                style={{
                  gridColumn: matches
                    ? i === 0
                      ? "1 / span 2"
                      : "auto"
                    : i === 0
                    ? "1 / span 1"
                    : "auto",
                  gridRow: matches
                    ? i === 0
                      ? "1 / span 1"
                      : "auto"
                    : i === 0
                    ? "1 / span 2"
                    : i === 2
                    ? "1 / span 2"
                    : "auto",
                  minHeight: 0,
                }}
              >
                <img
                  src={getImageUrl(item)}
                  onError={handleImageError}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 10,
                    display: "block",
                  }}
                />
              </div>
            ))}
          </div>
        </Box>
      </div>
    </div>
  );

  return <div>{showDetails()}</div>;
}
