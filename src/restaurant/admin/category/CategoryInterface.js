import { Avatar, Grid, TextField, Button } from "@mui/material";
import { useStyles } from "../category/CategoryInterfaceCss";
import TitleBar from "../../components/TitleBar";
import { CloudUpload } from "@mui/icons-material";
import category from "../../../assets/category.png";
import { useState } from "react";
import { postData } from "../../../services/FetchNodeServices";
import swal from "sweetalert2";

export default function CategoryInterface() {
    const classes = useStyles();
    var ADMIN=JSON.parse(localStorage.getItem("ADMIN"))
    const [restaurantId, setRestaurantId] = useState(ADMIN.restaurantid)
    const [CategoryName, setCategoryName] = useState("");
    const [iconPicture, setIconPicture] = useState({ file: category, bytes: null });
    const [error, setError] = useState({});

    // Handle Icon Upload
    const handleIconChange = (event) => {
        if (event.target.files.length > 0) {
            setIconPicture({
                file: URL.createObjectURL(event.target.files[0]),
                bytes: event.target.files[0],
            });
        }
    };

    // Reset Fields
    const handleReset = () => {
        setCategoryName("");
        setIconPicture({ file: category, bytes: null });
        setRestaurantId("");
        setError({});
    };

    // Handle Validation Errors
    const handleError = (label, errorMessage) => {
        setError((prev) => ({ ...prev, [label]: errorMessage }));
    };

    // Form Validation
    const validate = () => {
        let err = false;
        setError({}); // Reset errors

        if (!iconPicture.bytes) {
            handleError("iconPicture", "Please select an icon.");
            err = true;
        }
        if (!CategoryName.trim()) {
            handleError("CategoryName", "Category name cannot be blank.");
            err = true;
        }
        const restaurantIdPattern = /^[1-9][0-9]*$/
        if (!restaurantIdPattern.test(restaurantId)) {
            handleError("restaurantId", "Please enter a valid 10-digit Restaurant ID.");
            err = true;
        }

        return err;
    };

    // Submit Form Data
    const handleSubmit = async () => {
        if (validate()) return;

        const formData = new FormData();
        formData.append("restaurantid", restaurantId);
        formData.append("categoryname", CategoryName);
        formData.append("icon", iconPicture.bytes);
        formData.append("createdat", new Date().toISOString());
        formData.append("updatedat", new Date().toISOString());

        try {
            const response = await postData("category/submit_category", formData);

            if (response && response.status) {
                swal.fire({
                    icon: "success",
                    title: response.message,
                    showConfirmButton: false,
                    timer: 3000,
                });
                handleReset();
            } else {
                swal.fire({
                    icon: "error",
                    title: response?.message || "Submission failed!",
                    showConfirmButton: false,
                    timer: 3000,
                });
            }
        } catch (error) {
            console.error("Error submitting category:", error);
            swal.fire({
                icon: "error",
                title: "Submission failed!",
                text: "An unexpected error occurred. Please try again.",
                showConfirmButton: false,
                timer: 3000,
            });
        }
    };

    return (
        <div className={classes.root}>
            <div className={classes.box}>
                <TitleBar title="Category" url={'/admindashboard/displayallcategory'} />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            onFocus={() => handleError("restaurantId", "")}
                            error={Boolean(error.restaurantId)}
                            helperText={error.restaurantId}
                            value={restaurantId}
                            onChange={(e) => setRestaurantId(e.target.value)}
                            label="Restaurant ID"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            onFocus={() => handleError("CategoryName", "")}
                            error={Boolean(error.CategoryName)}
                            helperText={error.CategoryName}
                            value={CategoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            label="Category Name"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.center}>
                        <Avatar
                            alt="iconPicture"
                            src={iconPicture.file}
                            sx={{ width: 250, height: 250 }}
                            variant="rounded"
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.center}>
                        <Button
                            onFocus={() => handleError("iconPicture", "")}
                            variant="contained"
                            startIcon={<CloudUpload />}
                            component="label"
                            fullWidth
                        >
                            Upload Icon
                            <input type="file" onChange={handleIconChange} hidden />
                        </Button>
                        <div className={classes.errorText}>{error.iconPicture}</div>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={handleReset} fullWidth variant="contained">
                            Reset
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={handleSubmit} fullWidth variant="contained">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
