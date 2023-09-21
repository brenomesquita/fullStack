import express from 'express';
import TmdbIntegration from '../../integration/tmdb.integration';
const tmdbIntegration = new TmdbIntegration();

import { ListUseCase } from './use-cases/list';
import ListController from './list.controller';

const listUseCase = new ListUseCase(tmdbIntegration);
const controller = new ListController(listUseCase);

const router = express.Router();

router.route('/list').get(controller.list.bind(controller));

export default router;
