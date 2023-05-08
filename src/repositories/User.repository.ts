import {User} from '../models/User';

interface IUserRepository<T> {
  getUsers: () => T[];
  getUserById: (id: number) => T | undefined;
  createUser: (user: T) => void;
  updateUser: (user: T) => void;
  deleteUser: (id: number) => void;
}

class UserRepository implements IUserRepository<User> {
  private users: User[];

  constructor(data: object[]) {
    this.users = data.map(user => new User(user));
  }

  getUsers() {
    return this.users;
  }

  getUserById(id: number) {
    return this.users.find(user => user.id === id);
  }

  createUser(user: User) {
    user.id = this.users.length + 1;
    console.log(user);
    this.users.push(user);
  }

  updateUser(user: User) {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
    }
  }

  deleteUser(id: number) {
    const index = this.users.findIndex(u => u.id === id);
    this.users.splice(index, 1);
  }
}

export default UserRepository;
