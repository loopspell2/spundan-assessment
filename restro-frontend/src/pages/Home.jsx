import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Menu from "../components/Menu";
import EditnUpdateMenu from "../components/EditnUpdateMenu";
import AddItem from "../components/AddItem";
import { useNavigate } from "react-router-dom";
import { getMenuItem } from "../actions/menu";
import Actions from "../components/Actions";
import MakeOrder from "../components/MakeOrder";

const Home = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isEditing, setIsEditing] = useState(true);
  const [isAddItem, setIsAddItem] = useState(false);
  const [isMakeOrder, setIsMakeOrder] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = document.cookie.split("=")[1];
    console.log("token : ", token);
    if (!token) {
      navigate("/auth");
    }

    const fetchMenu = async () => {
      try {
        const response = await getMenuItem();
        console.log(response);
        if (response.status) {
          setMenuItems(response.data);
        }
      } catch (err) {
        console.error("Error fetching menu:", err);
        return;
      }
    };

    fetchMenu();
  }, [navigate]);

  const renderContent = () => {
    switch (true) {
      case isMakeOrder:
        return <MakeOrder menuItems={menuItems}/>
      case isAddItem:
        return <AddItem setIsAddItem={setIsAddItem} />;
      case isEditing:
        return <Menu menuItems={menuItems} />;
      default:
        return <EditnUpdateMenu menuItems={menuItems} />;
    }
  };

  return (
    <div>
      <div>
        <Navbar />

        <Actions
          isAddItem={isAddItem}
          setIsAddItem={setIsAddItem}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          isMakeOrder={isMakeOrder}
          setIsMakeOrder={setIsMakeOrder}
        />

        <div>{renderContent()}</div>

      </div>
    </div>
  );
};

export default Home;
