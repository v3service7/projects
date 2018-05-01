export const menuItems = [
  {
    title: 'Dashboard',
    routerLink: 'dashboard',
    icon: 'fa-home',
    selected: false,
    expanded: false,
    order: 0
  },
  {
    title: 'Form Elements',
    routerLink: 'form-elements',
    icon: 'fa-pencil-square-o',
    selected: false,
    expanded: false,
    order: 400,
    subMenu: [
      /*{
        title: 'Form Inputs',
        routerLink: 'form-elements/inputs'
      },
      {
        title: 'Form Layouts',
        routerLink: 'form-elements/layouts'
      },
      {
        title: 'Form Validations',
        routerLink: 'form-elements/validations'
      },*/
      {
        title: 'Form Wizard',
        routerLink: 'form-elements/wizard'
      }
    ]
  },  

  /*{
    title: 'Pages',
    routerLink: ' ',
    icon: 'fa-file-o',
    selected: false,
    expanded: false,
    order: 650,
    subMenu: [        
      {
        title: 'Login',
        routerLink: '/login'
      },
      {
        title: 'Register',
        routerLink: '/register'
      },
      {
        title: 'Blank Page',
        routerLink: 'blank'
      },
      {
        title: 'Error Page',
        routerLink: '/pagenotfound'
      }
    ]
  }*/
  
];
