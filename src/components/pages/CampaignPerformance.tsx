import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

export default function CampaignPerformance() {
  return (
    <Paper sx={{ maxWidth: 4000, margin: "auto", overflow: "hidden" }}>
      <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}>
        <Button variant="outlined" color="info">
          CAMPAIGN PERFORMANCE
        </Button>
      </AppBar>
    </Paper>
  );
}
