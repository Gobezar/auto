import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/reduxHooks";
import { FetchData } from "../../../app/model/fetchDataSlice";
import AutoList from "../../../widgets/AutoList/UI/AutoList";
import cl from "./MainPage.module.scss";
import FilterItems from "../../../features/FilterItems/UI/FilterItems";
import SortItems from "../../../features/SortItems/UI/SortItems";

const MainPage = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.fetchDataSlice);

  useEffect(() => {
    data.length <= 49 && dispatch(FetchData());
  }, []);

  return (
    <div className={cl.mainPageWrapper}>
      <div className={cl.selectsWrapper}>
        <FilterItems />
        <SortItems />
      </div>
      <AutoList />
    </div>
  );
};

export default MainPage;
