import React from "react";
import cl from "./ItemInfoCharacteristics.module.scss";

const ItemInfoCharacteristics = ({ filteredItem }: { filteredItem: any }) => {
  return (
    <div className={cl.itemInfoCharacteristicsWrapper}>
      {filteredItem && filteredItem.length > 0 ? (
        <div className={cl.brandWrapper}>
          <h2>
            {filteredItem[0].brand} {filteredItem[0].model}
          </h2>
          <div className={cl.colorWrapper}>
            <span className={cl.headerSpan}>Цвет: </span>
            <span>{filteredItem[0].color}</span>
          </div>
          <div className={cl.priceWrapper}>
            <span className={cl.headerSpan}>Стоимость: </span>
            <span>{filteredItem[0].price}</span>
          </div>
          <div className={cl.brandWrapper}>
            <span className={cl.headerSpan}>Год выпуска: </span>
            <span>{filteredItem[0].year}</span>
          </div>
          <div className={cl.engineWrapper}>
            <span className={cl.headerSpan}>Двигатель: </span>
            <span>{filteredItem[0].engine}</span>
          </div>
          {filteredItem[0].transmission && (
            <div className={cl.transmissonWrapper}>
              <span className={cl.headerSpan}>Трансмиссия: </span>
              <span>{filteredItem[0].transmission}</span>
            </div>
          )}
          {filteredItem[0].reserve && (
            <div className={cl.reserveWrapper}>
              <span className={cl.headerSpan}>Запас хода: </span>
              <span>{filteredItem[0].reserve}</span>
            </div>
          )}
          <div>
            <span className={cl.headerSpan}>Описание: </span>
            <span>{filteredItem[0].information}</span>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ItemInfoCharacteristics;
