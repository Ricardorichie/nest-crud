import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

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
      const rolesArray = this.users.filter((user) => user.role === role);
      if (rolesArray.length === 0) {
        throw new NotFoundException(`Role ${role} not found`);
      }
      return rolesArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = this.users.sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    // const index = this.users.findIndex((user) => user.id === +id);
    // if (index) {
    //   this.users[index] = { id: +id, ...updatedUser };
    //   return this.users[index];
    // }
    // this.users.forEach((user) => {
    //   if (user.id === id) {
    //     user = { ...user, ...updatedUser };
    //   }
    //   //   return user;
    // });
    // return this.users[index];
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    const deletedUser = this.users[index];
    this.users = this.users.filter((user) => user.id !== id);
    return { deletedUser: deletedUser, users: this.users };
  }
}
