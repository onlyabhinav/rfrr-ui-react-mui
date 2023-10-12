import AppBar from "@mui/material/AppBar";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CreateCampaignForm from "../controls/CreateCampaignForm";

export default function CampaignCreate() {
  return (
    <Paper sx={{ margin: "auto", overflow: "hidden", borderRadius: 0 }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
          backgroundColor: "#90caf9",
        }}
      >
        <Typography variant="h3" component="h3" align="center" padding={2}>
          Create Campaign
        </Typography>
      </AppBar>

      <CreateCampaignForm />
    </Paper>
  );
}
