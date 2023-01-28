const BASE_URL = "http://localhost:3000/api"

const HTTP_METHOD = {
  POST(data) {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  },
  PUT(data) {
    return {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : null,
    };
  },
  DELETE() {
    return {
      method: "DELETE",
    };
  }
}
const request = async (url, option) => {
  const response = await fetch(url, option)
  if (!response.ok) {
    alert("에러가 발생했습니다.");
    console.error(e);
  }
  return response.json();
}

const requestWithOutJson = async (url, option) => {
  const response = await fetch(url, option)
  if (!response.ok) {
    alert("에러가 발생했습니다.");
    console.error(e);
  }
  return response;
}

const MenuApi = {
  getAllMenuByCategory(category) {
    return request(`${BASE_URL}/category/${category}/menu`);
  },
  createMenu (category, name) {
    return request(
      `${BASE_URL}/category/${category}/menu`,
      HTTP_METHOD.POST({name})
    );
    // async createMenu (category, name) {
    //   const response = await fetch(`${BASE_URL}/category/${category}/menu`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({name}),
    //   });
    //   if (!response.ok) {
    //     console.error("에러가 발생했습니다.")
    //   }
    // },
  },
  updateMenu (category, name, menuId) {
    return request(
      `${BASE_URL}/category/${category}/menu/${menuId}`,
      HTTP_METHOD.PUT({name})
    );
    // const response = await fetch(`${BASE_URL}/category/${category}/menu/${menuId}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({name}),
    // })
    // if (!response.ok) {
    //   alert("에러가 발생했습니다.")
    //   console.error("에러가 발생했습니다.")
    // }
    // return response.json();
  },
  toggleSoldOutMenu (category, menuId) {
    return request(
      `${BASE_URL}/category/${category}/menu/${menuId}/soldout`,
      HTTP_METHOD.PUT()
      );
    // const response = await fetch(`${BASE_URL}/category/${category}/menu/${menuId}/soldout`,
    // {
    //   method: "PUT",
    // });
    // if (!response.ok) {
    //   alert("에러가 발생했습니다.")
    //   console.error("에러가 발생했습니다.")
    // }
  },
  deleteMenu (category, menuId) {
    return requestWithOutJson(
      `${BASE_URL}/category/${category}/menu/${menuId}`,
      HTTP_METHOD.DELETE()
    );
    // const response = await fetch(`${BASE_URL}/category/${category}/menu/${menuId}`,
    // {
    //   method: "DELETE",
    // });
    // if (!response.ok) {
    //   alert("에러가 발생했습니다.")
    //   console.error("에러가 발생했습니다.")
    // }
  },
};

export default MenuApi;