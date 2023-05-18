"use client";

import { createContext, useContext, useMemo, useState } from "react";

const ItemContext = createContext();

function ItemProvider({activeId, onSelect, children}: {children: React.ReactNode}) {
  console.log('ItemProvider :: Init')
  const value = useMemo(
    () => ({
      activeId,
      onSelect
    }),
    [activeId, onSelect]
  )

  // console.log(value);

  return (
    <ItemContext.Provider value={value}>
      {children}
    </ItemContext.Provider>
  )
}

const useItemContext = () => {
  const value = useContext(ItemContext);
  if (value === undefined) {
    throw new Error('useItemContext should be use within ItemProvider')
  }
  return value;
}

function Item({ id, children}) {
  const activeStyle = {
    backgroundColor: children,
    color: "white",
  };
  const style = {
    cursor: "pointer",
    padding: "1rem",
  };
  const {activeId, onSelect} = useItemContext();
  const active = activeId === id;

  return (
    <div
      style={active ? { ...style, ...activeStyle } : style}
      onClick={() => onSelect(id)}
    >
      {children}
    </div>
  );
}

function App() {
  const [activeId, setActiveId] = useState(1)
  const [anotherActiveId, anotherSetActiveId] = useState(1)
  return (
    <div>
    <ItemProvider activeId={activeId} onSelect={setActiveId}>
        <Item id={1}>
          #fddd00
        </Item>  
        <Item id={2}>
          #d0aee0
        </Item>  
        <Item id={3}>
          #ade00d
        </Item>  
    </ItemProvider>
    <ItemProvider activeId={anotherActiveId} onSelect={anotherSetActiveId}>
        <Item id={1}>
          #fda700
        </Item>  
        <Item id={2}>
          #dfa790
        </Item>  
        <Item id={3}>
          #ca7d0d
        </Item>  
    </ItemProvider>
    </div>
  );
}

export default App;
