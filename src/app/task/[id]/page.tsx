"use client";

import {
  AccessTimeOutlined,
  ChatSharp,
  DocumentScanner,
  Face5Outlined,
  FormatAlignLeft,
  MoreVertOutlined,
  Send,
  Task,
  Verified,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  LinearProgress,
  Modal,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useEffect } from "react";
import TaskReportForm from "./_component/task-report";
import ActivityCard from "./_component/activity-card";
import { Activity, ActivityType } from "@/data/activity";

function ActivityBox({ activities }: { activities: Activity[] }) {
  return (
    <Box sx={{ m: 2 }}>
      <Stack direction="row" spacing={2} alignItems={"flex-start"}>
        <ChatSharp fontSize="large" />
        <Typography variant="subtitle1">Activities</Typography>
      </Stack>
      <Stack direction="row" spacing={2} alignItems={"center"} sx={{ m: 1 }} />
      <Stack spacing={2}>
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </Stack>
    </Box>
  );
}

function TaskDetail({ task }: { task: Task }) {
  const getProgressColor = (progress: number) => {
    if (progress < 0.3) return "var(--progress-low)"; // Low progress color
    if (progress < 0.7) return "var(--progress-medium)"; // Medium progress color
    return "var(--progress-high)"; // High progress color
  };
  return (
    <Box sx={{ m: 2 }}>
      <Typography
        sx={{
          mt: 2,
          mb: 2,
          color: "var(--primary-color)",
        }}
        variant="h4"
      >
        {task.name}
      </Typography>

      <Stack direction="row" spacing={2} alignItems={"flex-start"}>
        <FormatAlignLeft fontSize="large" />
        <Card
          sx={{
            position: "relative",
            width: "100%",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            overflowWrap: "break-word",
            m: 2,
          }}
          variant="outlined"
        >
          <CardContent>{task.description}</CardContent>
        </Card>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ m: 2 }}>
        <AccessTimeOutlined fontSize="large" />
        <Typography variant="body1">{task.deadline}</Typography>
      </Stack>
      <Stack direction="row" spacing={2} alignItems={"center"} sx={{ m: 2 }}>
        <Face5Outlined fontSize="large" />
        <Typography variant="body1">{task.assignee}</Typography>
      </Stack>
      <Stack direction="row" spacing={2} alignItems={"center"} sx={{ m: 2 }}>
        <Verified fontSize="large" />
        <Typography variant="subtitle1">Objective</Typography>
      </Stack>
      <Box sx={{ m: 2 }}>
        <LinearProgress
          variant="determinate"
          value={task.progress * 100}
          sx={{
            bgcolor: "var(--progress-background)",
            height: 20,
            borderRadius: 5,
            "& .MuiLinearProgress-bar": {
              bgcolor: getProgressColor(task.progress),
            },
          }}
        />
      </Box>
      <ActivityBox activities={task.activities} />
    </Box>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  Ptransform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function BasicModal({
  open,
  handleClose,
  handleSubmit,
}: {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (value: string) => void;
}) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const report = formJson.report;
            handleSubmit(report);
            handleClose();
          },
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle id="modal-modal-title">Report</DialogTitle>
        <DialogContent>
          <TextField name="report" fullWidth label="How much" type="number" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function BottomBar({
  onReportClick,
  onMessageSend,
}: {
  onReportClick: () => void;
  onMessageSend: (data: string) => void;
}) {
  return (
    <AppBar
      position="fixed"
      sx={{ top: "auto", bottom: 0, bgcolor: "primary.main" }}
    >
      <form
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          const message = formJson.message;
          onMessageSend(message);
        }}
      >
        <Toolbar>
          <Icon>
            <Face5Outlined />
          </Icon>
          <TextField
            hiddenLabel
            placeholder="Add a comment"
            multiline
            name="message"
            id="filled-hidden-label-small"
            variant="filled"
            size="small"
            sx={{ flexGrow: 1, m: 2 }}
          />
          <IconButton onClick={onReportClick}>
            <DocumentScanner />
          </IconButton>
          <IconButton type="submit">
            <Send />
          </IconButton>
        </Toolbar>
      </form>
    </AppBar>
  );
}

const initialData = {
  id: 1,
  name: "My Task",
  description: "Some description",
  progress: 0.7,
  deadline: "10/2/2024",
  assignee: "LTP",
  activities: [
    {
      id: 1,
      content: "activity1",
      type: ActivityType.COMMENT,
      author: "LTP",
      created_at: "2024",
    },
    {
      id: 2,
      content: "activity2",
      author: "ltp",
      created_at: "2024",
      type: ActivityType.COMMENT,
    },
    {
      id: 5,
      content: "report",
      author: "ltp",
      created_at: "2024",
      type: ActivityType.NON_MEASURABLE_REPORT,
    },
    {
      id: 4,
      content: "report",
      author: "ltp",
      created_at: "2024",
      progress: 0.5,
      type: ActivityType.NON_MEASURABLE_REPORT,
    },
    {
      id: 3,
      content: "50",
      author: "ltp",
      created_at: "2024",
      type: ActivityType.MEASURABLE_REPORT,
    },
  ],
};

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [reportFormOpen, setReportFormOpen] = React.useState(false);
  const [data, setData] = React.useState<Task | null>(null);
  useEffect(() => {
    setData(initialData);
  }, [1]);
  const TaskDetailView = ({ task }: { task: Task | null }) => {
    if (!task) {
      return <div>Loading...</div>;
    }
    return <TaskDetail task={task} />;
  };
  return (
    <>
      <TaskDetailView task={data} />
      <Box>
        <BasicModal
          open={reportFormOpen}
          handleClose={() => setReportFormOpen(false)}
          handleSubmit={(value) => {
            if (!data) {
              return;
            }
            const newActivity = {
              id: data.activities.length + 1,
              type: ActivityType.MEASURABLE_REPORT,
              author: "LTP",
              created_at: "2024",
              content: value,
            };
            const newData = {
              ...data,
              activities: [...data.activities, newActivity],
            };
            setData(newData);
          }}
        />
        <BottomBar
          onReportClick={() => {
            setReportFormOpen(true);
          }}
          onMessageSend={(message) => {
            if (!data) {
              return;
            }
            const newActivity = {
              id: data.activities.length + 1,
              author: "LTP",
              type: ActivityType.COMMENT,
              created_at: "2024",
              content: message,
            };
            const newData = {
              ...data,
              activities: [...data.activities, newActivity],
            };
            console.log(newData);
            setData(newData);
          }}
        />
      </Box>
    </>
  );
}
