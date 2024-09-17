import { Pieces } from '../Chessboard/chessBoardContext';
import { isValidPawnMove } from './PawnMove';

export const isValidMove = (piece: Pieces, newPosition: string, chessBoardPieces: Pieces[]): boolean => {
    switch (piece.piece) {
      case 'pawn':
        return isValidPawnMove(piece, newPosition, chessBoardPieces);
      case 'rook':
        return isValidRookMove(piece, newPosition);
      case 'knight':
        return isValidKnightMove(piece, newPosition);
      case 'bishop':
        return isValidBishopMove(piece, newPosition);
      case 'queen':
        return isValidQueenMove(piece, newPosition);
      case 'king':
        return isValidKingMove(piece, newPosition);
      default:
        return false;
    }
  };

// To get the numeric rank (row) and file (column) from a chess position (e.g., "e4" -> { rank: 4, file: 5 })
export const getRankAndFile = (position: string) => {
    const file = position.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
    const rank = parseInt(position[1], 10);
    return { rank, file };
  };
  

  
  const isValidRookMove = (piece: Pieces, newPosition: string): boolean => {
    // Add rook movement validation logic here
    return false;
  };
  
  const isValidKnightMove = (piece: Pieces, newPosition: string): boolean => {
    // Add knight movement validation logic here
    return false;
  };
  
  const isValidBishopMove = (piece: Pieces, newPosition: string): boolean => {
    // Add bishop movement validation logic here
    return false;
  };
  
  const isValidQueenMove = (piece: Pieces, newPosition: string): boolean => {
    // Add queen movement validation logic here
    return false;
  };
  
  const isValidKingMove = (piece: Pieces, newPosition: string): boolean => {
    // Add king movement validation logic here
    return false;
  };

  export const getchessPiece = (position: string, chessBoardPieces:Pieces[]) => {
    return chessBoardPieces.find(piece => piece.position === position);
  };
  