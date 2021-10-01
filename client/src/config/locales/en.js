import { defineMessages } from 'react-intl'

const messages = defineMessages({
  // Landing Page
  title: 'This is a title',
  subtitle: 'This is a subtitle',

  //Sign-In Page
  metamask_button: 'Sign In with Metamask',
  back_landingpage: 'Back to the Landingpage',

  // Side-Menu
  locales_home: 'Dashboard',
  locales_container: 'Container',
  locales_order: 'Orders',
  locales_events: 'Events',
  locales_devices: 'Devices',
  locales_documents: 'Documents',
  locales_status: 'Status',

  locales_documentation: 'Documentation',
  locales_whitepaper: 'Whitepaper',
  locales_contact: 'Contact',

  // Dashboard Page
  locales_dashboard: 'Home',
  locales_dashboard_header: 'Dashboard',
  locales_dashboard_subtitle: 'Welcome to the LogU Blockchain Explorer. This is your dashboard.',

  // Container Page
  locales_container: 'Containers',
  locales_container_header: 'Container Overview',
  locales_container_subtitle: 'Here you find your registered Containers.',
  locales_container_details_subtitle: 'Here you will find detailed information about your container.',
  locales_no_container_display: 'No Containers have been added.',
  locales_add_fab_title: 'Add Container',
  locales_add_fab_description: 'Enter all necessary information of a new container here. The system recognizes the protocol based on the address and opens the data stream. A passphrase is required for encrypted data.',
  locales_add_fab_cancel: 'Cancel',
  locales_add_fab_dummy: 'Dummy Data',
  locales_add_fab_add: 'Add',

  // Orders Page
  locales_orders: 'Orders',
  locales_orders_header: 'Order overview',
  locales_orders_subtitle: 'Here you can find all created orders and the corresponding containers.',

  // Events Page
  locales_events: 'Events',
  locales_events_header: 'Your Events',
  locales_events_subtitle: 'Here you will find all important dates for your orders and containers.',

  //---

  // Devices Page
  locales_devices: 'Devices',
  locales_devices_header: 'Your Devices',
  locales_devices_subtitle: 'Here you will find an overview of all measuring devices in use.',

  // Documents Page
  locales_documents: 'Documents',
  locales_documents_header: 'Your Documents',
  locales_documents_subtitle: 'This is where all documents for orders and containers are located.',

  // Map Page
  locales_map: 'Map',
  locales_map_header: 'Your Containers on the Map',
  locales_map_subtitle: 'This is where all containers are located.',

  // Status Page
  locales_status: 'Status',
  locales_status_header: 'Status',
  locales_status_subtitle: 'The status of all applications and protocols is displayed here. In the event of a malfunction, you will be notified.',

  // About Page
  locales_about: 'About',
  locales_about_header: 'Information about this application',
  locales_about_subtitle: 'The LogU Blockchain Explorer in detail: instructions, imprint, privacy.',

  // Other Pages
  app_name: 'LogU Blockchain Explorer',
  sign_in: 'Sign in',
  sign_out: 'Sign out',
  sign_up: 'Sign up',
  email: 'Email',
  username: 'Username',
  password: 'Password',
  about: 'About',
  page_not_found: 'Page not found',
  settings: 'Settings',
  theme: 'Theme',
  default: 'Default',
  red: 'Red',
  green: 'Green',
  language: 'Language',
  en: 'English',
  de: 'German',
  ru: 'Russian',
  menu: 'Menu',
  menu_mini_mode: 'Mini menu',
  offline: 'Offline',
  demos:'Demos',
  dialog_demo:'Demo dialog',
  dialog_title:'Dialog title',
  dialog_action:'YES, Delete',
  dialog_message:`Dialog message. You can put as much text as you want here. 
  Ask a question or show a warning before deleting something. 
  You can also set the action text to something like "YES, Delete" and run that action by passing a "handleAction" prop. 
  This receives a "handleClose" callback with which you can close the dialog when your action is done.`,
  toast_demo:'Demo toast',
  filter_demo:'Demo filter',
  list_page_demo:'List Page demo with {count} rows',
  forgot_password:'Forgot password',
  password_reset:'Password reset',
  password_confirm:'Password confirm',
  registration:'Registration',
  my_account: 'My account',
  delete_account_dialog_title: 'Delete Account?',
  delete_account_dialog_message:
    'Your account will be deleted and you will lose all your data!',
  delete_account_dialog_action:'Delete account'
})

export default messages
