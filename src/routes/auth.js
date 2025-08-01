import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserSchema,  loginUserSchema, requestResetEmailSchema, resetPasswordSchema } from '../validation/auth.js';
import { registerUserController, loginUserController, refreshUserSessionController, logoutUserController, requestResetEmailController, resetPasswordController  } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
)

router.post(
  '/refresh',
  ctrlWrapper(refreshUserSessionController),
)

router.post(
  '/logout',
  ctrlWrapper(logoutUserController),
)

router.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
)

router.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
)

export default router;
