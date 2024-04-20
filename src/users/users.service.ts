import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'John Doe', role: 'INTERN', email: 'JohnDoe@test.com' },
    { id: 2, name: 'Jane Doe', role: 'ENGINEER', email: 'JaneDoe@test.com' },
    { id: 3, name: 'Jim Doe', role: 'ADMIN', email: 'JimDoe@test.com' },
    { id: 4, name: 'Kim Sung', role: 'INTERN', email: 'KimSung@test.com' },
    {
      id: 5,
      name: 'Jeniffer Dunes',
      role: 'ENGINEER',
      email: 'JenifferDunes@test.com',
    },
    {
      id: 6,
      name: 'Chelsey Koley',
      role: 'ADMIN',
      email: 'ChelseyKoley@test.com',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    return this.users.find((user) => user.id === +id);
  }

  create(user: {
    name: string;
    role: 'INTERN' | 'ENGINEER' | 'ADMIN';
    email: string;
  }) {
    const usersByHighestId = this.users.sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(
    id: number,
    updatedUser: {
      name: string;
      role: 'INTERN' | 'ENGINEER' | 'ADMIN';
      email: string;
    },
  ) {
    const index = this.users.findIndex((user) => user.id === +id);
    if (index) {
      this.users[index] = { id: +id, ...updatedUser };
      return this.users[index];
    }
  }

  delete(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    const deletedUser = this.users[index];
    this.users = this.users.filter((user) => user.id !== id);
    return deletedUser;
  }
}
