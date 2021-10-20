import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AccountModel } from '../model/account.js'

class helpSign {
  getToken(payload, timeExpires = 60 * 2) {
    // payload is [id, name, email,]
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        process.env.SECRET_HASH,
        { algorithm: "HS256", expiresIn: timeExpires },
        function (err, token) {
          if (token) {
            resolve(token);
          } else if (err) {
            reject(err);
          }
        }
      );
    });
  }
  verifyToken(token) {
    // payload is [id, name, email,]
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        process.env.SECRET_HASH,
        { algorithms: ["HS256"] },
        function (err, payload) {
          if (payload) {
            resolve(payload);
          } else if (err) {
            // console.log(err)
            reject(err);
          }
        }
      );
    });
  }
  async getRefToken(payload, timeExpires = "30d") {
    return await this.getToken(payload, timeExpires);
  }
  async hashPassword(password) {
    try {
      const salt = 11;
      const codeHash = await bcrypt.hash(password, salt);
      if (codeHash) {
        return codeHash;
      }
    } catch (error) {
      return new Error("Can't Hash Password!" + error);
    }
  }
  async comparePassword(password, encrypt) {
    try {
      return await bcrypt.compare(password, encrypt);
    } catch (error) {
      return new Error("Can't Compare Password!" + error);
    }
  }
  checkData(req, res, next) {
    // check value from data request for sign up
    // do something!

    next();
  }
  checkPermission(auth) {
    const context = this;
    return async function (req, res, next) {
      // console.log(req.get('Authorization'))
      try {
        const state = await context.verifyToken(req.get("Authorization"));
        // console.log(state)
        if (auth.includes(state.type)) {
          next();
        } else {
          res.status(403).json({ message: "Forbidden!" });
        }
      } catch (error) {
        // console.log(error.message)
        res.status(401).json({ message: error.message });
      }
    };
  }
}

export default new helpSign();
