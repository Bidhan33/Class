import { useState } from "react";
import TodoTable from './TodoTable';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the Data Grid

function Todolist()  {
    const [todo, setTodo] = useState( {description: "", duedate: "", priority:""});
    const [todos, setTodos] = useState([]);

    const [colDefs, setColDefs] = useState([
        {field: "description", filter:true, },
        {field: "priority", 
            cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'} 
        },
        {field: "duedate", filter:true}
    ]);
 
    const handleAdd = () => {
        if(!todo){
            alert("Type something else")
        }
        else {
            
            setTodos([todo, ...todos]);
            setTodo({description: "", duedate: "", priority:""});

        }
    
    }
    const handleDelete = (row) => {
        console.log("Delete:" + row);
        setTodos(todos.filter((todo, index)=> row!= index));
    }
    
    return(
        <>
        <h3> Simple Todolist</h3>
        <h4> Enter below 👇 </h4>
        <label> Description:</label>
          <input
          type='text'
          placeholder='Description '
          value={todo.description}
          onChange={ event => setTodo({...todo, description: event.target.value})}
          />
          <label>Priority</label>
          <input
          type='text'
          placeholder='Priority '
          value={todo.priority}
          onChange={ event => setTodo({...todo, priority: event.target.value})}
          />
          <label> Due Date:</label>
          <input
          type='date'
          placeholder='Due date '
          value={todo.duedate}
          onChange={ event => setTodo({...todo, duedate: event.target.value})}
          />
          
          <button onClick={handleAdd}> Add to do</button>
          <div className='ag-theme-material'
          style={{height: 500, width: '80% '}}
          >
            <AgGridReact
            rowData={todos}
            columnDefs={colDefs}
             rowSelection="single"
            />
            
            
          </div>
         
          </>
          
    );
}


export default Todolist;