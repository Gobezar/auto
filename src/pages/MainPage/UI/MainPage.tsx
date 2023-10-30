import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/reduxHooks";
import { FetchData } from "../../../app/model/fetchDataSlice";
import AutoList from "../../../widgets/AutoList/UI/AutoList";
import cl from "./MainPage.module.scss";
import FilterItems from "../../../features/FilterItems/UI/FilterItems";
import SortItems from "../../../features/SortItems/UI/SortItems";
import { useInView } from "react-intersection-observer";
import { incrementPage } from "../../../app/model/fetchDataSlice";

const MainPage = () => {
  const dispatch = useAppDispatch();
  const { currentPage } = useAppSelector((state) => state.fetchDataSlice);

  const [inViewRef, inView] = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        dispatch(incrementPage());
      }, 100);
    }
  }, [inView]);

  useEffect(() => {
    dispatch(FetchData(currentPage));
  }, [currentPage]);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);

  return (
    <div className={cl.mainPageWrapper}>
      <div className={cl.selectsWrapper}>
        <FilterItems />
        <SortItems />
      </div>
      <AutoList inViewRef={inViewRef} />
    </div>
  );
};

export default MainPage;

// useEffect(() => {
//   data.length <= 49 && dispatch(FetchData(currentPage));
// }, []);
