const updateMenu = async (menu) => {
  var myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    categorie: menu.categorie,
    item: menu.item,
    isSize: menu.isSize,
    size: {
      small: menu.size.small,
      larger: menu.size.larger,
    },
    isPrice: menu.isPrice,
    price: menu.price,
  });

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    credentials: "include",
  };

  try {
    const response = await fetch(
      `http://localhost:5000/menu/${menu._id}`,
      requestOptions
    );

    const result = await response.json();

    // console.log(response);
    return result;
  } catch (err) {
    // console.log("error while updating menu : ",err)
    return err;
  }
};

const deleteMenu = async (id) => {
  var requestOptions = {
    method: "DELETE",
    redirect: "follow",
    credentials: "include",
  };

  try {
    const response = await fetch(
      `http://localhost:5000/menu/${id}`,
      requestOptions
    );
    const result = await response.json();
    return result;
  } catch (err) {
    console.log("error while deleting the menu : ", err);
    return err;
  }
};

const addMenuItem = async (menu) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({
    categorie: menu.categorie,
    item: menu.item,
    isSize: menu.isSize,
    size: {
      small: menu.size.small,
      larger: menu.size.larger,
    },
    isPrice: menu.isPrice,
    price: menu.price,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    credentials: "include",
  };

  try {
    const response = await fetch("http://localhost:5000/menu/", requestOptions);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log("error while adding an menu item : ", error);
    return error;
  }
};

const getMenuItem = async () => {
  try {
    const response = await fetch("http://localhost:5000/menu", {
      credentials: "include",
    });
    const data = await response.json();
    console.log(...data.data);
    return data;
  } catch (err) {
    console.error("Error fetching menu:", err);
    return {
      status: false,
      message: "Error while fetching menu",
    }
  }
};

module.exports = {
  updateMenu,
  deleteMenu,
  addMenuItem,
  getMenuItem
};
