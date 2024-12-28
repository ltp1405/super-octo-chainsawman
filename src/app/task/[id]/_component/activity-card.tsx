import { Activity, ActivityType } from "@/data/activity";
import { MoreVertOutlined } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Container,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import { green, red } from "@mui/material/colors";

function CommentContent({ comment }: { comment: Activity }) {
  return (
    <>
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {comment.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing></CardActions>
    </>
  );
}

function MeasureableReportContent({ report }: { report: Activity }) {
  return (
    <>
      <CardContent>
        <Chip sx={{ marginBottom: 1 }} label="Report" variant="outlined" />
        <Typography align="center" variant="h4" sx={{ color: "text.secondary" }}>
          {report.content + " report"}
        </Typography>
      </CardContent>
      <CardActions disableSpacing></CardActions>
    </>
  );
}

function NonMeasureableReportContent({ report }: { report: Activity }) {
  const ProgressBar = () => {
    if (!report.progress) {
      return null;
    }
    return (
      <LinearProgress
        variant="determinate"
        value={report.progress * 100}
        sx={{ height: 20 }}
      />
    );
  };
  return (
    <>
      <CardContent>
        <Chip sx={{ marginBottom: 1 }} label="Report" variant="outlined" />
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {report.content}
        </Typography>
        <ProgressBar />
      </CardContent>
      <CardActions disableSpacing></CardActions>
    </>
  );
}

export default function ActivityCard({ activity }: { activity: Activity }) {
  function ReportContent({ activity }: { activity: Activity }) {
    if (activity.type === ActivityType.COMMENT) {
      return <CommentContent comment={activity} />;
    }
    if (activity.type === ActivityType.MEASURABLE_REPORT) {
      return <MeasureableReportContent report={activity} />;
    }
    return <NonMeasureableReportContent report={activity} />;
  }

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
      <ReportContent activity={activity} />
      <CardActions disableSpacing></CardActions>
    </Card>
  );
}
