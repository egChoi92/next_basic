'use client'

import { SetStateAction, createContext, useContext, useState } from "react";
import { displayPartsToString } from "typescript";


const CounterContext = createContext(0)

function CounterProvider({children}: {children: React.ReactNode}) {
    const counterState = useState(0);
    return (
        <CounterContext.Provider value={counterState}>
            {children}
        </CounterContext.Provider>
    )
}

function useCounterState() {
    const value = useContext(CounterContext);
    if (value === undefined) {
        throw new Error('useCounterState should be used within CounterProvider');
    }
    return value;
}

function Value() {
    const [counter] = useCounterState();
    return <h1>{counter}</h1>;
}

function Buttons() {
    const [counter, setCounter] = useCounterState();
    const increase = () => setCounter((prev: number) => prev + 1)
    const decrease = () => setCounter((prev: number) => prev - 1)
    return (
        <div>
            <button onClick={increase}>+</button>
            <button onClick={decrease}>-</button>
        </div>
    )
}

export default function Example3() {
    return (
        <CounterProvider>
            <div>
                <Value />
                <Buttons />        
            </div>
        </CounterProvider>
    )
}