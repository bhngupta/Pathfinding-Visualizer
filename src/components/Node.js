import React from 'react';
import './styles/Node.css';

const Node = ({ isStart, isEnd, row, col }) => {
  const classes = isStart ? "node-start" : isEnd ? "node-end" : "";
  return(
    <div 
      className={`node ${classes}`} 
      id={`noce-${row}-${col}`}>
    </div>
  );
};

export default Node;