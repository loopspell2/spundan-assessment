import React from "react";
import { placeOrder } from "../actions/order";

const ShowOrderPopup = (props) => {
  const { toggleShowOrderPopup, selectedItems } = props;

  // Constants for GST and restaurant charges
  const gstRate = 0.18; // 18% GST
  const restaurantChargeRate = 0.05; // 5% Restaurant charge

  // Calculate total price
  const totalAmount = selectedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Calculate GST and restaurant charges
  const gstAmount = totalAmount * gstRate;
  const restaurantCharge = totalAmount * restaurantChargeRate;

  // Final total after adding GST and restaurant charges
  const finalTotal = totalAmount + gstAmount + restaurantCharge;

  const handlePlaceOrder = async() => {
    console.log(selectedItems);

    const response = placeOrder(selectedItems);
    console.log(response);
  }

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold text-rose-900">Your Order</div>
            <button
              onClick={toggleShowOrderPopup} // Close the popup
              className="text-rose-900 text-xl font-bold"
            >
              &times;
            </button>
          </div>
          <div className="mt-4">
            {selectedItems.length === 0 ? (
              <p className="text-lg text-center text-gray-700">
                No items in the order yet.
              </p>
            ) : (
              <div>
                {selectedItems.map((orderItem, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-40">{orderItem.item}</div>
                    <div className="w-20">{orderItem.size}</div>
                    <div className="w-20">{`$${orderItem.price}`}</div>
                    <div className="w-24">{`Quantity: ${orderItem.quantity}`}</div>
                  </div>
                ))}
                <div className="mt-4 mr-2 text-md font-semibold text-right">
                  <div>Total: ${totalAmount.toFixed(2)}</div>
                  <div>GST (18%): ${gstAmount.toFixed(2)}</div>
                  <div>Restaurant Charge (5%): ${restaurantCharge.toFixed(2)}</div>
                  <div className="mt-2 font-bold text-xl">
                    Final Total: ${finalTotal.toFixed(2)}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={handlePlaceOrder}
              className="bg-rose-300 text-rose-800 px-6 py-2 rounded-lg"
            >
              Place Order
            </button>

            <button
              onClick={toggleShowOrderPopup}
              className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowOrderPopup;
