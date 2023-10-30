import React, { useEffect } from "react";
import ItemInfo from "../../../widgets/ItemInfo/UI/ItemInfo";
import Button from "../../../shared/Button/UI/Button";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store/reduxHooks";
import { FetchData } from "../../../app/model/fetchDataSlice";

import cl from "./ItemInfoPage.module.scss";

const ItemInfoPage = () => {
  const navigate = useNavigate();
  const { currentPage } = useAppSelector((state) => state.fetchDataSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(FetchData(currentPage));
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={cl.itemInfoPageWrapper}>
      <ItemInfo />
      <div className={cl.buttonWrapper}>
        <Button size="big" onClick={() => navigate(`/`)}>
          На главную
        </Button>
      </div>
    </div>
  );
};

export default ItemInfoPage;
