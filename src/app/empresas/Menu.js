'use client'
import Link from "next/link";
import * as React from "react";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import { Typography } from "@mui/material";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";

export default function Menu() {
  return (
    <List
      sx={{
        maxWidth: 320,
      }}
    >
      <Typography className="mt-4 ml-4">Secciones</Typography>

      <ListItem>
        <ListItemButton>
          <ListItemDecorator>
            <PermContactCalendarIcon />
            <Link href="/empresas/proyectos">
              <p>Empresas</p>
            </Link>
          </ListItemDecorator>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <ListItemDecorator>
            <DirectionsCarIcon />
            <Link href="#">
              <p>Módulos</p>
            </Link>
          </ListItemDecorator>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <ListItemDecorator>
            <PermContactCalendarIcon />
            <Link href="#">
              <p>Licencias</p>
            </Link>
          </ListItemDecorator>
        </ListItemButton>
      </ListItem>
    </List>
  );
}
