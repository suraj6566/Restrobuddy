import axios from "axios";

// ✅ URLs
const LOCAL = "http://localhost:5000";
const LIVE = process.env.REACT_APP_API_URL;
const DEFAULT_FOOD_IMAGE = "/picture.png";

// ✅ Auto switch (local dev vs production)
const serverURL =
  window.location.hostname === "localhost" ? LOCAL : LIVE;

// ✅ OTP Generator
function generateOtp() {
  return Math.floor(Math.random() * 900000) + 100000;
}

// ✅ GET API
async function getData(url) {
  try {
    const response = await axios.get(`${serverURL}/${url}`);
    return response.data;
  } catch (e) {
    console.error("GET ERROR:", e.message);

    return {
      data: [],
      message: "Server error, please try again...",
      status: false,
    };
  }
}

// ✅ POST API
async function postData(url, body) {
  try {
    const response = await axios.post(`${serverURL}/${url}`, body);
    return response.data;
  } catch (e) {
    console.error("POST ERROR:", e.message);

    if (e?.response?.status === 401) {
      return {
        data: [],
        message: "Mobile No or EmailId Already Exist...",
        status: false,
      };
    }

    return {
      data: [],
      message: "Server error, please try again...",
      status: false,
    };
  }
}

// ✅ IMAGE HELPER (🔥 MOST IMPORTANT)
function getImageUrl(imagePath) {
  if (!imagePath) return DEFAULT_FOOD_IMAGE;

  const trimmedPath = `${imagePath}`.trim();

  if (!trimmedPath) return DEFAULT_FOOD_IMAGE;
  if (/^https?:\/\//i.test(trimmedPath)) return trimmedPath;
  if (trimmedPath.startsWith("/uploads/")) return `${serverURL}${trimmedPath}`;
  if (trimmedPath.startsWith("/images/")) return `${serverURL}${trimmedPath}`;
  if (trimmedPath.startsWith("/")) return trimmedPath;

  return `${serverURL}/images/${trimmedPath}`;
}

function handleImageError(event) {
  event.currentTarget.onerror = null;
  event.currentTarget.src = DEFAULT_FOOD_IMAGE;
}

export {
  serverURL,
  DEFAULT_FOOD_IMAGE,
  getData,
  postData,
  generateOtp,
  getImageUrl,
  handleImageError,
};
