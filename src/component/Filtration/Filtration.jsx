import React, { useState, useEffect, useCallback } from "react";


export default function Filtr({  data, filtrated ,nameOfSession}) {
  const [brands, setBrands] = useState({
    name: "",
  });
  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleChange = (e) => {
    const { name, value, id } = e.target;
     setBrands({ ...brands, [name]: value });
  };

  // mostafa edit to filter 
  // const handleSearch = () => {
  //   const { name,  cost ,category_id, size, type, status ,all_costs    } = meals;
  //   const filtered = filteredData.filter((item) => {
  //     const allCostsMatches = cost && item.all_costs.some(c => c === parseFloat(cost));
  //     return (
  //       allCostsMatches && 
  //       (!name || item.name.toLowerCase().includes(name.toLowerCase())) &&
  //       (!category_id  || item.category_id === parseInt(category_id)) &&
  //       (!size || item.size === parseFloat(size)) &&
  //       (!type || item.type.toLowerCase() === type.toLowerCase()) && 
  //       (status === "" || item.status === parseInt(status))
  //     );
  //   });  
  //   setFilteredData(filtered);
  //   filtrated(filtered);
  // };

  const handleSearch = () => {
    const { name: brandName } = brands; // Rename destructured name for clarity
    const filtered = filteredData.filter((item) => {
      const matchesName = !brandName || item.name.toLowerCase().includes(brandName.toLowerCase());
      return matchesName;
    });
    setFilteredData(filtered);
    filtrated(filtered);
  };
  
  const handleClear = () => {
    setBrands({
      name: "",
    });

    
        setFilteredData( JSON.parse(sessionStorage.getItem(nameOfSession)));
        filtrated( JSON.parse(sessionStorage.getItem(nameOfSession)));
   
      
  
  };

 

  return (
  <>

<div className="col col-12 col-sm-6 col-md-6 col-lg-3 mb-3 ">
            <label htmlFor="name" className="mb-2">
              name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              value={brands.name}
              onChange={(e) => handleChange(e)}
            />
          </div>
 <div className="d-flex">
    <div className="col-2">

  
           <button
              type="search"
              className="btn btn-success"
              onClick={handleSearch}
            > بحث</button>
              </div>
<div className="col-2">
 <button
              type="clear"
              className="btn btn-secondary"
              onClick={handleClear}
            >
              <span className="ps-2">clear</span>
            </button>
            </div>
            </div>
  </>
  );
}
