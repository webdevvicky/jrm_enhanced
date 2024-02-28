import { Link } from "react-router-dom";
interface DescriptionProps {
  data: SearchDescriptionResults[];
}

const MatchingPoDescription = ({ data }: DescriptionProps) => {
  return (
    <div className="container">
      <table className="table table-secondary">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Description</th>
            <th>Meterial For</th>
            <th>Unit</th>
            <th>Rate</th>
            <th>PO</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.description}</td>
              <td>{item.meterialFor}</td>
              <td>{item.unit}</td>
              <td>{item.rate}</td>
              <td>
                <Link to={`/purchase/model/${item._id}`}>open</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatchingPoDescription;
