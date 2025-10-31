import { useEffect, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

export default function PlusMinusComponent({qty,...props}) {
  const [value, setValue] = useState(0);

  useEffect(function(){
    setValue(qty)
  },[qty])

  const handlePlus = () =>{
    var c=value+1
     setValue(c);
     props.onChange(c)
  }
  const handleMinus = () => {
    var c=value
    if (c>=1)
      c=value-1
      setValue(c);
    props.onChange(c)
  };

  return (
    <>
      {value === 0 ? (
        <div
          onClick={handlePlus}
          style={{
            cursor:'pointer',
            background: "#6ab04c",
            borderRadius: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 60,  // fixed px
            height: 28,
            cursor: "pointer",
          }}
        >
          <span style={{ color: "#fff", fontWeight: "bold" }}>ADD</span>
        </div>
      ) : (
        <div
          style={{
            color: "#fff",
            fontWeight: "bold",
            background: "#6ab04c",
            borderRadius: 5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: 80,  // thoda bada
            height: 28,
          }}
        >
          <div
            onClick={handleMinus}
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <RemoveIcon />
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {value}
          </div>
          <div
            onClick={handlePlus}
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <AddIcon />
          </div>
        </div>
      )}
    </>
  );
}
