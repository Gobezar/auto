import React from "react";
import ItemInfoImage from "../../../entities/ItemInfoImage/UI/ItemInfoImage";
import ItemInfoCharacteristics from "../../../entities/ItemInfoCharacteristics/UI/ItemInfoCharacteristics";
import { useAppSelector } from "../../../app/store/reduxHooks";
import { useParams } from "react-router-dom";
import cl from "./ItemInfo.module.scss";

const ItemInfo = () => {
  const { data, isError, isLoading } = useAppSelector(
    (state) => state.fetchDataSlice
  );

  const { id } = useParams();

  const filteredItem = id && data.filter((el) => el.id === +id);

  return (
    <>
      <div className={cl.itemInfoWrapper}>
        {filteredItem && filteredItem[0] && !isLoading && !isError && (
          <>
            <div>
              <ItemInfoImage filteredItem={filteredItem} />
            </div>
            <div>
              <ItemInfoCharacteristics filteredItem={filteredItem} />
            </div>
          </>
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
    </>
  );
};

export default ItemInfo;
