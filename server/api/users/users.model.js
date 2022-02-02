import { v4 as uuidv4 } from 'uuid';

class User {
  users = [];

  find() {
    return this.users;
  }

  findById(id) {
    let foundUsers = this.users
        .filter(user => user.id === id);

    if (foundUsers.length > 0) {
        return foundUsers[0];
    } else {
        return null;
    }
  }


  create(user) {
      let id = uuidv4();
      user.id = id;
      this.users.push(user);
      return user;
  }


  findOneAndUpdate(user) {
      let index = this._findUserIndex(user.id);
      if (index >= 0) {
          this.users[index] = user;
          return true;
      } else {
          this.users.push(user);
          return false;
      }
  }


  remove(id) {
      let index = this._findUserIndex(id);

      if (index >= 0) {
          this.users.splice(index, 1);
          return true;
      } else {
          return false;
      }
  }

  _findUserIndex(id) {
      return this.users
          .map(user => user.id)
          .indexOf(id);
  }
}

export default new User();
