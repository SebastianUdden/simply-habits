import { useState } from "react";
import styled from "styled-components";
import Draggable from "./DraggableItem";

interface Props {
  list: any[];
  listView: any[];
  onListUpdate: Function;
}

const DraggableList = ({ list, listView, onListUpdate }: Props) => {
  const [dragOverIndex, setDragOverIndex] = useState<number>(0);

  const handleDrop = (index: number) => {
    if (index === dragOverIndex) return;
    const tempArray = list.slice();
    const moveObj = tempArray.splice(index, 1);
    tempArray.splice(dragOverIndex, 0, moveObj[0]);
    onListUpdate(tempArray);
  };

  return (
    <Wrapper>
      <ul>
        {listView.map((l, i) => (
          <Draggable
            index={i}
            onDragOver={(index: number) => setDragOverIndex(index)}
            onDrop={handleDrop}
          >
            {l}
          </Draggable>
        ))}
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default DraggableList;
