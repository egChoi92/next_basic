'use client';

import { createContext, useContext, useState, useMemo } from "react";

const ModalValueContext = createContext();
const ModalActionContext = createContext();

function ModalProvider({children}: {children: React.ReactNode}) {
    const [modal, setModal] = useState({
        visible: false,
        message: ''
    });

    const action = useMemo(() => ({
        open(message) {
            setModal({
                message: message,
                visible: true
            })
        },
        close() {
            setModal((prev) => ({
                ...prev,
                visible: false
            }))
        }
    }), [])

    return (
        <ModalActionContext.Provider value={action}>
            <ModalValueContext.Provider value={modal}>
                {children}
            </ModalValueContext.Provider>
        </ModalActionContext.Provider>
    )
}

const useModalValue = () => {
    const value = useContext(ModalValueContext)
    if (value === undefined) {
        throw new Error('useModalValue should be used within ModalProvider');        
    }
    return value;
}

function useModalAction() {
    const value = useContext(ModalActionContext);
    if (value === undefined) {
        throw new Error('ModalActionContext should be used within ModalProvider');        
    }
    return value;
}

function Buttons() {
    console.log('Buttons Component');
    const {open, close} = useModalAction();
    return (
        <div>
            <button onClick={() => open('오픈')}>Open Modal</button>
            <br />
            <button onClick={close}>Close Modal</button>
        </div>
    )
}

function Modal() {
    console.log('Modal Component');
    const {message, visible} = useModalValue();
    return (
        visible && <div>{message}</div>
    )
}

export default function Example5() {
    return (
        <ModalProvider>
            <Buttons />
            <Modal /> 
        </ModalProvider>
        
    )
}