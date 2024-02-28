import { useEffect, useState } from "react";
import poFindService from "../../services/po/poFindService";
import { AxiosResponse } from "axios";
import MatchingPoDescription from "./MatchingPoDescription";
interface SearchDescriptionResults {
  _id: string;
  description: string;
  rate: string;
  unit: string;
  meterialFor: string;
}
const SearchingDescription = () => {
  const [search, setSearch] = useState();
  const [results, setResults] = useState<SearchDescriptionResults[]>([]);
  const onInputChage = (data: any) => {
    console.log(data.target.value);

    setSearch(data.target.value);
  };
  useEffect(() => {
    poFindService
      .getById<SearchDescriptionResults[]>(`${search}`)
      .then((res: AxiosResponse) => {
        setResults(res.data);
      })
      .catch((err: any) => {
        console.log(err);
        setResults([])
      });
  }, [search]);
  return (
    <div className=" container ">
      <div className="row">
        <div className="col-md-12">
          <input
            type="text"
            placeholder="search"
            onChange={(data) => onInputChage(data)}
          />
        </div>
      </div>
      <div className="row">
        <MatchingPoDescription data={results} />
      </div>
    </div>
  );
};

export default SearchingDescription;
