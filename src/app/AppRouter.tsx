import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage/UI/MainPage";
import ItemInfoPage from "../pages/ItemInfoPage/UI/ItemInfoPage";
import CreateCarPage from "../pages/CreateCarPage/UI/CreateCarPage";
import LoginPage from "../pages/LoginPage/UI/LoginPage";
import NotFoundPage from "../pages/NotFoundPage/UI/NotFoundPage";
import { useAppDispatch, useAppSelector } from "./store/reduxHooks";
import { logIn } from "../pages/LoginPage/model/LoginPageSlice";

const AppRouter = () => {
  const dispatch = useAppDispatch();
  const { isAuth, isGuest } = useAppSelector((state) => state.LoginPageSlice);

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      dispatch(logIn());
    }
  }, []);

  return (
    <>
      {isAuth && !isGuest && (
        <Routes>
          <Route element={<MainPage />} path="/" />
          <Route element={<ItemInfoPage />} path="/item/:id" />
          <Route element={<CreateCarPage />} path="/createCar" />
          <Route element={<LoginPage />} path="/login" />
          <Route element={<NotFoundPage />} path="*"></Route>
        </Routes>
      )}

      {!isAuth && !isGuest && (
        <Routes>
          <Route element={<LoginPage />} path="/login"></Route>
          <Route element={<LoginPage />} path="*"></Route>
        </Routes>
      )}

      {isGuest && !isAuth && (
        <Routes>
          <Route element={<MainPage />} path="/" />
          <Route element={<ItemInfoPage />} path="/item/:id" />
          <Route element={<LoginPage />} path="/login" />
          <Route element={<NotFoundPage />} path="*"></Route>
        </Routes>
      )}
    </>
  );
};
export default AppRouter;
