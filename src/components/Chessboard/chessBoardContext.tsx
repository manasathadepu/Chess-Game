import React, { createContext, useState, useContext } from 'react';

export interface Pieces {
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
  
  

// Creating context for chessBoardPieces and its updater
const ChessboardContext = createContext<{chessBoardPieces: Pieces[], setChessBoardPieces: React.Dispatch<React.SetStateAction<Pieces[]>>} | undefined>(undefined);

export const ChessboardProvider = ({ children }: { children: React.ReactNode }) => {
  const [chessBoardPieces, setChessBoardPieces] = useState<Pieces[]>(initialPieces);
  
  return (
    <ChessboardContext.Provider value={{ chessBoardPieces, setChessBoardPieces }}>
      {children}
    </ChessboardContext.Provider>
  );
};

export const useChessboard = () => {
  const context = useContext(ChessboardContext);
  if (!context) {
    throw new Error("useChessboard must be used within a ChessboardProvider");
  }
  return context;
};
