import Client from "../config/client";

// const login = async (username, password) => {
//   const {data} = await Client().get('/users', {
//     params: {username, password}
//   });
//
//   return user[0];
// }

const logout = () => {

}

const authUser = () => {

}
export const Auth = {
  login,
  logout,
  authUser,
}
