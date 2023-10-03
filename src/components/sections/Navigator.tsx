import * as React from "react";
import { useEffect } from "react";
import Divider from "@mui/material/Divider";
import Drawer, { DrawerProps } from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GitHubIcon from "@mui/icons-material/GitHub";

import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import GridViewIcon from "@mui/icons-material/GridView";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewListIcon from "@mui/icons-material/ViewList";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { Link, NavLink, useNavigate } from "react-router-dom";

const categories = [
  {
    id: "Campaigns",
    children: [
      {
        id: "createcampaign",
        label: "Create Campaign",
        icon: <AddCircleIcon />,
        active: true,
      },
      {
        id: "managecampaign",
        label: "Manage Campaign",
        icon: <ViewListIcon />,
      },
      {
        id: "campaignperformance",
        label: "Campaign Performance",
        icon: <MonitorHeartIcon />,
      },
    ],
  },
  {
    id: "Customers",
    children: [
      {
        id: "mngcustlist",
        label: "Manage Customer List",
        icon: <SupervisedUserCircleIcon />,
      },
      {
        id: "editcustlist",
        label: "Edit Customer List",
        icon: <GroupAddIcon />,
      },
    ],
  },
];

const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1.5,
  px: 3,
};

export default function Navigator(props: DrawerProps) {
  const { ...other } = props;
  const navigate = useNavigate();

  const [selectedChild, setSelectedChild] = React.useState("createcampaign");

  useEffect(() => {
    // const path = window.location.pathname;
    //    const childId = path.split("/")[1];
    setSelectedChild("createcampaign");
    navigate("createcampaign");
  }, []);

  const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, childId: string) => {
    setSelectedChild(childId);
    navigate(childId);
  };

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: "#fff" }}>MyCampaign</ListItem>
        <ListItemButton sx={{ ...item, ...itemCategory }} onClick={() => navigate("createcampaign")}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
        </ListItemButton>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: "#101F33" }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: "#fff" }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, label, icon, active }) => (
              <ListItem disablePadding key={childId}>
                {/* <ListItemButton sx={item} onClick={() => navigate(childId)}> */}
                <ListItemButton
                  sx={item}
                  selected={selectedChild === childId}
                  onClick={(event) => handleListItemClick(event, childId)}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{label}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}

        <ListItemButton sx={{ ...item, ...itemCategory }}>
          <ListItemIcon>
            <GitHubIcon />
          </ListItemIcon>
          <ListItemText>Source Code</ListItemText>
        </ListItemButton>
      </List>
    </Drawer>
  );
}
