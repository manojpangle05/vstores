import React, { useState, useEffect } from 'react'
import attachBg from './../Images/truck-img.jpg';
import homeBg1 from './../Images/banner-1.jpeg';
import homeBg2 from './../Images/banner-2.jpeg';
import TruckImg2 from './../Images/truck-img2.jpg';
import TruckImg3 from './../Images/used-trucks.jpg';
import Engine from './../Images/engine.jpg';
import Gear from './../Images/gear.jpg';
import { Link } from 'react-router-dom';
import BreakImg from './../Images/break.webp';
import { Button } from 'react-bootstrap';

import { FaCheck } from "react-icons/fa";
// import Testimonials from '../SubComponents/Testimonials';
import crop1 from './../Images/crop1.png';
import part1 from './../Images/part-1.jpeg';
import part2 from './../Images/part-2.jpeg';
import part3 from './../Images/part-3.jpeg';
import part4 from './../Images/part-4.jpeg';
import part5 from './../Images/part-5.jpeg';
import part6 from './../Images/part-6.jpeg';
import part7 from './../Images/part-7.jpeg';
import part8 from './../Images/part-8.jpeg';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import useCategory from '../hooks/useCategory';
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import HTMLReactParser from 'html-react-parser';

function MainPage() {
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
        <>
            {/* <Link to="/about">About</Link> */}
            <Header />
            <div className='hero' style={{ backgroundImage: `url(${homeBg2})` }}>






                <div className='hero-overlay'></div>
                <div className='banner-content'>
                    <h4>Welcome to V Stores & Services</h4>
                    <h1>Global Automotive<br /> Solutions</h1>
                    <Link className='rounded-lg' to="#contact">Contact Us </Link>
                </div>

            </div>
            <section class="pb-70 pt-20" id="about">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 mb-lg-0 mb-24">
                            <div class="sec-img">
                                <img src={homeBg1} alt="" />
                            </div>
                        </div>
                        <div class="col-lg-6 my-auto">
                            <div class="sec-title">
                                {/* <h2>New and Used Parts for Your Truck</h2> */}
                                <h2>About Us</h2>
                                <p className='mb-3'>If you're looking for quality Spare parts to keep your truck in top condition, you've come to the right place at V STORES. We understand the importance of reliable and durable parts for your truck, whether you're an owner-operator or manage a fleet. Our extensive selection of Spare parts offers everything you need for repairs, upgrades, and maintenance.</p>
                                <ul>
                                    <li className='flex mb-2'><FaCheck className='me-2 shrink-0 col-yel' /> 24 months warranty on all parts</li>
                                    <li className='flex mb-2'><FaCheck className='me-2 shrink-0 col-yel' /> Extremely competetive pricing</li>
                                    <li className='flex mb-2'><FaCheck className='me-2 shrink-0 col-yel' /> Premium brand, highest quality</li>
                                    <li className='flex mb-2'><FaCheck className='me-2 shrink-0 col-yel' /> European truck specialist in Man, Mercedes, Scania & VOLVO since 1972.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <section class="redirects pb-70" id="explore">
                <div class="container">
                    <div className="sec-title text-center mb-5"><h2>Explore Spare Parts</h2>
                    </div>
                    <div class="row">

                        <div class="col-lg-3 mb-4">
                            <div class="redirect-box">

                                <Link to="">
                                    <div class="redirect-img">
                                        <img src={part2} alt="" />
                                    </div>

                                </Link>
                            </div>
                        </div>
                        <div class="col-lg-3 mb-4">
                            <div class="redirect-box">

                                <Link to="">
                                    <div class="redirect-img">
                                        <img src={part3} alt="" />
                                    </div>

                                </Link>
                            </div>
                        </div>
                        <div class="col-lg-3 mb-4">
                            <div class="redirect-box">

                                <Link to="">
                                    <div class="redirect-img">
                                        <img src={part4} alt="" />
                                    </div>

                                </Link>
                            </div>
                        </div>
                        <div class="col-lg-3 mb-4">
                            <div class="redirect-box">

                                <Link to="">
                                    <div class="redirect-img">
                                        <img src={part6} alt="" />
                                    </div>

                                </Link>
                            </div>
                        </div>
                        <div class="col-lg-3 mb-4">
                            <div class="redirect-box">

                                <Link to="">
                                    <div class="redirect-img">
                                        <img src={part5} alt="" />
                                    </div>

                                </Link>
                            </div>
                        </div>

                        <div class="col-lg-3 mb-4">
                            <div class="redirect-box">

                                <Link to="">
                                    <div class="redirect-img">
                                        <img src={part1} alt="" />
                                    </div>

                                </Link>
                            </div>
                        </div>
                        <div class="col-lg-3 mb-4">
                            <div class="redirect-box">

                                <Link to="">
                                    <div class="redirect-img">
                                        <img src={part7} alt="" />
                                    </div>

                                </Link>
                            </div>
                        </div>
                        <div class="col-lg-3 mb-4">
                            <div class="redirect-box">

                                <Link to="">
                                    <div class="redirect-img">
                                        <img src={part8} alt="" />
                                    </div>

                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
            {/* <div className="bg-white pt-16 pb-10">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-center text-3xl font-medium leading-8 text-gray-900">
                        Search for parts by brand
                    </h2>
                    <div className="mx-auto mt-14 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                        <img
                            alt="Transistor"
                            src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
                            width={158}
                            height={48}
                            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        />
                        <img
                            alt="Reform"
                            src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg"
                            width={158}
                            height={48}
                            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        />
                        <img
                            alt="Tuple"
                            src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg"
                            width={158}
                            height={48}
                            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        />
                        <img
                            alt="SavvyCal"
                            src="https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg"
                            width={158}
                            height={48}
                            className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
                        />
                        <img
                            alt="Statamic"
                            src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg"
                            width={158}
                            height={48}
                            className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
                        />
                    </div>
                </div>
            </div>*/}
            <section className="sec-80">
                <div className='container'>

                    <div className="row">
                        <div className="col-lg-3">
                            <div className="category-list ">
                                <div className="cat-heading"><h4>Choose Product Category</h4></div>
                                <ul className="home-cat-list">
                                    {categories?.map((c) => (
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                to={`/category/${c.slug}`}
                                            >
                                                {c.name}
                                            </Link>
                                        </li>
                                    ))}
                                    {/* <li><Link to="">Special Offers</Link></li>
                                    <li><Link to="">Engine</Link></li>
                                    <li><Link to="">Gearbox</Link></li>
                                    <li><Link to="">Cabin and body parts</Link></li>
                                    <li><Link to="">Chasis</Link></li>
                                    <li><Link to="">Brakes</Link></li>
                                    <li><Link to="">Reservior</Link></li>
                                    <li><Link to="">Tyres</Link></li>
                                    <li><Link to="">Axels</Link></li>
                                    <li><Link to="">Damaged Vehicles</Link></li> */}
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-9">

                            <div class="popular-products pt-2">
                                <div className="main-heading"><h2>Popular Products</h2></div>
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
                                                            <h5 >{p.name}</h5>

                                                        </div>
                                                        <div class="product-tags">
                                                            <span>{p?.category}</span>
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
                                                        {/* {HTMLReactParser(p.description.substring(0, 20))} */}
                                                       <div dangerouslySetInnerHTML={{ __html: p.description.substring(0, 20) }}></div>
                                                        {/* {HTMLReactParser(p.description.substring(0, 60))} */}
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
                                                            className="btn btn-info ms-1 w-100"
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

                        </div>
                    </div>
                </div>
            </section>


            <section class=" testimonials  py-20 bg-lt-blue" id="testimonials">
                <div class="sec-title mb-3">
                    <h2 className='text-center mb-5'>What Our Clients Says</h2>

                </div>
                {/* <Testimonials /> */}
                <div className="max-900">
                    <div className="item slide px-2">
                        <div className="test-bx shadow my-4">

                            <div className="client-img text-center">
                                <img src={crop1} alt="" />
                            </div>

                            <div className="client-text  padt-40 mb-4">
                                <p>

                                    We would like to mention our appreciation of spare parts quality supplied by m/s V STORES AND SERVICES, We have been purchasing regular spare parts from their organization, BRAKE PADS of BREMSKERL and other BRAKE Related spares like caliper kits and rotors have been highly satisfactory, They also supply various spares parts for Man, Mercedes, Scania & VOLVO Application which are supplied on time and are reliable for our fleet, We wish them success and a long term business understanding with their company, We would like to also request them to extend their range of products in the future to complete our maintenance requirements.



                                </p>
                            </div>
                            <div className="text-center">


                                <div className="client-area">
                                    <div className="client-name">
                                        <h3>Taj Travels Pvt Ltd</h3>
                                        {/* <h3>
                                        Universal Renewable Integrated Energy Logics (URIEL)

                                    </h3> */}
                                        {/* <p><span className="me-2 org-txt">Customer Service Manager </span></p> */}
                                    </div>


                                </div>

                                <div className="pb-4">

                                    <div className="client-reviews d-flex justify-content-center">
                                        <span className="rating-stars  d-flex">
                                            <i class="bi bi-star-fill"></i>
                                            <i class="bi bi-star-fill"></i>
                                            <i class="bi bi-star-fill"></i>
                                            <i class="bi bi-star-fill"></i>
                                            <i class="bi bi-star-fill"></i>
                                        </span>
                                        <span className="rating-stars text-center ms-2">
                                            (5/5)
                                        </span>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="features pt-70 pb-70">
                <div class="container">
                    <div className="main-heading"><h2>Smart Features</h2></div>
                    <div class="row">
                        <div class="col-lg-3 col-md-6 mb-4">
                            <div class="feature-bx text-center">
                                <div class="feature-icon">
                                    <i class="bi bi-truck"></i>
                                </div>
                                <div class="feature-content text-center">
                                    <h4>Shipment within 24 hours</h4>
                                    <span class="divider"></span>
                                    <p>Together with our reliable transport partners, we assure you a fast delivery!</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 mb-4">
                            <div class="feature-bx">
                                <div class="feature-icon">
                                    <i class="bi bi-award"></i>
                                </div>
                                <div class="feature-content">
                                    <h4>Man, Mercedes, Scania & VOLVO expert</h4>
                                    <span class="divider"></span>
                                    <p>Because of our Man, Mercedes, Scania & VOLVO dealership, we are specialized in answering any question related to these brands.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 mb-4">
                            <div class="feature-bx">
                                <div class="feature-icon">
                                    <i class="bi bi-recycle"></i>
                                </div>
                                <div class="feature-content">
                                    <h4>New and used parts</h4>
                                    <span class="divider"></span>
                                    <p>We can offer you almost all truck parts because of our wide range of new and used truck parts in stock.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 mb-4">
                            <div class="feature-bx">
                                <div class="feature-icon">
                                    <i class="bi bi-clipboard-check"></i>
                                </div>
                                <div class="feature-content">
                                    <h4>Used parts with warranty</h4>
                                    <span class="divider"></span>
                                    <p>We offer a standard 14 day warranty on all of our used parts. Additionally, we offer up to 6 months warranty on selected parts.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="features mb--120 mt-60 benefit-sec pt-70" id="benefit">
                <div class="container ">
                    <div className="sec-title text-center mb-5"><h2>Benefits of V STORES</h2>
                        <p>When you choose our Truck parts, you'll enjoy numerous benefits:</p></div>
                    <div class="row ">
                        <div class="col-lg-3 col-md-6 mb-4">
                            <div class="feature-bx text-center">
                                <div class="Benefit-icon">
                                    <i class="bi bi-bag-check"></i>
                                </div>
                                <div class="feature-content text-center">
                                    <h4>Quality</h4>
                                    <span class="divider"></span>
                                    <p>Our Truck parts are carefully selected and meet the highest industry standards. We offer parts from reputable manufacturers such as Man, Mercedes, Scania & VOLVO, so you can rely on performance and durability.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 mb-4">
                            <div class="feature-bx">
                                <div class="Benefit-icon">
                                    <i class="bi bi-tag"></i>
                                </div>
                                <div class="feature-content">
                                    <h4>Affordability</h4>
                                    <span class="divider"></span>
                                    <p>We understand that budgets are important. That's why we also offer alternative brands with competitive prices without compromising on quality. You get value for your money.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 mb-4">
                            <div class="feature-bx">
                                <div class="Benefit-icon">
                                    <i class="bi bi-card-checklist"></i>
                                </div>
                                <div class="feature-content">
                                    <h4>Extensive selection</h4>
                                    <span class="divider"></span>
                                    <p> Our inventory includes a wide range of Truck parts, from engines and transmissions to brakes, suspension, and more. Whatever your needs, we have it.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 mb-4">
                            <div class="feature-bx">
                                <div class="Benefit-icon">
                                    <i class="bi bi-shield-check"></i>
                                </div>
                                <div class="feature-content">
                                    <h4>Expert advice</h4>
                                    <span class="divider"></span>
                                    <p>Our staff has in-depth knowledge of trucks and their parts. They are ready to advise and assist you in finding the right parts for your specific make and model.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 mb-4">
                            <div class="feature-bx">
                                <div class="Benefit-icon">
                                    <i class="bi bi-truck"></i>
                                </div>
                                <div class="feature-content">
                                    <h4>Fast delivery</h4>
                                    <span class="divider"></span>
                                    <p> We understand that downtime is costly in the transportation industry. That's why we strive for quick shipping, so you can get back on the road quickly.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pt-150 pb-70 order-sec">

                <div class="container">
                    <div className="sec-title text-center mb-5"><h2>Order your Truck parts online now</h2>
                        <p>Don't wait any longer to get your truck in optimal condition. Order the high-quality Truck parts you need today and enjoy the benefits of reliability, affordability, and expert advice. With us, you are assured of quality and service. Contact us for more information or place your order easily online! With our Truck parts, you'll keep your vehicle safe and performing at its best. We are here to support all your truck parts needs.</p></div>
                    <div class="row">
                        <div class="col-lg-6 mb-4">
                            <div class="feature-bx ">
                                <div class="feature-icon mx-0">
                                    <i class="bi bi-truck"></i>
                                </div>
                                <div class="feature-content text-start">
                                    <h4>Shipping of Truck parts</h4>
                                    <span class="divider"></span>
                                    <p>We understand that fast delivery of your Truck parts is essential so that your truck or trailer can get back on the road quickly. Transportation is a crucial part of our comprehensive service offering. We offer various shipping options to deliver your Truck parts to you as quickly as possible worldwide. When shipping your Truck parts, we ensure that they arrive safely and on time at your desired location. Additionally, we can handle all the necessary documents and certificates for the import and export of your Truck parts.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 mb-4">
                            <div class="feature-bx">
                                <div class="feature-icon mx-0">
                                    <i class="bi bi-award"></i>
                                </div>
                                <div class="feature-content text-start">
                                    <h4>Transport within India</h4>
                                    <span class="divider"></span>
                                    <p>We can transport your Truck parts throughout India. Thanks to our extensive network of international carriers, we can deliver your Truck parts at a competitive rate. For smaller shipments, we also offer expedited delivery options through courier services. Transportation costs vary depending on the quantity, dimensions, and weight of your parts, as well as the desired destination. For detailed pricing information, please contact our sales team.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 mb-4">
                            <div class="feature-bx">
                                <div class="feature-icon mx-0">
                                    <i class="bi bi-recycle"></i>
                                </div>
                                <div class="feature-content text-start">
                                    <h4>Worldwide Shipping</h4>
                                    <span class="divider"></span>
                                    <p>If you are purchasing larger parts or a large quantity of Truck parts, it may be interesting to load them into a container and ship them worldwide to the port of your choice. We exclusively work with reliable shipping companies, ensuring available cargo space on the next available vessel. We always offer all-inclusive shipping rates and take care of all the necessary documentation. Shipping rates vary depending on the weight of the shipment or container and the desired port. For detailed pricing information, please contact our sales team.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 mb-4">
                            <div class="feature-bx">
                                <div class="feature-icon mx-0">
                                    <i class="bi bi-clipboard-check"></i>
                                </div>
                                <div class="feature-content text-start">
                                    <h4>Assortment of Truck parts</h4>
                                    <span class="divider"></span>
                                    <p>At V STORES, we have an extensive assortment of Truck parts. Our assortment of Truck parts mainly consists of parts from Man, Mercedes, Scania & VOLVO. In addition to used Truck parts from dismantled trucks, there is a wide range of new, alternative Truck parts available. These aftermarket parts are produced in Europe. The good quality of these sets has been confirmed by many customers over the years and is often a more affordable option.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            <section class="redirects pt-70 pb-70">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-4 mb-lg-0 mb-4">
                            <div class="redirect-box">
                                <div class="main-title text-center  mb-3">
                                    <h3 className='font-bold text-lg'>Transmissions</h3>
                                </div>
                                <Link to="">
                                    <div class="redirect-img">
                                        <img src={Engine} alt="" />
                                    </div>
                                    <div class="link-btn text-center">
                                        <span>Go to Gearbox</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div class="col-lg-4 mb-lg-0 mb-4">
                            <div class="redirect-box">
                                <div class="main-title text-center mb-3">
                                    <h3 className='font-bold text-lg'>Differentials</h3>
                                </div>
                                <Link to="">
                                    <div class="redirect-img">
                                        <img src={Gear} alt="" />
                                    </div>
                                    <div class="link-btn text-center">
                                        <span>Go to Differentials</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div class="col-lg-4 mb-lg-0 mb-4">
                            <div class="redirect-box">
                                <div class="main-title text-center  mb-3">
                                    <h3 className='font-bold text-lg'>Used Truck parts</h3>
                                </div>
                                <Link to="">
                                    <div class="redirect-img">
                                        <img src={TruckImg3} alt="" />
                                    </div>
                                    <div class="link-btn text-center">
                                        <span>Go to Used Truck parts</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>




            <Footer />
        </>
    )
}

export default MainPage