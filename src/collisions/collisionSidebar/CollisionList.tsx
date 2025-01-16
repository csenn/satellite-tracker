import { Box } from "@mui/material";
import { ICollision, ISatellite } from "../../getSatelliteLocations";
import dayjs from "dayjs";

function SatId({ name, id }: { name: string; id: string }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
      <Box>{name}</Box>
      <Box sx={{ color: "rgb(100,100,100)", fontSize: "12px" }}>[{id}]</Box>
    </Box>
  );
}

type SatelliteListProps = {
  collisionData: ICollision[];
  onClickCollision: (collision: ICollision | null) => void;
  selectedCollision: ICollision | null;
  satelliteLookup: Record<string, ISatellite>;
};

export function CollisionList({
  // satellites,
  collisionData,
  onClickCollision,
  selectedCollision,
  satelliteLookup,
  // onClickSatellite,
  // satelliteData,
}: SatelliteListProps) {
  // const { setCameraPosition } = useSatelliteStore();

  // const filteredSatellites = take(
  //   sortBy(
  //     satelliteData.filter((satellite) => {
  //       if (exclude.has(satellite.OBJECT_NAME)) {
  //         return false;
  //       }
  //       if (search === "") {
  //         return true;
  //       }
  //       return (
  //         satellite.OBJECT_NAME.toLowerCase().includes(search.toLowerCase()) ||
  //         satellite.OBJECT_ID.toLowerCase().includes(search.toLowerCase()) ||
  //         satellite.NORAD_CAT_ID.toLowerCase().includes(search.toLowerCase())
  //       );
  //     }),
  //     "OBJECT_NAME",
  //     "asc",
  //   ),
  //   100,
  // );

  const onSelectCollision = (collision: ICollision) => {
    onClickCollision(collision);
    // onClickSatellite(satellite);
    // const positionAndVelocity = getSatellitePositionAtCurrentTime(satellite);
    // if (positionAndVelocity) {
    //   const { x, y, z } = positionAndVelocity.position;
    //   const vector = new Vector3(x, y, z);
    //   setCameraPosition(scaleVector(vector));
    // }
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* <Box sx={{ padding: "5px", borderBottom: "1px solid rgb(230,230,230)" }}>
        <TextField
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          size="small"
          // sx={{ width: "100%" }}
        />
        <Box
          sx={{ fontSize: "12px", color: "rgb(100,100,100)", padding: "3px 0" }}
        >
          {satelliteData.length} total satellites
        </Box>
      </Box> */}
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
