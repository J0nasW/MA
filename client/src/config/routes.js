/* eslint-disable react/jsx-key */
import React, { lazy } from 'react'
import AuthorizedRoute from 'base-shell/lib/components/AuthorizedRoute/AuthorizedRoute'
import UnauthorizedRoute from 'base-shell/lib/components/UnauthorizedRoute/UnauthorizedRoute'
import { Route } from 'react-router-dom'

const SignIn = lazy(() => import('../pages/SignIn/SignIn'))
const SignUp = lazy(() => import('../pages/SignUp/SignUp'))
const PasswordReset = lazy(() => import('../pages/PasswordReset/PasswordReset'))

// Dashboard
const Home = lazy(() => import('../pages/Dashboard/Home/Home'))
const Containers = lazy(() => import('../pages/Dashboard/Containers/Containers'))
const Container_Details = lazy(() => import('../pages/Dashboard/Containers/Container_Details'))
const Orders = lazy(() => import('../pages/Dashboard/Orders/Orders'))
const Order_Details = lazy(() => import('../pages/Dashboard/Orders/Order_Details'))
const Events = lazy(() => import('../pages/Dashboard/Events/Events'))

const Devices = lazy(() => import('../pages/Dashboard/Devices/Devices'))
const Documents = lazy(() => import('../pages/Dashboard/Documents/Documents'))
const Map = lazy(() => import('../pages/Dashboard/Map/Map'))
const Status = lazy(() => import('../pages/Dashboard/Status/Status'))

const About = lazy(() => import('../pages/Dashboard/About/About'))

const DialogDemo = lazy(() => import('../pages/DialogDemo/DialogDemo'))
const ToastDemo = lazy(() => import('../pages/ToastDemo/ToastDemo'))
const FilterDemo = lazy(() => import('../pages/FilterDemo'))
const ListPageDemo = lazy(() => import('../pages/ListPageDemo'))
const TabsDemo = lazy(() => import('../pages/TabsDemo'))
const MyAccount = lazy(() => import('../pages/MyAccount/MyAccount'))

const routes = [
  <UnauthorizedRoute path="/signin" redirectTo="/" exact component={SignIn} />,
  <UnauthorizedRoute path="/signup" redirectTo="/" exact component={SignUp} />,
  <UnauthorizedRoute
    path="/password_reset"
    redirectTo="/"
    exact
    component={PasswordReset}
  />,
  <Route path="/about" exact component={About} />,
  <AuthorizedRoute path="/my_account" exact component={MyAccount} />,

  <AuthorizedRoute path="/home" exact component={Home} />,
  <AuthorizedRoute path="/containers" exact component={Containers} />,
  <AuthorizedRoute path="/orders" exact component={Orders} />,
  <AuthorizedRoute path="/events" exact component={Events} />,
  <AuthorizedRoute path="/devices" exact component={Devices} />,
  <AuthorizedRoute path="/documents" exact component={Documents} />,
  <AuthorizedRoute path="/map" exact component={Map} />,
  <AuthorizedRoute path="/status" exact component={Status} />,

  <AuthorizedRoute path="/dialog_demo" exact component={DialogDemo} />,
  <AuthorizedRoute path="/toast_demo" exact component={ToastDemo} />,
  <AuthorizedRoute path="/filter_demo" exact component={FilterDemo} />,
  <AuthorizedRoute path="/list_page_demo" exact component={ListPageDemo} />,
  <AuthorizedRoute path="/tabs_demo" exact component={TabsDemo} />,

  <AuthorizedRoute path="/containers/:id" exact component={Container_Details} />,
  <AuthorizedRoute path="/orders/:id" exact component={Order_Details} />,
]

export default routes
