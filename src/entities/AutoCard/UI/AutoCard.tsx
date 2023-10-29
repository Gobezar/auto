import React from "react";
import { useNavigate } from "react-router-dom";
import { IAutoCard } from "../model/types";
import cl from "./AutoCard.module.scss";
import Button from "../../../shared/Button/UI/Button";

const AutoCard: React.FC<IAutoCard> = ({
  brand,
  id,
  image,
  model,
  color,
  price,
  year,
  engine,
  transmission,
  reserve,
  information,
}) => {
  const navigate = useNavigate();
  return (
    <div className={cl.autoCardWrapper}>
      <div className={cl.imageWrapper}>
        <img src={image} alt="auto" />
      </div>
      <div>
        <div className={cl.brandWrapper}>
          <span>
            {brand} {model}
          </span>
        </div>
        {/* <div className={cl.colorWrapper}>
          <span>Цвет: {color}</span>
        </div> */}
        <div className={cl.priceWrapper}>
          <span>Стоимость: {price} $</span>
        </div>
        <div className={cl.yearWrapper}>
          <span>Год выпуска: {year}</span>
        </div>
        {/* <span>Тип двигателя: {engine}</span>
      {transmission && <span>Трансмиссия: {transmission}</span>}
      {reserve && <span>Запас хода: {reserve}</span>}
      <span>Полная информация: {information}</span> */}
      </div>
      <Button size="middle" onClick={() => navigate(`/item/${id}`)}>
        Узнать подробнее
      </Button>
    </div>
  );
};

export default AutoCard;
