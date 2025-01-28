import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/User/user.route';
import { OtpRoutes } from '../modules/Otp/otp.route';
import { ServiceRoutes } from '../modules/Service/Service.route';
import { JobRoutes } from '../modules/Job/Job.route';



const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/otps',
    route: OtpRoutes,
  },
  {
    path: '/services',
    route: ServiceRoutes,
  },
  {
    path: '/jobs',
    route: JobRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
