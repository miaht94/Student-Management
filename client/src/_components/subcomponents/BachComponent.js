import { useRecoilState } from 'recoil';
import React ,{useEffect, useState} from 'react';
import { bachAtom } from '_state';

import { Card, Button } from 'antd';

export { BachComponent };

function BachComponent(props) {
    return (
        <div className="p-4">
            <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
                <p>{props.bach.name}</p>
            </Card>
        </div>
    )
}
