import React from 'react';
import './Tile.css';


interface Piece {
    piece: string;
    color: string;
    position: string;
    id: number;
  } 

interface Props {
    piece: Piece | undefined
    color: string;
    position: string;
    movedPiece: string | null | undefined;
    dragOver: (e : React.DragEvent<HTMLDivElement>) => void;
    drop: (e: React.DragEvent<HTMLDivElement>,position: string, movedPiece: string | null | undefined) => void;
    dragStart:(e: React.DragEvent<HTMLDivElement>,piece: string) => void
}

const TileComponent: React.FC<Props>  = ({position, color, piece, dragOver,drop,dragStart, movedPiece}: Props) => {
    const dynamicStyle = (piece : Props['piece']): React.CSSProperties => {
        if(piece) {
            return {
                '--dynamic-image': `url(${process.env.PUBLIC_URL}/assets/images/${piece.piece}_${piece.color}.png)`,

            }as React.CSSProperties;  // Explicit cast to handle custom CSS variable
        }
        return {
            '--dynamic-image': 'none',
        }as React.CSSProperties;  // Explicit cast to handle custom CSS variable
    };

    return (
        <div className={`tile ${color}`} onDragOver={(e) => dragOver(e)} onDrop={(e) => drop(e,position, movedPiece)}>
           {piece &&  <div className= "chess-img"  style= {dynamicStyle(piece)} draggable onDragStart={(e) => dragStart(e, piece.position)} /> }


        </div> 
    )
}


// Memoize the Tile component
export const Tile = React.memo(TileComponent, (prevProps, nextProps) => {
    return (
      prevProps.color === nextProps.color && // Check if the tile color is the same
      prevProps.position === nextProps.position && // Check if the tile position is the same
      prevProps.movedPiece === nextProps.movedPiece && // Check if the moved piece is the same
      prevProps.piece?.piece === nextProps.piece?.piece && // Check if the piece type is the same
      prevProps.piece?.color === nextProps.piece?.color // Check if the piece color is the same
    );
  });