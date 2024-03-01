import logo from "../../assets/jrm logo Blue.jpg";

interface QuoteHeaderProps {
  quoteType: string;
}

const QuoteHeader = ({ quoteType }: QuoteHeaderProps) => {
  return (
    <div className=" container ">
      <div
        className="row  text-white py-2 d-flex  justify-content-center align-items-center "
        style={{ backgroundColor: "#151e59" }}
      >
        <div
          className="col-2 logo "
          style={{ maxHeight: "350px", maxWidth: "350px" }}
        >
          <img src={logo} alt="jrm " className=" img-fluid " />
        </div>
        <div className="col-6 align-content-center  align-items-center  d-flex">
          <h6>{quoteType} Quote</h6>
        </div>
        <div className="col-4 ps-3">
          <ul className="list-group-flush p-0 m-0 ">
            <li className="list-group-item">JRM Construction</li>
            <li className="list-group-item"># 1A, 1St Floor, </li>
            <li className="list-group-item">Adithyaram Township </li>
            <li className="list-group-item">Kalaignar Karunanidhi Salai</li>
            <li className="list-group-item">Sholinganallur, Chennai-600019</li>
            <li className="list-group-item">www.jrmconstruction.in</li>
            <li className="list-group-item">Mobile : +91 7200094121</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QuoteHeader;
