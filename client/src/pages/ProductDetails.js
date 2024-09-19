import React, { useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";
import { FaCheck } from "react-icons/fa";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

import HTMLReactParser from 'html-react-parser';

const ProductDetails = () => {
  const params = useParams();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 product-details">
        <div className="mb-3"><Link to="/explore"> Explore</Link> - {product.name} </div>
        <div className="row">
          <div className="col-md-7">
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              className="card-img-top"
              alt={product.name}
              height="300"
              width={"350px"}
            />
          </div>
          <div className="col-md-5 product-details-info">
            {/* <h1 className="text-center">Product Details 1</h1> */}
            {/* <hr /> */}
            <div class="sec-title ps-0 mb-0">
              <h1 >{product.name}</h1>

            </div>
            {/* <h6>Name : {product.name}</h6> */}
            {/* <h6>Description : {product.description}</h6> */}
            <div class="details-pricing">
              <h4>

                {product?.price?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </h4>
            </div>
            <h6>Category :  <Link

              to={`/category/${product?.category?.slug}`}
            >
              {product?.category?.name}
            </Link> </h6>
            <button class="btn btn-dark ms-1" onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem(
                "cart",
                JSON.stringify([...cart, product])
              );
              toast.success("Item Added to cart");
            }}>ADD TO CART</button>
            <div>
              <ul class="part-detail-usp-list details-list">

                <li className='flex mb-2'><FaCheck className='me-2 shrink-0 col-yel' /> Pay in advance with invoice</li>
                <li className='flex mb-2'><FaCheck className='me-2 shrink-0 col-yel' /> 14 days exchange warranty</li>
                <li className='flex mb-2'><FaCheck className='me-2 shrink-0 col-yel' /> Clients rate us with a 8.8</li>
                <li className='flex mb-2'><FaCheck className='me-2 shrink-0 col-yel' /> Our quality parts are tested</li>

              </ul>
            </div>
          </div>

        </div>

        <div className="row mb-5">
          <div className="col-md-7">
            <div className="main-heading mt-5 mb-3"><h2>Specifications</h2></div>

            <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
          </div>
          <div className="col-md-7">
            {/* <div dangerouslySetInnerHTML={{ __html: product.description.substring(0, 20) }}></div> */}
          </div>

        </div>
        <hr />
      </div>
      <div className="row mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 similar-products mb-5">
        <div className="main-heading mt-5 mb-1"><h2>Similar Products </h2></div>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="row">
          {relatedProducts?.map((p) => (
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
                    {/* <span>{p.category}</span> */}
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
      </div>
    </Layout>
  );
};

export default ProductDetails;
