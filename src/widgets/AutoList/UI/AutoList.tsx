import React, { useEffect, useMemo, useCallback } from "react";
import { useAppSelector } from "../../../app/store/reduxHooks";
import AutoCard from "../../../entities/AutoCard/UI/AutoCard";
import cl from "./AutoList.module.scss";
import { IDataProps } from "../../../app/model/types";

interface AutoListProps {
  inViewRef: () => void;
}

const AutoList: React.FC<AutoListProps> = ({ inViewRef }) => {
  const { data, isError, isLoading } = useAppSelector(
    (state) => state.fetchDataSlice
  );
  const { activeBrand, activeColor } = useAppSelector(
    (state) => state.FilterItemsSlice
  );
  const { activeSort } = useAppSelector((state) => state.SortItemsSlice);

  const filteredData = useCallback((): IDataProps[] => {
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
  }, [data, activeBrand, activeColor]);

  const sortedData = useMemo(() => {
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
  }, [filteredData()]);

  useEffect(() => {
    filteredData();
  }, [activeBrand, activeColor]);
  console.log(data.length, isLoading);

  return (
    <div className={cl.autoListWrapper}>
      {sortedData.length > 0 &&
        sortedData.map((el: IDataProps, index: number) => (
          <div key={el.id} ref={sortedData.length === el.id ? inViewRef : null}>
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
          </div>
        ))}

      {!isLoading && !isError && sortedData.length <= 0 && (
        <div className={cl.errorWrapper}>
          <h2>Автомобили отсутствуют.</h2>
        </div>
      )}

      {isError && (
        <div className={cl.errorWrapper}>
          <h2>При загрузке данных возникла ошибка. попробуйте еще раз.</h2>
        </div>
      )}

      {isLoading && data.length <= 0 && (
        <div className={cl.errorWrapper}>
          <h2>Идёт загрузка...</h2>
        </div>
      )}
    </div>
  );
};

export default React.memo(AutoList);
