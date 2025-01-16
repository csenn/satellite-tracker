import { Box, Button } from "@mui/material";
import { ICollision } from "../../getSatelliteLocations";
import dayjs from "dayjs";

type CollisionDetailsProps = {
  selectedCollision: ICollision | null;
  onClearCollision: () => void;
};

export function CollisionDetails({ selectedCollision, onClearCollision }: CollisionDetailsProps) {
  if (!selectedCollision) {
    return null;
  }

  console.log('asd', selectedCollision)

  return(
    <Box sx={{padding: '10px'}}>
      <Button onClick={onClearCollision}>Clear</Button>
      <Box>
        Date: {dayjs(selectedCollision?.collisionDate).format('DD/MM/YYYY HH:mm:ss')}
      </Box>
      <Box>
        Distance: {selectedCollision.distance.toFixed(3)} km
      </Box>
      <Box>
        Satellite One: {selectedCollision.sat1}
      </Box>
      <Box>
        Satellite Two: {selectedCollision.sat2}
      </Box>
      {/* {JSON.stringify(selectedCollision)} */}
    </Box>


  )
}
