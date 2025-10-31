import React, { useState } from 'react';
import { serverURL } from "../../../services/FetchNodeServices";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import PlusMinusComponent from './PlusMinusComponent';
import ImageAddCart from './ImageAddCart';
import FloatingCart from './FloatingCart';
import { useDispatch, useSelector } from 'react-redux';

export default function FoodComponent({item,data,refresh,setRefresh}){

  const dispatch = useDispatch();

  var product =useSelector((state)=>state.cart)[item.foodid]

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);

  const handleOpenImageDialog = (item) => {
    setSelectedItem(item);
    setOpen(true);
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

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

    return(<div>
    <div 
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "10px",
            paddingRight: "10px",
            width: "100%",
            marginLeft: matches ? "15%" : "5%",
            marginTop: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            {/* Image */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={`${serverURL}/images/${item?.icon}`}
                style={{
                  width: matches ? "90px" : "110px",
                  height: "110px",
                  marginRight: "16px",
                  objectFit: "cover",
                  borderRadius: 10,
                  cursor: "pointer",
                }}
                onClick={() => handleOpenImageDialog(item)}
              />
            </div>

            {/* Details */}
            <div style={{ width: "30%" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "bold",
                }}
              >
                {item?.foodtype.toLowerCase() === "veg" ? (
                  <img
                    src={`${serverURL}/images/veg.png`}
                    style={{ width: 20, marginRight: 5 }}
                  />
                ) : (
                  <img
                    src={`${serverURL}/images/nonveg.png`}
                    style={{ width: 20, marginRight: 5 }}
                  />
                )}
                {item?.foodname}
              </div>

              <div
                style={{
                  color: "rgb(79, 79, 79)",
                  fontSize: "15px",
                  width: matches ? "50%" : "100%",
                  marginTop: 3,
                }}
              >
                {item.offerprice > 0 ? (
                  <div style={{ display: "flex" }}>
                    <div>
                      <s>&#8377;{item?.price}</s>
                    </div>
                    <div style={{ fontWeight: 700, marginLeft: "5%" }}>
                      &#8377;{item?.price - item?.offerprice}
                    </div>
                    <div
                      style={{
                        marginLeft: "5%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#6ab04c",
                        paddingLeft: 2,
                        paddingRight: 2,
                        borderRadius: 5,
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      Save &#8377;{item.offerprice}
                    </div>
                  </div>
                ) : (
                  <div style={{ fontWeight: 700 }}>&#8377;{item?.price}</div>
                )}
                <div style={{ marginTop: 3 }}>{item?.ingredients}</div>
              </div>
            </div>

            {/* Add Button + Customizable text */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth: 80,
              }}
            >
              {/* ✅ Each item ke liye alag qty manage */}
              <PlusMinusComponent
                qty={product?.qty==undefined?0:product?.qty}
                onChange={(value) => handleQtyChange(value, item)}
              />

              {/* Customizable text */}
              {item?.quantitytype?.toLowerCase() !== "fixed" && (
                <span
                  style={{
                    fontSize: 12,
                    color: "#e67e22",
                    marginTop: 6,
                  }}
                >
                  Customizable
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Image dialog */}
      <ImageAddCart qty={product?.qty==undefined?0:product?.qty} refresh={refresh} setRefresh={setRefresh} cartOpen={cartOpen} setCartOpen={setCartOpen} open={open} setOpen={setOpen} item={selectedItem} />

      <FloatingCart cartOpen={cartOpen} setCartOpen={setCartOpen} />

      </div>

   )
}