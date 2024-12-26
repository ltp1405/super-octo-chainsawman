import {
  AccessTimeOutlined,
  AlignHorizontalLeft,
  Face5Outlined,
  LockClockOutlined,
  PunchClockOutlined,
} from "@mui/icons-material";
import { Box, Card, CardContent, Icon, Stack, Typography } from "@mui/material";

function ActivityBox({ activities }: { activities: string[] }) {
  return (
    <Stack>
      <Typography variant="h6">Activities</Typography>
      {activities.map((activity) => (
        <Stack direction="row" spacing={2} alignItems="center">
          <Icon>
            <PunchClockOutlined />
          </Icon>
          <Typography variant="body1">{activity}</Typography>
        </Stack>
      ))}
    </Stack>
  );
}

export default function TaskDetail({
  name,
  description,
  deadline,
  assignee,
  activities = [],
}: {
  name: string;
  description: string;
  deadline: string;
  assignee: string;
  activities?: string[];
}) {
  return (
    <Stack>
      <Typography variant="h2">{name}</Typography>
      <Typography variant="h6">Description</Typography>
      <Stack direction="row" spacing={2} alignItems={"flex-start"}>
        <Icon>
          <AlignHorizontalLeft />
        </Icon>
        <Card variant="outlined">
          <CardContent>{description}</CardContent>
        </Card>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <Icon>
          <AccessTimeOutlined />
        </Icon>
        <Typography variant="body1">{deadline}</Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Icon>
          <Face5Outlined />
        </Icon>
        <Typography variant="body1">{assignee}</Typography>
      </Stack>
      <ActivityBox activities={activities} />
    </Stack>
  );
}
