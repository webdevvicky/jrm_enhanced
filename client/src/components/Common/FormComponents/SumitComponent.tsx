interface SubmitProps {
  btnlable: string;
}
const SubmitComponent = ({ btnlable }: SubmitProps) => {
  return (
    <div className="container py-3 ">
      <button type="submit" className="btn btn-primary form-control ">
        {btnlable}
      </button>
    </div>
  );
};

export default SubmitComponent;
