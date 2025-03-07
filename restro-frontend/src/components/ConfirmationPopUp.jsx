import React from "react";

const ConfirmationPopUp = (props) => {

    const {setShowConfirmation, tempItem, handleSizeSelection, selectedSize, handleAddToOrder} = props;

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold text-rose-900">Confirmation</div>
            <button
              onClick={() => setShowConfirmation(false)}
              className="text-rose-900 text-xl font-bold"
            >
              &times;
            </button>
          </div>
          <div className="mt-4">
            <p className="text-lg">
              Are you sure you want to add {tempItem.item} to your order?
            </p>
            {tempItem.isSize && (
              <>
                <p className="mt-2 text-md text-gray-700">
                  Please choose a size:
                </p>
                <div className="flex justify-center gap-4 mt-2">
                  <button
                    onClick={() => handleSizeSelection("small")}
                    className={`btn ${
                      selectedSize === "small"
                        ? "bg-rose-700 text-white"
                        : "bg-gray-200"
                    } rounded-md px-4 py-1`}
                  >
                    Small (${tempItem.size.small})
                  </button>
                  <button
                    onClick={() => handleSizeSelection("large")}
                    className={`btn ${
                      selectedSize === "large"
                        ? "bg-rose-700 text-white"
                        : "bg-gray-200"
                    } rounded-md px-4 py-1`}
                  >
                    Large (${tempItem.size.larger})
                  </button>
                </div>
              </>
            )}
            {!tempItem.isSize && (
              <p className="mt-2 text-md text-gray-700">
                Price: ${tempItem.price}
              </p>
            )}
          </div>
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => {
                if (tempItem.isSize && !selectedSize) {
                  return; // Don't proceed if size is required but not selected
                }

                handleAddToOrder(
                  tempItem.item,
                  selectedSize || "price", // Use selected size or default size
                  tempItem.isSize
                    ? tempItem.size[selectedSize] // Use selected size price
                    : tempItem.price // Use price if no size
                );
              }}
              className={`bg-rose-900 text-white px-6 py-2 rounded-lg ${
                !selectedSize && tempItem.isSize
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={tempItem.isSize && !selectedSize} // Disable button if size is required but not selected
            >
              Yes, Add to Order
            </button>
            <button
              onClick={() => setShowConfirmation(false)}
              className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopUp;
