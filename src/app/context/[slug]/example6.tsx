'use client';

import { createContext, useContext, useRef, useState } from "react";

const TodoValueContext = createContext();
const TodoActionContext = createContext();

function TodoProvider({children}) {
    const idRef = useRef(3);

    const [todos, setTodos] = useState([
        {
            id: 1,
            text: '밥 먹기',
            done: true
        },
        {
            id: 2,
            text: '밥 먹기',
            done: false
        },
    ])

    const action = {
        create: (text: string) => {
            const id = idRef.current;
            idRef.current += 1;
            setTodos((prev) => [
                ...prev,
                {
                    id,
                    text,
                    done: false
                }
            ])
        },
        remove: (id) => {
            setTodos((prev) => 
                prev.filter(item => item.id !== id)
            )
        },
        toggle: (id) => {
            setTodos((prev) => 
                prev.map((item) => 
                    item.id === id 
                        ? {
                            ...item,
                            done: !item.done
                        }
                        : item
                )
            )
        }
    }

    return (
        <TodoActionContext.Provider value={action}>
            <TodoValueContext.Provider value={todos}>
                {children}
            </TodoValueContext.Provider>
        </TodoActionContext.Provider>
    )
}

const useTodoValue = () => {
    const value = useContext(TodoValueContext);
    if (value === undefined) {
        throw new Error('useTodosValue should be used within TodosProvider');
    }
    return value
}
const useTodoAction = () => {
    const value = useContext(TodoActionContext);
    if (value === undefined) {
        throw new Error('useTodoAction should be used within TodosProvider');
    }
    return value;
}

function TodoCreate() {
    const {create} = useTodoAction();
    const [text, setText] = useState('');
    const input = useRef(null)
    return (
        <div>
            <input ref={input} onChange={() => setText(input.current.value)} />
            <button onClick={() => create(text)}>Create</button>
        </div>
    )
}

function TodoItem() {
    const todos = useTodoValue();
    const {remove, toggle} = useTodoAction();
    return (
        todos.map((todo) => {
            return (
                <li key={todo.id}>
                    <input type="checkbox" checked={todo.done} onChange={() => toggle(todo.id)} />
                    {todo.text}
                    <button onClick={() => remove(todo.id)}>Delete</button>
                </li>
            )
        })
    )
    
}

function TodoList() {
    return(
        <ul>
            <TodoItem />
        </ul>
    )
}

export default function Example6() {
    return (
        <TodoProvider>
            <TodoCreate />
            <TodoList />
        </TodoProvider>
    )
}