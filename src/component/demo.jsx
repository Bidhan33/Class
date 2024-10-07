import { useState, useRef } from "react";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the Data Grid
import Button from '@mui/material/Button';
import Deleteicon from '@mui/icons-material/Delete';
import { TextField } from "@mui/material";
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';
function Todolist() {
  const [todo, setTodo] = useState({ description: "", duedate: "", priority: "" });
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();

  const [colDefs, setColDefs] = useState([
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
      setTodos([todo, ...todos]);
      setTodo({ description: "", duedate: "", priority: "" });
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

  return (
    <>

      <Stack direction="row" spacing={2} alignItems="center"
       justifyContent="center">

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

        <TextField
          label="Date"
          placeholder="Due date"
          value={todo.duedate}
          onChange={event => setTodo({ ...todo, duedate: event.target.value })}
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
          endIcon={<Deleteicon />}
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
    </>
  );
}

export default Todolist;