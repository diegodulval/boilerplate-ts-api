import { expect, testDouble } from "./config/helpers";

import User from "../../server/modules/User/service";

describe("Testes Unitarios do Controller", () => {
  describe("Método Create", () => {
    it("Deve criar um Usúario", () => {
      const newUser = {
        id: 500,
        name: "NewUser",
        email: "newuser@email.com",
        password: "pinkfloyd",
      };
      return User.create(newUser).then((data) => {
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

  describe("Método GET Users", () => {
    it("Deve retornar uma lista com todos os Usúario", () => {
      return User.getAll().then((data) => {
        expect(data).to.be.an("array");
        expect(data[0]).to.have.all.keys(["email", "id", "name", "password"]);
      });
    });
  });

  describe("Método Update", () => {
    it("Deve atualizar um Usúario", () => {
      const updateUser = {
        name: "UpdateUser",
        email: "updateuser@email.com",
      };
      return User.update(500, updateUser).then((data) => {
        expect(data[0]).to.be.equal(1);
      });
    });
  });

  describe("Método getById", () => {
    it("Deve retornar um Usúario de acordo com o ID informado", () => {
      return User.getById(500).then((data) => {
        expect(data).to.have.all.keys(["email", "id", "name", "password"]);
      });
    });
  });

  describe("Método getByEmail", () => {
    it("Deve retornar um Usúario de acordo com o ID informado", () => {
      return User.getByEmail("diego@email.com").then((data) => {
        expect(data).to.have.all.keys(["email", "id", "name", "password"]);
      });
    });
  });

  describe("Método Delete", () => {
    it("Deve deletar um Usúario", () => {
      return User.delete(500).then((data) => {
        expect(data).to.be.equal(1);
      });
    });
  });
});
