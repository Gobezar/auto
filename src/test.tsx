import React from "react";
import "./index.css";
import { Select } from "antd";

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const regions = [
  {
    name: "Саратовская область",
    id: 64,
    childs: [
      {
        name: "Саратов",
        id: "1",
        childs: [],
      },
      {
        name: "Энгельс",
        id: "2",
        childs: [],
      },
      {
        name: "Балашов",
        id: "3",
        childs: [],
      },
      {
        name: "Балаково",
        id: "4",
        childs: [],
      },
      {
        name: "Базарный Карбулак",
        id: "5",
        childs: [],
      },
    ],
  },
  {
    name: "Москва",
    id: 777,
    childs: [],
  },
  {
    name: "Санкт-Петербург",
    id: 666,
    childs: [],
  },
];

function getNames(obj: any) {
  let names: any[] = [];

  for (let key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      names = names.concat(getNames(obj[key]));
    } else if (key === "name") {
      names.push(obj[key]);
    }
  }

  return names;
}

const regions = [
  {
    name: "Саратовская область",
    id: 64,
    parentId: null,
    childs: [
      {
        name: "Саратов",
        id: 1,
        childs: [],
        parentId: 64,
      },
      {
        name: "Энгельс",
        id: 2,
        childs: [],
        parentId: 64,
      },
      {
        name: "Балашов",
        id: 3,
        childs: [],
        parentId: 64,
      },
      {
        name: "Балаково",
        id: 4,
        childs: [],
        parentId: 64,
      },
      {
        name: "Базарный Карбулак",
        id: 5,
        childs: [],
        parentId: 64,
      },
    ],
  },
  {
    name: "Другие города",
    id: 10,
    parentId: null,
    childs: [
      {
        name: "Москва",
        id: 777,
        childs: [],
        parentId: 10,
      },
      {
        name: "Санкт-Петербург",
        id: 666,
        childs: [],
        parentId: 666,
      },
    ],
  },
];

function transformData(regions: any) {
  let result = [];

  for (let region of regions) {
    let options = [];

    for (let child of region.childs) {
      options.push({ label: child.name, value: child.id });
    }

    result.push({ label: region.name, options: options });
  }

  return result;
}

const App: React.FC = () => (
  <Select
    defaultValue={{ value: 2, label: "Энгельс" }}
    style={{ width: 200 }}
    onChange={handleChange}
    options={transformData(regions)}
    showSearch
    placeholder="Search to Select"
    optionFilterProp="children"
    filterOption={(input, option) => (option?.label ?? "").includes(input)}
    filterSort={(optionA, optionB) =>
      (optionA?.label ?? "")
        .toLowerCase()
        .localeCompare((optionB?.label ?? "").toLowerCase())
    }
  />
);

export default App;
