import { Box } from "@mui/material";

export function DataLabel({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", padding: "5px 0 0 5px" }}>
      <Box
        sx={{ fontSize: "15px", color: "rgb(100,100,100)", marginRight: "5px" }}
      >
        {label}:
      </Box>
      <Box>{value}</Box>
    </Box>
  );
}
