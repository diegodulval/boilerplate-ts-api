"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./config/helpers");
var service_1 = require("../../server/modules/User/service");
var model = require("../../server/models");
describe("Testes Unitarios do Service", function () {
    var defaultUser = {
        id: 500,
        name: "DefaultUser",
        email: "default@email.com",
        password: "pinkfloyd",
    };
    beforeEach(function (done) {
        model.User
            .destroy({
            where: {},
        })
            .then(function () {
            model.User.create(defaultUser).then(function () {
                console.log("Default User created"); //tslint:disable-line
                done();
            });
        });
    });
    describe("Método Create", function () {
        it("Deve criar um novo Usúario", function () {
            var newUser = {
                id: 2,
                name: "New User",
                email: "newuser@email.com",
                password: "floyd",
            };
            return service_1.default.create(newUser).then(function (data) {
                helpers_1.expect(data.dataValues).to.have.all.keys([
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
    describe("Método Update", function () {
        it("Deve atualizar um Usúario", function () {
            var updateUser = {
                name: "UpdateUser",
                email: "updateuser@email.com"
            };
            return service_1.default.update(defaultUser.id, updateUser).then(function (data) {
                helpers_1.expect(data[0]).to.be.equal(1);
            });
        });
    });
    describe("Método GET Users", function () {
        it("Deve retornar uma lista com todos os Usúario", function () {
            return service_1.default.getAll().then(function (data) {
                helpers_1.expect(data).to.be.an("array");
            });
        });
    });
    describe("Método getById", function () {
        it("Deve retornar um Usúario de acordo com o ID informado", function () {
            return service_1.default.getById(defaultUser.id).then(function (data) {
                helpers_1.expect(data).to.have.all.keys(["email", "id", "name", "password"]);
            });
        });
    });
    describe("Método getByEmail", function () {
        it("Deve retornar um Usúario de acordo com o email informado", function () {
            return service_1.default.getByEmail(defaultUser.email).then(function (data) {
                helpers_1.expect(data).to.have.all.keys(["email", "id", "name", "password"]);
            });
        });
    });
    describe("Método Delete", function () {
        it("Deve deletar um Usúario", function () {
            return service_1.default.delete(defaultUser.id).then(function (data) {
                helpers_1.expect(data).to.be.equal(1);
            });
        });
    });
});
