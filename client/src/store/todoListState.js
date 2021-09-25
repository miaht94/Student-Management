import {
    atom,
  } from 'recoil';
  const todoListState = atom({
    key: 'todoListState', // unique ID (with respect to other atoms/selectors)
    default: [{title: 'one default item', description:'one default description'}], // default value (aka initial value)
  });

export default todoListState;