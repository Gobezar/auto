import React from "react";
import Button from "../../../shared/Button/UI/Button";
import { useAppDispatch, useAppSelector } from "../../../app/store/reduxHooks";
import { addCarData } from "../../../app/model/fetchDataSlice";
import cl from "./AddingNewCar.module.scss";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const AddingNewCar = () => {
  const { data } = useAppSelector((state) => state.fetchDataSlice);
  const dispatch = useAppDispatch();

  const SignupSchema = Yup.object().shape({
    image: Yup.mixed().required("Обязательное поле"),
    brand: Yup.string().required("Обязательное поле"),
    model: Yup.string()
      .min(2, "Минимум 2 буквы")
      .max(15, "Максимум 15 букв")
      .required("Обязательное поле"),
    color: Yup.string().required("Обязательное поле"),
    price: Yup.number()
      .min(1000, "Минимум 1000 $")
      .max(100000, "Максимум 100.000 $")
      .required("Обязательное поле"),
    year: Yup.number()
      .min(1900, "Минимум 1900 год")
      .max(2023, "Максимум 2023 год")
      .required("Обязательное поле"),
    engine: Yup.string().required("Обязательное поле"),
    transmission: Yup.string().when("engine", {
      is: "Бензиновый" || "Дизельный",
      then: (schema: any) =>
        schema.required("Обязательное поле") as Yup.StringSchema<string>,
      otherwise: (schema: any) => Yup.string() as Yup.StringSchema<string>,
    }),
    reserve: Yup.number().when("engine", {
      is: "Электрический",
      then: (schema: any) =>
        schema.required("Обязательное поле") as Yup.NumberSchema<number>,
      otherwise: (schema: any) => Yup.number() as Yup.NumberSchema<number>,
    }),
    information: Yup.string()
      .min(10, "Минимум 10 букв")
      .max(300, "Максимум 300 букв")
      .required("Обязательное поле"),
  });

  const addCar = (values: any) => {
    dispatch(
      addCarData({
        ...values,
        image: "/images/car.png",
        id: data.length + 1,
      })
    );
    alert("Вы добавили новый автомобиль!");
  };

  return (
    <div className={cl.addingNewCarWrapper}>
      <Formik
        initialValues={{
          image: "",
          brand: "",
          model: "",
          color: "Красный",
          price: "",
          year: "",
          engine: "Бензиновый",
          transmission: "Автоматическая",
          reserve: "",
          information: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          addCar(values);
        }}
      >
        {({ errors, touched, values }) => (
          <Form>
            <div className={cl.fieldWrapper}>
              <span>Фотография: </span>
              <Field name="image" type="file" />
              {errors.image && touched.image ? (
                <div className={cl.error}>{errors.image}</div>
              ) : null}
            </div>

            <div className={cl.fieldWrapper}>
              <span>Марка: </span>
              <Field name="brand" as="select" className={cl.selectField}>
                <option value="default">Выберите из списка</option>
                <option value="Honda">Honda</option>
                <option value="Toyota">Toyota</option>
                <option value="Mercedes-Benz">Mercedes-Benz</option>
                <option value="BMW">BMW</option>
                <option value="Chevrolet">Chevrolet</option>
                <option value="Ford">Ford</option>
              </Field>
              {errors.brand && touched.brand ? (
                <div className={cl.error}>{errors.brand}</div>
              ) : null}
            </div>

            <div className={cl.fieldWrapper}>
              <span>Модель: </span>
              <Field
                name="model"
                placeholder="Введите название модели..."
                className={cl.inputWrapper}
              />
              {errors.model && touched.model ? (
                <div className={cl.error}>{errors.model}</div>
              ) : null}
            </div>

            <div className={cl.fieldWrapper}>
              <span>Цвет: </span>
              <Field name="color" as="select" className={cl.selectField}>
                <option value="Красный">Красный</option>
                <option value="Серый">Серый</option>
                <option value="Чёрный">Чёрный</option>
                <option value="Зелёный">Зелёный</option>
                <option value="Белый">Белый</option>
                <option value="Синий">Синий</option>
              </Field>
              {errors.color && touched.color ? (
                <div className={cl.error}>{errors.color}</div>
              ) : null}
            </div>

            <div className={cl.fieldWrapper}>
              <span>Цена: </span>
              <Field
                className={cl.inputWrapper}
                name="price"
                type="number"
                placeholder="Назовите цену..."
              />
              {errors.price && touched.price ? (
                <div className={cl.error}>{errors.price}</div>
              ) : null}
            </div>

            <div className={cl.fieldWrapper}>
              <span>Год выпуска: </span>
              <Field
                className={cl.inputWrapper}
                name="year"
                type="number"
                placeholder="Укажите год выпуска..."
              />
              {errors.year && touched.year ? (
                <div className={cl.error}>{errors.year}</div>
              ) : null}
            </div>

            <div className={cl.fieldWrapper}>
              <span>Двигатель: </span>
              <Field name="engine" as="select" className={cl.selectField}>
                <option value="Бензиновый">Бензиновый</option>
                <option value="Дизельный">Дизельный</option>
                <option value="Электрический">Электрический</option>
              </Field>
              {errors.engine && touched.engine ? (
                <div className={cl.error}>{errors.engine}</div>
              ) : null}
            </div>

            {values.engine === "Бензиновый" || values.engine === "Дизельный" ? (
              <div className={cl.fieldWrapper}>
                <span>Трансмиссия: </span>
                <Field
                  name="transmission"
                  as="select"
                  className={cl.selectField}
                >
                  <option value="">Выберите</option>
                  <option value="Автоматическая">Автоматическая</option>
                  <option value="Ручная">Ручная</option>
                </Field>
                {errors.transmission && touched.transmission ? (
                  <div className={cl.error}>{errors.transmission}</div>
                ) : null}
              </div>
            ) : null}

            {values.engine === "Электрический" ? (
              <div className={cl.fieldWrapper}>
                <span>Запас хода: </span>
                <Field
                  className={cl.inputWrapper}
                  name="reserve"
                  type="number"
                  placeholder="Укажите запас хода..."
                />
                {errors.reserve && touched.reserve ? (
                  <div className={cl.error}>{errors.reserve}</div>
                ) : null}
              </div>
            ) : null}

            <div className={cl.fieldWrapper}>
              <span>Полное описание: </span>
              <Field
                name="information"
                as="textarea"
                placeholder="Составьте описание..."
              />
              {errors.information && touched.information ? (
                <div className={cl.error}>{errors.information}</div>
              ) : null}
            </div>

            <Button type="submit" size="big">
              Добавить автомобиль
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddingNewCar;
