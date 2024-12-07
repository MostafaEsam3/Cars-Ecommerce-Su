import React, { useEffect, useState } from 'react';

const Table = () => {

    const [ data , setData]=useState([])
    const [ filteredData , setFilteredData]=useState([])

    const [meals, setMeals] = useState({
        name: "",
        cost: "",
        category_id: "",
        size: "",
        type: "",
        status: "",
      });

    const arraYdata= [
        {
            name:'mostafa',
            id:3,
            cost:23,
            size:"large",

        },
        {
            name:'mostafa',
            id:4,
            cost:22,
            size:"small",

        },   {
            name:'kandel',
            id:2,
            cost:22,
            size:"large",

        },   {
            name:'esam',
            id:2,
            cost:66,
            size:"large",

        },   {
            name:'sama',
            id:2,
            cost:22,
            size:"large",

        },   {
            name:'hager',
            id:2,
            cost:22,
            size:"large",

        },
    ];

    const handleChange = (e) => {
        const { name, value, id } = e.target;
        if (name === "status") {
          setMeals((prevData) => ({
            ...prevData,
            status: id === "active" ? 1 : 0,
          }));
        } else if (name === "type") {
          setMeals((prevData) => ({
            ...prevData,
            type: id === "vegetarian" ? "vegetarian" : "non-vegetarian",
          }));
        } else {
          setMeals({ ...meals, [name]: value });
        }
      };
    
    
  const handleSearch = () => {
    const { name, cost, category_id, size, type, status } = meals;
    // Use filter to apply each filter condition independently
    const filtered = filteredData.filter((item) => {
      const costMatch = !cost || item.cost === parseInt(cost);
      const nameMatch = !name || item.name.toLowerCase().includes(name.toLowerCase());
      const categoryMatch = !category_id || item.category_id === parseInt(category_id);
      const sizeMatch = !size || item.size === parseFloat(size);
      const typeMatch = !type || item.type.toLowerCase() === type.toLowerCase();
      const statusMatch = status === "" || item.status === parseInt(status);
      return costMatch && nameMatch && categoryMatch && sizeMatch && typeMatch && statusMatch;
    });
    setFilteredData(filtered);
    setData(filtered);
  };
  

    useEffect(() => {
setData(arraYdata);
setFilteredData(arraYdata);
}, []);


    const handleClear = () => {
        setMeals({
          name: "",
          cost: "",
          category_id: "",
          size: "",
          type: "",
          status: "",
        });
        setData(arraYdata)
      };    

    
    return (
      <>
      
    
    <div className="Meals " id="collapseTarget">
        <div className="row mt-3">
          <div className="col col-12 col-sm-6 col-md-6 col-lg-3 mb-3">
            <label htmlFor="name" className="mb-2">
              name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              value={meals.name}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="col col-12 col-sm-6 col-md-6 col-lg-3 mb-3">
            <label htmlFor="price" className="mb-2">
              price
            </label>
            <input
              type="number"
              className="form-control"
              name="cost"
              id="cost"
              value={meals.cost}
              onChange={(e) => handleChange(e)}
            />
          </div>


          {/* <div className="col col-12 col-sm-6 col-md-6 col-lg-3 mb-3">
            <label htmlFor="size" className="mb-2">
              size
            </label>

            <select
              className="form-control"
              name="size"
              id="size"
              value={meals.size}
              onChange={(e) => handleChange(e)}
            >
              <option value="" selected disabled>
                --
              </option>
              <option value="1">small</option>
              <option value="2">medium</option>
              <option value="3">large</option>
              <option value="4">family</option>
            </select>
          </div> */}
          
          <div className="col col-12 col-sm-6 col-md-6 col-lg-3 mb-3">
            <label className="mb-2">Type</label>
            <div className="d-flex gap-2 align-items-center">
              <input
                type="radio"
                name="type"
                id="vegetarian"
                checked={meals.type === "vegetarian"}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="vegetarian">Veg</label>
              <input
                type="radio"
                name="type"
                id="non-vegetarian"
                checked={meals.type === "non-vegetarian"}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="non-vegetarian">Non Veg</label>
            </div>
          </div>

          <div className="col col-12 col-sm-6 col-md-6 col-lg-3 mb-3">
            <label className="mb-2">status</label>
            <div className="d-flex gap-2 align-items-center">
              <input
                type="radio"
                name="status"
                id="active"
                checked={meals.status === 1}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="active">active</label>
              <input
                type="radio"
                name="status"
                id="inactive"
                checked={meals.status === 0}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="inactive">inactive</label>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col col-3 d-flex gap-3">
            <button
              type="search"
              className="btn btn-primary"
              onClick={handleSearch}
            >
              <span className="ps-2">search</span>
            </button>
            <button
              type="clear"
              className="btn btn-secondary"
              onClick={handleClear}
            >
              <span className="ps-2">clear</span>
            </button>
          </div>
        </div>
      </div>

      <div>
        {
            data.map((item)=>((
                <>
                <span>{item.name}</span>
                <span>{item.size}</span>
                <span>{item.id}</span>
                <span>{item.cost}</span>
                <br />

                </>
            )))
        }
      </div>

      
      
      </>
    );
}

export default Table;









// import React, { useEffect, useState } from 'react';

// const Table = () => {
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState(""); // New state for search input
//   const [suggestions, setSuggestions] = useState([]); // New state for suggestions

//   const arraYdata = [
//     { name: 'mostafa', id: 3, cost: 23, size: "large" },
//     { name: 'mostafa', id: 4, cost: 22, size: "small" },
//     { name: 'kandel', id: 2, cost: 22, size: "large" },
//     { name: 'esam', id: 2, cost: 66, size: "large" },
//     { name: 'sama', id: 2, cost: 22, size: "large" },
//     { name: 'hager', id: 2, cost: 22, size: "large" },
//   ];

//   useEffect(() => {
//     setData(arraYdata);
//     setFilteredData(arraYdata);
//   }, []);

//   const handleSearchChange = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);

//     // Generate suggestions based on the query
//     if (query) {
//       const matchingSuggestions = arraYdata.filter((item) =>
//         item.name.toLowerCase().includes(query.toLowerCase())
//       );
//       setSuggestions(matchingSuggestions);
//     } else {
//       setSuggestions([]); // Clear suggestions if query is empty
//     }
//   };

//   const handleSuggestionClick = (suggestion) => {
//     setSearchQuery(suggestion.name); // Fill input with selected suggestion
//     setSuggestions([]); // Clear suggestions after selection
//   };

//   const handleSearch = () => {
//     const filtered = data.filter((item) =>
//       item.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredData(filtered);
//   };

//   return (
//     <>
//       <div>
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Search by name"
//           value={searchQuery}
//           onChange={handleSearchChange}
//         />
//         <button className="btn btn-primary" onClick={handleSearch}>Search</button>
        
//         {/* Suggestions Dropdown */}
//         {suggestions.length > 0 && (
//           <div className="suggestions">
//             {suggestions.map((suggestion) => (
//               <div
//                 key={suggestion.id}
//                 className="suggestion-item"
//                 onClick={() => handleSuggestionClick(suggestion)}
//               >
//                 {suggestion.name}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Display Filtered Results */}
//       <div>
//         {filteredData.map((item) => (
//           <div key={item.id}>
//             <span>{item.name}</span>
//             <span>{item.size}</span>
//             <span>{item.id}</span>
//             <span>{item.cost}</span>
//             <br />
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// export default Table;

