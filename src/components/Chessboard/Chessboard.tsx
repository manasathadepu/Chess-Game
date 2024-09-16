import React, { useCallback, useState } from 'react';
import './Chessboard.css';
import { Tile } from '../Tile/Tile';
import { useTileHandlers } from '../Tile/TileHandlers';

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

interface Pieces {
  id: number;
  piece: string;
  position: string;
  color: string;
}

const initialPieces: Pieces[] = [
  { id: 1, position: "a8", piece: "rook", color: "b" },
  { id: 2, position: "b8", piece: "knight", color: "b" },
  { id: 3, position: "c8", piece: "bishop", color: "b" },
  { id: 4, position: "d8", piece: "queen", color: "b" },
  { id: 5, position: "e8", piece: "king", color: "b" },
  { id: 6, position: "f8", piece: "bishop", color: "b" },
  { id: 7, position: "g8", piece: "knight", color: "b" },
  { id: 8, position: "h8", piece: "rook", color: "b" },
  { id: 9, position: "a7", piece: "pawn", color: "b" },
  { id: 10, position: "b7", piece: "pawn", color: "b" },
  { id: 11, position: "c7", piece: "pawn", color: "b" },
  { id: 12, position: "d7", piece: "pawn", color: "b" },
  { id: 13, position: "e7", piece: "pawn", color: "b" },
  { id: 14, position: "f7", piece: "pawn", color: "b" },
  { id: 15, position: "g7", piece: "pawn", color: "b" },
  { id: 16, position: "h7", piece: "pawn", color: "b" },
  { id: 17, position: "a1", piece: "rook", color: "w" },
  { id: 18, position: "b1", piece: "knight", color: "w" },
  { id: 19, position: "c1", piece: "bishop", color: "w" },
  { id: 20, position: "d1", piece: "queen", color: "w" },
  { id: 21, position: "e1", piece: "king", color: "w" },
  { id: 22, position: "f1", piece: "bishop", color: "w" },
  { id: 23, position: "g1", piece: "knight", color: "w" },
  { id: 24, position: "h1", piece: "rook", color: "w" },
  { id: 25, position: "a2", piece: "pawn", color: "w" },
  { id: 26, position: "b2", piece: "pawn", color: "w" },
  { id: 27, position: "c2", piece: "pawn", color: "w" },
  { id: 28, position: "d2", piece: "pawn", color: "w" },
  { id: 29, position: "e2", piece: "pawn", color: "w" },
  { id: 30, position: "f2", piece: "pawn", color: "w" },
  { id: 31, position: "g2", piece: "pawn", color: "w" },
  { id: 32, position: "h2", piece: "pawn", color: "w" },
];

export const Chessboard = () => {
  const [chessBoardPieces, setChessBoardPieces] = useState<Pieces[]>(initialPieces);
  const [selectedPiece, setSelectedPiece] = useState<string | undefined>("");
  // const [board, setBoard] = useState<JSX.Element[]>([]);

  
  // useEffect(() => {
  //   const newBoard = boardSetup();
  //   setBoard(newBoard);
  // }, [chessBoardPieces, boardSetup]);

  const getchessPiece = useCallback((position: string) => {
    return chessBoardPieces.find(piece => piece.position === position);
  }, [chessBoardPieces]);

  const movePiece = useCallback((piecePosition: string, newPosition: string) => {
    setChessBoardPieces((prevState) =>
      prevState.map((piece) =>
        piece.position === piecePosition
          ? { ...piece, position: newPosition }
          : piece
      )
    );
  }, []);

 const { handleDragStart, handleDrop, handleDragOver } = useTileHandlers(movePiece, setSelectedPiece);

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
