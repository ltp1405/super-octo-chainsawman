import {
  AccessTimeOutlined,
  ChatSharp,
  DocumentScanner,
  Face5Outlined,
  FormatAlignLeft,
  MoreVertOutlined,
  Send,
  Verified,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Icon,
  IconButton,
  LinearProgress,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";

function ActivityItem({ activity }: { activity: Activity }) {
  return (
    <Card variant="outlined" sx={{ m: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {activity.author[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertOutlined />
          </IconButton>
        }
        title={activity.author}
        subheader={activity.created_at}
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {activity.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing></CardActions>
    </Card>
  );
}

function ActivityBox({ activities }: { activities: Activity[] }) {
  return (
    <Box sx={{ m: 2 }}>
      <Stack direction="row" spacing={2} alignItems={"flex-start"}>
        <ChatSharp fontSize="large" />
        <Typography variant="subtitle1">Activities</Typography>
      </Stack>
      <Stack direction="row" spacing={2} alignItems={"center"} sx={{ m: 1 }}/>
      <Stack spacing={2}>
        {activities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
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

function BottomBar() {
  return (
    <AppBar position="fixed" sx={{ top: "auto", bottom: 0, bgcolor: "primary.main" }}>
      <Toolbar>
        <Icon>
          <Face5Outlined />
        </Icon>
        <TextField
          hiddenLabel
          placeholder="Add a comment"
          multiline
          id="filled-hidden-label-small"
          variant="filled"
          size="small"
          sx={{ flexGrow: 1, m: 2 }}
        />
        <IconButton>
          <DocumentScanner />
        </IconButton>
        <IconButton>
          <Send />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Box>
      <TaskDetail
        task={{
          id: 1,
          name: "My Task",
          description: "Some description",
          progress: 0.7,
          deadline: "10/2/2024",
          assignee: "LTP",
          activities: [
            { id: 1, content: "activity1", author: "LTP", created_at: "2024" },
            { id: 2, content: "activity2", author: "LTP", created_at: "2024" },
          ],
        }}
      />
      <BottomBar />
    </Box>
  );
}
