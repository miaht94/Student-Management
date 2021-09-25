import React from 'react';
import todoListState from '../../store/todoListState';
import TodoList from '../../components/Todo/TodoList'
import {
  RecoilRoot,
  useRecoilState
} from 'recoil';
function Reports() {
  
  const [todoList, setTodoList] = useRecoilState(todoListState)
  return (
    <div className='reports'>
      <h1>Todo List: </h1>
      <RecoilRoot>
        <TodoList list={todoList} setter={setTodoList}></TodoList>
      </RecoilRoot>
    </div>
  );
}

export default Reports;