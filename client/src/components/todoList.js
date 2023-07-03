import React, { useEffect, useState } from "react";
// import * as React from 'react';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import dayjs from "dayjs";

import AddTodo from "./addTodo";
import UpdateTodo from "./updateTodo";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [checked, setChecked] = useState([0]);

  const [editingTodo, setEditingTodo] = useState(null);
  const [editingModal, setEditingModal] = useState(false);

  const [fetchData, setFetchData] = useState(false);
  const fetchList = () => {
    setFetchData(!fetchData);
  };
  // This method fetches the records from the database.
  useEffect(() => {
    async function getTodos() {
      const response = await fetch(`http://localhost:5050/record/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const resp = await response.json();
      const todos = resp.map((todo) => {
        todo.deadline = dayjs(todo.deadline);
        return todo;
      });
      setTodos(todos);
    }
    getTodos();
    return;
  }, [fetchData]);

  const editTodo = (todo) => {
    setEditingTodo(todo);
    setEditingModal(true);
  };

  const closeEditing = () => {
    setEditingTodo(null);
    setEditingModal(false);
    fetchList();
  };

  async function deleteTodo(todo) {
    await fetch(`http://localhost:5050/record/${todo._id}`, {
      method: "DELETE",
    });
    fetchList();
  }

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
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="start"
      sx={{ minHeight: "100vh" }}
    >
      <AddTodo fetchList={fetchList}/>
      <Modal
        open={editingModal}
        onClose={closeEditing}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <UpdateTodo todo={editingTodo} closeEditing={closeEditing} />
      </Modal>
      <List sx={{ width: "50%", bgcolor: "background.paper" }}>
        {todos.map((todo, i) => {
          const labelId = `checkbox-list-label-${todo.id}`;
          return (
            <ListItem key={todo._id}>
              <ListItemText primary={todo.topic} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => editTodo(todo)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteTodo(todo)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </Grid>
  );
}
