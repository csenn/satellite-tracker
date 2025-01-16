import { Box } from "@mui/material";

export function SatId({ name, id }: { name: string; id: string }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
      <Box>{name}</Box>
      <Box sx={{ color: "rgb(100,100,100)", fontSize: "12px" }}>[{id}]</Box>
    </Box>
  );
}
