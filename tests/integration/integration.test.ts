import * as HTTPStatus from 'http-status';
import { app, expect, request } from './config/helpers';

describe('Testes de Integração', () => {

  'use strict';
  const config = require('../../server/config/env/config')();
  const model = require('../../server/models');

  let id;
  const userTest = {
    id: 100,
    name: 'Usuário Teste',
    email: 'teste@emai.com',
    password: 'teste',
  };

  beforeEach((done) => {
    model.User.destroy({
      where: {},
    })
      .then(() => {
        return model.User.create(userDefault);
      })
      .then((user) => {
        model.User.create(userTest)
          .then(() => {
            done();
          });
      });
  });

  const userDefault = {
    id: 1,
    name: 'Default Teste',
    email: 'default@emai.com',
    password: 'default',
  };

  describe('GET /api/users/all', () => {
    it('Deve retornar um Array com todos os Usúarios', (done) => {
      request(app)
        .get('/api/users/all')
        .end((error, res) => {
          expect(res.status).to.equal(HTTPStatus.OK);
          expect(res.body.payload).to.be.an('array');
          expect(res.body.payload[0].name).to.be.equal(userDefault.name);
          expect(res.body.payload[0].email).to.be.equal(userDefault.email);
          done(error);
        });
    });
  });

  describe('GET /api/users/:id', () => {
    it('Deve retornar um Json com apenas um Usúario', (done) => {
      request(app)
        .get(`/api/users/${userDefault.id}`)
        .end((error, res) => {
          expect(res.status).to.equal(HTTPStatus.OK);
          expect(res.body.payload.id).to.be.equal(userDefault.id);
          expect(res.body.payload).to.have.all.keys([
            'id', 'name', 'email', 'password',
          ]);
          id = res.body.payload.id;
          done(error);
        });
    });
  });

  describe('POST /api/users/create', () => {
    it('Deve criar um novo Usúario', (done) => {
      const user = {
        id: 2,
        name: 'Usuario Teste',
        email: 'usuarioteste@email.com',
        password: 'novouser',
      };

      request(app)
        .post('/api/users/create')
        .send(user)
        .end((error, res) => {
          expect(res.status).to.equal(HTTPStatus.OK);
          expect(res.body.payload.id).to.be.equals(user.id);
          expect(res.body.payload.name).to.be.equals(user.name);
          expect(res.body.payload.email).to.be.equals(user.email);
          done(error);
        });
    });
  });

  describe('PUT /api/users/:id/update', () => {
    it('Deve atualizar um Usuário', (done) => {
      const user = {
        name: 'TestUpdate',
        email: 'update@email.com',
      };
      request(app)
        .put(`/api/users/${userTest.id}/update`)
        .send(user)
        .end((error, res) => {
          expect(res.status).to.equal(HTTPStatus.OK);
          expect(res.body.payload[0]).to.eql(1);
          done(error);
        });
    });
  });

  describe('DELETE /api/users/:id/destroy', () => {
    it('Deve deletar um Usúario', (done) => {
      request(app)
        .delete(`/api/users/${1}/destroy`)
        .end((error, res) => {
          expect(res.status).to.equal(HTTPStatus.OK);
          expect(res.body.payload[0]).to.eql(1);
          done(error);
        });
    });
  });

});
