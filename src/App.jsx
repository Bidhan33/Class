import React from 'react';
import './App.css'
import Todolist from './component/Todolist'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';




function App() {
    return (
        <Container maxWidth="md">
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant='h6'>
                        Simple Todo List
                    </Typography>
                </Toolbar>
            </AppBar>
            
            <Todolist />
            <CssBaseline />
        </Container>
    )
}

export default App;
1