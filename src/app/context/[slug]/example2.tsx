"use client";

import { createContext, useContext } from "react";

const MyContext = createContext("");

function useMyContext() {
    const value = useContext(MyContext);
    if (value === undefined) {
        throw new Error('useMyContext Should be used within MyContext.Provider');
    } 
    return value;
}

function AwesomeComponent() {
    return (
        <div>
            <FirstComponent />
            <SecondComponent />
            <ThirdComponent />
        </div>
    );
}

function FirstComponent() {
    const value = useMyContext();
    return <div>First Component says: &#34;{value}&#34;</div>
}

function SecondComponent() {
    const value = useMyContext();
    return <div>Second Component says: &#34;{value}&#34;</div>
}

function ThirdComponent() {
    const value = useMyContext();
    return <div>Third Component says: &#34;{value}&#34;</div>
}

export default function Example2() {
    return (
        <MyContext.Provider value="Hello Example">
            <AwesomeComponent />
        </MyContext.Provider>
    )
}
