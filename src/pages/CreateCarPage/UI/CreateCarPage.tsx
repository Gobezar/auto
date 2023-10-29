import React from "react";
import AddingNewCar from "../../../features/AddingNewCar/UI/AddingNewCar";
import cl from "./CreateCarPage.module.scss";

const CreateCarpage = () => {
  return (
    <div className={cl.createCarWrapper}>
      <AddingNewCar />
    </div>
  );
};

export default CreateCarpage;
