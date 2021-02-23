import React, { useState, useEffect } from 'react';
import Node from './Node';
import Astar from './algorithms/Astar';
import './styles/Pathfinder.css';

const cols = 35;
const rows = 10;

const NODE_START_COL = 0
const NODE_START_ROW = 0
const NODE_END_COL = cols-1;
const NODE_END_ROW = rows-1;

const Pathfinder = () => {
  const [Grid, setGrid] = useState([]);
  
  useEffect(() => {
    initializeGrid();
  }, [])

  const initializeGrid = () => {
    const grid = new Array(rows);
    
    for(let i=0; i<cols; i++){
      grid[i] = new Array(cols);
    }
    createSpot(grid);
    setGrid(grid);
    addNeighbours(grid);
    
    const startNode = grid[NODE_START_ROW][NODE_START_COL];
    const endNode = grid[NODE_END_ROW][NODE_END_COL];
    Astar(startNode, endNode)
  };

  const createSpot = (grid) => {
    for(let i=0; i<rows; i++){
      for(let j=0; j<cols; j++){
        grid[i][j] = new Spot(i,j);
      }
    }
  };

  function Spot(i,j) {
    this.x = i;
    this.y = j;
    this.h = 0;
    this.f = 0;
    this.g = 0;
    this.isStart = this.x === NODE_START_ROW && this.y === NODE_START_COL;
    this.isEnd = this.x === NODE_END_ROW && this.y === NODE_END_COL;
    this.neighbours = [];
    this.previous = undefined;
    this.addneighbours = function(grid){
      let i = this.x;
      let j = this.y;
      if( i > 0 ) this.neighbours.push( grid[i-1][j] );
      if( i < rows - 1 ) this.neighbours.push( grid[i+1][j] );
      if( j > 0 ) this.neighbours.push( grid[i][j-1] );
      if( j < cols -1 ) this.neighbours.push( grid[i][j+1] );
    }
  }

  const addNeighbours = (grid) => {
    for(let i = 0; i < rows; i++){
      for(let j = 0; j < cols; j++){
        grid[i][j].addneighbours(grid);
      }
    }
  }

  //console.log(Grid);
  const nodeGrid = (
    <div>
      {Grid.map((row, rowIndex) => {
        return(
          <div key={rowIndex} className="rowWrapper">
            {row.map((col, colIndex) => {
              const {isStart, isEnd} = col;
              return(
                <Node 
                  key={colIndex} 
                  isStart={isStart} 
                  isEnd={isEnd} 
                  row={rowIndex} 
                  col={colIndex}/>
              )
            })}
          </div> 
        )
      })}
    </div>
  )
  return(
    <div className="Wrapper">
      <h1>Help</h1>
      {nodeGrid}
    </div>
  );
};

export default Pathfinder;