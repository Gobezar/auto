import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../../app/store/reduxHooks";
import { setActiveBrand } from "../model/FilterItemsSlice";
import { setActiveColor } from "../model/FilterItemsSlice";
import { useAppDispatch } from "../../../app/store/reduxHooks";
import cl from "./FilterItems.module.scss";

const FilterItems = () => {
  const { data } = useAppSelector((state) => state.fetchDataSlice);
  const { activeBrand, activeColor } = useAppSelector(
    (state) => state.FilterItemsSlice
  );
  const [brandsList, setBrandsList] = useState<string[]>([]);
  const [colorsList, setColorsList] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const filterCarsBrand = () => {
    for (let i = 0; i < data.length; i++) {
      if (!brandsList.includes(data[i].brand)) {
        setBrandsList([...brandsList, data[i].brand]);
      } else continue;
    }
  };
  const filterCarsColor = () => {
    for (let i = 0; i < data.length; i++) {
      if (!colorsList.includes(data[i].color)) {
        setColorsList([...colorsList, data[i].color]);
      } else continue;
    }
  };

  useEffect(() => {
    filterCarsBrand();
    filterCarsColor();
  }, [data, brandsList]);

  return (
    <div className={cl.filterItemsWrapper}>
      <select
        className={cl.brandSelect}
        value={activeBrand}
        onChange={(e) => dispatch(setActiveBrand(e.target.value))}
      >
        <option value="default">Выберите бренд</option>
        {brandsList.length > 0 &&
          brandsList.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
      </select>
      <select
        className={cl.colorSelect}
        value={activeColor}
        onChange={(e) => dispatch(setActiveColor(e.target.value))}
      >
        <option value="default">Любой цвет</option>
        {colorsList.length > 0 &&
          colorsList.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
      </select>
    </div>
  );
};

export default FilterItems;
