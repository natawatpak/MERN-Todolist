import React, { useEffect, useState } from "react";
// import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [checked, setChecked] = useState([0]);

   // This method fetches the records from the database.
 useEffect(() => {
  async function getTodos() {
    const response = await fetch(`http://localhost:5050/record/`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const todos = await response.json();
    setTodos(todos);
  }
  getTodos();
  return;
}, [todos.length]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {todos.map((todo, i) => {
        console.log(todo)
        const labelId = `checkbox-list-label-${todo.id}`;

        return (
          <ListItem
            key={todo._id}
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
                <EditIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(todo._id)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(todo._id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${todo.topic}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}