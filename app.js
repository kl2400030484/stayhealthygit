const { useState, useEffect } = React;
const { BrowserRouter, Routes, Route, Link, useNavigate, useParams } = window.ReactRouterDOM;

// Sample data
const doctorsData = [
  {
    id: 1,
    name: "Dr. Denis Raj",
    specialty: "Dentist",
    experience: "24 years experience overall",
    rating: 5,
    phone: "4478278192",
    image: "👨‍⚕️"
  },
  {
    id: 2,
    name: "Dr. John Doe",
    specialty: "Cardiology",
    experience: "15 years experience overall",
    rating: 4,
    phone: "1234567890",
    image: "👨‍⚕️"
  },
  {
    id: 3,
    name: "Dr. Jane Smith",
    specialty: "Dermatologist",
    experience: "10 years experience overall",
    rating: 5,
    phone: "0987654321",
    image: "👩‍⚕️"
  },
  {
    id: 4,
    name: "Dr. Sarah Wilson",
    specialty: "Gynecologist/obstetrician",
    experience: "18 years experience overall",
    rating: 5,
    phone: "5551234567",
    image: "👩‍⚕️"
  },
  {
    id: 5,
    name: "Dr. Michael Brown",
    specialty: "General Physician",
    experience: "12 years experience overall",
    rating: 4,
    phone: "5559876543",
    image: "👨‍⚕️"
  },
  {
    id: 6,
    name: "Dr. Emily Davis",
    specialty: "Ear-nose-throat (ent) Specialist",
    experience: "14 years experience overall",
    rating: 5,
    phone: "5556781234",
    image: "👩‍⚕️"
  },
  {
    id: 7,
    name: "Dr. Robert Johnson",
    specialty: "Homeopath",
    experience: "20 years experience overall",
    rating: 4,
    phone: "5554321987",
    image: "👨‍⚕️"
  }
];

const specialties = [
  "All Specialties",
  "Dentist",
  "Gynecologist/obstetrician",
  "General Physician",
  "Dermatologist",
  "Ear-nose-throat (ent) Specialist",
  "Homeopath",
  "Cardiology"
];

// App State Context
let appState = {
  currentUser: null,
  users: [],
  appointments: [],
  reviews: []
};

// Header Component
function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">⚕️</span>
          <span>StayHealthy</span>
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/appointments" className="nav-link">Appointments</Link>
          <Link to="/reviews" className="nav-link">Reviews</Link>
          {appState.currentUser ? (
            <>
              <Link to="/profile" className="nav-link">Profile</Link>
            </>
          ) : (
            <>
              <Link to="/signup" className="nav-link">Sign Up</Link>
              <Link to="/login" className="nav-link">Login</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

// Home Page
function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="main-container">
      <div className="hero-section">
        <h1 className="hero-title">Your Health, Our Responsibility</h1>
        <p className="hero-subtitle">
          Welcome to StayHealthy - your trusted partner in wellness and self-care. 
          We provide comprehensive healthcare services with experienced professionals 
          dedicated to your well-being.
        </p>
        <div className="hero-buttons">
          <button className="btn btn-primary" onClick={() => navigate('/doctors')}>
            Find a Doctor
          </button>
          <button className="btn btn-outline" onClick={() => navigate('/appointments')}>
            My Appointments
          </button>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">Why Choose StayHealthy?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-24)', marginTop: 'var(--space-24)' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: 'var(--space-12)' }}>👨‍⚕️</div>
            <h3 style={{ marginBottom: 'var(--space-8)' }}>Expert Doctors</h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>Qualified and experienced medical professionals</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: 'var(--space-12)' }}>📅</div>
            <h3 style={{ marginBottom: 'var(--space-8)' }}>Easy Booking</h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>Simple and convenient appointment scheduling</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: 'var(--space-12)' }}>⭐</div>
            <h3 style={{ marginBottom: 'var(--space-8)' }}>Quality Care</h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>Patient-centered healthcare services</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sign Up Page
