function TodoItem(props) {
    
    return <>
            <h5> {props.task.title}: </h5>
            <p>{props.task.description}</p>
        </>;
    
}
export default TodoItem;