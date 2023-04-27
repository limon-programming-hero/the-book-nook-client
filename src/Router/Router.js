import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ClientMain from './../Pages/Client/ClientMain';
import LogIn from './../Pages/LogIn/LogIn';
import AdminMain from './../Pages/Admin/AdminMain';
import Admin from "../Pages/Admin/Admin";
import Products from './../Pages/Client/Products/Products';
import SignUp from './../Pages/SignUp/SignUp';
import AddBook from "../Pages/Admin/AddBook/AddBook";
import ManageBooks from "../Pages/Admin/ManageBooks/ManageBooks";
import PrivateRoute from "./PrivateRoute";
import CheckOut from "../Pages/Client/CheckOut/CheckOut";
import Order from "../Pages/Client/Order/Order";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <ClientMain></ClientMain>,
                children: [
                    {
                        path: '',
                        element: <Products></Products>,
                        loader: () => fetch('http://localhost:5000/books')
                    },
                    {
                        path: '/login',
                        element: <LogIn></LogIn>
                    },
                    {
                        path: '/signup',
                        element: <SignUp></SignUp>
                    },
                    {
                        path: '/checkout/:id',
                        element: <PrivateRoute><CheckOut></CheckOut></PrivateRoute>,
                        // loader: ({ params }) => fetch(`http://localhost:5000/checkout/${params.id}}`)
                    },
                    {
                        path: '/order',
                        element: <PrivateRoute><Order></Order></PrivateRoute>
                    }
                ]
            },
            {
                path: '/admin',
                element: <PrivateRoute><AdminMain></AdminMain></PrivateRoute>,
                children: [
                    {
                        path: '/admin',
                        element: <Admin></Admin>
                    },
                    {
                        path: '/admin/addbook',
                        element: <AddBook></AddBook>
                    },
                    {
                        path: '/admin/managebooks',
                        element: <ManageBooks></ManageBooks>,
                    }
                ]
            }
        ]
    }
])