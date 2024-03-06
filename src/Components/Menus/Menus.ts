import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ClassIcon from '@mui/icons-material/Class';
import DevicesIcon from '@mui/icons-material/Devices';
import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';


export const menus = [
  {
    path: "/",
    Icon: DashboardRoundedIcon,
    title: "Dashboard",
    roles: ["superAdmin", "admin", "user", "viewer"],
  },
  {
    path: "/Assets",
    Icon: ClassIcon,
    title: "Assets",
    roles: ["superAdmin", "admin", "user", "viewer"],
  },
  {
    path: "/Devices",
    Icon: DevicesIcon,
    title: "Devices",
    roles: ["superAdmin", "admin", "user", "viewer"],
  },
  {
    path: "/Orders",
    Icon: ChecklistRoundedIcon,
    title: "Orders",
    roles: ["superAdmin", "admin", "user", "viewer"],
  },
  {
    path: "/UserManagement",
    Icon: PeopleAltRoundedIcon,
    title: "User Management",
    roles: ["superAdmin", "admin"],
  },
];
