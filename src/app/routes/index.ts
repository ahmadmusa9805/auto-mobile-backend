import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.route.ts';
import { AuthRoutes } from '../modules/Auth/auth.route.ts';
import { OtpRoutes } from '../modules/Otp/otp.route.ts';
import { ServiceRoutes } from '../modules/Service/Service.route.ts';
import { JobRoutes } from '../modules/Job/Job.route.ts';
import { TicketRoutes } from '../modules/Ticket/Ticket.route.ts';
import { InvoiceRoutes } from '../modules/Invoice/Invoice.route.ts';
import { NotificationRoutes } from '../modules/Notification/Notification.route.ts';
import { TermRoutes } from '../modules/Term/Term.route.ts';
import { PrivacyRoutes } from '../modules/Privacy/Privacy.route.ts';
import { ChatRoutes } from '../modules/Chat/Chat.route.ts';
import { DashboardRoutes } from '../modules/Dashboard/Dashboard.route.ts';
import { UploadRoutes } from '../modules/Upload/Upload.route.ts';




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
  {
    path: '/tickets',
    route: TicketRoutes,
  },
  {
    path: '/invoices',
    route: InvoiceRoutes,
  },
  {
    path: '/notifications',
    route: NotificationRoutes,
  },
  {
    path: '/terms',
    route: TermRoutes,
  },
  {
    path: '/privacies',
    route: PrivacyRoutes,
  },
  {
    path: '/chats',
    route: ChatRoutes,
  },
  {
    path: '/dashboards',
    route: DashboardRoutes,
  },
  {
    path: '/upload',
    route: UploadRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
