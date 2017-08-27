import { expect, testDouble } from './config/helpers';

import User from '../../server/modules/User/service';

describe('Testes Unitarios do Controller', () => {

  describe('Método Create', () => {
    it('Deve criar um Usúario', () => {
      const newUser = {
        id: 1,
        name: 'NewUser',
        email: 'newuser@email.com',
        password: 'pinkfloyd',
      };
      const user = new User();
      return user.create(newUser)
        .then((data) => {
          expect(data.dataValues).to.have.all.keys(
            ['email', 'id', 'name', 'password', 'updatedAt', 'createdAt'],
          );
        });
    });
  });
  /*
    describe('Método Update', () => {
      it('Deve atualizar um Usúario', () => {
      });
    });

    describe('Método GET Users', () => {
      it('Deve retornar uma lista com todos os Usúario', () => {
      });
    });

    describe('Método Delete', () => {
      it('Deve deletar um um Usúario', () => {
      });
    }); */
});
