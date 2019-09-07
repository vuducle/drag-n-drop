import React, { Component } from 'react';
import { Container, AppBar, Typography, Paper } from '@material-ui/core';
import '../App.css';

const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    
    for (var i = 0; i < 6; i++) 
      color += letters[Math.floor(Math.random() * 16)];
    
    return color;
}

export default class DragAndDrop extends Component {
    state = {
        tasks: [
            {id: 1, name: 'React', category: 'wip', bgColor: getRandomColor()},
            {id: 2, name: 'Angular', category: 'wip', bgColor: getRandomColor()},
            {id: 3, name: 'VueJS', category: 'complete', bgColor: getRandomColor()}
        ]
    }

    onDragOver = (e) => {
        e.preventDefault();
    }

    onDragStart = (e, id) => {
        console.log('dragstart: ', id);
        e.dataTransfer.setData('id', id);
    }

    onDrop = (e, string) => {
        let id = e.dataTransfer.getData('id');
        let tasks = this.state.tasks.filter((task) => {
            if (task.name === id) {
                task.category = string;
            }
            return task;
        })
        this.setState({
            ...this.state,
            tasks
        })
    }

    render() {
        let tasks = {
            wip: [],
            complete: []
        }

        this.state.tasks.forEach((e) => {
            tasks[e.category].push(
                <Paper 
                    onDragStart = {(ev) => this.onDragStart(ev, e.name)}
                    draggable
                    key={e.name}
                    className="draggable"
                    style = {{backgroundColor: e.bgColor}}
                >
                {e.name}
                </Paper>
            )
        })

        return (
            <div>
               <Container className="container-drag">
                    <AppBar color="primary">
                        <Typography variant="h6">
                            DRAG & DROP DEMO
                        </Typography>
                    </AppBar>
                    <Paper 
                        className="wip"
                        onDrop={(e) => this.onDrop(e, 'wip')}
                        onDragOver={(e) => this.onDragOver(e)}
                    >
                        <Typography
                            variant="body1"
                            color="primary"
                        >
                        WIP
                        </Typography>
                        {tasks.wip}
                    </Paper>
                    <Paper 
                        className="droppable" 
                        onDrop ={(e) => this.onDrop(e, 'complete')}
                        onDragOver={
                            (e) => this.onDragOver(e)
                        }
                    >
                        <Typography
                            variant="body1"
                            color="secondary"
                        >
                        COMPLETED
                        </Typography>
                        {tasks.complete}
                    </Paper>
               </Container> 
            </div>
        )
    }
}