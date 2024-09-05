import React from 'react';

function HomePage() {
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white py-12 text-center">
                <h1 className="text-4xl font-bold">Welcome to Our Financial Management Platform!</h1>
                <p className="mt-4 text-lg">Manage your finances with ease and make informed decisions.</p>
                <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-md shadow-md hover:bg-gray-200">Get Started</button>
            </header>

            <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-2">Reliability</h2>
                    <p className="text-gray-700 mb-4">Experience unmatched stability and speed in managing your financial records.</p>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Learn More</button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-2">Security</h2>
                    <p className="text-gray-700 mb-4">Your financial security is our top priority with industry-leading security solutions.</p>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Learn More</button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-2">Innovation</h2>
                    <p className="text-gray-700 mb-4">Stay ahead with our cutting-edge financial tools and features.</p>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Learn More</button>
                </div>
            </div>

            <section className="py-12 bg-gray-200 text-center">
                <h2 className="text-3xl font-bold mb-6">What Our Users Say</h2>
                <blockquote className="text-lg italic text-gray-700 mb-4">
                    <p>"Absolutely transformative - this platform has changed the way we handle our finances!" - User A</p>
                </blockquote>
                <blockquote className="text-lg italic text-gray-700">
                    <p>"Thanks to this service, we've streamlined our financial operations and improved our bottom line." - User B</p>
                </blockquote>
            </section>
        </div>
    );
}

export default HomePage;