import React, { useState, useEffect } from "react";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);

  // Fetch data (assuming you have an endpoint like '/api/menu')
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch("http://localhost:5000/menu", {
          credentials: "include",
        });
        const data = await response.json();
        console.log(...data.data);
        setMenuItems(data.data);
      } catch (err) {
        console.error("Error fetching menu:", err);
      }
    };

    fetchMenu();
  }, []);

  // Group the items by category
  // const groupedMenu = []
  const groupedMenu = menuItems.reduce((acc, item) => {
    if (!acc[item.categorie]) {
      acc[item.categorie] = [];
    }
    acc[item.categorie].push(item);
    return acc;
  }, {});

  return (
    <>
      <div className="w-full h-full text-rose-900">
        <div className="text-4xl text-rose-900 text-center mt-10">A La Carte</div>
        <div className="text-xl text-rose-900 text-center">Mix and match</div>

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
              <div className=" px-4 mx-4">
                {groupedMenu[category].map((item) => (
                  <div className=" flex items-center justify-between">
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
      </div>
    </>
  );
};

export default Menu;
