"use client";

import { Add, MoreVertSharp } from "@mui/icons-material";
import {
  Button,
  Container,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Modal,
  Stack,
  TextField,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function TaskListItem({ task }: { task: TaskOverview }) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Determine the color based on progress using CSS variables
  const getProgressColor = (progress: number) => {
    if (progress < 0.3) return "var(--progress-low)"; // Low progress color
    if (progress < 0.7) return "var(--progress-medium)"; // Medium progress color
    return "var(--progress-high)"; // High progress color
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); // Open the menu
  };

  const handleClose = () => {
    setAnchorEl(null); // Close the menu
  };

  const handleAction = (action: string) => {
    // Handle quick actions here based on the selected action
    switch (action) {
      case "edit":
        router.push(`/task/${task.id}/edit`);
        break;
      case "delete":
        console.log(`Deleting task ${task.id}`);
        // Perform delete operation
        break;
      case "complete":
        console.log(`Marking task ${task.id} as complete`);
        // Mark task as complete operation
        break;
      default:
        break;
    }
    handleClose(); // Close the menu after action
  };

  return (
    <ListItem
      key={task.id}
      sx={{
        position: "relative",
        border: "1px solid var(--border-color)",
        borderRadius: "10px",
        marginBottom: "16px",
        overflow: "hidden",
        boxShadow: "0px 4px 8px var(--shadow-color)",
      }}
      // Add a secondary action to perform quick actions (triple dots)
      secondaryAction={
        <IconButton edge="end" aria-label="more" onClick={handleClick}>
          <MoreVertSharp />
        </IconButton>
      }
    >
      {/* Progress Bar Background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: `${task.progress * 100}%`, // Fill based on progress
          backgroundColor: getProgressColor(task.progress),
          zIndex: 1,
          transition: "width 0.3s ease",
        }}
      ></div>

      {/* Task Content */}
      <ListItemButton
        role={undefined}
        dense
        sx={{
          // Match the parent size
          position: "relative",
          zIndex: 2,
          backgroundColor: "transparent",
          color: "var(--text-color)",
          display: "flex",
          alignItems: "center", // Align text and icon on the same line
          width: "100%", // Ensure the button spans the entire width
          height: "100%", // Ensure the button spans the entire height
          borderRadius: "10px", // Ensure rounded corners for the whole button
        }}
        onClick={() => router.push(`/task/${task.id}`)}
      >
        <ListItemText
          sx={{
            "& .MuiListItemText-primary": {
              fontSize: "1.2rem",
              fontWeight: "400",
              color: "var(--text-color)",
            },
          }}
          primary={task.name}
        />
      </ListItemButton>

      {/* Action Menu */}
      <Menu
        sx={{ borderRadius: "10px" }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleAction("edit")}>Edit</MenuItem>
        <MenuItem onClick={() => handleAction("delete")}>Delete</MenuItem>
        <MenuItem onClick={() => handleAction("complete")}>
          Mark as Complete
        </MenuItem>
      </Menu>
    </ListItem>
  );
}

function TaskList({ tasks }: { tasks: TaskOverview[] }) {
  return (
    <List sx={{ width: "100%", bgcolor: "var(--background-color)", p: 2 }}>
      {tasks.map((task) => (
        <TaskListItem key={task.id} task={task} />
      ))}
    </List>
  );
}

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
  backgroundColor: "var(--primary-color)",
  color: "var(--text-color)",
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  borderRadius: "10px",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "var(--card-background)",
  border: "2px solid var(--border-color)",
  boxShadow: "0px 4px 8px var(--shadow-color)",
  p: 4,
};
export default function Page() {
  const [open, setOpen] = React.useState(false);
  const slotProp = {
    inputLabel: { shrink: true },
  };
  return (
    <div>
      <Typography
        variant="h4"
        align="center"
        sx={{
          mt: 2,
          mb: 2,
          fontWeight: "bold",
          color: "var(--primary-color)",
        }}
      >
        My Tasks
      </Typography>
      <TaskList
        tasks={[
          { id: 1, name: "Hello", progress: 0.5 },
          { id: 2, name: "World", progress: 0.7 },
          { id: 3, name: "World", progress: 0.7 },
          { id: 4, name: "World", progress: 0.7 },
          { id: 5, name: "World", progress: 0.2 },
        ]}
      />
      <Fab sx={fabStyle} onClick={() => setOpen(true)}>
        <Add />
      </Fab>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Container sx={style}>
          <Stack spacing={2} alignItems="center">
            <Typography variant="h4" color="var(--text-color)">
              Create Task
            </Typography>
            <TextField label="Name" fullWidth slotProps={slotProp} />
            <TextField
              multiline
              label="Description"
              fullWidth
              slotProps={slotProp}
            />
            <TextField
              label="Finished"
              type="date"
              fullWidth
              slotProps={slotProp}
            />
            <Button
              sx={{
                backgroundColor: "var(--primary-color)",
                color: "var(--text-color)",
                "&:hover": {
                  backgroundColor: "var(--button-hover)",
                },
              }}
            >
              Create
            </Button>
          </Stack>
        </Container>
      </Modal>
    </div>
  );
}
