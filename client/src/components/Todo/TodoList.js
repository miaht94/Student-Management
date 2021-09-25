import TodoItem from "./TodoItem";
import React, { useState } from 'react';
class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddTask = this.handleAddTask.bind(this);
        this.handleInputNameChange = this.handleInputNameChange.bind(this);
        this.handleInputDescChange = this.handleInputDescChange.bind(this);
        this.state = {taskNameInput : '', taskDescriptionInput: ''};
    };

    
    handleAddTask = () => {
        this.props.setter([...this.props.list,{title:this.state.taskNameInput, description:this.state.taskDescriptionInput}]);
        this.setState({taskNameInput: '', taskDescriptionInput: ''});
    };

    handleInputNameChange = (e) => {
        let newState = {};
        Object.assign(newState, this.state);
        newState.taskNameInput = e.target.value;
        this.setState(newState)
    }
    handleInputDescChange = (e) => {
        let newState = {};
        Object.assign(newState, this.state);
        newState.taskDescriptionInput = e.target.value;
        this.setState(newState)
    }
    
    render() {
        return (
        <>
            {this.props.list.map((item) => {
                console.log(item);
                return <TodoItem task={item}></TodoItem>
            })}
            <input placeholder="Ten Task" onChange={this.handleInputNameChange} value={this.state.taskNameInput}></input>
            <input placeholder="Task Description" onChange={this.handleInputDescChange} value={this.state.taskDescriptionInput}></input>
            <button onClick={this.handleAddTask} >Add Task</button>
            <p>Echo Name: {this.state.taskNameInput} : {this.state.taskDescriptionInput}</p>
        </>
        )
    }
    
}
export default TodoList;