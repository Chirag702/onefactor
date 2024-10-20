import React, { useState } from 'react';
import NavBar from '../../../components/NavBar';
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// Helper function to extract 'jobseekr' token from cookie
const extractToken = (cookie) => {
    console.error(cookie);
    if (!cookie) return '';

    const parts = cookie.split(';');
    let jobseekrCookiePart;

    try {
        jobseekrCookiePart = parts.find((part) => part.trim().startsWith('jobseekr='));
    } catch (e) {
        jobseekrCookiePart = null;
    }

    if (!jobseekrCookiePart) return '';

    const jobseekrCookieValue = jobseekrCookiePart.trim().substring('jobseekr='.length);
    return jobseekrCookieValue;
};

function RSignup() {
    const [formData, setFormData] = useState({
        companyName: '',
        companyRole: '',
        phone: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Handle input changes
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('https://api2.onefactor.in/api/auth/signup', {
                username: formData.email,
                email: formData.email,
                password: formData.password,
                companyName: formData.companyName,
                companyRole: formData.companyRole,
                phone: formData.phone,
            });

            if (response.status === 200) {
                const token = response.data.token;
                var realToken = extractToken(token)
                localStorage.setItem('token', realToken);
                navigate('/home'); // Navigate to email verification page
            } else {
                setError('Failed to create account.');
            }
        } catch (err) {
            setError(`Error: ${err.response?.data?.message || err.message}`);
        }

        setIsLoading(false);
    };

    return (
        <>
            <NavBar />
            <Container id="signup" className="col-lg-5 mt-5 p-3">
                <h1>Ready to refer or get referred? Join now!</h1>
                <p>
                    If you are looking for a job,{' '}
                    <span>
                        <a href="../assets/signup.html" className="link_tag">click here</a>
                    </span>
                </p>
                <Container className="">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-1" controlId="companyName">
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="e.g. Amazon or CareerZen consulting"
                                value={formData.companyName}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-1" controlId="companyRole">
                            <Form.Label>Your Role</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="e.g. Talent Acquisition Specialist"
                                value={formData.companyRole}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-1" controlId="phone">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="81234 56789"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-1" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Your company email address"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-1" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Set a password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-1 d-flex align-items-center" controlId="agree">
                            <Form.Check
                                type="checkbox"
                                label="I agree to the Terms of Service and Privacy Policy."
                                required
                                style={{ marginRight: '10px' }}
                            />
                        </Form.Group>
                        <Button type="submit" className="btn btn-success mb-1" disabled={isLoading}>
                            {isLoading ? 'Signing up...' : 'Get Started »'}
                        </Button>
                        {error && <p className="text-danger">{error}</p>}
                    </Form>
                    <p>
                        Already have an account? <Link to="/r/signin" className="link_tag">Log in here</Link>
                    </p>
                </Container>
            </Container>
        </>
    );
}

export default RSignup;
