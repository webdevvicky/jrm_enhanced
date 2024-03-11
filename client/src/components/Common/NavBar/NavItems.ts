


  const navItems: NavItem[] = [
    {
      to: "marketting",
      subcategories: [
        { to: "/marketting/enquiry/new", label: "New" },
        { to: "/marketting/enquiry/list", label: "List" },
      ],
    },
    {
      to: "designs",
      subcategories: [
        {to:'/designs/booking',label:'Booking'},
        { to: "/designs/list", label: "Designs&Quote" },
      ],
    },
    {
      to: "admin",
      subcategories: [
        { to: "/admin/employee", label: "Employee" },
        { to: "/admin/project", label: "Project" },
      ],
    },
    // Add more nav items as needed
  ];
  
  export default navItems;
  