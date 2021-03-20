const listMenus = [
  {
    menu_id: "60554f96ec727a351d245044",
    menu_name: "Chủ đề",
    menu_type: "menu",
    parent_menu: null
  },
  {
    menu_id: "605558ab76910b348fc0c59d",
    menu_name: "Lập trình hướng đối tượng",
    menu_type: "item",
    parent_menu: "60554f96ec727a351d245044",
    to: "/"
  },
  {
    menu_id: "605559289fb8d241873d8acc",
    menu_name: "Các nguyên tắc SOLID",
    menu_type: "item",
    parent_menu: "60554f96ec727a351d245044",
    to: "/"
  },
  {
    menu_id: "6055592e3042753ba516c3bb",
    menu_name: "Phương pháp xây dựng class",
    menu_type: "item",
    parent_menu: "60554f96ec727a351d245044",
    to: "/"
  },
  {
    menu_id: "605554dfae27319a5c30e882",
    menu_name: "Bài học",
    menu_type: "item",
    parent_menu: null,
    to: "/"
  },
  {
    menu_id: "605554e7212c74f8ba92b1a9",
    menu_name: "Ví dụ",
    menu_type: "item",
    parent_menu: null,
    to: "/"
  }
];

export default {
  async getMenu(menuId = null) {
    let childrenMenu = listMenus.filter(menu => menu.parent_menu === menuId);
    const parentMenu = listMenus.find(menu => menu.menu_id === menuId) ?? {
      menu_id: null
    };
    parentMenu.children_menu = childrenMenu;
    return {
      data: parentMenu
    };
  }
};
