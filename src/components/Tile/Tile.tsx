import './Tile.css';


interface Props {
    piece: {piece:string; color:string; position:string; id: number} | undefined
    color: string;
    position: string;
    movedPiece: string | null | undefined;
    dragOver: (e : React.DragEvent<HTMLDivElement>) => void;
    drop: (e: React.DragEvent<HTMLDivElement>,position: string, movedPiece: string | null | undefined) => void;
    dragStart:(e: React.DragEvent<HTMLDivElement>,piece: string) => void
}

export const Tile = ({position, color, piece, dragOver,drop,dragStart, movedPiece}: Props) => {

    return (
        <div className={`tile ${color}`} onDragOver={(e) => dragOver(e)} onDrop={(e) => drop(e,position, movedPiece)}>
           {piece &&  <img className= "chess-img" alt="chessImage" src={process.env.PUBLIC_URL + '/assets/images/' + `${piece.piece}_${piece.color}.png`} draggable onDragStart={(e) => dragStart(e, piece.position)} /> }


        </div> 
    )
}