import { expect, testDouble } from "./config/helpers";

import User from "../../server/modules/User/service";
const model = require("../../server/models");

describe("Testes Unitarios do Service", () => {

  const defaultUser = {
    id: 500,
    name: "DefaultUser",
    email: "default@email.com",
    password: "pinkfloyd",
  };

  beforeEach(done => {
    model.User
      .destroy({
        where: {},
      })
      .then(() => {
        model.User.create(defaultUser).then(() => {
          console.log("Default User created"); //tslint:disable-line
          done();
        });
      });
  });

  describe("Método Create", () => {
    it("Deve criar um novo Usúario", () => {
      const newUser = {
        id: 2,
        name: "New User",
        email: "newuser@email.com",
        password: "floyd",
      };
      return User.create(newUser).then(data => {
        expect(data.dataValues).to.have.all.keys([
          "email",
          "id",
          "name",
          "password",
          "updatedAt",
          "createdAt",
        ]);
      });
    });
  });

  describe("Método Update", () => {
    it("Deve atualizar um Usúario", () => {
      const updateUser = {
        name: "UpdateUser",
        email: "updateuser@email.com"
      };
      return User.update(defaultUser.id, updateUser).then(data => {
        expect(data[0]).to.be.equal(1);
      });
    });
  });

  describe("Método GET Users", () => {
    it("Deve retornar uma lista com todos os Usúario", () => {
      return User.getAll().then(data => {
        expect(data).to.be.an("array");
      });
    });
  });

  describe("Método getById", () => {
    it("Deve retornar um Usúario de acordo com o ID informado", () => {
      return User.getById(defaultUser.id).then(data => {
        expect(data).to.have.all.keys(["email", "id", "name", "password"]);
      });
    });
  });

  describe("Método getByEmail", () => {
    it("Deve retornar um Usúario de acordo com o email informado", () => {
      return User.getByEmail(defaultUser.email).then(data => {
        expect(data).to.have.all.keys(["email", "id", "name", "password"]);
      });
    });
  });

  describe("Método Delete", () => {
    it("Deve deletar um Usúario", () => {
      return User.delete(defaultUser.id).then(data => {
        expect(data).to.be.equal(1);
      });
    });
  });
});
