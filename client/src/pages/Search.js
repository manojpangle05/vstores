import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";

import { AiOutlineReload } from "react-icons/ai";
import { Link } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  return (
    <Layout title={"Search results"}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">

        <div className="text-center">
          <div className="sec-title mt-5">
            <h1>Search Results</h1>
            <h5>
              {values?.results.length < 1
                ? "No Products Found"
                : `Found ${values?.results.length}`}
            </h5>
          </div>
          <div className="row mt-4 mb-5">
            {values?.results.map((p) => (
              <>
                {/* <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <button class="btn btn-primary ms-1">More Details</button>
                  <button class="btn btn-secondary ms-1">ADD TO CART</button>
                </div>
              </div> */}
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
                          <span>{p.category}</span>
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
              </>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
