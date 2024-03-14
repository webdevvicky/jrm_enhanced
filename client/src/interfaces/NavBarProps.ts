interface Subcategory {
  to: string;
  label: string;
}

interface NavItem {
  to: string;
  label?:string
  subcategories?: Subcategory[];
}

interface NavBarProps {
  navItems: NavItem[];
}
