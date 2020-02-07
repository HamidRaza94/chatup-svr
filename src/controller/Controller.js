import { AuthenticationService, UserManagementService } from '../services';

class Controller {
  constructor() {
    this.authenticationService = new AuthenticationService();
    this.userManagementService = new UserManagementService();
  }

  login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = this.userManagementService.login({ email, password });

      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
      }

      const token = this.authenticationService.getToken(payload);

      // const d = new Date(); 
      // d.setTime(d.getTime() + (1*60*60*1000));
      // console.log('epro ==>', d.toUTCString());

      const options = {
      //   secure: false,
      //   httpOnly: false,
      //   domain: 'http://localhost:3000',
        // expires: d.toGMTString(),
      }

      return res
        .cookie('accessToken', token, options)
        .header('Authorization', token)
        .status(200)
        .send(token);
    } catch (error) {
      console.log('ERROR: controller - ', error.message);
      next({
        error: 'Unable to login',
        message: error.message,
        status: 401,
      });
    }
  }
}

export default new Controller();
