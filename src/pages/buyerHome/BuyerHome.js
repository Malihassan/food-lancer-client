import classes from "./buyerHome.module.scss";
import React ,{useEffect,useState}from 'react'
import BuyerProductCard from './../../components/shared/buyerProductCard/BuyerProductCard';
import useFetch from "../../hooks/useFetch";
import Empty from './../../components/shared/emptyData/Empty';
import  ReactPaginate  from 'react-paginate';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
function BuyerHome() {
  const handelPageClick = async (data) => {
    let currentPage = data.selected + 1;
   setPage(currentPage);
  };
 
  const { sendRequest/* , hasError */ } = useFetch();
  const [products,setProducts] = useState([])
  const [totalPages,setTotalPages]=useState("")
  const [page,setPage]=useState(1)
  useEffect(() => {
     function  getAllProduct(res) {
       setProducts(res?.data.docs)
      setTotalPages(res.data.totalPages)
    }
    
    sendRequest(
     
      {
        url: `buyer/product/allProducts`,
        method: "GET",
        params: { page },
      },
      getAllProduct
    );

  }, [page,sendRequest]);
 
  return (
    <>
    <div className={`${classes.homeBody} `}>
    <div className={`${classes.container} container my-0`}>
    {products.length === 0 && <Empty />}
     {products.length !== 0 && ( 
        <div className={`row justify-content-lg-start justify-content-md-center justify-content-sm-center  `}>
           {products.map((prd) => { 
            return (
              <div
                key={prd._id} 
                className={`col-xl-4`}
              >
                 <BuyerProductCard product={prd} /> 
                
              </div>
            );
           })} 
        </div>
     )} 
       {products.length !== 0 && (
        
        <ReactPaginate
          previousLabel={<FontAwesomeIcon icon={faCircleArrowLeft} />}
          nextLabel={<FontAwesomeIcon icon={faCircleArrowRight} />}
          breakLabel={"..."}
          pageCount={totalPages} 
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handelPageClick} 
           containerClassName={`${classes.paginationContainer} pagination pb-3 justify-content-center`}
          pageClassName={"page-item px-2 py-1"}
          pageLinkClassName={`page-link ${classes.pageLink}`}
          previousClassName={`page-item `}
          previousLinkClassName={`page-link ${classes.pageItem}`}
          nextClassName={"page-item"}
          nextLinkClassName={`page-link ${classes.pageItem}`}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={`${classes.active}`} 
        />
      
    
  )}
    </div>
    </div>
    
    
    </>
  )
}

export default BuyerHome