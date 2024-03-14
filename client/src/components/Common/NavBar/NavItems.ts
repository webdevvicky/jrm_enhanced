


  const navItems: NavItem[] = [
    {
      to: "Marketting",
      subcategories: [
        { to: "/marketting/enquiry/new", label: "New" },
        { to: "/marketting/enquiry/list", label: "List" },
      ],
    },
    {
      to: "Designs",
      subcategories: [
        {to:'/designs/booking',label:'Booking'},

        { to: "/designs/list", label: "Designs&Quote" },
        {to:'/designs/booking/status',label:'Status'},
      ],
    },
    {to:"/accounts",label:"Accounts/Purchase"},
    {
      to: "Accounts/Purchase",
      subcategories: [
        {to:'/accounts/gst',label:'GST Billing'},
        {to:'/accounts/vendor',label:'Vendors'},
        {to:'/accounts/contractor',label:'Contractors'},
        {to:'/accounts/purchase',label:'Purchase Order'},
        {to:'/accounts/voucher',label:'Voucher'},
        {to:'/accounts/Project',label:'Projects'},
        {to:'/accounts/status',label:'Status'},


      ],
    },

    {
      to: "Admin",
      subcategories: [
        { to: "/admin/employee", label: "Employee" },
        { to: "/admin/project", label: "Project" },
      ],
    },
    // Add more nav items as needed
  ];
  
  export default navItems;
  