import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SpeedIcon from '@mui/icons-material/Speed';
import FoodComponent from './FoodComponent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function OrderOnlineFood({ data,refresh,setRefresh }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div style={{ width: "60%" }}>
      <h2
        style={{
          marginLeft: matches ? "18%" : "5%",
          fontSize: "20px",
          fontWeight: 550,
        }}
      >
        Order Online
      </h2>

      <div style={{ width: "100%", marginLeft: matches ? "17%" : "5%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: "#777",
            width: "70%",
            marginBottom: "2%",
          }}
        >
          <SpeedIcon style={{ fontSize: "18px", marginRight: 5 }} />
          <span style={{ fontSize: "14px" }}>Live track your order</span>
          <span
            style={{
              margin: "0 8px",
              color: "rgb(130, 130, 130)",
              fontSize: "14px",
            }}
          >
            |
          </span>
          <AccessTimeIcon style={{ fontSize: "18px", marginRight: 5 }} />
          <span style={{ fontSize: "14px" }}>{data[0]?.time}</span>
        </div>
      </div>

      <div
        style={{
          marginLeft: matches ? "18%" : "5%",
          fontSize: "20px",
          fontWeight: 600,
        }}
      >
        Wednesday KFC Epic Deals (upto 52% Off)
      </div>

      {data.map((item, index) => {

        return <FoodComponent item={item} refresh={refresh} setRefresh={setRefresh} data={data} /> }
      )}

     
    </div>
  );
}
