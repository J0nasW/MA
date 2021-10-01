import { defineMessages } from 'react-intl'

const messages = defineMessages({
  // Landing Page
  title: 'This is a title',
  subtitle: 'This is a subtitle',
  
  //Sign-In Page
  metamask_button: 'Anmelden mit Metamask',
  back_landingpage: 'Zurück zur Startseite',

  // Side-Menu
  locales_home: 'Dashboard',
  locales_container: 'Container',
  locales_order: 'Aufträge',
  locales_events: 'Kalender',
  locales_devices: 'Geräte',
  locales_documents: 'Dokumente',
  locales_status: 'Status',

  locales_documentation: 'Dokumentation',
  locales_whitepaper: 'Whitepaper',
  locales_contact: 'Kontakt',

  // Dashboard Page
  locales_dashboard: 'Home',
  locales_dashboard_header: 'Dashboard',
  locales_dashboard_subtitle: 'Willkommen im LogU Blockchain Explorer. Dies ist Ihr Dashboard.',

  // Container Page
  locales_container: 'Container',
  locales_container_header: 'Container Übersicht',
  locales_container_subtitle: 'Hier finden Sie Ihre registrierten Container und alle nötigen Informationen.',
  locales_container_details_subtitle: 'Hier finden Sie detaillierte Informationen zu Ihrem Container.',
  locales_no_container_display: 'Bisher sind keine Container hinzugefügt worden.',
  locales_add_fab_title: 'Container hinzufügen',
  locales_add_fab_description: 'Tragen Sie hier alle nötigen Informationen eines neuen Containers ein. Das System erkennt anhand der Adresse das Protokoll und öffnet den Daten-Stream. Bei verschlüsselten Daten ist eine Passphrase notwendig.',
  locales_add_fab_cancel: 'Abbrechen',
  locales_add_fab_dummy: 'Dummy Daten',
  locales_add_fab_add: 'Hinzufügen',

  // Orders Page
  locales_orders: 'Aufträge',
  locales_orders_header: 'Auftragsübersicht',
  locales_orders_subtitle: 'Hier finden Sie alle angelegten Aufträge und die zugehörigen Container.',

  // Events Page
  locales_events: 'Kalender',
  locales_events_header: 'Ihre Termine',
  locales_events_subtitle: 'Hier finden Sie alle wichtigen Termine zu Ihren Aufträgen und Containern.',

  //---

  // Devices Page
  locales_devices: 'Geräte',
  locales_devices_header: 'Ihre Geräte',
  locales_devices_subtitle: 'Hier finden Sie eine Übersicht aller im Einsatz befindlichen Messgeräte.',

  // Documents Page
  locales_documents: 'Dokumente',
  locales_documents_header: 'Ihre Dokumente',
  locales_documents_subtitle: 'Hier liegen alle Dokumente zu Aufträgen und Containern.',

  // Map Page
  locales_map: 'Karte',
  locales_map_header: 'Ihre Container auf der Karte',
  locales_map_subtitle: 'Hier sehen Sie alle Container auf der Karte.',

  // Status Page
  locales_status: 'Status',
  locales_status_header: 'Statusabfrage',
  locales_status_subtitle: 'Hier wird der Status aller Anwendungen und Protokolle dargestellt. Bei einer Fehlfunktion werden Sie benachrichtigt.',

  // About Page
  locales_about: 'Über',
  locales_about_header: 'Informationen zu dieser Anwendung',
  locales_about_subtitle: 'Der LogU Blockchain Explorer im Detail: Anleitungen, Impressum, Datenschutz.',

  // Other Pages
  app_name: 'LogU Blockchain Explorer',
  sign_in: 'Anmelden',
  sign_out: 'Abmelden',
  sign_up: 'Anmeldung',
  email: 'Email',
  username: 'Nutzername',
  password: 'Passwort',
  about: 'Über',
  
  page_not_found: 'Seite nicht gefunden',
  settings: 'Einstellungen',
  theme: 'Thema',
  default: 'Standard',
  red: 'Rot',
  green: 'Grün',
  language: 'Sprache',
  en: 'Englisch',
  de: 'Deutsch',
  ru: 'Russisch',
  menu: 'Menü',
  menu_mini_mode: 'Mini-Menü',
  offline: 'Offline',
  demos:'Demos',
  dialog_demo:'Demo Dialog',
  dialog_title:'Dialog titel',
  dialog_action:'JA, Löschen',
  dialog_message:`Dialognachricht. Sie können hier so viel Text einfügen, wie Sie möchten. 
  Stellen Sie eine Frage oder zeigen Sie eine Warnung an, bevor Sie etwas löschen. 
  Sie können den Aktionstext auch auf "JA, Löschen" setzen und diese Aktion ausführen, indem Sie eine "handleAction" -Stütze übergeben. 
  Dies erhält einen "handleClose" -Rückruf, mit dem Sie den Dialog schließen können, wenn Ihre Aktion abgeschlossen ist.`,
  toast_demo:'Demo Toast',
  filter_demo:'Demo filter',
  list_page_demo:'List Page Demo mit {count} Zeilen',
  forgot_password:'Passwort vergessen',
  password_reset:'Passwort zurücksetzen',
  password_confirm:'Passwortbestätigung',
  registration:'Registrieren',
  my_account: 'Mein Konto',
  delete_account_dialog_title: 'Konto löschen?',
  delete_account_dialog_message:
    'Dein Konto wird gelöscht und mit ihm alle Daten!',
  delete_account_dialog_action:'Konto löschen'
})

export default messages
