import React, { useState } from "react";
import ConfirmationPopUp from "./ConfirmationPopUp";
import ShowOrderPopup from "./ShowOrderPopup";

const MakeOrder = ({ menuItems }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [tempItem, setTempItem] = useState(null); // Store the temporary item selected
  const [selectedSize, setSelectedSize] = useState(null); // Store the selected size
  const [showOrderPopup, setShowOrderPopup] = useState(false); // Toggle showing the order popup

  // Group the menu items by category
  const groupedMenu = menuItems.reduce((acc, item) => {
    if (!acc[item.categorie]) {
      acc[item.categorie] = [];
    }
    acc[item.categorie].push(item);
    return acc;
  }, {});

  const handleItemClick = (item) => {
    // Show confirmation modal when an item is clicked
    setTempItem(item);
    setSelectedSize(null); // Reset size selection
    setShowConfirmation(true); // Open the confirmation modal
  };

  const handleSizeSelection = (size) => {
    setSelectedSize(size); // Set the selected size
  };

  const handleAddToOrder = (item, size, price) => {
    const existingItemIndex = selectedItems.findIndex(
      (orderItem) => orderItem.item === item && orderItem.size === size
    );

    if (existingItemIndex > -1) {
      // Update quantity if item already in the order
      const updatedItems = [...selectedItems];
      updatedItems[existingItemIndex].quantity += 1;
      setSelectedItems(updatedItems);
    } else {
      // Add new item to the order
      setSelectedItems([...selectedItems, { item, size, price, quantity: 1 }]);
    }
    setShowConfirmation(false); // Close the confirmation modal after adding to order
  };

  const toggleShowOrderPopup = () => {
    setShowOrderPopup(!showOrderPopup); // Toggle showing the order popup
  };

  return (
    <div className="w-full h-full text-rose-900">
      {/* A La Carte Title */}
      <div className="text-4xl text-rose-900 text-center mt-10">A La Carte</div>
      <div className="text-xl text-rose-900 text-center">Mix and match</div>

      {/* Grouped Menu Categories */}
      <div className="grid grid-cols-3 mt-10 text-center">
        {Object.keys(groupedMenu).map((category) => (
          <div key={category} className="mb-8 col-span-1 bg-rose-50 mx-2">
            <h2 className="text-2xl font-semibold text-rose-900 mb-4">
              {category}
            </h2>
            <div className="flex items-center justify-end px-4 mx-4 font-bold">
              <p className="w-10 text-sm">small</p>
              <p className="w-16 text-sm">large</p>
            </div>
            <div className="px-4 mx-4">
              {groupedMenu[category].map((item) => (
                <div
                  key={item.item}
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => handleItemClick(item)} // Handle item selection
                >
                  <div className="font-semibold">{item.item}</div>
                  <div className="font-light">
                    {item.isSize && (
                      <div className="flex">
                        <p className="w-10">{item.size.small}</p>
                        <p className="w-16">{item.size.larger}</p>
                      </div>
                    )}
                    {item.isPrice && (
                      <div className="flex">
                        <p className="w-10">{item.price}</p>
                        <p className="w-16"></p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Show Order Popup Button */}
      <div className="mt-10">
        <button
          onClick={toggleShowOrderPopup}
          className="btn btn-show-order text-white bg-rose-900 p-3 rounded ml-10"
        >
          {showOrderPopup ? "Hide Order" : "Show Order"}
        </button>
      </div>

      {/* Order Popup */}
      {showOrderPopup && (
        <ShowOrderPopup
        toggleShowOrderPopup={toggleShowOrderPopup}
        selectedItems={selectedItems}
        />
      )}

      {/* Confirmation Modal */}
      {showConfirmation && tempItem && (
        <ConfirmationPopUp
          setShowConfirmation={setShowConfirmation}
          tempItem={tempItem}
          handleSizeSelection={handleSizeSelection}
          selectedSize={selectedSize}
          handleAddToOrder={handleAddToOrder}
        />
      )}
    </div>
  );
};

export default MakeOrder;
