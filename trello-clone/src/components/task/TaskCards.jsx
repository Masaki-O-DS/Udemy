import React, { useState } from "react";
import { TaskCard } from "./TaskCard";
import { AddTaskCardButton } from "./button/AddTaskCardButton";
import { Draggable } from "react-beautiful-dnd";

export const TaskCards = () => {
  const [taskCardsList, setTaskCardsList] = useState([
    { id: 0, draggableId: "item-0" },
  ]);
  return (
    <div className="taskCardsArea">
      {taskCardsList.map((taskCardList) => (
        <TaskCard key={taskCardList.id} />
      ))}

      <AddTaskCardButton
        taskCardsList={taskCardsList}
        setTaskCardsList={setTaskCardsList}
      />
    </div>
  );
};
