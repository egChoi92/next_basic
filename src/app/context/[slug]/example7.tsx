"use client";

import { useMemo, useState } from "react";

function Item({ id, active, onSelect, children}) {
  return useMemo(() => {
    console.log(children);
    const activeStyle = {
      backgroundColor: "black",
      color: "white",
    };
  
    const style = {
      cursor: "pointer",
      padding: "1rem",
    };
  
    return (
      <div
        style={active === id ? { ...style, ...activeStyle } : style}
        onClick={() => onSelect(id)}
      >
        {children}
      </div>
    );
  }, [active])
  
}

function App() {
  const [activeId, setActiveId] = useState(1);

  const Items = [
    {
      id: 1,
      text: 'Hello',
    },
    {
      id: 2,
      text: 'World',
    },
    {
      id: 3,
      text: 'React',
    },
  ]

  return (
    <div>
      {Items.map((item) => 
        <Item 
          key={item.id} 
          id={item.id}
          active={activeId}
          onSelect={setActiveId}
        >
          {item.text}
        </Item>  
      )}
    </div>
  );
}

export default App;
