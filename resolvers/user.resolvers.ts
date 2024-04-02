//resolvers de giai quyet van de
import md5 from "md5";
import User from "../models/user.model";
import { generateRandomString } from "../helpers/generate.helper";

export const resolversUser = {
  
  
  Mutation:{
    //dinh nghia ra ham them, sua, xoa bai viet:
    

    registerUser: async (_, args)=>{
      // console.log(args);
      const { user} = args;
      const emailExist = await User.findOne({ //kiem tra email ton tai khong
        email: user.email,
        deleted: false
      });
      if(emailExist){
        return {
            code: 400,
            message: "Email đã tồn tại!"
        }
      } else {
        user.password = md5(user.password) //ma hoa
        user.token = generateRandomString(30);

        //luu vao db: (tra ve ben sv)
        const newUser = new User(user);
        await newUser.save();
        return {
            code: 200,
            message: "Thành công!",
            id: newUser.id,
            email: newUser.email,
            fullName: newUser.fullName,
            token: newUser.token
        };
      }
},

  }
}