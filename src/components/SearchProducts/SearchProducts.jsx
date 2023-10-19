// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useQuery } from "react-query";
// import { Link } from "react-router-dom";

// export default function SearchProducts() {
//   let [searchQuery, setsearchQuery] = useState("");
//   let [dataa, setdataa] = useState([]);

//   useEffect(() => {
//     async function getProducts() {
//       const response = await axios.get(
//         `https://ecommerce.routemisr.com/api/v1/products`
//       );
//       setdataa(response?.data?.data);
//       console.log(response?.data?.data);
//     }
//     getProducts();
//   }, []);

//   function handleSearchChange(e) {
//     const query = e.target.value;
//     setsearchQuery(query);
//     console.log(query);
//     if (query === "") {
//       setdataa(dataa);
//     }
//   }

//   useEffect(() => {
//     if (searchQuery.length > 0) {
//       let filtered = dataa;
//       if (searchQuery.includes("a")) {
//         filtered = dataa.filter((item) =>
//           item.category.name.toLowerCase().includes("a")
//         );
//       }
//       setdataa(filtered);
//     } else {
//       setdataa(dataa);
//       console.log(dataa);
//     }
//   }, [searchQuery]);

//   return (
//     <>
//       <form>
//         <input
//           className="form-control mt-4"
//           type="search"
//           placeholder="search...."
//           onChange={handleSearchChange}
//         />
//       </form>
//     </>
//   );
// }
