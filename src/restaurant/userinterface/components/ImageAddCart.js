import { DialogContent, Dialog, IconButton } from "@mui/material";
import { serverURL } from "../../../services/FetchNodeServices";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import PlusMinusComponent from "./PlusMinusComponent";
import { useDispatch } from "react-redux";

export default function ImageAddCart({
  open,
  setOpen,
  item,
  cartOpen,
  setCartOpen,
  refresh,
  setRefresh,
  qty,
}) {
  var dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleQtyChange = (value, item) => {
    if (value >= 1) {
      item["qty"] = value;
      dispatch({ type: "ADD_CART", payload: [item.foodid, item] });
      setCartOpen(true);
    } else if (value === 0) {
      dispatch({ type: "DELETE_CART", payload: [item.foodid] });
    }

    setRefresh(!refresh);
  };

  if (!item) {
    return (
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        maxWidth={"xs"}
        PaperProps={{
          sx: { borderRadius: "20px", width: "100%", maxHeight: "auto" },
        }}
      >
        <DialogContent
          style={{
            margin: 0,
            padding: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: 16, fontWeight: 600, color: "#666" }}>
            Loading...
          </p>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog
      style={{ padding: 0 }}
      PaperProps={{
        sx: { borderRadius: "20px", width: "100%", maxHeight: "auto" },
      }}
      open={open}
      onClose={handleCloseDialog}
      maxWidth={"xs"}
    >
      <DialogContent
        style={{
          margin: 0,
          padding: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
          {/* Close Button (Top Right Corner) */}
          <IconButton
            onClick={handleCloseDialog}
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              background: "rgba(255,255,255,0.7)",
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Main Food Image */}
          <img
            src={
              item?.icon
                ? `${serverURL}/images/${item.icon}`
                : "/placeholder.png"
            }
            style={{
              objectFit: "cover",
              width: "100%",
              height: 300,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
            alt={item?.foodname || "Food"}
          />

          <div style={{ margin: "15px", marginBottom: 25 }}>
            {/* Veg/Non-Veg Icon */}
            <div style={{ marginTop: 10 }}>
              <img src="/veg.png" style={{ width: 20, height: 20 }} alt="veg" />
            </div>

            {/* Food Name */}
            <div
              style={{
                marginTop: 5,
                fontSize: "18px",
                fontWeight: 670,
                color: "#000",
              }}
            >
              {item?.foodname || "Unnamed Food"}
            </div>

            {/* Price + Rating + Add Button Row */}
            <div
              style={{
                marginTop: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              {/* Left side (Price + Rating) */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                {/* Price & Offer */}
                {item?.offerprice > 0 ? (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div>
                      <s>&#8377;{item?.price}</s>
                    </div>
                    <div
                      style={{
                        fontWeight: 700,
                        marginLeft: "8px",
                      }}
                    >
                      &#8377;{(item?.price || 0) - (item?.offerprice || 0)}
                    </div>
                    <div
                      style={{
                        marginLeft: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#6ab04c",
                        padding: "0 6px",
                        borderRadius: 5,
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      Save &#8377;{item?.offerprice}
                    </div>
                  </div>
                ) : (
                  <div style={{ fontWeight: 700 }}>
                    &#8377;{item?.price || 0}
                  </div>
                )}

                {/* Rating */}
                <div style={{ display: "flex", alignItems: "center", marginTop: 5 }}>
                  <div
                    style={{
                      color: "rgb(17, 102, 73)",
                      fontSize: 13,
                      fontWeight: 800,
                    }}
                  >
                    ★ 4.9
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "rgba(2, 6, 12, 0.6)",
                      marginLeft: 4,
                    }}
                  >
                    (95)
                  </div>
                </div>
              </div>

              {/* Right side (Add Button) */}
              <div style={{ paddingRight: 10 }}>
                <PlusMinusComponent
                  qty={qty}
                  onChange={(value) => handleQtyChange(value, item)}
                />
              </div>
            </div>

            {/* Ingredients */}
            <div
              style={{
                marginTop: 10,
                color: "rgba(2, 6, 12, 0.6)",
                fontSize: "16px",
              }}
            >
              {item?.ingredients || "No ingredients listed"}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
