import { useState } from "react";
import styled from "styled-components";

export interface Props {
  index: number;
  onDrop?: Function;
  onDragOver?: Function;
  children?: any;
}

const Draggable = ({ index, onDrop, onDragOver, children }: Props) => {
  const [isDragged, setIsDragged] = useState(false);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  const handleDragEnter = (e: any) => {
    e.preventDefault();
    setIsDraggedOver(true);
    onDragOver && onDragOver(index);
  };
  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setIsDraggedOver(false);
  };
  const handleDragOver = (e: any) => {
    e.preventDefault();
    setIsDraggedOver(false);
  };
  const handleDrop = (e: any) => {
    e.stopPropagation();
    setIsDragged(false);
    onDrop && onDrop(index);
  };

  return (
    <Wrapper
      draggable="true"
      onDragStart={() => setIsDragged(true)}
      onDragEnd={handleDrop}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      isDragged={isDragged}
      isDraggedOver={isDraggedOver}
    >
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ isDragged: boolean; isDraggedOver: boolean }>`
  display: flex;
  justify-content: space-between;
  opacity: 1;
  ${(p) =>
    p.isDragged &&
    `
    opacity: 0.01;
  `}
  ${(p) =>
    p.isDraggedOver &&
    `
    opacity: 0.01;
  `}
`;

export default Draggable;
