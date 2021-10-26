import { useRecoilState } from 'recoil';
import React from 'react';
import { bachAtom } from '_state';
import { BachComponent } from '_components/subcomponents';

import { Card, Button } from 'antd';


export { Dashboard };


function Dashboard() {
    const [bach, setbach] = useRecoilState(bachAtom);

    function puoi(){
        setbach({...bach, name : "Meo meo"});
    }

    return (
        <div className="p-4">
            <BachComponent bach={bach}/>
            <Button type="primary" onClick={puoi}>
                Biến Trần Xuân Bách thành meo meo
            </Button>
        </div>
    )
}
