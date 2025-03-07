import React from "react";

const Actions = (props) => {
  const { isAddItem, setIsAddItem, isEditing, setIsEditing, isMakeOrder, setIsMakeOrder } = props;

  return (
    <>
      <div className="flex items-center justify-between">

        <div>
          <button
            className="py-2 px-4 bg-amber-400 rounded-md m-2 w-32"
            onClick={() => setIsMakeOrder(!isMakeOrder)}
          >
            {!isMakeOrder ? "Add Order" : "X"}
          </button>
        </div>

        <div className="text-end">
          <button
            className="py-2 px-4 bg-emerald-400 rounded-md m-2 w-32"
            onClick={() => setIsAddItem(!isAddItem)}
          >
            {!isAddItem ? "Add item" : "X"}
          </button>
          <button
            className="py-2 px-4 bg-rose-500 rounded-md m-2 w-16"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Edit" : "X"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Actions;
