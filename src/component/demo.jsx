import { useState } from "react";
import TodoTable from './TodoTable';

function Todolist()  {
    const [todo, setTodo] = useState( {description: "", duedate: ""});
    const [todos, setTodos] = useState([]);
 
    const handleAdd = () => {
        if(!todo){
            alert("Type something else")
        }
        else {
            
            setTodos([todo, ...todos]);
            setTodo({description: "", duedate: ""});

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
          <label> Due Date:</label>
          <input
          type='date'
          placeholder='Due date '
          value={todo.duedate}
          onChange={ event => setTodo({...todo, duedate: event.target.value})}
          />
          <button onClick={handleAdd}> Add to do</button>
          <TodoTable todos ={todos} handleDelete={handleDelete}/>
          </>
          
    );
}


export default Todolist;