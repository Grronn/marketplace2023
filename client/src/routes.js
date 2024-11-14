
import Auth from "./pages/Auth"
import CreateService from "./pages/CreateService"
import MastersPage from "./pages/MastersPage"
import OrderedServices from "./pages/OrderedServices"
import ProfileMasterPage from "./pages/ProfileMasterPage"
import becomeMaster from "./pages/becomeMaster"
import OrderedServicesCustomer from "./pages/OrderedServicesCustomer"


import { ACCOUNT, ADMIN, BECOME_MASTER_ROUTE, CREATE_SERVICE_ROUTE, HISTORY_SERVICE_ORDERED, HISTORY_SERVICE_ORDERED_MASTER, LOGIN_ROUTE, MASTERS_ROUTE, ORDERED_SERVICES, ORDERED_SERVICES_CUSTOMER, ORDERED_SERVICES_CUSTOMER_ROUTE, ORDERED_SERVICES_MASTER, ORDERED_SERVICES_MASTER_ROUTE, PROFILEMASTER_ROUTE, REGISTRATION_ROUTE, TASKS_CUSTOMER_ROUTE, TASKS_MASTER_ROUTE } from "./utils/consts"
import HistoryServiceOrdered from "./pages/HistoryServiceOrdered"
import HistoryServiceMaster from "./pages/HistoryServiceMaster"
import TasksCustomerPage from "./pages/TasksCustomerPage"
import TaskMasterPage from "./pages/TaskMasterPage"
import AccountPage from "./pages/AccountPage"
import AdminPage from "./pages/AdminPage"

export const authRoutes = [
    {
        path: ORDERED_SERVICES_CUSTOMER_ROUTE + '/:id',
        Component: OrderedServicesCustomer
    },
    {
        path: ORDERED_SERVICES_MASTER_ROUTE + '/:id',
        Component: OrderedServices
    },
    {
        path: BECOME_MASTER_ROUTE + '/:id',
        Component: becomeMaster
    },
    {
        path: CREATE_SERVICE_ROUTE + '/:id',
        Component: CreateService
    },
    {
        path: HISTORY_SERVICE_ORDERED + '/:id',
        Component: HistoryServiceOrdered
    },
    {
        path: HISTORY_SERVICE_ORDERED_MASTER + '/:id',
        Component: HistoryServiceMaster
    },
    {
        path: TASKS_CUSTOMER_ROUTE + '/:id',
        Component: TasksCustomerPage
    },
    {
        path: TASKS_MASTER_ROUTE + '/:id',
        Component: TaskMasterPage
    },
    {
        path: ACCOUNT + '/:id',
        Component: AccountPage
    },
    {
        path: ADMIN,
        Component: AdminPage
    }
]
export const publicRoutes = [
    {
        path: MASTERS_ROUTE,
        Component: MastersPage
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: PROFILEMASTER_ROUTE + '/:id',
        Component: ProfileMasterPage
    },
]