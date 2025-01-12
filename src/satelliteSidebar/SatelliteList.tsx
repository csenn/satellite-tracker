import { Box, TextField } from "@mui/material";
import { ISatellite } from "../getSatelliteLocations";
import { useState } from "react";
import { sortBy, take } from "lodash";
import {
  getDistanceFromEarth,
  getSatellitePositionAtCurrentTime,
} from "../calcUtils";

const exclude = new Set(["TBA - TO BE ASSIGNED"]);

type SatelliteListProps = {
  satelliteData: ISatellite[];
  onClickSatellite: (satellite: ISatellite | null) => void;
};

export function SatelliteList({
  // satellites,
  onClickSatellite,
  satelliteData,
}: SatelliteListProps) {
  const [search, setSearch] = useState("");

  const filteredSatellites = take(
    sortBy(
      satelliteData.filter((satellite) => {
        if (exclude.has(satellite.OBJECT_NAME)) {
          return false;
        }
        if (search === "") {
          return true;
        }
        return (
          satellite.OBJECT_NAME.toLowerCase().includes(search.toLowerCase()) ||
          satellite.OBJECT_ID.toLowerCase().includes(search.toLowerCase())
        );
      }),
      "OBJECT_NAME",
      "asc",
    ),
    100,
  );

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ padding: "5px", borderBottom: "1px solid rgb(230,230,230)" }}>
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
      </Box>
      <Box sx={{ flexGrow: 1, overflowY: "scroll" }}>
        {filteredSatellites.map((satellite, i) => (
          <Box
            sx={{
              borderBottom: "1px solid rgb(230,230,230)",
              cursor: "pointer",
              padding: "2px 5px",
            }}
            onClick={() => onClickSatellite(satellite)}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                // justifyContent: "space-between",
              }}
            >
              <Box>{satellite.OBJECT_NAME} </Box>
              <Box
                sx={{
                  fontSize: "11px",
                  color: "rgb(100,100,100)",
                  marginLeft: "5px",
                }}
              >
                [{satellite.OBJECT_ID}]
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                fontSize: "12px",
                color: "rgb(100,100,100)",
              }}
            >
              <Box>{satellite.COUNTRY_CODE}</Box>

              <Box sx={{ marginLeft: "15px" }}>
                {getDistanceFromEarth(
                  getSatellitePositionAtCurrentTime(satellite),
                ).toFixed(0)}{" "}
                km
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