function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: 'Patient',
    name: '',
    phone: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name || formData.name.length < 4) {
      newErrors.name = 'Name must be at least 4 characters';
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Check if email already exists
    const existingUser = appState.users.find(u => u.email === formData.email);
    if (existingUser) {
      setMessage('Email already registered. Please login.');
      return;
    }

    // Add user
    const newUser = { ...formData, id: Date.now() };
    appState.users.push(newUser);
    setMessage('Registration successful! Redirecting to login...');
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      role: 'Patient',
      name: '',
      phone: '',
      email: '',
      password: ''
    });
    setErrors({});
    setMessage('');
  };

  return (
    <div className="main-container">
      <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h2 className="card-title text-center">Sign Up</h2>
        {message && (
          <div className={`message ${message.includes('successful') ? 'message-success' : 'message-error'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Role</label>
            <select
              className="form-control"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option>Patient</option>
              <option>Doctor</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
            {errors.phone && <span className="form-error">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset</button>
          </div>
        </form>

        <div className="auth-link">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
}

// Login Page
function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Find user
    const user = appState.users.find(
      u => u.email === formData.email && u.password === formData.password
    );

    if (user) {
      appState.currentUser = user;
      setMessage('Login successful! Redirecting...');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      setMessage('Invalid email or password');
    }
  };

  const handleReset = () => {
    setFormData({ email: '', password: '' });
    setErrors({});
    setMessage('');
  };

  return (
    <div className="main-container">
      <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h2 className="card-title text-center">Login</h2>
        {message && (
          <div className={`message ${message.includes('successful') ? 'message-success' : 'message-error'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>

          <div className="auth-link" style={{ textAlign: 'left', marginTop: '8px', marginBottom: '16px' }}>
            <a href="#">Forgot Password?</a>
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset</button>
          </div>
        </form>

        <div className="auth-link">
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </div>
      </div>
    </div>
  );
}

// Doctors List Page
function DoctorsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');

  const filteredDoctors = doctorsData.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All Specialties' || 
                            doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="main-container">
      <h1 style={{ marginBottom: 'var(--space-24)' }}>Find a Doctor</h1>

      <div className="search-filter-section">
        <div className="search-filter-grid">
          <div className="form-group" style={{ marginBottom: 0 }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search for doctors, clinics, hospitals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <select
              className="form-control"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              {specialties.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="doctor-grid">
        {filteredDoctors.map(doctor => (
          <div key={doctor.id} className="doctor-card">
            <div className="doctor-image">{doctor.image}</div>
            <h3 className="doctor-name">{doctor.name}</h3>
            <div className="doctor-specialty">{doctor.specialty}</div>
            <div className="doctor-experience">{doctor.experience}</div>
            <div className="doctor-rating">
              <div className="stars">
                {[...Array(doctor.rating)].map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <span>({doctor.rating}/5)</span>
            </div>
            <button 
              className="btn btn-primary" 
              style={{ width: '100%' }}
              onClick={() => navigate(`/book/${doctor.id}`)}
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3>No doctors found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}

// Book Appointment Page
function BookAppointmentPage() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    date: '',
    time: ''
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const doctor = doctorsData.find(d => d.id === parseInt(doctorId));

  if (!doctor) {
    return (
      <div className="main-container">
        <div className="card">
          <h2>Doctor not found</h2>
          <button className="btn btn-primary" onClick={() => navigate('/doctors')}>
            Back to Doctors
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.patientName || formData.patientName.length < 4) {
      newErrors.patientName = 'Name must be at least 4 characters';
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    }
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    if (!formData.time) {
      newErrors.time = 'Time is required';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!appState.currentUser) {
      setMessage('Please login to book an appointment');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const appointment = {
      id: Date.now(),
      doctor: doctor.name,
      doctorId: doctor.id,
      specialty: doctor.specialty,
      patient: formData.patientName,
      phone: formData.phone,
      date: formData.date,
      time: formData.time,
      status: 'confirmed',
      userId: appState.currentUser.id
    };

    appState.appointments.push(appointment);
    setMessage('Appointment booked successfully!');
    setTimeout(() => {
      navigate('/appointments');
    }, 1500);
  };

  return (
    <div className="main-container">
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 className="card-title">Book Appointment</h2>
        
        <div style={{ 
          backgroundColor: 'var(--color-bg-1)', 
          padding: 'var(--space-16)', 
          borderRadius: 'var(--radius-base)',
          marginBottom: 'var(--space-24)'
        }}>
          <h3 style={{ marginBottom: 'var(--space-8)' }}>{doctor.name}</h3>
          <div style={{ color: 'var(--color-text-secondary)' }}>{doctor.specialty}</div>
          <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
            {doctor.experience}
          </div>
        </div>

        {message && (
          <div className={`message ${message.includes('successfully') ? 'message-success' : 'message-error'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Patient Name</label>
            <input
              type="text"
              className="form-control"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              placeholder="Enter patient name"
            />
            {errors.patientName && <span className="form-error">{errors.patientName}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
            {errors.phone && <span className="form-error">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
            {errors.date && <span className="form-error">{errors.date}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Time</label>
            <select
              className="form-control"
              name="time"
              value={formData.time}
              onChange={handleChange}
            >
              <option value="">Select time</option>
              <option value="9:00 AM">9:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="2:00 PM">2:00 PM</option>
              <option value="3:00 PM">3:00 PM</option>
              <option value="4:00 PM">4:00 PM</option>
              <option value="5:00 PM">5:00 PM</option>
            </select>
            {errors.time && <span className="form-error">{errors.time}</span>}
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn btn-primary">Book Now</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/doctors')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Appointments Page
function AppointmentsPage() {
  const [localAppointments, setLocalAppointments] = useState([...appState.appointments]);
  const [message, setMessage] = useState('');

  const handleCancelAppointment = (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      appState.appointments = appState.appointments.filter(apt => apt.id !== appointmentId);
      setLocalAppointments([...appState.appointments]);
      setMessage('Appointment cancelled successfully');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const userAppointments = appState.currentUser
    ? localAppointments.filter(apt => apt.userId === appState.currentUser.id)
    : localAppointments;

  return (
    <div className="main-container">
      <h1 style={{ marginBottom: 'var(--space-24)' }}>My Appointments</h1>

      {message && (
        <div className="message message-success">{message}</div>
      )}

      {!appState.currentUser && (
        <div className="message message-error">
          Please <Link to="/login">login</Link> to view your appointments
        </div>
      )}

      {userAppointments.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📅</div>
          <h3>No appointments found</h3>
          <p>Book your first appointment with our doctors</p>
          <Link to="/doctors" className="btn btn-primary" style={{ marginTop: 'var(--space-16)' }}>
            Find a Doctor
          </Link>
        </div>
      ) : (
        <div>
          {userAppointments.map(appointment => (
            <div key={appointment.id} className="appointment-card">
              <div className="appointment-header">
                <div>
                  <h3 style={{ marginBottom: 'var(--space-8)' }}>{appointment.doctor}</h3>
                  <div style={{ color: 'var(--healthcare-primary)', fontWeight: 'var(--font-weight-medium)' }}>
                    {appointment.specialty}
                  </div>
                </div>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleCancelAppointment(appointment.id)}
                >
                  Cancel
                </button>
              </div>
              <div className="appointment-details">
                <div className="appointment-detail-item">
                  <div className="detail-label">Patient Name</div>
                  <div className="detail-value">{appointment.patient}</div>
                </div>
                <div className="appointment-detail-item">
                  <div className="detail-label">Phone</div>
                  <div className="detail-value">{appointment.phone}</div>
                </div>
                <div className="appointment-detail-item">
                  <div className="detail-label">Date</div>
                  <div className="detail-value">{appointment.date}</div>
                </div>
                <div className="appointment-detail-item">
                  <div className="detail-label">Time</div>
                  <div className="detail-value">{appointment.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Reviews Page
function ReviewsPage() {
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [reviewForm, setReviewForm] = useState({
    name: '',
    reviewText: '',
    rating: 0
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [localReviews, setLocalReviews] = useState([...appState.reviews]);

  const handleDoctorSelect = (doctorId) => {
    setSelectedDoctor(doctorId);
    setReviewForm({ name: '', reviewText: '', rating: 0 });
    setErrors({});
    setMessage('');
  };

  const handleChange = (e) => {
    setReviewForm({ ...reviewForm, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleRatingClick = (rating) => {
    setReviewForm({ ...reviewForm, rating });
    if (errors.rating) {
      setErrors({ ...errors, rating: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!reviewForm.name) {
      newErrors.name = 'Name is required';
    }
    if (!reviewForm.reviewText) {
      newErrors.reviewText = 'Review text is required';
    }
    if (reviewForm.rating === 0) {
      newErrors.rating = 'Please select a rating';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!appState.currentUser) {
      setMessage('Please login to submit a review');
      return;
    }

    if (!selectedDoctor) {
      setMessage('Please select a doctor to review');
      return;
    }

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const doctor = doctorsData.find(d => d.id === parseInt(selectedDoctor));
    const review = {
      id: Date.now(),
      doctorId: parseInt(selectedDoctor),
      doctorName: doctor.name,
      reviewerName: reviewForm.name,
      reviewText: reviewForm.reviewText,
      rating: reviewForm.rating,
      date: new Date().toLocaleDateString()
    };

    appState.reviews.push(review);
    setLocalReviews([...appState.reviews]);
    setMessage('Review submitted successfully!');
    setReviewForm({ name: '', reviewText: '', rating: 0 });
    setSelectedDoctor('');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="main-container">
      <h1 style={{ marginBottom: 'var(--space-24)' }}>Reviews &amp; Feedback</h1>

      {message && (
        <div className={`message ${message.includes('successfully') ? 'message-success' : 'message-error'}`}>
          {message}
        </div>
      )}

      <div className="card" style={{ marginBottom: 'var(--space-32)' }}>
        <h2 className="card-title">Submit a Review</h2>
        
        <div className="form-group">
          <label className="form-label">Select Doctor</label>
          <div className="doctor-grid">
            {doctorsData.map(doctor => (
              <div 
                key={doctor.id} 
                className="doctor-card"
                style={{
                  cursor: 'pointer',
                  border: selectedDoctor === doctor.id.toString() ? '2px solid var(--healthcare-primary)' : undefined
                }}
                onClick={() => handleDoctorSelect(doctor.id.toString())}
              >
                <div className="doctor-image">{doctor.image}</div>
                <h3 className="doctor-name">{doctor.name}</h3>
                <div className="doctor-specialty">{doctor.specialty}</div>
                <div className="doctor-experience">{doctor.experience}</div>
              </div>
            ))}
          </div>
        </div>

        {selectedDoctor && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={reviewForm.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Your Review</label>
              <textarea
                className="form-control"
                name="reviewText"
                value={reviewForm.reviewText}
                onChange={handleChange}
                placeholder="Share your experience..."
                rows="4"
              />
              {errors.reviewText && <span className="form-error">{errors.reviewText}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Rating</label>
              <div className="rating-input">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    className={`star-btn ${reviewForm.rating >= star ? 'active' : ''}`}
                    onClick={() => handleRatingClick(star)}
                  >
                    ⭐
                  </button>
                ))}
              </div>
              {errors.rating && <span className="form-error">{errors.rating}</span>}
            </div>

            <button type="submit" className="btn btn-primary">Submit Review</button>
          </form>
        )}
      </div>

      <div>
        <h2 style={{ marginBottom: 'var(--space-24)' }}>Recent Reviews</h2>
        {localReviews.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">⭐</div>
            <h3>No reviews yet</h3>
            <p>Be the first to review our doctors</p>
          </div>
        ) : (
          <div>
            {localReviews.map(review => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <div>
                    <h3 style={{ marginBottom: 'var(--space-6)' }}>{review.doctorName}</h3>
                    <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                      Reviewed by {review.reviewerName} on {review.date}
                    </div>
                  </div>
                  <div className="stars">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} style={{ fontSize: 'var(--font-size-xl)' }}>⭐</span>
                    ))}
                  </div>
                </div>
                <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-12)' }}>
                  {review.reviewText}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Profile Page
function ProfilePage() {
  const navigate = useNavigate();

  if (!appState.currentUser) {
    return (
      <div className="main-container">
        <div className="card text-center">
          <h2>Please Login</h2>
          <p style={{ marginTop: 'var(--space-16)', color: 'var(--color-text-secondary)' }}>
            You need to be logged in to view your profile
          </p>
          <button 
            className="btn btn-primary" 
            style={{ marginTop: 'var(--space-16)' }}
            onClick={() => navigate('/login')}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      appState.currentUser = null;
      navigate('/');
    }
  };

  return (
    <div className="main-container">
      <div className="card">
        <div className="profile-section">
          <div className="profile-avatar">
            {appState.currentUser.name.charAt(0).toUpperCase()}
          </div>
          <h2 className="profile-name">Welcome, {appState.currentUser.name}!</h2>
          <div className="profile-email">{appState.currentUser.email}</div>
          <div style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-8)' }}>
            Role: {appState.currentUser.role}
          </div>
          <div style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-24)' }}>
            Phone: {appState.currentUser.phone}
          </div>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">Account Statistics</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-24)', marginTop: 'var(--space-24)' }}>
          <div style={{ textAlign: 'center', padding: 'var(--space-24)', backgroundColor: 'var(--color-bg-1)', borderRadius: 'var(--radius-base)' }}>
            <div style={{ fontSize: '32px', fontWeight: 'var(--font-weight-bold)', color: 'var(--healthcare-primary)' }}>
              {appState.appointments.filter(apt => apt.userId === appState.currentUser.id).length}
            </div>
            <div style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-8)' }}>Total Appointments</div>
          </div>
          <div style={{ textAlign: 'center', padding: 'var(--space-24)', backgroundColor: 'var(--color-bg-3)', borderRadius: 'var(--radius-base)' }}>
            <div style={{ fontSize: '32px', fontWeight: 'var(--font-weight-bold)', color: 'var(--healthcare-success)' }}>
              {appState.reviews.length}
            </div>
            <div style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-8)' }}>Reviews Submitted</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/book/:doctorId" element={<BookAppointmentPage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);