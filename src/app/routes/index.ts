import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/User/user.route';
import { OtpRoutes } from '../modules/Otp/otp.route';
import { ServiceRoutes } from '../modules/Service/Service.route';
import { JobRoutes } from '../modules/Job/Job.route';
import { TicketRoutes } from '../modules/Ticket/Ticket.route';
import { InvoiceRoutes } from '../modules/Invoice/Invoice.route';
import { NotificationRoutes } from '../modules/Notification/Notification.route';
import { TermRoutes } from '../modules/Term/Term.route';
import { PrivacyRoutes } from '../modules/Privacy/Privacy.route';
import { ChatRoutes } from '../modules/Chat/Chat.route';
import { DashboardRoutes } from '../modules/Dashboard/Dashboard.route';
import { UploadRoutes } from '../modules/Upload/Upload.route';



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
