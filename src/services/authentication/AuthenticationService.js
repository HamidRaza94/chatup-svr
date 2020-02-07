import { AuthenticationError } from 'apollo-server';
import { sign, verify } from 'jsonwebtoken';

import { config } from '../../config';

class AuthenticationService {
  constructor() {
    const { secretKey } = config;

    this.secretKey = secretKey;

    this.options = {
      expiresIn: '1h',
    };
  }

  getToken(payload) {
    return sign(payload, this.secretKey, this.options);
  }

  authenticate({ req, connection, ...rest }) {
    try {
      let headers;

      if (req) {
        headers = req.headers;
        // console.log('req cookies =>', req.cookies.accessToken);
      } else if (!headers && connection) {
        headers = connection.context;
      }

      const { authorization } = headers;

      const [, token] = authorization.split(' ');
      const { id, name, email } = verify(token, this.secretKey);

      return ({
        user: { id, name, email },
        ...rest,
      });
    } catch (err) {
      console.log('ERROR :: AuthenticationService ::', err);
      throw new Error('You need to be authenticated');
    }
  }
}

export default AuthenticationService;
