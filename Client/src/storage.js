// User Storage
export const getUser = () => {
  return new Promise((resolve, reject) => {
    const user = window.localStorage.getItem("user");
    resolve(user);
  });
};

export const storeUser = (user) => {
  window.localStorage.setItem("user", JSON.stringify(user));
};
