interface Subcategory {
  to: string;
  label: string;
}

interface NavItem {
  to: string;
  subcategories: Subcategory[];
}

interface NavBarProps {
  navItems: NavItem[];
}
