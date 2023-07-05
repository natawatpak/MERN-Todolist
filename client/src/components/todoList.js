import React, { useEffect, useState } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";

import dayjs from "dayjs";

import AddTodo from "./addTodo";
import UpdateTodo from "./updateTodo";

export default function TodoList() {
  const [todos, setTodos] = useState([]); // Keep the Todo list
  const [editingTodo, setEditingTodo] = useState(null); // Keep current editing Todo
  const [editingModal, setEditingModal] = useState(false); // Keep editing status

  // a Function to trigger useEffect
  const [fetchData, setFetchData] = useState(false);
  const fetchList = () => {
    setFetchData(!fetchData);
  };

  useEffect(() => {
    // Fetch To-do list from database
    async function getTodos() {
      const response = await fetch(`http://localhost:5050/record/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const resp = await response.json();
      const todos = resp.map((todo) => {
        todo.deadline = todo.deadline ? dayjs(todo.deadline) : null;
        return todo;
      });
      setTodos(todos);
    }
    getTodos();
    return;
  }, [fetchData]);

  // Trigger when start editing
  const editTodo = (todo) => {
    setEditingTodo(todo);
    setEditingModal(true);
  };

  // Trigger when closing editing modal
  const closeEditing = () => {
    setEditingTodo(null);
    setEditingModal(false);
    fetchList();
  };

  // Delete a Todo
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
      sx={{ minHeight: "100vh", pt: 3 }}
    >
      {/* Add to-do button and its modal */}
      <AddTodo fetchList={fetchList} />

      {/* Editing modal */}
      <Modal
        open={editingModal}
        onClose={closeEditing}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* Input fields and stuffs inside the modal */}
        <UpdateTodo todo={editingTodo} closeEditing={closeEditing} />
      </Modal>

      {/* Todo list */}
      <List
        sx={{ width: "50%", minWidth: "250px", bgcolor: "background.paper" }}
      >
        {
          // Sort the list according to date and Return as components
          todos
            .sort((a, b) => {
              if (a.deadline === null) return 1;
              if (b.deadline === null) return -1;
              return b.deadline.isBefore(a.deadline) ? 1 : -1;
            })
            .map((todo, i) => {
              const DD =
                todo.deadline === null ? "--" : todo.deadline.format("DD");
              const MMYY =
                todo.deadline === null ? "" : todo.deadline.format("MM-YY");

              return (
                <ListItem
                  key={todo._id}
                  sx={{
                    "&:hover": {
                      color: "secondary.main",
                      opacity: 0.8,
                    },
                  }}
                >
                  <Grid
                    alignItems="center"
                    justifyContent="center"
                    direction="column"
                    sx={{ paddingRight: 3 }}
                  >
                    {/* Date */}
                    <Typography variant="h4">{DD}</Typography>
                    <Typography>{MMYY}</Typography>

                  </Grid>
                  {/* Text */}
                  <ListItemText
                    primary={todo.topic}
                    secondary={todo.description}
                  />
                  <ListItemSecondaryAction>
                    {/* Edit Button */}
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
                    {/* Delete/Complete Button */}
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
                      <DoneIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })
        }
      </List>
    </Grid>
  );
}
