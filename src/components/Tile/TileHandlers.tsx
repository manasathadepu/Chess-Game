import { useCallback } from 'react';

export const useTileHandlers = (movePiece: (piecePosition: string, newPosition: string) => void, setSelectedPiece: React.Dispatch<React.SetStateAction<string | undefined>>) => {
  const handleDragStart = useCallback((e: React.DragEvent<HTMLDivElement>, piece: string) => {
    e.dataTransfer.setData('text/plain', piece);
    setSelectedPiece(piece);
  }, [setSelectedPiece]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>, newPosition: string) => {
    e.preventDefault();
    const selectedPiecePosition = e.dataTransfer.getData('text/plain');
    if (selectedPiecePosition) {
      movePiece(selectedPiecePosition, newPosition);
      setSelectedPiece("");
    }
  }, [movePiece, setSelectedPiece]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  return { handleDragStart, handleDrop, handleDragOver };
};
