"use client";

import {
  Add,
  ArrowCircleLeftTwoTone,
  ArrowCircleRightOutlined,
  ArrowForwardIosOutlined,
  ArrowForwardIosTwoTone,
  ArrowRight,
  ArrowRightAltSharp,
  ArrowRightOutlined,
  ArrowRightRounded,
  BeachAccessOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  Checkbox,
  Container,
  Fab,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function TaskListItem({ task }: { task: TaskOverview }) {
  const router = useRouter();
  return (
    <ListItem
      onClick={() => {}}
      key={task.id}
      secondaryAction={
        <Checkbox
          edge="end"
          checked={true}
          tabIndex={-1}
          disableRipple
          // inputProps={{ 'aria-labelledby': labelId }}
        />
      }
      disablePadding
    >
      <ListItemButton
        role={undefined}
        onClick={() => router.push(`/task/${task.id}`)}
        dense
      >
        <ListItemText primary={task.name} />
      </ListItemButton>
    </ListItem>
  );
}

function TaskList({ tasks }: { tasks: TaskOverview[] }) {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
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
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function Page() {
  const [open, setOpen] = React.useState(false);
  const slotProp = {
    inputLabel: { shrink: true },
  };
  return (
    <div>
      <Typography variant="h3" alignContent={"center"}>
        Tasks
      </Typography>
      <TaskList
        tasks={[
          { id: 1, name: "Hello", progress: 0.5 },
          { id: 2, name: "World", progress: 0.7 },
          { id: 3, name: "World", progress: 0.7 },
          { id: 4, name: "World", progress: 0.7 },
        ]}
      />
      <Fab sx={fabStyle} color="primary" onClick={() => setOpen(true)}>
        <Add />
      </Fab>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Container sx={style}>
          <Stack spacing={2} alignItems="center">
            <Typography variant="h3">Create Task</Typography>
            <TextField label="Name" fullWidth slotProps={slotProp} />
            <TextField multiline label="Description" fullWidth slotProps={slotProp} />
            <TextField
              label="Finished"
              type="date"
              fullWidth
              slotProps={slotProp}
            />
            <Button>Create</Button>
          </Stack>
        </Container>
      </Modal>
    </div>
  );
}
