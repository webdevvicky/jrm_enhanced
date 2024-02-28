interface HeaderProps {
  lable: string;
}
const Header = ({ lable }: HeaderProps) => {
  return (
    <div className=" text-center  text-primary-emphasis ">
      <h5>{lable}</h5>
    </div>
  );
};

export default Header;
