


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
      to: "Accounts",
      subcategories: [
        {to:'/accounts/gst',label:'GST Billing'},
        {to:'/accounts/vendor',label:'Vendors'},
        {to:'/accounts/contractor',label:'Contractors'},
        {to:'/accounts/purchaseorder',label:'Purchase Order'},
        {to:'/accounts/voucher',label:'Voucher'},
        {to:'/accounts/Project',label:'Projects'},
        {to:'/accounts/status',label:'Status'},


      ],
    },

    {
      to: "Execution",
      subcategories: [
        {to:'/execution/timeline',label:'Project TimeLine'},
        {to:'/execution/drawings',label:'Drawings'},
        {to:'/execution/nmr',label:'NMR Attendance'},
        {to:'/execution/contractor',label:'Contractor Attendance'},
        {to:'/execution/workorder',label:'Work Order'},
        {to:'/execution/project',label:'Project Details'},
        {to:'/execution/stocklist',label:'Stock List'},
        {to:'/execution/attendancesheet',label:'Attendance Sheet'},
        {to:'/execution/photos',label:'Site Photos'},
        {to:'/execution/status',label:'Status'},
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
  