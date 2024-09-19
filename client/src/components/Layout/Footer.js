import React from 'react'
import { Link } from 'react-router-dom';
import logo from './../../Images/vs-logo.webp';
import { FaFacebookF, FaReddit, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <> <section class="newsletter pt-20 pb-20" id="contact">
            <div className='max-w-xl mx-auto text-center'>
                <div class="newsletter-title sec-title">

                    <h2 className="text-white">Used parts alert</h2>
                    <p className='text-white mb-3'>We like to inform you about our stock and special offers!</p>
                </div>
                <div class="input-bx mb-3">
                    <form action="">
                        <div className='flex'>
                            <input id="price" name="price" type="text" placeholder="Your Email Address"
                                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 me-2 rounded-lg text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <button className='subscribe-btn rounded-lg'>Subscribe</button>
                        </div>
                    </form>
                </div>
                <div class="newsletter-user-block create-account-block">
                    <label class="create-account-checkbox-container text-white text-sm">
                        <input type="hidden" name="termsCondition" value="0" /><input type="checkbox" name="termsCondition"
                            id="termsCondition" value="0" /> <span class="termsConditionLabel">
                            I have read and agree with <a href="/general-terms-and-conditions" target="_blank">General terms and
                                conditions</a> and with the <a href="/privacy-disclaimer" target="_blank">privacy policy</a>
                        </span>
                        <span class="check-mark-box"></span>
                    </label>
                </div>
            </div>
        </section>
            <footer>
                {/* <div className="container-fluid">
        <div className="border-top"></div>
    </div> */}
                <div className="container py-20  ">

                    <div className="row">
                    <div className="col-md-3 col-6">
                            <div className="footer-head">
                                <h3 className='text-xl mb-3 font-medium'>Contact Us</h3>
                            </div>
                            <div className="footer-links">
                                <ul>
                                    <li className='mb-2'>Tel: <a target='_blank' href="tel:+919702666664">+91 9702666664</a></li>
                                    <li className='mb-2'>Email: <a target='_blank' href="mailto:schumi.india@mail.com">schumi.india@mail.com</a></li>

                                </ul>
                            </div>
                        </div>
                        <div className="col-md-3 col-6">
                            <div className="footer-head">
                                <h3 className='text-xl mb-3 font-medium'>Office Address</h3>
                            </div>
                            <div className="footer-links">
                                <ul>
                                    <li><a target='_blank' href="https://maps.app.goo.gl/d2r8BqcEPnvhzrYX7?g_st=iw">SUMER SINGH BAJAJ<br/>
                                        Room 252 , 9th floor , Saadetdere, Özyurtlar N5 Suites, Turgut Özal Mahallesi, 108. Sk No:2, 34513 Esenyurt/İstanbul, Türkiye</a></li>

                                </ul>
                            </div>
                        </div>
                        <div className="col-md-3 col-6">
                            <div className="footer-head">
                                <h3 className='text-xl mb-3 font-medium'>Office Address</h3>
                            </div>
                            <div className="footer-links">
                                <ul>
                                    <li><a href="">MANPREET SINGH BAJAJ<br/>
                                       Shop No.3, Bella Apartments, Plot no 122, 5th Road, Khar West, Mumbai 400052, Maharashtra, India</a></li>

                                </ul>
                            </div>
                        </div>
                        <div className="col-md-3 col-6">
                            <div className="footer-head">
                                <h3 className='text-xl mb-3 font-medium'>Warehouse Address</h3>
                            </div>
                            <div className="footer-links">
                                <ul>
                                    <li><a href="">MANPREET SINGH BAJAJ<br/>
                                        No.4, Survey no 36/1B Dhamani, Beside Tata Steel Company, Khalapur - 410202, Maharashtra, India</a></li>

                                </ul>
                            </div>
                        </div>
                        {/* <div className="col-md-3 col-6">
                                    <div className="footer-head">
                                        <h3 className='text-xl mb-3 font-medium'>Brands</h3>
                                    </div>
                                    <div className="footer-links">
                                        <ul>
                                            <li><a href="/blog">Volvo</a></li>
                                            <li><a href="/api">DAF</a></li>
                                            <li><a href="/apps-and-extras">Renault</a></li>
                                            <li><a href="/case-study">Mercedes</a></li>
                                            <li><a href="/case-study">MAN</a></li>
                                            <li><a href="/case-study">Iveco</a></li>
                                            <li><a href="/case-study">Scania</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-3 col-6">
                                    <div className="footer-head">
                                        <h3 className='text-xl mb-3 font-medium'>Category</h3>
                                    </div>
                                    <div className="footer-links">
                                        <ul>

                                            <li><a href="/about">Engine</a></li>
                                            <li><a href="/customers">Fuel Tank</a></li>
                                            <li><a href="/community">Gearbox</a></li>
                                            <li><a href="/request-a-feature">Differentials</a></li>
                                            <li><a href="">Axles</a></li>
                                            <li><a href="/community">Cabin</a></li>
                                            <li><a href="/request-a-feature">fifth wheel</a></li>
                                            <li><a href="">Compressor</a></li>

                                            <li><a href="/community">Spoilers</a></li>
                                            <li><a href="/request-a-feature">Tyres and rims</a></li>
                                            <li><a href="">Damaged vehicles</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-3 col-6">
                                    <div className="footer-head">
                                        <h3 className='text-xl mb-3 font-medium'>Support</h3>
                                    </div>
                                    <div className="footer-links">
                                        <ul>

                                            <li><a href="/help-center">Help Center</a></li>
                                            <li><a href="/webinars">Webinars</a></li>
                                            <li><a href="/tutorials">Tutorials</a></li>
                                            <li><a href="/tweet-us">Tweet @ Us</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-3 col-6">
                                    <div className="footer-head">
                                        <h3 className='text-xl mb-3 font-medium'>Support</h3>
                                    </div>
                                    <div className="footer-links">
                                        <ul>

                                            <li><a href="/help-center">Help Center</a></li>
                                            <li><a href="/webinars">Webinars</a></li>
                                            <li><a href="/tutorials">Tutorials</a></li>
                                            <li><a href="/tweet-us">Tweet @ Us</a></li>
                                        </ul>
                                    </div>
                                </div> */}
                    </div>

                </div>
                <div className="container-fluid">
                    <div className="border-top"></div>
                </div>
                <div className="container foot-bottom">
                    <div className="d-flex flex-lg-row h-16 flex-column align-items-center justify-content-lg-between">
                        <div className="copyright text-lg-start text-center mb-lg-0 mb-4">
                            <p className='text-sm'>Copyright Vikings Group © 2024 | <Link to="">Privacy</Link> | <Link to="">Terms</Link> | <Link
                                to="">Security</Link> </p>
                        </div>
                        {/* <div className="footer-social">
                            <span><a href=""><FaFacebookF /></a></span>
                            <span><a href=""><FaReddit /></a></span>
                            <span><a href=""><FaTwitter /></a></span>
                        </div> */}
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer