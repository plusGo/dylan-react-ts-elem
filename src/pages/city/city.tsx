import React, {ReactNode, useReducer, useState} from 'react';
import {Button} from 'antd-mobile';

const countReducer = (state: any, action: any) => {
    if (action.type === 'countUp') {
        return {
            ...state,
            count: state.count + 1
        };
    } else {
        return state;
    }
};

export default function City(): ReactNode {
    const [title, setTitle] = useState('hello,city');
    const [state, dispatch] = useReducer(countReducer, {count: 0});

    function onInputChange(event: any): void {
        console.log(event.target.value);
        setTitle(event.target.value);
        dispatch({type: 'countUp'});
    }

    return (<div>
        <Button>我是按钮</Button>
        <div>{title ? title : 'hello,city'}</div>
        <div>改变了{state.count}次</div>
        <input type="text" onInput={onInputChange}/>
    </div>)
}
