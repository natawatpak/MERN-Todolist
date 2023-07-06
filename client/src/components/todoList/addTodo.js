import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

export default function AddTodo({ fetchList }) {
  // Keep input value
  const [todo, setTodo] = useState({
    topic: "",
    description: "",
    deadline: null,
  });

  // Keep modal state
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const [validateError, setValidate] = useState('');

  // Update the state properties.
  function updateTodo(value) {
    return setTodo((prev) => {
      return { ...prev, ...value };
    });
  }

  // Handle the submission for adding a new record.
  async function onSubmit(e) {
    e.preventDefault();
    // Create new record.
    const newTodo = { ...todo };

    if (!newTodo.topic){
      setValidate('Topic is missing')
      return
    }

    // Format date to string
    if (newTodo.deadline !== null) {
      newTodo.deadline = newTodo.deadline.format("YYYY-MM-DD");
    }

    // Send post request to server to add a new record to the database.
    await fetch("http://localhost:5050/record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    // Clear fields, Fetch records and Close the modal
    setTodo({ topic: "", description: "", deadline: null });
    fetchList();
    handleClose();
  }

  return (
    <div>
      {/* Add To-do button */}
      <Button variant="" onClick={handleOpen}>
        <Typography variant="h5">+ Add To-do</Typography>
      </Button>

      {/* Modal and Input fields */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={{ minWidth: 275, px: 4 }}>
          <form onSubmit={onSubmit}>
            <CardContent>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ pb: 3 }}
              >
                Add to-do
              </Typography>
              <TextField
                id="topic"
                label="Topic"
                value={todo.topic}
                error ={validateError !== ''}
                helperText={validateError}
                onChange={(newValue) =>
                  updateTodo({ topic: newValue.target.value })
                }
                sx={{ my: 2 }}
              />

              <TextField
                id="description"
                label="Description"
                value={todo.description}
                onChange={(newValue) =>
                  updateTodo({ description: newValue.target.value })
                }
                sx={{ my: 2 }}
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  id="deadline"
                  label="Deadline"
                  format="DD-MM-YYYY"
                  value={todo.deadline}
                  onChange={(newValue) => updateTodo({ deadline: newValue })}
                  sx={{ my: 2 }}
                />
              </LocalizationProvider>
            </CardContent>
            <CardActions>
              <Button
                variant=""
                size="small"
                type="submit"
                color="primary"
                sx={{ mb: 2 }}
              >
                Add
              </Button>
            </CardActions>
          </form>
        </Card>
      </Modal>
    </div>
  );
}
