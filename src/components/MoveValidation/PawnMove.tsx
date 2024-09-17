import { getRankAndFile, getchessPiece } from './MoveValidation';
import { Pieces } from '../Chessboard/chessBoardContext';


  export const isValidPawnMove = (piece: Pieces, newPosition: string, chessBoardPieces: Pieces[]): boolean => {
    const { rank: currentRank, file: currentFile } = getRankAndFile(piece.position);
    const { rank: newRank, file: newFile } = getRankAndFile(newPosition);
    
    const isWhite = piece.color === 'w';
    const direction = isWhite ? 1 : -1; // White moves up, Black moves down
  
    // Handle standard forward movement (one square ahead, no capture)
    if (currentFile === newFile && !getchessPiece(newPosition, chessBoardPieces)) {
      // Regular move
      if (newRank === currentRank + direction) {
        return true;
      }
  
      // First move (two squares forward)
      const startingRank = isWhite ? 2 : 7;
      if (currentRank === startingRank && newRank === currentRank + 2 * direction && !getchessPiece(newPosition, chessBoardPieces)) {
        return true;
      }
    }
  
    // Handle capturing diagonally
    if (Math.abs(currentFile - newFile) === 1 && newRank === currentRank + direction) {
      const targetPiece = getchessPiece(newPosition, chessBoardPieces);
      if (targetPiece && targetPiece.color !== piece.color) {
        return true;
      }
    }
  
    // TODO: Handle en passant
  
    return false;
  };
  
 