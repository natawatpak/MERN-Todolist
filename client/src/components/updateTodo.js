import React, { useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export default function UpdateTodo(props) {
  const [todo, setTodo] = useState({
    topic: props.todo ? props.todo.topic: '',
    description: props.todo ? props.todo.description: '',
    deadline: props.todo ? props.todo.deadline: null,
  });

  // These methods will update the state properties.
  function updateTodo(value) {
    return setTodo((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    const editedTodo = {
      topic: todo.topic,
      description: todo.description,
      deadline: todo.deadline.format("YYYY-MM-DD"),
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5050/record/${props.todo._id}`, {
      method: "PATCH",
      body: JSON.stringify(editedTodo),
      headers: {
        "Content-Type": "application/json",
      },
    });
    props.closeEditing();
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <Card sx={{ minWidth: 275 }}>
        <form onSubmit={onSubmit}>
          <CardContent>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{pb:3}}>
              Update to-do
            </Typography>
            <TextField
              id="topic"
              label="Topic"
              value={todo.topic}
              onChange={(newValue) =>
                updateTodo({ topic: newValue.target.value })
              }
              sx={{ marginY:2 }}
            />

            <TextField
              id="description"
              label="Description"
              value={todo.description}
              onChange={(newValue) =>
                updateTodo({ description: newValue.target.value })
              }
              sx={{ marginY:2 }}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                id="deadline"
                label="Deadline"
                value={todo.deadline}
                onChange={(newValue) => updateTodo({ deadline: newValue })}
                sx={{ marginY:2 }}
              />
            </LocalizationProvider>
          </CardContent>
          <CardActions>
            <Button variant="" size="small" type="submit">
              Save
            </Button>
          </CardActions>
        </form>
      </Card>
    </div>
  );
}
