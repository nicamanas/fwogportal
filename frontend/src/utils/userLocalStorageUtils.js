export const UserStorage = {
  getUser() {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    return user;
  },

  addUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  },

  clearUser() {
    localStorage.removeItem('user');
  }
}

