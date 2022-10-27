import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PolicyIcon from "@mui/icons-material/Policy";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import "./style.css";
import { ButtonSide } from "../ButtonsSide/buttonSide";
import { PageContext } from "../../Providers/handlePage";
import { useContext } from "react";
import { Upload } from "../Upload";
import { TableReport } from "../Table/Table";
import { Policy } from "../Policy";

const drawerWidth = 240;

const themeMenu = createTheme({
  palette: {
    primary: {
      main: "#4d6477",
    },
  },
});

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Header({ a }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [select, setSelect] = React.useState("upload");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { page } = useContext(PageContext);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} color="inherit">
        <Toolbar>
          <IconButton
            theme={themeMenu}
            color="primary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon sx={{ color: "#e02550" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <div className="textInsideMenu">Módulo do Sistema</div>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <ButtonSide
          open={open}
          select={select}
          icon={<DriveFolderUploadIcon />}
          setSelect={setSelect}
          type={"upload"}
          text={"Upload de arquivo"}
        />

        <ButtonSide
          open={open}
          select={select}
          icon={<AssignmentIcon />}
          setSelect={setSelect}
          type={"relatorios"}
          text={"Relatório"}
        />

        <ButtonSide
          open={open}
          select={select}
          icon={<PolicyIcon />}
          setSelect={setSelect}
          type={"politicas"}
          text={"Políticas"}
        />
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          background: "#f8f9fa",
        }}
      >
        <DrawerHeader />
        <div className="container">
          {page === "upload" && <Upload />}
          {page === "relatorios" && <TableReport />}
          {page === "politicas" && <Policy />}
        </div>
      </Box>
    </Box>
  );
}
