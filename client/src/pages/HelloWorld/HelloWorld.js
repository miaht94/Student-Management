import React,{useEffect, useState} from 'react';


function Greeting(props) {
    // const [curTime, setCurTime] = useState();
    const [txt, setTxt] = useState("");
    const handleClickBtn = () => {
        //send input data to server or do something else ...
        console.log(txt)
    }
    const onImputChange = (event) => {
        setTxt(event.target.value)
    }
    return (<>
            <input value={txt} onChange={onImputChange.bind(this)}></input>
            <button onClick={handleClickBtn.bind(this)}>submit</button>
        </>
    )
}

export default Greeting;