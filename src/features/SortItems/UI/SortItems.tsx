import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/reduxHooks";
import { setActiveSort } from "../model/SortItemsSlice";
import { sortItemsList } from "../consts/sortItemsList";
import cl from "./SortItems.module.scss";

const SortItems = () => {
  const dispatch = useAppDispatch();
  const { activeSort } = useAppSelector((state) => state.SortItemsSlice);

  return (
    <div className={cl.sortItemsWrapper}>
      <select
        className={cl.brandSelect}
        value={activeSort}
        onChange={(e) => dispatch(setActiveSort(e.target.value))}
      >
        <option value="default">Сортировка</option>
        {sortItemsList.length > 0 &&
          sortItemsList.map((el) => (
            <option key={el.id} value={el.sortProperty}>
              {el.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SortItems;
