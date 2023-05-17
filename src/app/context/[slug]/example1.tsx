'use client';

import { createContext, useContext } from 'react';

const MyContext = createContext('');
const MyGrandParentContext = createContext('');

function GrandParent() {
    return (
        <MyGrandParentContext.Provider value="Hello Parent">
            <Parent /> 
        </MyGrandParentContext.Provider>
    )
}

function Parent() {
    return <Child />
}

function Child() {
    const value = useContext(MyGrandParentContext);
    return (
        <>
            {value}
            <GrandChild /> 
        </>
    )
}

function GrandChild() {
    return <Message /> 
}

function Message() {
    const value = useContext(MyContext);
    return <div>Received: {value}</div>
}

export default function Example1() {
    return (
        <MyContext.Provider value="Hello Context">
            <GrandParent />
        </MyContext.Provider>
    )
}