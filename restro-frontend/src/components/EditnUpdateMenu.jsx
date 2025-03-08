import React, { useState } from "react";
import EditItem from "./EditItem";
import { deleteMenu } from "../actions/menu";

const EditnUpdateMenu = ({menuItems}) => {
  const [editItem, setEditItem] = useState(null);
  const [newItem, setNewItem] = useState({
    item: "",
    categorie: "",
    isSize: false,
    size: {
      small: "",
      larger: "",
    },
    isPrice: false,
    price: "",
  });

  // Group the items by category
  const groupedMenu = menuItems.reduce((acc, item) => {
    if (!acc[item.categorie]) {
      acc[item.categorie] = [];
    }
    acc[item.categorie].push(item);
    return acc;
  }, {});

  // Handle editing an item
  const handleEdit = (item) => {
    setEditItem(item);
    setNewItem({ ...item });
  };

  // Handle item deletion
  const handleDelete = async (itemId) => {
    console.log(itemId);
    const response = await deleteMenu(itemId);
    console.log(response)
  };

  return (
    <>
      <div className="w-full h-full text-rose-900">
        <div className="text-4xl text-rose-900 text-center mt-10">
          A La Carte
        </div>
        <div className="text-xl text-rose-900 text-center">Mix and match</div>

        <div className="grid grid-cols-3 mt-10 text-center">
          {Object.keys(groupedMenu).map((category) => (
            <div key={category} className="mb-8 col-span-1 bg-rose-50 mx-2">
              <h2 className="text-2xl font-semibold text-rose-900 mb-4">
                {category}
              </h2>
              {/* <div className="flex items-center justify-end px-4 mx-4 font-bold">
                <p className="w-10 text-sm">small</p>
                <p className="w-16 text-sm">large</p>
              </div> */}
              <div className=" px-4 mx-4">
                {groupedMenu[category].map((item) => (
                  <div
                    key={item.id}
                    className=" flex items-center justify-between my-2"
                  >
                    <div className="font-semibold w-32">{item.item}</div>
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
                    <div>
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-yellow-500 text-white px-2 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-500 text-white px-2 rounded ml-2"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Edit Form */}
        {editItem && (
          <EditItem
            setEditItem={setEditItem}
            newItem={newItem}
            setNewItem={setNewItem}
          />
        )}
      </div>
    </>
  );
};

export default EditnUpdateMenu;
