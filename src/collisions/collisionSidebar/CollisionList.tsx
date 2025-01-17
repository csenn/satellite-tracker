import { Box } from "@mui/material";
import { ICollision, ISatellite } from "../../utils/loadData";
import dayjs from "dayjs";
import { SatId } from "./SatelliteId";
import {
  convertEciVecToThreeVec,
  getSatellitePosition,
  scaleVector,
} from "../../utils/calcUtils";
import { useSatelliteStore } from "../../utils/store";

type SatelliteListProps = {
  collisionData: ICollision[];
  onClickCollision: (collision: ICollision | null) => void;
  selectedCollision: ICollision | null;
  satelliteLookup: Record<string, ISatellite>;
};

export function CollisionList({
  collisionData,
  onClickCollision,
  satelliteLookup,
}: SatelliteListProps) {
  const { setCameraPosition, setCollisionTime } = useSatelliteStore();

  const onSelectCollision = (collision: ICollision) => {
    onClickCollision(collision);

    const satelliteOne = satelliteLookup[collision.sat1];

    const positionAndVelocity = getSatellitePosition(
      satelliteOne,
      collision.collisionDate,
    );

    if (!positionAndVelocity) return;

    const { position } = positionAndVelocity;

    setCollisionTime(collision.collisionDate);
    setCameraPosition(scaleVector(convertEciVecToThreeVec(position)));
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ flexGrow: 1, overflowY: "scroll" }}>
        {collisionData.map((collision) => (
          <Box
            sx={{
              borderBottom: "1px solid rgb(230,230,230)",
              cursor: "pointer",
              padding: "2px 5px",
            }}
            onClick={() => onSelectCollision(collision)}
          >
            <SatId
              name={satelliteLookup[collision.sat1].OBJECT_NAME}
              id={collision.sat1}
            />
            <SatId
              name={satelliteLookup[collision.sat2].OBJECT_NAME}
              id={collision.sat2}
            />

            <Box
              sx={{
                display: "flex",
                paddingTop: "2px",
                alignItems: "center",
                color: "rgb(100,100,100)",
                fontSize: "14px",
                justifyContent: "space-between",
              }}
            >
              <Box>
                {dayjs(collision?.collisionDate).format("MM/DD/YYYY HH:mm:ss")}
              </Box>
              <Box>{collision.distance.toFixed(3)} km distance</Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
