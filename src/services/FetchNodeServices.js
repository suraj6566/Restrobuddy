import axios from "axios";

// ✅ URLs
const LOCAL = "http://localhost:5000";
const LIVE = process.env.REACT_APP_API_URL;

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
function getImageUrl(imageName) {
  if (!imageName) return "";

  return `${serverURL}/images/${imageName}`;
}

export { serverURL, getData, postData, generateOtp, getImageUrl };