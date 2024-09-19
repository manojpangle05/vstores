import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/CategoryProductStyles.css";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from 'react-router-dom';
const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-3 category">
        <div className="sec-title mt-5 mb-3">
          <h1 className="text-center">Category - {category?.name}</h1>
          <h5 className="text-center">{products?.length} result found </h5>
        </div>
        <div className="row mb-5">
          <div className="col-md-12 offset-1">
            <div className="row">
              {products?.map((p) => (
                 <div class="col-lg-3 col-md-6 mb-4" key={p._id}>

                 <Link to="/product/${p.slug}"></Link>
                 <div className=" product-box">

                   <div class="product-img" onClick={() => navigate(`/product/${p.slug}`)}>
                     <img
                       src={`/api/v1/product/product-photo/${p._id}`}
                       className="card-img-top"
                       alt={p.name}
                     />
                   </div>
                   <div className="card-body">
                     <div className="product-content">
                       <div class="product-titles" onClick={() => navigate(`/product/${p.slug}`)}>
                         <h5>{p.name}</h5>

                       </div>
                       <div class="product-tags">
                         
                         <span>Gear Box</span>
                         <span>Gear Box</span>
                       </div>
                       <div class="row price-cart">
                         <div class="col-6 cart-1">
                           <div class="product-cart text-center">
                             {/* <Button><i class="bi bi-cart-plus"></i></Button> */}
                             <button
                               className="btn btn-dark ms-1"
                               onClick={() => {
                                 setCart([...cart, p]);
                                 localStorage.setItem(
                                   "cart",
                                   JSON.stringify([...cart, p])
                                 );
                                 toast.success("Item Added to cart");
                               }}
                             >
                               <i class="bi bi-cart-plus"></i>
                             </button>
                           </div>
                         </div>
                         <div class="col-6 my-auto">
                           <div class="product-price   text-center">
                             <span> {p.price.toLocaleString("en-US", {
                               style: "currency",
                               currency: "USD",
                             })} <i class="bi bi-caret-right-fill"></i></span>
                           </div>
                         </div>
                       </div>
                       <div class="ref-no">
                         {p.description.substring(0, 20)}...
                       </div>
                       {/* <h5 className="card-title">{p.name}</h5>
             <h5 className="card-title card-price">
               {p.price.toLocaleString("en-US", {
                 style: "currency",
                 currency: "USD",
               })}
             </h5> */}
                     </div>
                     {/* <p className="card-text ">
             {p.description.substring(0, 60)}...
           </p> */}
                     <div className="card-name-price mt-3 px-3 pb-3">
                       <button
                         className="btn btn-info w-100"
                         onClick={() => navigate(`/product/${p.slug}`)}
                       >
                         More Details
                       </button>
                       {/* <button
               className="btn btn-dark ms-1"
               onClick={() => {
                 setCart([...cart, p]);
                 localStorage.setItem(
                   "cart",
                   JSON.stringify([...cart, p])
                 );
                 toast.success("Item Added to cart");
               }}
             >
               ADD TO CART
             </button> */}
                     </div>
                   </div>

                 </div>

                 {/* <Link className="prod-link" to="">
                                     <div class="product-box">
                                         <div class="product-img">
                                             <img src={BreakImg} alt="" />
                                         </div>
                                         <div class="product-content">
                                             <div class="product-titles">
                                                 <h5>Brake drum for truck 1599012</h5>

                                             </div>
                                             <div class="product-tags">
                                                 <span>DT Spare Parts</span>
                                                 <span>Gear Box</span>
                                                 <span>Gear Box</span>
                                             </div>
                                             <div class="row price-cart">
                                                 <div class="col-6 cart-1">
                                                     <div class="product-cart text-center">
                                                         <Button><i class="bi bi-cart-plus"></i></Button>
                                                     </div>
                                                 </div>
                                                 <div class="col-6 my-auto">
                                                     <div class="product-price   text-center">
                                                         <span>$200 <i class="bi bi-caret-right-fill"></i></span>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="ref-no">
                                                 Ref No: <span>BPO543002-UP(used)</span>
                                             </div>
                                         </div>
                                     </div>
                                 </Link> */}
               </div>

              ))}
            </div>
            {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
