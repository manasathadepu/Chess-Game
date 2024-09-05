import React, { useEffect, useState } from 'react';
import './Chessboard.css';
import { Tile } from '../Tile/Tile';

const verticalAxis = ["1","2","3","4","5","6","7","8"];
const horizontalAxis = ["a","b","c","d","e","f","g","h"];

interface Pieces  {
    id: number,
    piece : string,
    position: string,
    color: string,
}
 
const chessPieces : Pieces [] = [
    {id: 1, position: "a8", piece: "rook", color:"b"},
    {id: 2, position: "b8", piece: "knight", color:"b"},
    {id: 3, position: "c8", piece: "bishop", color:"b"},
    {id: 4, position: "d8", piece: "queen",  color:"b"},
    {id: 5, position: "e8", piece: "king",  color:"b"},
    {id: 6, position: "f8", piece: "bishop", color:"b"},
    {id: 7, position: "g8", piece: "knight",  color:"b"},
    {id: 8, position: "h8", piece: "rook",  color:"b"},
    {id: 9, position: "a7", piece: "pawn",  color:"b"},
    {id: 10, position: "b7", piece: "pawn",  color:"b"},
    {id: 11, position: "c7", piece: "pawn",  color:"b"},
    {id: 12, position: "d7", piece: "pawn",  color:"b"},
    {id: 13, position: "e7", piece: "pawn",  color:"b"},
    {id: 14, position: "f7", piece: "pawn",  color:"b"},
    {id: 15, position: "g7", piece: "pawn",  color:"b"},
    {id: 16, position: "h7", piece: "pawn",  color:"b"},
    {id: 17, position: "a1", piece: "rook", color:"w"},
    {id: 18, position: "b1", piece: "knight", color:"w"},
    {id: 19, position: "c1", piece: "bishop", color:"w"},
    {id: 20, position: "d1", piece: "queen", color:"w"},
    {id: 21, position: "e1", piece: "king", color:"w"},
    {id: 22, position: "f1", piece: "bishop", color:"w"},
    {id: 23, position: "g1", piece: "knight", color:"w"},
    {id: 24, position: "h1", piece: "rook", color:"w"},
    {id: 25, position: "a2", piece: "pawn", color:"w"},
    {id: 26, position: "b2", piece: "pawn", color:"w"},
    {id: 27, position: "c2", piece: "pawn", color:"w"},
    {id: 28, position: "d2", piece: "pawn", color:"w"},
    {id: 29, position: "e2", piece: "pawn", color:"w"},
    {id: 30, position: "f2", piece: "pawn", color:"w"},
    {id: 31, position: "g2", piece: "pawn", color:"w"},
    {id: 32, position: "h2", piece: "pawn", color:"w"}

]

export const Chessboard = () => {

    const [chessBoardPieces, setChessBoardPieces] = useState<Pieces[]>([])
    const [board, setBoard] = useState<JSX.Element[]>([]);
    const [ selectedPiece, setSelectedPiece ] = useState<string| undefined>("");
    
    useEffect(()=> {
        setChessBoardPieces(chessPieces);
        // const newBoard= boardSetup();
        // setBoard(newBoard);
    }, []);

  

    const boardSetup =() => {
        const newBoard: JSX.Element[]= [];
        
        for(let i= verticalAxis.length-1; i >= 0; i--) {
            for(let j= 0; j<horizontalAxis.length; j++ ){
                const tileColor = (i + j) % 2 === 0 ?  'black_tile': 'white_tile' ;
                const position = `${horizontalAxis[j]}${verticalAxis[i]}`;
                const piece = getchessPiece(position)
                const newaxis = <Tile key={position} color={ tileColor } position={position} piece = {piece} dragOver={handleDragOver} dragStart={handleDragStart} drop={handleDrop} movedPiece={selectedPiece} />
                newBoard.push(newaxis);
            }
        }
        return newBoard;
    }

    useEffect(() => {
        const newBoard= boardSetup();
        console.log('called setBoard')
        setBoard(newBoard);
    },[chessBoardPieces]);

    const getchessPiece = (currentIndex: string) => chessBoardPieces.find(piece => piece.position === currentIndex);
    const getchessIndex = (pieceKey: string) => chessBoardPieces.findIndex(piece => piece.position === pieceKey);
  

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const selectedPiece = e.dataTransfer.getData('text/plain');
        console.log('handleDragOver', selectedPiece);
    }

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, piece: string) => {        

       console.log('handleDragStart', piece);

       e.dataTransfer.setData('text/plain', piece);

      
       const updatedPiece = piece;

    setSelectedPiece(() => {
        console.log('Selected Piece After Update:', updatedPiece);
        return updatedPiece;
    });      
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, position: string, movedPiece:string| null | undefined) => {
        e.preventDefault();
        const selectedPiece = e.dataTransfer.getData('text/plain');

        console.log('handleDrop', position, movedPiece,selectedPiece);
        if(selectedPiece !== null && selectedPiece !== undefined) {
            console.log('handle');
            movePiece(selectedPiece, position);
            setSelectedPiece(undefined);
        }
    }

    const movePiece = (piece: string, newPosition: string) => {
        console.log('move piece', piece, newPosition, board );
        console.log('before', chessBoardPieces)
    
         const newpieceIndex = getchessIndex(piece as string);
         const selectedPieceDetails = chessBoardPieces[newpieceIndex];

         const newBoard = [...chessBoardPieces];
        newBoard[newpieceIndex] = { ...newBoard[newpieceIndex], position : newPosition };
        console.log('afterupdate ', newBoard[newpieceIndex], newBoard);
        setChessBoardPieces(newBoard );  
      

        setBoard((prevState) => {
            return prevState.map((square) => {
      
                if (square.props.position === piece) {
       
                    // const updatedPiece = undefined; 
                    const tileColor = (horizontalAxis.indexOf(selectedPieceDetails.position.charAt(0)) + verticalAxis.indexOf(selectedPieceDetails.position.charAt(1))) % 2 === 0 ?  'black_tile': 'white_tile' ;
                    console.log('move piece axis', newPosition, horizontalAxis.indexOf(newPosition.charAt(0)),  verticalAxis.indexOf(newPosition.charAt(1)) )
                    return (<Tile key={selectedPieceDetails.position} color={tileColor} position={selectedPieceDetails.position} piece={undefined} dragOver={handleDragOver} dragStart={handleDragStart} drop={handleDrop} movedPiece= {selectedPiece} />

                    );

                }
                if(square.key === newPosition) {
                    // const newpieceIndex = getchessIndex(piece as string);
                    console.log('newpieceIndex', newBoard[newpieceIndex])

                    // const updatedPiece =  chessBoardPieces[newpieceIndex];
                    const tileColor = (horizontalAxis.indexOf(newPosition.charAt(0)) + verticalAxis.indexOf(newPosition.charAt(1))) % 2 === 0 ?  'black_tile': 'white_tile' ;
                    console.log('move piece axis', newPosition, horizontalAxis.indexOf(newPosition.charAt(0)),  verticalAxis.indexOf(newPosition.charAt(1)) )
                    return (<Tile key={newPosition} color={tileColor} position={newPosition} piece={newBoard[newpieceIndex]} dragOver={handleDragOver} dragStart={handleDragStart} drop={handleDrop} movedPiece= {selectedPiece} />
 
             ) }
                return square;
                

            })
          

        });
    }
   
    return chessBoardPieces.length > 0 ? (
        <div id="chessboard">
            {board}
        </div>
    ) : null;
}