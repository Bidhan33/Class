import React from 'react';
import './App.css'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import BasicTabs from './component/Menu';

function App() {
    return (
        <Container maxWidth="md">
            <CssBaseline />
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant='h6'>
                        Simple Todo List
                    </Typography>
                </Toolbar>
            </AppBar>
            <BasicTabs />
        </Container>
    )
}

export default App;