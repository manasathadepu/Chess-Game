import { useCallback, useState } from 'react';
import './Chessboard.css';
import { Tile } from '../Tile/Tile';
import { useTileHandlers } from '../Tile/TileHandlers';
import { ChessboardProvider, useChessboard } from './chessBoardContext';

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

export const Chessboard = () => {
  return (
    <ChessboardProvider>
      <ChessboardContent />
    </ChessboardProvider>
  );
};


export const ChessboardContent = () => {
  const [selectedPiece, setSelectedPiece] = useState<string | undefined>("");
  const { chessBoardPieces, setChessBoardPieces } = useChessboard();
  
  
  const movePiece = (piecePosition: string, newPosition: string) => {
    setChessBoardPieces(prevState => {
      // Create a shallow copy of the board
      const updatedBoard = [...prevState];
  
      // Find the index of the piece at the new position (for capture)
      const removeIndex = updatedBoard.findIndex(piece => piece.position === newPosition);
      
      // If there is a piece to capture, remove it
      if (removeIndex !== -1) {
        updatedBoard.splice(removeIndex, 1);
      }
  
      // Find the index of the piece to move
      const pieceIndex = updatedBoard.findIndex(piece => piece.position === piecePosition);
      
      // If the piece to move isn't found, return the previous state
      if (pieceIndex === -1) return prevState;
  
      // Update the piece's position
      updatedBoard[pieceIndex] = { ...updatedBoard[pieceIndex], position: newPosition };
  
      return updatedBoard;
    });
  };
  

 const { handleDragStart, handleDrop, handleDragOver } = useTileHandlers(movePiece, setSelectedPiece);

 const getchessPiece = useCallback((position: string) => {
  return chessBoardPieces.find(piece => piece.position === position);
}, [chessBoardPieces]);

 const boardSetup = useCallback(() => {
  const newBoard: JSX.Element[] = [];

  for (let i = verticalAxis.length - 1; i >= 0; i--) {
    for (let j = 0; j < horizontalAxis.length; j++) {
      const tileColor = (i + j) % 2 === 0 ? 'black_tile' : 'white_tile';
      const position = `${horizontalAxis[j]}${verticalAxis[i]}`;
      const piece = getchessPiece(position);

      newBoard.push(
        <Tile
          key={position}
          color={tileColor}
          position={position}
          piece={piece}
          dragOver={handleDragOver}
          dragStart={handleDragStart}
          drop={handleDrop}
          movedPiece={selectedPiece}
        />
      );
    }
  }
  return newBoard;
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [chessBoardPieces]);


  return (
       <div id="chessboard">
        {boardSetup()}
      </div>
   
  );
};

