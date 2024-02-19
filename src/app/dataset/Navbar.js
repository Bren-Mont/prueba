"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Logo from "@/app/assets/images-residential/logo_blanco.png";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Image from "next/image";
import { Grid } from "@mui/material";
import Avatar from "@mui/joy/Avatar";

export default function Navbar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="flex place-content-between bg-indigo-950">
          <Image
            src={Logo}
            alt="Logo"
            width="10"
            height="10"
            layout="responsive"
            style={{
              maxWidth: "100px",
              height: "auto",
            }}
          />
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            style={{marginRight:950}}
            sx={{ mr: 2 }}
            className="place-content-start"
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Avatar>JG</Avatar>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
