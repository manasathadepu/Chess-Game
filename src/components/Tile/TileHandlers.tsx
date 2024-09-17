import { useCallback, useRef } from 'react';
import { isValidMove } from '../MoveValidation/MoveValidation';
import { useChessboard } from '../Chessboard/chessBoardContext';

export const useTileHandlers = (movePiece: (piecePosition: string, newPosition: string) => void, setSelectedPiece: React.Dispatch<React.SetStateAction<string | undefined>>) => {
  
  const { chessBoardPieces } = useChessboard();

  const chessBoardPiecesRef = useRef(chessBoardPieces);
  chessBoardPiecesRef.current = chessBoardPieces; // Update ref to the latest state
  
  const handleDragStart = useCallback((e: React.DragEvent<HTMLDivElement>, piece: string) => {
    e.dataTransfer.setData('text/plain', piece);
    setSelectedPiece(piece);
  }, [setSelectedPiece]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>, newPosition: string) => {
    e.preventDefault();
    const selectedPiecePosition = e.dataTransfer.getData('text/plain');
    const piece = chessBoardPiecesRef.current.find(piece => piece.position === selectedPiecePosition);

    if (piece && isValidMove(piece, newPosition, chessBoardPiecesRef.current)) {
      movePiece(selectedPiecePosition, newPosition);
      setSelectedPiece(undefined); 
    } else {
      console.log('Invalid move');
    }
  }, [movePiece, setSelectedPiece]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  return { handleDragStart, handleDrop, handleDragOver };
};
