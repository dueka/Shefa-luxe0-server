const server = require("../../api/server");
const request = require("supertest")(server);
const db = require("../../data/dbConfig");
const mockUsers = require("../../data/mock/auth.mock");

const authControllers = require("./authControllers");

const {
  Register,
  Login,
  passwordReset,
  newPassword,
  confirmEmail,
} = authControllers;

const baseUrl = "/api";
