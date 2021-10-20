import { MovieModel } from "../model/movie.js";
import { AccountModel } from "../model/account.js";
// import uniqid from "uniqid";
import helpSign from "../utils/sign.js";
// import { testPromise } from "../utils/commom.js";
// import bcrypt from "bcrypt";

class SystemSign {
  async signUp(req, res, next) {
    const { name, email, password, re_password } = req.body;
    try {
      const codeHash = await helpSign.hashPassword(password);
      // hashPassword and storage DataBase
      const newAccount = AccountModel({
        name,
        email,
        hashPassword: codeHash,
      });
      // generrate token and refreshToken to res for client
      // payload is [_id, name, email, type]
      const payload = {
        _id: newAccount._id,
        name: newAccount.name,
        email: newAccount.email,
        type: newAccount.type,
      };
      const token = await helpSign.getToken(payload);
      const refToken = await helpSign.getRefToken(payload);
      newAccount.refToken.push(refToken);
      await newAccount.save();
      // console.log('Complete!');
      res.status(301).json({ message: "SUCCESSFUL!", token, refToken });
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: error });
    }
  }
  async signIn(req, res, next) {
    const { email, password } = req.body;
    try {
      // find email in db
      const account = await AccountModel.findOne({ email });
      if (!account) {
        return res.status(401).json({ message: "Account Invalid!" });
      }
      // check password
      const checkPassword = await helpSign.comparePassword(
        password,
        account.hashPassword
      );
      if (!checkPassword) {
        return res.status(401).json({ message: "Account Invalid!" });
      }
      // generrate token and refreshToken to res for client
      // payload is [_id, name, email, type]
      const payload = {
        _id: account._id,
        name: account.name,
        email: account.email,
        type: account.type,
      };
      const token = await helpSign.getToken(payload);
      const refToken = await helpSign.getRefToken(payload);
      // add refresh token
      account.refToken.push(refToken);
      await account.save();
      // console.log('Invalid!');
      res.status(301).json({ message: "SUCCESSFUL!", token, refToken });
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: error });
    }
  }
  async signOut(req, res, next) {
    const { id_user } = req.body;
    const account = await AccountModel.findById({ _id: id_user }).exec();
    if(account.refToken.length) { account.refToken = [] };
    await account.save();
    res.status(301).json({ message: 'SUCCESSFUL!' });
  }
  async refToken(req, res, next) {
    try {
      const token = req.get('Authorization');
      if(token) {
        // payload is [_id, name, email, type]
        const payload = await helpSign.verifyToken(token);
        const checkToken = await AccountModel.findOne({ _id: payload._id, refToken: { $in: [token] } }, '_id').exec();
        // console.log(payload)
        if(checkToken) {
          const { _id, name, email, type } = payload;
          const newToken = await helpSign.getToken({ _id, name, email, type });
          res.status(301).json({ token: newToken });
        }else {
          throw new Error('REFRESH_TOKEN_EXPIRE!');
        }
      }else {
          throw new Error('NO_TOKEN_HEADER!');
      }
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
  }
  async loginFacebook(req, res, next) {
    try {
      const { displayName, id, provider, photos, gender, emails } = req.user;
      let token, refToken, isNew, payload;
      const checkAccountFacebook = await AccountModel.findOne({ idFaceBook: id });
      if(!checkAccountFacebook) {
        isNew = true;
        const newUserFaceBook = new AccountModel({
          name: displayName,
          authType: provider,
          idFaceBook: id,
          email: emails[0].value,
          gender: gender || 'Nam',
          avatar: photos[0].value,
        });
        payload = {
          _id: newUserFaceBook._id,
          name: newUserFaceBook.name,
          email: newUserFaceBook.email,
          type: newUserFaceBook.type,
        };
      }else {
        payload = {
          _id: checkAccountFacebook._id,
          name: checkAccountFacebook.name,
          email: checkAccountFacebook.email,
          type: checkAccountFacebook.type,
        };
      }
      token = await helpSign.getToken(payload);
      refToken = await helpSign.getRefToken(payload);
      if(isNew) {
        newUserFaceBook.refToken.push(refToken);
        await newUserFaceBook.save();
      }else {
        checkAccountFacebook.refToken.push(refToken);
        await checkAccountFacebook.save();
      }
      res.status(301).json({ message: 'SUCCESSFUL!', token, refToken, avatarFacebook: isNew ? photos[0].value : checkAccountFacebook.avatar });
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: error });
    }
  }
}

export default new SystemSign();
