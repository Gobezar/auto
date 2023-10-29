import React from "react";

import cl from "./ItemInfoImage.module.scss";

const ItemInfoImage = ({ filteredItem }: { filteredItem: any }) => {
  return (
    <div className={cl.itemInfoImageWrapper}>
      {filteredItem ? (
        <img className={cl.imageAuto} src={filteredItem[0].image} alt="auto" />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ItemInfoImage;
