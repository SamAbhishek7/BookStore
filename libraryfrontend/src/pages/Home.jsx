import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

import { MdOutlineAddBox} from "react-icons/md";
import BookCard from "../components/home/BookCard";
import BookTable from "../components/home/BookTable";
const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading to true initially
const [showType,setShowType] = useState('table');
  useEffect(() => {
    axios
      .get("http://localhost:5687/books")
      .then((response) => {
        console.log(response.data);
         setBooks(response.data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Set loading to false even if there is an error
      });
  }, []);

  return (
    <div className="p-4">
        <div className="p-4">
         <div className="flex justify-center items-center gap-x-4 ">
            <button className="bg-skyu-300 hover:bg-sky-600 px-4 py-1 rounded-lg outline outline-sky-300"
            onClick={()=>setShowType('table')}>
Table
            </button>
            <button className="bg-skyu-300 hover:bg-sky-600 px-4 py-1 rounded-lg outline outline-sky-300"
            onClick={()=>setShowType('card')}>
Card
            </button>
            </div>   
        </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8 font-bold font-mono">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
    showType=== 'table' ?(<BookTable books={books}/>):(<BookCard books={books}/>)
      )}
    </div>
  );
};

export default Home;
