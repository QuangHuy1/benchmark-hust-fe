import { FaHome, FaRegListAlt } from "react-icons/fa";

export const MENU_DATA = [
  {
    menu: [
      {
        title: "Trang chủ",
        icon: FaHome,
        route: "/admin",
      },
    ],
  },
  {
    menu: [
      {
        title: "Quản lý trường",
        icon: FaRegListAlt,
        route: "/admin/school",
      },
    ],
  },
  {
    menu: [
      {
        title: "Quản lý chuyên ngành",
        icon: FaRegListAlt,
        route: "/admin/major",
      },
    ],
  },
  {
    menu: [
      {
        title: "Quản lý điểm chuẩn",
        icon: FaRegListAlt,
        route: "/admin/score",
      },
    ],
  },
  // {
  //   menu: [
  //     {
  //       title: "Quản lý",
  //       icon: FaRegListAlt,
  //       subs: [
  //         {
  //           title: "Create Parameter ID",
  //           route: "/parameter-policy/create-parameter-id",
  //         },
  //         {
  //           title: "List Parameter ID",
  //           route: "/parameter-policy/list-parameter-id",
  //         },
  //         {
  //           title: "List Parameter data structure",
  //           route: "/parameter-policy/list-parameter-data-structure",
  //         },
  //       ],
  //     }
  //   ],
  // },
];

export const MENU_ROUTE_DATA = MENU_DATA.map((item) => item.menu)
  .flat()
  .map((item) =>
    item.subs
      ? item.subs.map((itemSub) => ({
          ...itemSub,
          parent: { title: item.title },
        }))
      : item
  )
  .flat()
  .map((item) =>
    item.subs
      ? item.subs.map((itemSub) => ({
          ...itemSub,
          parent: { title: item.title, parent: item.parent },
        }))
      : item
  )
  .flat();
