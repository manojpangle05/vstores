import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import { Link } from 'react-router-dom';
import BreakImg from './../Images/break.webp';
import { Button } from 'react-bootstrap';
import "../styles/Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"ALl Products - Best offers "}>
      {/* banner image */}
      {/* <img
        src="/images/banner.png"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      /> */}
      {/* banner image */}
      <div className="container mt-3">

        <div className="main-heading text-center mt-5"><h2>All Products</h2></div>
        <div className="row">
          <div className="col-md-3 filters">
            <div className="category-list ">
              <div class="p-3 w-full h-auto">
                <h4 className="text-center mt-3">Filter By Category</h4>
                <div className="d-flex flex-column">
                  {categories?.map((c) => (
                    <Checkbox
                      key={c._id}
                      onChange={(e) => handleFilter(e.target.checked, c._id)}
                    >
                      {c.name}
                    </Checkbox>
                  ))}
                </div>
                {/* price filter */}
                <h4 className="text-center mt-4">Filter By Price</h4>
                <div className="d-flex flex-column">
                  <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                    {Prices?.map((p) => (
                      <div key={p._id}>
                        <Radio value={p.array}>{p.name}</Radio>
                      </div>
                    ))}
                  </Radio.Group>
                </div>
                <div className="d-flex flex-column">
                  <button
                    className="btn btn-danger"
                    onClick={() => window.location.reload()}
                  >
                    RESET FILTERS
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9 ">
            <div class="popular-products py-6">

              <div class="row">
                {products?.map((p) => (
                  <div class="col-lg-4 col-md-6 mb-4" key={p._id}>

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
                ))}


              </div>

            </div>
            <div className="m-2 p-3">
              {products && products.length < total && (
                <button
                  className="btn loadmore"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? (
                    "Loading ..."
                  ) : (
                    <>
                      {" "}
                      Loadmore <AiOutlineReload />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
