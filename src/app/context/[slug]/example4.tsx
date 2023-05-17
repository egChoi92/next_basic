"use client";

import { createContext, useContext, useMemo, useState } from "react";




const CounterValueContext = createContext(0);
const CounterActionContext = createContext({});

function CounterProvider({children}: {children: React.ReactNode}) {
    const [counter, setCounter] = useState(0);
    
    const action = useMemo(() => ({
        t: console.log('t'),
        increase() {
            setCounter((prev) => prev + 1)
        },
        decrease() {
            setCounter((prev) => prev - 1)
        },
    }), []);

    const value = useMemo(() => [counter, action], [counter, action]);

    return (
        <CounterActionContext.Provider value={action}>
            <CounterValueContext.Provider value={counter}>
                {children}
            </CounterValueContext.Provider>
        </CounterActionContext.Provider>
    )
}

const useValueCounter = (context) => {
    // console.log('context: ', context);
    const value = useContext(CounterValueContext);
    if (value === undefined) {
        throw new Error('useCounterState should be used within CounterProvider');
    }
    return value;
}

const useActionCounter = (context) => {
    // console.log('context: ', context);
    const value = useContext(CounterActionContext);
    if (value === undefined) {
        throw new Error('useCounterState should be used within CounterProvider');
    }
    return value;
}

function Value() {
    console.log('Value');
    const counter = useValueCounter();
    return <h1>{counter}</h1>;
}
function Buttons() {
    console.log('Buttons');
    const action = useActionCounter();
    return (
        <div>
            <button onClick={action.increase}>+</button>
            <br />
            <button onClick={action.decrease}>-</button>
        </div>
    );
}

export default function Example4() {
    return (
        <CounterProvider>
            <div>
                <Value />
                <Buttons />
            </div>
        </CounterProvider>
    );
}