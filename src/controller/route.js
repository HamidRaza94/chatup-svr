import { Router } from 'express';

import controller from './Controller';

const router = new Router();

router
.route('/login')
.post(
  (req, res, next) => controller.login(req, res, next),
)

export default router;
