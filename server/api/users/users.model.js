import { v4 as uuidv4 } from 'uuid';

class User {
  users = [];

  // Access users by saying 'this.users;'
  find() {
    return this.users;
  }

  findById(id) {
    // Find user by Id
    // Returns user, or null if not present
    let foundUsers = this.users.filter(function(user) {
        return user.id === id;
    });
    if (foundUsers.length > 0) {
        return foundUsers[0];
    } else {
        return null;
    }
  }

  create(user) {
      let new_user = {
          id: uuidv4(),
          name: user.name,
          address: user.address,
          age: user.age
      }
      this.users.push(new_user);
      return new_user;
  }

  findOneAndUpdate(user) {
      let existingUser = this.findById(user.id);
      if (!existingUser) {
          this.users.push(user);
          return false;
      } else {
          existingUser.name = user.name;
          existingUser.address = user.address;
          existingUser.age = user.age;
          return true;
      }
  }

  remove(user) {
      let id = user.id;
      let index = this.users.map(function(user) {
          return user.id;
      }).indexOf(id);

      if (index !== -1) {
          this.users.splice(index, 1);
          return true;
      } else {
          return false;
      }
  }
}

export default new User();
