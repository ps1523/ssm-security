import React, { useState } from 'react';

import { Shield, MapPin, Clock, Users, Calendar, CheckCircle, XCircle, Home, Phone, User, CreditCard, QrCode, Menu, X, ChevronLeft, ChevronRight, Trash2, AlertCircle, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const PSMSystem = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [bookingType, setBookingType] = useState('');
  const [selectedGuard, setSelectedGuard] = useState(null);
  const [userDetails, setUserDetails] = useState({
    name: '',
    houseNo: '',
    phone: '',
    email: '',
    address: ''
  });
  const [qrCode, setQrCode] = useState('');
  const [bookings, setBookings] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [users, setUsers] = useState([]);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=1200',
      title: 'Professional Security Services',
      subtitle: 'Trusted Protection for Your Peace of Mind'
    },
    {
      image: 'https://images.unsplash.com/photo-1595429062642-c8c51f9d17e7?w=1200',
      title: '24/7 Trained Security Guards',
      subtitle: 'Experienced Personnel at Your Service'
    },
    {
      image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=1200',
      title: 'Flexible Booking Options',
      subtitle: 'Hourly, Daily, or Monthly Plans'
    }
  ];

  const states = {
    'Tamil Nadu': {
      cities: {
        'Chennai': ['T Nagar', 'Anna Nagar', 'Velachery', 'Adyar'],
        'Coimbatore': ['RS Puram', 'Gandhipuram', 'Saibaba Colony'],
        'Madurai': ['Anna Nagar', 'KK Nagar', 'Villapuram']
      }
    },
    'Karnataka': {
      cities: {
        'Bangalore': ['Koramangala', 'Indiranagar', 'Whitefield', 'JP Nagar'],
        'Mysore': ['Vijayanagar', 'Kuvempunagar', 'Jayalakshmipuram']
      }
    },
    'Maharashtra': {
      cities: {
        'Mumbai': ['Bandra', 'Andheri', 'Powai', 'Thane'],
        'Pune': ['Kothrud', 'Hinjewadi', 'Viman Nagar']
      }
    }
  };

  const guards = [
    { id: 1, name: 'Rajesh Kumar', experience: 5, rating: 4.8, available: true, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300', hourly: 150, daily: 1200, monthly: 25000 },
    { id: 2, name: 'Suresh Babu', experience: 8, rating: 4.9, available: true, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300', hourly: 180, daily: 1400, monthly: 30000 },
    { id: 3, name: 'Vijay Singh', experience: 3, rating: 4.6, available: false, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300', hourly: 120, daily: 1000, monthly: 22000 },
    { id: 4, name: 'Arun Prasad', experience: 6, rating: 4.7, available: true, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300', hourly: 160, daily: 1300, monthly: 28000 },
    { id: 5, name: 'Karthik Menon', experience: 4, rating: 4.5, available: false, image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300', hourly: 140, daily: 1100, monthly: 24000 },
    { id: 6, name: 'Ramesh Iyer', experience: 7, rating: 4.9, available: true, image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=300', hourly: 170, daily: 1350, monthly: 29000 }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const generateQRCode = (bookingId) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=SSM-BOOKING-${bookingId}-${Date.now()}`;
  };

  const handleBooking = () => {
    const newBooking = {
      id: Date.now(),
      guard: selectedGuard,
      user: userDetails,
      location: `${selectedArea}, ${selectedCity}, ${selectedState}`,
      type: bookingType,
      date: new Date().toLocaleDateString(),
      status: 'confirmed'
    };
    setBookings([...bookings, newBooking]);
    const qr = generateQRCode(newBooking.id);
    setQrCode(qr);
    setCurrentPage('qr');
  };

  const handleDeleteClick = (booking) => {
    setBookingToDelete(booking);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setBookings(bookings.filter(b => b.id !== bookingToDelete.id));
    setShowDeleteModal(false);
    setBookingToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setBookingToDelete(null);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(u => u.email === loginData.email && u.password === loginData.password);
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(user);
      setCurrentPage('home');
      alert('Login successful!');
    } else {
      alert('Invalid email or password!');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (users.find(u => u.email === signupData.email)) {
      alert('Email already exists!');
      return;
    }
    const newUser = {
      id: Date.now(),
      fullName: signupData.fullName,
      email: signupData.email,
      phone: signupData.phone,
      password: signupData.password
    };
    setUsers([...users, newUser]);
    alert('Account created successfully! Please login.');
    setCurrentPage('login');
    setSignupData({ fullName: '', email: '', phone: '', password: '', confirmPassword: '' });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentPage('home'    );
  };

  const LoginPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-12 h-12 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Welcome To PSM</h2>
            <p className="text-blue-100">Login to your PSM  Private Security account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="p-8 space-y-6">
            <div>
              <label className="block font-semibold mb-2 text-gray-700 flex items-center">
                <Mail className="w-5 h-5 mr-2 text-blue-600" />
                Email Address
              </label>
              <input
                type="email"
                required
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-all"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2 text-gray-700 flex items-center">
                <Lock className="w-5 h-5 mr-2 text-blue-600" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-all pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Login to Account
            </button>

            <div className="text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setCurrentPage('signup')}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Create Account
                </button>
              </p>
            </div>
          </form>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 text-center">
          <p className="text-sm text-yellow-800 font-semibold mb-2">Demo Account</p>
          <p className="text-xs text-yellow-700">Create a new account to test the system</p>
        </div>
      </div>
    </div>
  );

  const SignupPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-12 h-12 text-purple-600" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Create Account</h2>
            <p className="text-purple-100">Join PSM  Private Security </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="p-8 space-y-5">
            <div>
              <label className="block font-semibold mb-2 text-gray-700 flex items-center">
                <User className="w-5 h-5 mr-2 text-purple-600" />
                Full Name
              </label>
              <input
                type="text"
                required
                value={signupData.fullName}
                onChange={(e) => setSignupData({...signupData, fullName: e.target.value})}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-all"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2 text-gray-700 flex items-center">
                <Mail className="w-5 h-5 mr-2 text-purple-600" />
                Email Address
              </label>
              <input
                type="email"
                required
                value={signupData.email}
                onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-all"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2 text-gray-700 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-purple-600" />
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={signupData.phone}
                onChange={(e) => setSignupData({...signupData, phone: e.target.value})}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-all"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2 text-gray-700 flex items-center">
                <Lock className="w-5 h-5 mr-2 text-purple-600" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={signupData.password}
                  onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-all pr-12"
                  placeholder="Create a password"
                  minLength="6"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-2 text-gray-700 flex items-center">
                <Lock className="w-5 h-5 mr-2 text-purple-600" />
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={signupData.confirmPassword}
                onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-all"
                placeholder="Confirm your password"
                minLength="6"
              />
            </div>

            <div className="flex items-start">
              <input type="checkbox" required className="mt-1 mr-2" />
              <span className="text-sm text-gray-600">
                I agree to the <a href="#" className="text-purple-600 hover:text-purple-700 font-semibold">Terms of Service</a> and{' '}
                <a href="#" className="text-purple-600 hover:text-purple-700 font-semibold">Privacy Policy</a>
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Create Account
            </button>

            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setCurrentPage('login')}
                  className="text-purple-600 hover:text-purple-700 font-semibold"
                >
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>

        {/* Security Features */}
        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          <div className="bg-white rounded-lg p-3 shadow">
            <Shield className="w-6 h-6 mx-auto text-purple-600 mb-1" />
            <p className="text-xs text-gray-600 font-semibold">Secure</p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow">
            <Lock className="w-6 h-6 mx-auto text-purple-600 mb-1" />
            <p className="text-xs text-gray-600 font-semibold">Encrypted</p>
          </div>
          <div className="bg-white rounded-lg p-3 shadow">
            <CheckCircle className="w-6 h-6 mx-auto text-purple-600 mb-1" />
            <p className="text-xs text-gray-600 font-semibold">Verified</p>
          </div>
        </div>
      </div>
    </div>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Slider */}
      <div className="relative h-96 overflow-hidden">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white px-4">
              <h1 className="text-5xl font-bold mb-4 text-center">{slide.title}</h1>
              <p className="text-2xl mb-8">{slide.subtitle}</p>
              <button
                onClick={() => setCurrentPage('booking')}
                className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
              >
                Book Security Now
              </button>
            </div>
          </div>
        ))}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white bg-opacity-50 hover:bg-opacity-75 p-3 rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white bg-opacity-50 hover:bg-opacity-75 p-3 rounded-full">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-shadow">
            <Shield className="w-16 h-16 mx-auto mb-4 text-blue-600" />
            <h3 className="text-2xl font-bold mb-4">Verified Guards</h3>
            <p className="text-gray-600">All our security personnel are thoroughly background-checked and professionally trained</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-shadow">
            <Clock className="w-16 h-16 mx-auto mb-4 text-green-600" />
            <h3 className="text-2xl font-bold mb-4">Flexible Timing</h3>
            <p className="text-gray-600">Book guards by the hour, day, or month based on your specific needs</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-shadow">
            <QrCode className="w-16 h-16 mx-auto mb-4 text-purple-600" />
            <h3 className="text-2xl font-bold mb-4">QR Verification</h3>
            <p className="text-gray-600">Secure check-in system with QR codes for guard verification</p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-white text-center">
            <div>
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-xl">Trained Guards</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">10K+</div>
              <div className="text-xl">Happy Clients</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-xl">Cities Covered</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-xl">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const BookingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Book Your Security Guard</h2>
        
        {/* Location Selection */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <MapPin className="mr-3 text-red-600" />
            Select Location
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block font-semibold mb-2 text-gray-700">State</label>
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedCity('');
                  setSelectedArea('');
                }}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              >
                <option value="">Choose State</option>
                {Object.keys(states).map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-2 text-gray-700">City</label>
              <select
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  setSelectedArea('');
                }}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                disabled={!selectedState}
              >
                <option value="">Choose City</option>
                {selectedState && Object.keys(states[selectedState].cities).map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-2 text-gray-700">Area</label>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                disabled={!selectedCity}
              >
                <option value="">Choose Area</option>
                {selectedCity && states[selectedState].cities[selectedCity].map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Booking Type */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <Calendar className="mr-3 text-green-600" />
            Select Booking Type
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {['hourly', 'daily', 'monthly'].map(type => (
              <button
                key={type}
                onClick={() => setBookingType(type)}
                className={`p-6 rounded-lg border-3 transition-all transform hover:scale-105 ${
                  bookingType === type
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                }`}
              >
                <Clock className="w-12 h-12 mx-auto mb-3" />
                <div className="text-xl font-bold capitalize">{type} Basis</div>
              </button>
            ))}
          </div>
        </div>

        {/* Guards List */}
        {selectedArea && bookingType && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Users className="mr-3 text-purple-600" />
              Available Guards
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guards.map(guard => (
                <div
                  key={guard.id}
                  className={`border-2 rounded-lg p-6 transition-all cursor-pointer ${
                    guard.available
                      ? selectedGuard?.id === guard.id
                        ? 'border-blue-600 bg-blue-50 shadow-lg'
                        : 'border-gray-300 hover:border-blue-400 hover:shadow-md'
                      : 'border-red-300 bg-red-50 opacity-60'
                  }`}
                  onClick={() => guard.available && setSelectedGuard(guard)}
                >
                  <img src={guard.image} alt={guard.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-gray-200" />
                  <div className="text-center">
                    <h4 className="font-bold text-lg mb-2">{guard.name}</h4>
                    <div className="flex items-center justify-center mb-2">
                      {guard.available ? (
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 mr-2" />
                      )}
                      <span className={guard.available ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                        {guard.available ? 'Available' : 'Not Available'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{guard.experience} years experience</p>
                    <p className="text-sm text-gray-600 mb-3">Rating: ⭐ {guard.rating}</p>
                    {guard.available && (
                      <div className="text-lg font-bold text-blue-600">
                        ₹{guard[bookingType]}/{bookingType === 'hourly' ? 'hr' : bookingType === 'daily' ? 'day' : 'month'}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {selectedGuard && (
              <button
                onClick={() => setCurrentPage('details')}
                className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
              >
                Continue to Details
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const DetailsPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Your Details</h2>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-2 text-gray-700 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Full Name
              </label>
              <input
                type="text"
                value={userDetails.name}
                onChange={(e) => setUserDetails({...userDetails, name: e.target.value})}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2 text-gray-700 flex items-center">
                <Home className="w-5 h-5 mr-2 text-blue-600" />
                House/Flat No
              </label>
              <input
                type="text"
                value={userDetails.houseNo}
                onChange={(e) => setUserDetails({...userDetails, houseNo: e.target.value})}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                placeholder="Enter house number"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2 text-gray-700 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-blue-600" />
                Phone Number
              </label>
              <input
                type="tel"
                value={userDetails.phone}
                onChange={(e) => setUserDetails({...userDetails, phone: e.target.value})}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2 text-gray-700">Email</label>
              <input
                type="email"
                value={userDetails.email}
                onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                placeholder="Enter email address"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-semibold mb-2 text-gray-700">Complete Address</label>
              <textarea
                value={userDetails.address}
                onChange={(e) => setUserDetails({...userDetails, address: e.target.value})}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                rows="3"
                placeholder="Enter complete address"
              />
            </div>
          </div>
          <button
            onClick={() => setCurrentPage('payment')}
            className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );

  const PaymentPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Payment</h2>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold mb-4">Booking Summary</h3>
            <div className="space-y-2">
              <p><span className="font-semibold">Guard:</span> {selectedGuard.name}</p>
              <p><span className="font-semibold">Type:</span> {bookingType} basis</p>
              <p><span className="font-semibold">Amount:</span> ₹{selectedGuard[bookingType]}</p>
              <p><span className="font-semibold">Location:</span> {selectedArea}, {selectedCity}, {selectedState}</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block font-semibold mb-2 text-gray-700 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                Card Number
              </label>
              <input
                type="text"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                placeholder="1234 5678 9012 3456"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold mb-2 text-gray-700">Expiry Date</label>
                <input
                  type="text"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2 text-gray-700">CVV</label>
                <input
                  type="text"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="123"
                />
              </div>
            </div>
          </div>
          
          <button
            onClick={handleBooking}
            className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
          >
            Confirm Payment - ₹{selectedGuard[bookingType]}
          </button>
        </div>
      </div>
    </div>
  );

  const QRPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-8 text-lg">Your security guard has been successfully booked</p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <img src={qrCode} alt="QR Code" className="mx-auto mb-4 rounded-lg shadow-md" />
            <p className="text-sm text-gray-600 mb-2">Scan this QR code with Google Lens for guard verification</p>
            <p className="font-semibold text-gray-800">{selectedGuard.name} will scan this upon arrival</p>
          </div>
          
          <div className="text-left bg-blue-50 rounded-lg p-6 mb-6">
            <h3 className="font-bold text-lg mb-3">Booking Details:</h3>
            <div className="space-y-2 text-gray-700">
              <p><span className="font-semibold">Guard:</span> {selectedGuard.name}</p>
              <p><span className="font-semibold">Customer:</span> {userDetails.name}</p>
              <p><span className="font-semibold">Phone:</span> {userDetails.phone}</p>
              <p><span className="font-semibold">Address:</span> {userDetails.address}</p>
              <p><span className="font-semibold">Type:</span> {bookingType} basis</p>
            </div>
          </div>
          
          <button
            onClick={() => setCurrentPage('dashboard')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );

  const DashboardPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-gray-800">Dashboard</h2>
        
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <Users className="w-12 h-12 mb-3" />
            <div className="text-3xl font-bold">{bookings.length}</div>
            <div className="text-blue-100">Total Bookings</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <CheckCircle className="w-12 h-12 mb-3" />
            <div className="text-3xl font-bold">{bookings.filter(b => b.status === 'confirmed').length}</div>
            <div className="text-green-100">Active Guards</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <MapPin className="w-12 h-12 mb-3" />
            <div className="text-3xl font-bold">3</div>
            <div className="text-purple-100">Locations</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
            <Shield className="w-12 h-12 mb-3" />
            <div className="text-3xl font-bold">24/7</div>
            <div className="text-orange-100">Protection</div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Your Bookings</h3>
          {bookings.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Shield className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-xl">No bookings yet</p>
              <button
                onClick={() => setCurrentPage('booking')}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
              >
                Book Your First Guard
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map(booking => (
                <div key={booking.id} className="border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <img src={booking.guard.image} alt={booking.guard.name} className="w-16 h-16 rounded-full object-cover border-2 border-blue-500" />
                      <div>
                        <h4 className="text-xl font-bold text-gray-800">{booking.guard.name}</h4>
                        <p className="text-gray-600">{booking.location}</p>
                        <p className="text-sm text-gray-500">Booking Type: <span className="font-semibold capitalize">{booking.type}</span></p>
                        <p className="text-sm text-gray-500">Date: {booking.date}</p>
                        <p className="text-sm text-gray-500">Customer: {booking.user.name}</p>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end space-y-3">
                      <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {booking.status}
                      </div>
                      <div className="text-2xl font-bold text-blue-600">
                        ₹{booking.guard[booking.type]}
                      </div>
                      <button
                        onClick={() => handleDeleteClick(booking)}
                        className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all transform hover:scale-105"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <button
            onClick={() => setCurrentPage('booking')}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-6 rounded-xl shadow-lg font-semibold text-lg transition-all transform hover:scale-105"
          >
            <Users className="w-8 h-8 mx-auto mb-2" />
            Book New Guard
          </button>
          <button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-6 rounded-xl shadow-lg font-semibold text-lg transition-all transform hover:scale-105">
            <QrCode className="w-8 h-8 mx-auto mb-2" />
            View QR Codes
          </button>
          <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-6 rounded-xl shadow-lg font-semibold text-lg transition-all transform hover:scale-105">
            <Shield className="w-8 h-8 mx-auto mb-2" />
            Security Reports
          </button>
        </div>
      </div>
    </div>
  );

  // Delete Confirmation Modal
  const DeleteModal = () => {
    if (!showDeleteModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 transform transition-all">
          <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Delete Booking?
          </h3>
          
          <p className="text-center text-gray-600 mb-6">
            Are you sure you want to delete the booking for <span className="font-semibold">{bookingToDelete?.guard.name}</span>? This action cannot be undone.
          </p>

          {bookingToDelete && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2 text-sm">
              <p><span className="font-semibold">Guard:</span> {bookingToDelete.guard.name}</p>
              <p><span className="font-semibold">Location:</span> {bookingToDelete.location}</p>
              <p><span className="font-semibold">Type:</span> <span className="capitalize">{bookingToDelete.type}</span></p>
              <p><span className="font-semibold">Amount:</span> ₹{bookingToDelete.guard[bookingToDelete.type]}</p>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              onClick={cancelDelete}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Delete Modal */}
      <DeleteModal />
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xl sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <Shield className="w-10 h-10" />
              <div>
                <div className="text-2xl font-bold">PSM Security</div>
                <div className="text-xs text-blue-200">Private Services Management</div>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <button onClick={() => setCurrentPage('home')} className="hover:text-blue-200 font-semibold transition-colors">Home</button>
              <button onClick={() => setCurrentPage('booking')} className="hover:text-blue-200 font-semibold transition-colors">Book Now</button>
              <button onClick={() => setCurrentPage('dashboard')} className="hover:text-blue-200 font-semibold transition-colors">Dashboard</button>
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <span className="text-blue-100">Welcome, {currentUser?.fullName}</span>
                  <button 
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setCurrentPage('login')}
                  className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden pb-4 space-y-3">
              <button onClick={() => { setCurrentPage('home'); setMenuOpen(false); }} className="block w-full text-left py-2 hover:text-blue-200">Home</button>
              <button onClick={() => { setCurrentPage('booking'); setMenuOpen(false); }} className="block w-full text-left py-2 hover:text-blue-200">Book Now</button>
              <button onClick={() => { setCurrentPage('dashboard'); setMenuOpen(false); }} className="block w-full text-left py-2 hover:text-blue-200">Dashboard</button>
              {isLoggedIn ? (
                <>
                  <p className="text-blue-100 py-2">Welcome, {currentUser?.fullName}</p>
                  <button 
                    onClick={() => { handleLogout(); setMenuOpen(false); }}
                    className="w-full bg-red-500 text-white px-4 py-2 rounded-lg font-semibold"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => { setCurrentPage('login'); setMenuOpen(false); }}
                  className="w-full bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold"
                >
                  Login
                </button>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Page Content */}
      {!isLoggedIn && currentPage === 'login' && <LoginPage />}
      {!isLoggedIn && currentPage === 'signup' && <SignupPage />}
      {isLoggedIn && currentPage === 'home' && <HomePage />}
      {isLoggedIn && currentPage === 'booking' && <BookingPage />}
      {isLoggedIn && currentPage === 'details' && <DetailsPage />}
      {isLoggedIn && currentPage === 'payment' && <PaymentPage />}
      {isLoggedIn && currentPage === 'qr' && <QRPage />}
      {isLoggedIn && currentPage === 'dashboard' && <DashboardPage />}

      {/* Footer - Show only after login */}
      {isLoggedIn && (
        <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="w-8 h-8" />
                <span className="text-xl font-bold">PSM Security</span>
              </div>
              <p className="text-gray-400">Professional security services for your peace of mind. Available 24/7 across multiple cities.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <div className="space-y-2">
                <p className="text-gray-400 hover:text-white cursor-pointer transition-colors">About Us</p>
                <p className="text-gray-400 hover:text-white cursor-pointer transition-colors">Services</p>
                <p className="text-gray-400 hover:text-white cursor-pointer transition-colors">Pricing</p>
                <p className="text-gray-400 hover:text-white cursor-pointer transition-colors">Contact</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Services</h4>
              <div className="space-y-2">
                <p className="text-gray-400">Residential Security</p>
                <p className="text-gray-400">Commercial Security</p>
                <p className="text-gray-400">Event Security</p>
                <p className="text-gray-400">Personal Guards</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center"><Phone className="w-4 h-4 mr-2" /> +91 8903500842</p>
                <p className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> Coimbatore, Tamil Nadu</p>
                <p>Email: prabhashankarkps@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 PSM Private Security Management. All rights reserved.</p>
          </div>
        </div>
      </footer>
      )}
    </div>
  );
};

export default PSMSystem;