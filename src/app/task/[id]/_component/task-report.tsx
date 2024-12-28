import { Box, Card, TextField } from "@mui/material";

export default function TaskReportForm({
  type = "quality" as "quality" | "quantity",
  onSubmit,
}: {
  type: "quality" | "quantity";
  onSubmit: (value: string) => void;
}) {
  if (type === "quality") {
    return (
      <Box p={2}>
        <TextField
          name="report"
          fullWidth
          label="Quality"
          multiline
          variant="outlined"
        />
      </Box>
    );
  }
  return (
    <Box p={2}>
      <TextField
        name="report"
        fullWidth
        type="number"
        label="Quantity"
        variant="outlined"
      />
    </Box>
  );
}
