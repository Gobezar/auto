import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/reduxHooks";
import { logIn, setGuest } from "../model/LoginPageSlice";
import Button from "../../../shared/Button/UI/Button";
import cl from "./LoginPage.module.scss";

const LoginPage = () => {
  const { isAuth, isGuest } = useAppSelector((state) => state.LoginPageSlice);
  const dispatch = useAppDispatch();

  const login = (event: any) => {
    event.preventDefault();
    dispatch(logIn());
    localStorage.setItem("auth", "true");
  };

  const loginGuest = (boolean: boolean) => {
    dispatch(setGuest(boolean));
  };

  return (
    <div className={cl.loginPageWrapper}>
      <h2 className={cl.loginHeader}>Пожалуйста, авторизуйтесь</h2>
      <form onSubmit={login}>
        <div className={cl.formWrapper}>
          <div>
            <input type="text" placeholder="Введите логин"></input>
          </div>
          <div>
            <input type="text" placeholder="Введите пароль"></input>
          </div>
          <div>
            <Button size="middle">Войти</Button>
          </div>
        </div>
      </form>
      <div className={cl.loginWarning}>
        <p>
          Это тестовая форма авторизации.
          <br />
          Введите любые данные, мы сохраним их в LocalStorage и авторизуем Вас!
          😏 <br />
          <strong>
            Обращаем Ваше внимание, что функция добавления автомобилей без
            авторизации недоступна.
          </strong>
        </p>
      </div>
      <Button onClick={() => loginGuest(true)} size="middle">
        Продолжить без авторизации
      </Button>
    </div>
  );
};

export default LoginPage;
