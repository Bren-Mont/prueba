'use client'
import Link from "next/link";
import * as React from "react";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import { Typography } from "@mui/material";
import ListItemButton from "@mui/joy/ListItemButton";
import PedalBikeIcon from '@mui/icons-material/PedalBike';
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
            <PedalBikeIcon className="mr-2" />
            <Link href="/reportes/bicicletas">
              <p>Bicicletas</p>
            </Link>
          </ListItemDecorator>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <ListItemDecorator>
            <DirectionsCarIcon />
            <Link href="#">
              <p>Vehículos</p>
            </Link>
          </ListItemDecorator>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <ListItemDecorator>
            <PermContactCalendarIcon />
            <Link href="#">
              <p>Rondas</p>
            </Link>
          </ListItemDecorator>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <ListItemDecorator>
            <PermContactCalendarIcon />
            <Link href="#">
              <p>Elementos</p>
            </Link>
          </ListItemDecorator>
        </ListItemButton>
      </ListItem>
    </List>
  );
}
