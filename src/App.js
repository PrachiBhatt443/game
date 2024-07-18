import React, { useState } from 'react';
import './App.css';

function App() {
  const initialMatrix = [
    ['white', 'white', 'white'],
    ['white', 'white', 'white'],
    ['white', 'white', 'white'],
  ];
  const [matrix, setMatrix] = useState(initialMatrix);
  const [clickOrder, setClickOrder] = useState([]);

  const handleClick = (row, col) => {
    const newMatrix = matrix.map((r, rowIndex) =>
      r.map((c, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return 'green';
        }
        return c;
      })
    );

    setMatrix(newMatrix);
    setClickOrder([...clickOrder, { row, col }]);

    if (row === 2 && col === 2) {
      changeToOrangeInSequence([...clickOrder, { row, col }]);
    }
  };

  const changeToOrangeInSequence = (order) => {
    order.forEach(({ row, col }, index) => {
      setTimeout(() => {
        setMatrix((prevMatrix) =>
          prevMatrix.map((r, rowIndex) =>
            r.map((c, colIndex) => {
              if (rowIndex === row && colIndex === col) {
                return 'orange';
              }
              return c;
            })
          )
        );
      }, index * 500);
    });
  };

  const handleRefresh = () => {
    setMatrix(initialMatrix);
    setClickOrder([]);
  };

  return (
    <div className="App">
      <div className='Matrix'>
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className="outerbox">
            {row.map((col, colIndex) => (
              <div
                key={colIndex}
                className="innerbox"
                style={{ backgroundColor: matrix[rowIndex][colIndex] }}
                onClick={() => handleClick(rowIndex, colIndex)}
              >
                {rowIndex * 3 + colIndex + 1}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div>
      <button className='button' onClick={handleRefresh}>Refresh</button>
      </div>
      
    </div>
  );
}

export default App;
