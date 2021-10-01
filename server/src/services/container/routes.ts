import express from 'express';

import * as controller from './controller';

export const containerRouter = express.Router();

/** GET /api/container */
containerRouter.route('/').get(controller.find);

/** POST /api/container */
containerRouter.route('/').post(controller.create);
