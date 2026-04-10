import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import OrderOnlineFoodList from "./OrderOnlineFoodList";

export default function OrderOnline({
  data,
  setCategoryId,
  categoryId,
  foodList,
  refresh,
  setRefresh,
  searchValue,
  setSearchValue,
  selectedFoodFilter,
  setSelectedFoodFilter,
}) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  // Highlight selected category name
  const [selectedCategory, setSelectedCategory] = useState("");

  const [cartOpen,setCartOpen]=useState(false)
  const visibleFoodList = foodList.filter((item) => {
    const normalizedSearch = searchValue?.trim().toLowerCase() || "";
    const searchableText = [
      item?.foodname,
      item?.ingredients,
      item?.foodtype,
      item?.quantitytype,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch);
    if (selectedFoodFilter === "Veg" && item?.foodtype?.toLowerCase() !== "veg") return false;
    if (selectedFoodFilter === "Offers" && !(item?.offerprice > 0)) return false;

    return matchesSearch;
  });

  const handleCategoryChange = (id, name) => {
    setCategoryId(id); // for backend
    setSelectedCategory(name.toLowerCase()); // for UI highlight
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: matches ? "column" : "row",
        padding: matches ? "0.75rem" : "2rem",
        width: matches ? "100%" : "73%",
        margin: "0 auto",
        gap: matches ? 16 : 24,
      }}
    >
      {/* Category Sidebar */}
      <div
        style={{
          width: matches ? "100%" : 240,
          marginBottom: matches ? "1rem" : 0,
          marginLeft: matches ? 0 : 0,
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
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
          <input
            value={searchValue}
            onChange={(event) => setSearchValue?.(event.target.value)}
            placeholder="Search dishes"
            style={{
              height: 40,
              borderRadius: 10,
              border: "1px solid #dcdde1",
              padding: "0 12px",
              outline: "none",
            }}
          />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["Veg", "Offers"].map((filter) => (
              <Button
                key={filter}
                onClick={() =>
                  setSelectedFoodFilter?.(selectedFoodFilter === filter ? "" : filter)
                }
                variant="outlined"
                style={{
                  textTransform: "none",
                  borderRadius: 20,
                  color: selectedFoodFilter === filter ? "#fff" : "#666",
                  background: selectedFoodFilter === filter ? "rgb(239, 79, 95)" : "#fff",
                  borderColor: "rgb(207, 207, 207)",
                }}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
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
      <div style={{ flex: 1, paddingLeft: matches ? 0 : 10, minWidth: 0 }}>
        <OrderOnlineFoodList refresh={refresh} setRefresh={setRefresh} cartOpen={cartOpen} setCartOpen={setCartOpen} data={visibleFoodList} />
      </div>
    </div>
  );
}
