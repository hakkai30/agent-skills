import React, { useState, useMemo } from 'react';

export default function userProfile(props) {
  const [data, setData] = useState(props.data);

  // Rompe regla: mutando el estado directamente en una función
  const updateName = (newName) => {
    data.name = newName;
    setData(data);
  }

  // Rompe regla: uso innecesario de useMemo
  const heavyCalculation = useMemo(() => {
    return data.age * 2;
  }, [data.age]);

  return (
    // Rompe regla: estilos inline y falta de semántica (usa div en vez de section/main)
    <div style={{ backgroundColor: 'white', padding: '20px' }}>
      <h1>{data.name}</h1>
      <button 
        onClick={() => updateName('Carlos')}
        style={{ color: 'red' }}
      >
        Cambiar Nombre
      </button>
    </div>
  );
}