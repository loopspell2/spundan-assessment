import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Menu from "../components/Menu";
import EditnUpdateMenu from "../components/EditnUpdateMenu";
import AddItem from "../components/AddItem";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isEditing, setIsEditing] = useState(true);
  const [isAddItem, setIsAddItem] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = document.cookie.split('=')[1];
    console.log("token : ",token)
    if(!token){
      navigate('/auth');
    }
  },[])

  return (
    <div>
      <div>
        <Navbar />
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
        {/* <div>{isEditing ? <Menu /> : <EditnUpdateMenu />}</div> */}

        <div>
          {isAddItem ? <AddItem setIsAddItem={setIsAddItem}/> : isEditing ? <Menu /> : <EditnUpdateMenu />}
        </div>
      </div>
    </div>
  );
};

export default Home;
