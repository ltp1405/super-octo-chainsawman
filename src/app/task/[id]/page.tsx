import {
  AccessTimeOutlined,
  AlignHorizontalLeft,
  DocumentScanner,
  Face2Rounded,
  Face5Outlined,
  FavoriteBorderOutlined,
  FormatAlignLeft,
  LockClockOutlined,
  MoreVertOutlined,
  PunchClockOutlined,
  Send,
  ShareOutlined,
  Task,
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
  Collapse,
  Icon,
  IconButton,
  LinearProgress,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";

function ActivityItem({ activity }: { activity: Activity }) {
  return (
    <Card variant="outlined">
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
      <CardActions disableSpacing>
        {/* <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore> */}
      </CardActions>
      {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse> */}
    </Card>
  );
}

function ActivityBox({ activities }: { activities: Activity[] }) {
  return (
    <>
      <Typography variant="h6">Activities</Typography>
      <Stack spacing={2}>
        {activities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </Stack>
    </>
  );
}

function TaskDetail({ task }: { task: Task }) {
  return (
    <Stack>
      <Typography variant="h2">{task.name}</Typography>
      <Stack direction="row" spacing={2} alignItems={"flex-start"}>
          <FormatAlignLeft fontSize="large"/>
        <Card variant="outlined">
          <CardContent>{task.description}</CardContent>
        </Card>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
          <AccessTimeOutlined fontSize="large"/>
        <Typography variant="body1">{task.deadline}</Typography>
      </Stack>
      <Stack direction="row" spacing={2} alignItems={"center"}>
          <Face5Outlined fontSize="large"/>
        <Typography variant="body1">{task.assignee}</Typography>
      </Stack>
      <Stack direction="row" spacing={2} alignItems={"center"}>
        <Verified fontSize="large"/>
        <Typography variant="h6">Objective</Typography>
        </Stack>
    <LinearProgress variant="determinate" value={task.progress * 100} />
      <ActivityBox activities={task.activities} />
    </Stack>
  );
}

function BottomBar() {
  return (
    <AppBar position="fixed" sx={{ top: "auto", bottom: 0 }}>
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
        />
        <Box sx={{ flexGrow: 1 }} />
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
    <>
      <TaskDetail
        task={{
          id: 1,
          name: "hello",
          description: "longText",
          progress: 0.5,
          deadline: "10/2/2024",
          assignee: "LTP",
          activities: [
            { id: 1, content: "activity1", author: "LTP", created_at: "2024" },
            { id: 2, content: "activity2", author: "LTP", created_at: "2024" },
          ],
        }}
      />
      <BottomBar />
    </>
  );
}
