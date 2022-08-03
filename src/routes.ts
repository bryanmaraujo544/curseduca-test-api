import { Request, Response, Router } from 'express';
import AuthController from './app/controllers/AuthController';
import CommentController from './app/controllers/CommentController';
import LikeController from './app/controllers/LikeController';
import PostController from './app/controllers/PostController';
import UserController from './app/controllers/UserController';
import { ensureAuthentication } from './app/middlewares/ensureAuthentication';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('index page');
});

router.post('/auth', ensureAuthentication as any, AuthController.auth);
router.post('/auth/login', AuthController.login);

router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.post('/users', UserController.store);

router.get('/posts', ensureAuthentication as any, PostController.index);
router.post('/posts', ensureAuthentication as any, PostController.store);
router.put('/posts/:id', ensureAuthentication as any, PostController.update);
router.delete('/posts/:id', ensureAuthentication as any, PostController.delete);

router.get('/comments', ensureAuthentication as any, CommentController.index);
router.post('/comments', ensureAuthentication as any, CommentController.store);
router.delete(
  '/comments/:id',
  ensureAuthentication as any,
  CommentController.delete
);

router.get('/likes', ensureAuthentication as any, LikeController.index);
router.post('/likes', ensureAuthentication as any, LikeController.store);
router.delete(
  '/likes/:postId',
  ensureAuthentication as any,
  LikeController.delete
);

export default router;
