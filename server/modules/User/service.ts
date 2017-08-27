import * as Bluebird from 'bluebird';

import { createUser, createUserByEmail, createUserById, createUsers, IUser, IUserDetail } from './interface';

const model = require('../../models');

class User implements IUser {
  public id: number;
  public name: string;
  public email: string;
  public password: string;

  constructor() { }

  public create(user: any) {
    return model.User.create(user);
  }

  public getAll(): Bluebird<IUser[]> {
    return model.User.findAll({
      order: ['name'],
    })
      .then(createUsers);
  }

  public getById(id: number): Bluebird<IUserDetail> {
    return model.User.findOne({
      where: { id },
    })
      .then(createUserById);
  }

  public getByEmail(email: string): Bluebird<IUserDetail> {
    return model.User.findOne({
      where: { email },
    })
      .then(createUserByEmail);
  }

  public update(id: number, user: any) {
    return model.User.update(user, {
      where: { id },
      fields: ['name', 'email', 'password'],
      hooks: true,
      individualHooks: true,
    });
  }

  public delete(id: number) {
    return model.User.destroy({
      where: { id },
    });
  }
}

export default User;
