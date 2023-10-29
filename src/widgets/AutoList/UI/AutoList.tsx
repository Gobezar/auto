import React, { useEffect } from "react";
import { useAppSelector } from "../../../app/store/reduxHooks";
import AutoCard from "../../../entities/AutoCard/UI/AutoCard";
import cl from "./AutoList.module.scss";
import { IDataProps } from "../../../app/model/types";

const AutoList: React.FC = () => {
  const { data, isError, isLoading } = useAppSelector(
    (state) => state.fetchDataSlice
  );
  const { activeBrand, activeColor } = useAppSelector(
    (state) => state.FilterItemsSlice
  );
  const { activeSort } = useAppSelector((state) => state.SortItemsSlice);

  const filteredData = (): IDataProps[] => {
    return data.filter((el) => {
      const brandCondition =
        activeBrand === "default" ||
        activeBrand.length === 0 ||
        el.brand === activeBrand;
      const colorCondition =
        activeColor === "default" ||
        activeColor.length === 0 ||
        el.color === activeColor;

      return brandCondition && colorCondition;
    });
  };

  const sortedData = (): IDataProps[] => {
    let sortedArray = [...filteredData()];
    switch (activeSort) {
      case "lowPrice":
        sortedArray = sortedArray.sort((a, b) => a.price - b.price);
        break;
      case "highPrice":
        sortedArray = sortedArray.sort((a, b) => b.price - a.price);
        break;
      case "newYear":
        sortedArray = sortedArray.sort((a, b) => b.year - a.year);
        break;
      case "olderYear":
        sortedArray = sortedArray.sort((a, b) => a.year - b.year);
        break;
      default:
        break;
    }
    return sortedArray;
  };

  useEffect(() => {
    filteredData();
  }, [activeBrand, activeColor]);

  return (
    <div className={cl.autoListWrapper}>
      {sortedData().length > 0 &&
        !isLoading &&
        !isError &&
        sortedData().map((el: IDataProps) => (
          <AutoCard
            key={el.id}
            id={el.id}
            brand={el.brand}
            image={el.image}
            model={el.model}
            color={el.color}
            year={el.year}
            price={el.price}
            engine={el.engine}
            information={el.information}
            transmission={el.transmission}
            reserve={el.reserve}
          />
        ))}

      {!isLoading && !isError && sortedData().length <= 0 && (
        <div className={cl.errorWrapper}>
          <h2>Автомобили отсутствуют.</h2>
        </div>
      )}

      {isError && (
        <div className={cl.errorWrapper}>
          <h2>При загрузке данных возникла ошибка. попробуйте еще раз.</h2>
        </div>
      )}

      {isLoading && (
        <div className={cl.errorWrapper}>
          <h2>Идёт загрузка...</h2>
        </div>
      )}
    </div>
  );
};

export default AutoList;
