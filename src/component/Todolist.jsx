 import { useState, useRef } from "react";
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField } from "@mui/material";
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';

function Todolist() {
  const [todo, setTodo] = useState({ description: "", duedate: null, priority: "" });
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();

  const [colDefs] = useState([
    { field: "description", filter: true },
    {
      field: "priority",
      cellStyle: params => params.value === "High" ? { color: 'red' } : { color: 'black' }
    },
    { field: "duedate", filter: true }
  ]);

  const handleAdd = () => {
    if (!todo.description || !todo.priority || !todo.duedate) {
      alert("Please fill in all fields");
    } else {
      const newTodo = {
         ...todo,
         duedate: todo.duedate ? format(todo.duedate, 'yyyy-MM-dd') : ""
      };
      setTodos([newTodo, ...todos]);
      setTodo({ description: "", duedate: null, priority: "" });
    }
  };

  const handleDelete = () => {
    if (gridRef.current && gridRef.current.getSelectedNodes().length > 0) {
      const selectedNode = gridRef.current.getSelectedNodes()[0];
      const rowIndex = selectedNode.rowIndex;
      setTodos(todos.filter((_, index) => index !== rowIndex));
    } else {
      alert('Select a row first!');
    }
  };

  const handleDateChange = (date) => {
    setTodo({ ...todo, duedate: date });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
        <TextField
          type="text"
          label="Description"
          value={todo.description}
          onChange={event => setTodo({ ...todo, description: event.target.value })}
        />
        <TextField
          type="text"
          label="Priority"
          value={todo.priority}
          onChange={event => setTodo({ ...todo, priority: event.target.value })}
        />
        <DatePicker
            label="Due date"
            value={todo.duedate}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
         />

        <Button
          variant="contained"
          color="error"
          onClick={handleAdd}
          style={{ width: '150px' }}
        >
          Add to do
        </Button>
        <Button
          variant="contained"
          color="primary"
          endIcon={<DeleteIcon />}
          onClick={handleDelete}
          style={{ width: '150px' }}
        >
          Delete
        </Button>
      </Stack>
      <div className='ag-theme-material' style={{ height: 500, width: '80%' }}>
        <AgGridReact
          ref={gridRef}
          onGridReady={params => gridRef.current = params.api}
          rowData={todos}
          columnDefs={colDefs}
          rowSelection="single"
        />
      </div>
    </LocalizationProvider>
  );
}

export default Todolist;