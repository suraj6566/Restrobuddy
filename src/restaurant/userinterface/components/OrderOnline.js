import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import OrderOnlineFoodList from "./OrderOnlineFoodList";

export default function OrderOnline({ data, setCategoryId, categoryId, foodList, refresh, setRefresh }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  // Highlight selected category name
  const [selectedCategory, setSelectedCategory] = useState("");

  const [cartOpen,setCartOpen]=useState(false)

  const handleCategoryChange = (id, name) => {
    setCategoryId(id); // for backend
    setSelectedCategory(name.toLowerCase()); // for UI highlight
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: matches ? "column" : "row",
        padding: matches ? "0.5rem" : "2rem",
      }}
    >
      {/* Category Sidebar */}
      <div
        style={{
          width: matches ? "100%" : 220,
          marginBottom: matches ? "1rem" : 0,
          marginLeft:'180px'
        }}
      >
        <h3
          style={{
            marginBottom: "0.5rem",
            color: "#333",
            fontWeight: 600,
            fontSize: matches ? 16 : 20,
          }}
        >
          Categories
        </h3>
        <List>
          {data.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() =>
                  handleCategoryChange(item.categoryid, item.categoryname)
                }
                selected={selectedCategory === item.categoryname.toLowerCase()}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  pl: 2,
                  pr: 2,
                  bgcolor:
                    selectedCategory === item.categoryname.toLowerCase()
                      ? "rgb(239, 79, 95)"
                      : "#f9f9f9",
                  color:
                    selectedCategory === item.categoryname.toLowerCase()
                      ? "#fff"
                      : "#333",
                  "&:hover": {
                    bgcolor:
                      selectedCategory === item.categoryname.toLowerCase()
                        ? "rgb(239, 79, 95)"
                        : "#eee",
                  },
                }}
              >
                <ListItemText
                  primary={`${item.categoryname} (${item.count_category})`}
                  primaryTypographyProps={{
                    fontSize: matches ? 13 : 16,
                    fontWeight:
                      selectedCategory === item.categoryname.toLowerCase()
                        ? 600
                        : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </div>

      {/* Food List */}
      <div style={{ flex: 1, paddingLeft: matches ? 0 : 30 }}>
        <OrderOnlineFoodList refresh={refresh} setRefresh={setRefresh} cartOpen={cartOpen} setCartOpen={setCartOpen} data={foodList} />
      </div>
    </div>
  );
}
