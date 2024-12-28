"use client";

import {
  ArrowDownwardRounded,
  KeyboardArrowDownOutlined,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Collapse,
  IconButton,
  IconButtonProps,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import TaskAssessCard from "./_components/task-assess-card";

function TaskItem({task}: { task: TaskAssessOverview }) {
  return (
    <ListItem>
      <TaskAssessCard task={task}/>
    </ListItem>
  );
}

function AccompishedTaskList(props: { tasks: TaskAssessOverview[] }) {
  return (
    <Accordion disableGutters>
      <AccordionSummary expandIcon={<KeyboardArrowDownOutlined />}>
        Accomplished Tasks {props.tasks.length}
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {props.tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}

export default function Page() {
  return (
    <>
      <Stack>
        <Typography variant="h3">Self-Assessment</Typography>
        <Typography variant="caption">
          This is a self-assessment page
        </Typography>
        <Collapse></Collapse>
        <AccompishedTaskList
          tasks={[
            { id: 1, name: "Task 1", progress: 100 },
            { id: 2, name: "Task 2", progress: 100 },
            { id: 3, name: "Task 3", progress: 70 },
          ]}
        />
        <Typography variant="h6">Review</Typography>
        <TextField placeholder="Write your review" multiline hiddenLabel />
      </Stack>
    </>
  );
}
