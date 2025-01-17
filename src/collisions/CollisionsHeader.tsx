import { Box, Slider } from "@mui/material";
import { useSatelliteStore } from "../utils/store";
import dayjs from "dayjs";

export function CollisionsHeader() {
  const { collisionTime, selectedCollision, setCollisionTime } =
    useSatelliteStore();

  if (!selectedCollision || !collisionTime) {
    return null;
  }

  const collisionTimeValue = selectedCollision.collisionDate.getTime();
  const collisionTimeBefore = collisionTimeValue - 30 * 60 * 1000;
  const collisionTimeAfter = collisionTimeValue + 30 * 60 * 1000;
  const timeDifference = collisionTimeAfter - collisionTimeBefore;

  const marks = [
    {
      value: 0,
      label: dayjs(collisionTimeBefore).format("MM/DD/YYYY HH:mm:ss"),
    },

    {
      value: 50,
      label: dayjs(collisionTime).format("MM/DD/YYYY HH:mm:ss"),
    },

    {
      value: 100,
      label: dayjs(collisionTimeAfter).format("MM/DD/YYYY HH:mm:ss"),
    },
  ];

  const handleChange = (event: Event, newValue: number | number[]) => {
    console.log("newValue", newValue);

    const nextTime =
      collisionTimeBefore + ((newValue as number) / 100) * timeDifference;

    setCollisionTime(new Date(nextTime));
    // setValue(newValue as number);
  };

  const value =
    ((collisionTime.getTime() - collisionTimeBefore) / timeDifference) * 100;

  return (
    <Box sx={{ width: "65%", paddingRight: "80px" }}>
      <Slider
        value={value}
        onChange={handleChange}
        // getAriaValueText={valuetext}
        // step={10}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </Box>
  );
}
