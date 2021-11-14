/**
 * Tạo thêm component theo mẫu dưới
 */

import Login from '../pages/login';
import Welcome from '../pages/welcome';
import HomeClient from '../pages/client/home';
import HomeFreelance from '../pages/freelance/home';
import AddJob from '../pages/client/addjob';
import JobDetail from '../pages/client/jobdetail';
import FreelanceJobs from '../pages/freelance/jobs';
import FreelanceProfile from '../pages/freelance/profile';
import FreelanceJobDetail from '../pages/freelance/jobdetail';

const authRoutes = [
  {
    path: '/login',
    exact: true,
    auth: false,
    component: Login,
  },
];

const mainRoutes = [
  {
    path: '/welcome',
    exact: true,
    auth: true,
    component: Welcome,
  },
];

const clientRoutes = [
  {
    path: '/client/home',
    exact: true,
    auth: true,
    component: HomeClient,
    name: 'My Job',
  },
  {
    path: '/client/job/:code',
    exact: true,
    auth: true,
    component: JobDetail,
    name: 'Job detail',
  },
  {
    path: '/client/addjob',
    exact: true,
    auth: true,
    component: AddJob,
    name: 'Add Job',
  },
];

const freelanceRoutes = [
  {
    path: '/freelance/home',
    exact: true,
    auth: true,
    component: HomeFreelance,
    name: 'Freelance homes',
  },
  {
    path: '/freelance/jobs',
    exact: true,
    auth: true,
    component: FreelanceJobs,
    name: 'All Jobs',
  },
  {
    path: '/freelance/profile',
    exact: true,
    auth: true,
    component: FreelanceProfile,
    name: 'Freelancer profile',
  },
  {
    path: '/freelance/job/:code',
    exact: true,
    auth: true,
    component: FreelanceJobDetail,
    name: 'Freelancer job detail',
  },
];

const routes = [
  ...authRoutes,
  ...mainRoutes,
  ...clientRoutes,
  ...freelanceRoutes,
];

export default routes;
