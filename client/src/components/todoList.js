import React, { useEffect, useState } from "react";
// import * as React from 'react';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import dayjs from "dayjs";

import AddTodo from "./addTodo";
import UpdateTodo from "./updateTodo";

export default function TodoList() {
  const [todos, setTodos] = useState([]);

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
        
        todo.deadline = todo.deadline? dayjs(todo.deadline):null;
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

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="start"
      sx={{ minHeight: "100vh" }}
    >
      <AddTodo fetchList={fetchList} />
      <Modal
        open={editingModal}
        onClose={closeEditing}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <UpdateTodo todo={editingTodo} closeEditing={closeEditing} />
      </Modal>
      <List
        sx={{ width: "50%", minWidth: "250px", bgcolor: "background.paper" }}
      >
        {todos
          .sort((a, b) => {
            if(a.deadline===null) return 1
            if(b.deadline===null) return -1
            return b.deadline.isBefore(a.deadline)? 1 : -1;
          })
          .map((todo, i) => {
            const DD =
              todo.deadline === null
                ? "--"
                : todo.deadline.format("DD");
            const MMYY =
              todo.deadline === null
                ? ""
                : todo.deadline.format("MM-YY");

            return (
              <ListItem
                key={todo._id}
                sx={{
                  "&:hover": {
                    color: "secondary.main",
                    opacity:0.8,
                  },
                }}
              >
                <Grid
                  alignItems="center"
                  justifyContent="center"
                  direction="column"
                  sx={{ paddingRight: 3 }}
                >
                  <Typography variant="h4">{DD}</Typography>
                  <Typography>{MMYY}</Typography>
                </Grid>
                <ListItemText
                  primary={todo.topic}
                  secondary={todo.description}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => editTodo(todo)}
                    sx={{
                      "&:hover": {
                        color: "secondary.main",
                      },
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteTodo(todo)}
                    sx={{
                      "&:hover": {
                        color: "secondary.main",
                      },
                    }}
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
