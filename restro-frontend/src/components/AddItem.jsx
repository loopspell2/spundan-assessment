import React, { useState } from 'react';
import { addMenuItem } from '../actions/menu'; // Assuming this is the function that handles adding the item

const AddItem = ({setIsAddItem}) => {
  const [newItem, setNewItem] = useState({
    item: "",
    categorie: "",
    isSize: false,
    size: {
      small: "",
      larger: ""
    },
    isPrice: false,
    price: ""
  });

  const [message, setMessage] = useState("");

  // Handle the radio button change for Size or Price
  const handleRadioChange = (value) => {
    setNewItem((prevItem) => ({
      ...prevItem,
      isSize: value === "size",
      isPrice: value === "price",
    }));
  };

  // Handle form submission to add a new item
  const handleAdd = async (e) => {
    e.preventDefault();
    console.log(newItem);
    const response = await addMenuItem(newItem);
    console.log(response)
    setMessage(response);
    if(response.status){
        setTimeout(() => {
            setIsAddItem(false)
        },2000)
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded shadow-lg w-1/3">
        <h3 className="text-xl font-semibold mb-4">Add New Item</h3>
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Item Name */}
          <div className="mb-4">
            <label className="block text-sm font-semibold">Item Name</label>
            <input
              type="text"
              value={newItem.item}
              onChange={(e) =>
                setNewItem({ ...newItem, item: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-sm font-semibold">Category</label>
            <input
              type="text"
              value={newItem.categorie}
              onChange={(e) =>
                setNewItem({ ...newItem, categorie: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>

          {/* Radio Buttons for Size or Price */}
          <div className="mb-4">
            <label className="block text-sm font-semibold">Select Option</label>
            <div className="flex items-center">
              <label className="mr-4">
                <input
                  type="radio"
                  name="option"
                  value="size"
                  checked={newItem.isSize}
                  onChange={() => handleRadioChange("size")}
                  className="mr-2"
                />
                Size
              </label>
              <label>
                <input
                  type="radio"
                  name="option"
                  value="price"
                  checked={newItem.isPrice}
                  onChange={() => handleRadioChange("price")}
                  className="mr-2"
                />
                Price
              </label>
            </div>
          </div>

          {/* Display size inputs only if isSize is true */}
          {newItem.isSize && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-semibold">Size Small</label>
                <input
                  type="text"
                  value={newItem.size.small}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      size: { ...newItem.size, small: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold">Size Large</label>
                <input
                  type="text"
                  value={newItem.size.larger}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      size: { ...newItem.size, larger: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
              </div>
            </>
          )}

          {/* Display price input only if isPrice is true */}
          {newItem.isPrice && (
            <div className="mb-4">
              <label className="block text-sm font-semibold">Price</label>
              <input
                type="text"
                value={newItem.price}
                onChange={(e) =>
                  setNewItem({ ...newItem, price: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
          )}

          {/* Display success or error message */}
          {message && (
            <div className={`${message.status ? "text-blue-500" : "text-red-500"}`}>
              {message.message}
            </div>
          )}

          <div className="flex justify-between">
            <button
              onClick={handleAdd}
              className="bg-green-500 text-white p-2 rounded"
            >
              Add Item
            </button>
            <button
              onClick={() => setIsAddItem(false)} // You can modify to handle closing the form
              className="bg-gray-500 text-white p-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
