import {
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
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

function TaskListItem({ name }: { name: string }) {
  return (
    <ListItem
      onClick={() => {}}
      key={name}
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
      <ListItemButton role={undefined} onClick={() => {}} dense>
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
  );
}

export default function TaskList({ tasks }: { tasks: [string] }) {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {tasks.map((value) => (
        <TaskListItem name={value} />
      ))}
    </List>
  );
}
