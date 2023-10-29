import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemInfo from "../../../widgets/ItemInfo/UI/ItemInfo";
import Button from "../../../shared/Button/UI/Button";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store/reduxHooks";
import { FetchData } from "../../../app/model/fetchDataSlice";
import cl from "./ItemInfoPage.module.scss";

const ItemInfoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useAppSelector((state) => state.fetchDataSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    data.length <= 49 && dispatch(FetchData());
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
