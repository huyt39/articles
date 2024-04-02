"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefsUer = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefsUer = (0, apollo_server_express_1.gql) `
# muon biet co nhung truong thong tin gi thi vao check o model
# rieng password khong duoc tra ra
#khong nhat thiet phai giong model, chi can nhung truong cho phep lay ra
  type User{  
    id: ID,
    fullName: String,
    email: String,
    token: String,
    code: Int,
    message: String
  } 

type Query {
    getUser: User
}
  
#   khi dang ky tai khoan thi can nhap nhung thong tin gi
  input RegisterUserInput{ 
    fullName: String,
    email: String,
    password: String
  }

  input LoginUserInput{ 
    email: String,
    password: String
  }

# tra ra nhung thong tin thuoc User(o tren) khi dang ky thanh cong
  type Mutation{
    registerUser(user: RegisterUserInput): User,
    loginUser(user: LoginUserInput): User,
    
  }
`;
