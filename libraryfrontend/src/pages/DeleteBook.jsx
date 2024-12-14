/* eslint-disable no-unused-vars */
import { useState } from "react"
import axios from "axios"
import { useNavigate,useParams } from "react-router-dom"
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"
import { useSnackbar } from "notistack"
const DeleteBook = () => {
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();
const {enqueueSnackbar} = useSnackbar();
    const handleDeleteBook = ()=>
    {
        setLoading(true);
        axios.delete(`http://localhost:5687/books/${id}`)
        .then(()=>
        {
        setLoading(false);
        enqueueSnackbar('Book deleted successfully', {variant: 'success'});
        navigate('/');

        }).catch((error)=>
    {
        setLoading(false);
        enqueueSnackbar('Error deleting book', {variant: 'error'});
        console.log(error);
    })
    }
  return (
    <div className="p-4">
        <BackButton />
        {loading?<Spinner/>:''}
        <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
            <h3 className="text-2xl">
                Are you sure you want to delete this book?
            </h3>
<button className="p-4 bg-red-600 text-white m-8 w-full" onClick={handleDeleteBook}>
    Yes! Delete
</button>
        </div>
    </div>
  )
}
export default DeleteBook