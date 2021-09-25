import React from 'react';
import './Home.css';
import TodoItem from '../../components/Todo/TodoItem';
import textState from '../../store/textState';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
function Home() {
  const [text, setText] = useRecoilState(textState);
  const onChange = (event) => {
    setText(event.target.value);
  };
  return (
    <RecoilRoot>
      <div data-testid='Home' className='home' >
        <div><h1>Home</h1></div>
        <div>
        </div>
        <input value={text} onChange={onChange}></input>
          <br />
          Echo: {text}
      </div>
    </RecoilRoot>
  );
}

export default Home;