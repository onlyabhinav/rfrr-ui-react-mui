import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";

function valuetext(value: number) {
  return `${value}°C`;
}

export default function AgeSlider(props: any) {
  const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    //console.log("newValue", newValue);

    props.onItemSelect(newValue as number[]);

    setValue(newValue as number[]);
  };

  return (
    <Box sx={{ mt: 4, mr: 1, ml: 2, width: 300 }}>
      {/* <Typography component="caption" variant="caption" width="100%">
        Min age {value[0]} - Max age {value[1]}
      </Typography> */}
      <Slider
        disabled={props.disabled}
        size="small"
        min={18}
        getAriaLabel={() => "Age range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="on"
        getAriaValueText={valuetext}
      />
    </Box>
  );
}
