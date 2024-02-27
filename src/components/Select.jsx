import { useEffect, useState } from "react";

export default function SelectComponent({ onChange, id, data }) {
  const [state, setState] = useState([]);

  setState(data);
  console.log("Data Province :", state);

  // const fetchData = async () => {
  //   const data = await fetch(`${url}`);
  //   const results = await data.json();
  //   setState(results);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <select
      onChange={onChange}
      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      id={id}
    >
      {state.map((i) => (
        <option key={i.id} value={i.id}>
          {i.name}
        </option>
      ))}
    </select>
  );
}
