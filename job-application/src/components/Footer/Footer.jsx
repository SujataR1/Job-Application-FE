// Footer.js
import React from 'react';
import './Footer.css'; // Ensure your CSS file is correctly imported

const Footer = () => {
    return (
        <footer className="footer bg-gray-900 text-white py-10">
            <div className="container mx-auto px-4">
                {/* Footer Top - Logo and Social Icons */}
                <div className="footer-top flex flex-col md:flex-row items-center md:items-start">
                    <div className="footer-logo md:w-1/4 text-center md:text-left mb-6 md:mb-0">
                        <img src="/path-to-your-logo.png" alt="Job Portal Logo" className="w-32 mx-auto md:mx-0" />
                    </div>
                    <div className="footer-social-icons md:w-1/4 text-center">
                        <h3 className="text-lg font-semibold mb-2" style={{ color: 'white' }}>Connect with us</h3>
                        <div className="flex justify-center space-x-4">
                            {/* Replace '#' with actual social media URLs */}
                            <a href="https://www.facebook.com" className="social-icon" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                            <a href="https://twitter.com" className="social-icon" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                            <a href="https://www.linkedin.com" className="social-icon" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                            <a href="https://www.instagram.com" className="social-icon" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                    <div className="footer-app md:w-1/2 text-center md:text-left">
                        <div className="app-box p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold mb-2" style={{ color: 'white' }}>Apply on the go</h3>

                            <p className="mb-4">Get real-time job updates on our App</p>
                            {/* Replace '#' with actual app download links */}
                            <a href="https://play.google.com" className="app-download-link">
                                <img src="/path-to-google-play-logo.png" alt="Download on Google Play" className="w-32 mx-auto md:mx-0 mb-2" />
                            </a>
                            <a href="https://apps.apple.com" className="app-download-link">
                                <img src="/path-to-app-store-logo.png" alt="Download on the App Store" className="w-32 mx-auto md:mx-0" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom - Links and Legal Information */}
                <div className="footer-bottom mt-10">
                    <div className="flex flex-col md:flex-row md:justify-between">
                        {/* Company Info */}
                        <div className="company-info mb-6 md:mb-0">
                        <h4 className="text-lg font-semibold mb-2" style={{ color: 'white' }}>Company</h4>

                            <ul>
                                <li><a href="/about-us" className="footer-link">About Us</a></li>
                                <li><a href="/careers" className="footer-link">Careers</a></li>
                                <li><a href="/employer-home" className="footer-link">Employer Home</a></li>
                                <li><a href="/sitemap" className="footer-link">Sitemap</a></li>
                                <li><a href="/credits" className="footer-link">Credits</a></li>
                            </ul>
                        </div>

                        {/* Help Center */}
                        <div className="help-center mb-6 md:mb-0">
                            <h4 className="text-lg font-semibold mb-2" style={{ color: 'white' }}>Help Center</h4>
                            <ul>
                                <li><a href="/help-center" className="footer-link">Help Center</a></li>
                                <li><a href="/summons-notices" className="footer-link">Summons/Notices</a></li>
                                <li><a href="/grievances" className="footer-link">Grievances</a></li>
                                <li><a href="/report-issue" className="footer-link">Report Issue</a></li>
                            </ul>
                        </div>

                        {/* Legal Information */}
                        <div className="legal-info mb-6 md:mb-0">
                            <h4 className="text-lg font-semibold mb-2" style={{ color: 'white' }}>Legal Information</h4>
                            <ul>
                                <li><a href="/privacy-policy" className="footer-link">Privacy Policy</a></li>
                                <li><a href="/terms-conditions" className="footer-link">Terms & Conditions</a></li>
                                <li><a href="/fraud-alert" className="footer-link">Fraud Alert</a></li>
                                <li><a href="/trust-safety" className="footer-link">Trust & Safety</a></li>
                            </ul>
                        </div>

                        {/* Businesses */}
                        <div className="businesses">
                            <h4 className="text-lg font-semibold mb-2" style={{ color: 'white' }}>Our Businesses</h4>
                            <ul>
                                <li><a href="/nnacres" className="footer-link">nnacres</a></li>
                                <li><a href="/jeevansathi" className="footer-link">jeevansathi</a></li>
                                <li><a href="/ng" className="footer-link">ng</a></li>
                                <li><a href="/shiksha" className="footer-link">shiksha</a></li>
                                <li><a href="/iimjobs" className="footer-link">iimjobs</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Footer Bottom Text */}
                    <div className="text-center mt-6">
                        <p className="text-sm"> All trademarks are the property of their respective owners. All rights reserved ©2024 Transmogrify Global </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
