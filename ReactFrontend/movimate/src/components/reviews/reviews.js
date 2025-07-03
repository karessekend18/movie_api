import React, { useState, useEffect, useRef } from 'react';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from '../reviewForm/reviewForm';
import './reviews.css';

const Reviews = ({getMovieData, movie, reviews, setReviews}) => {
    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [editText, setEditText] = useState("");
    const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');

    // Load reviews from localStorage for this movie
    useEffect(() => {
        getMovieData(movieId);
        const allReviews = JSON.parse(localStorage.getItem('allReviews') || '[]');
        setReviews(allReviews.filter(r => r.movieId === movieId));
    },[movieId]);

    // Save reviews to localStorage when reviews change
    useEffect(() => {
        const allReviews = JSON.parse(localStorage.getItem('allReviews') || '[]');
        const filtered = allReviews.filter(r => r.movieId !== movieId);
        localStorage.setItem('allReviews', JSON.stringify([...filtered, ...reviews]));
    }, [reviews, movieId]);

    const addReview = (e) => {
        e.preventDefault();
        const rev = revText.current;
        if (!user) return;
        const newReview = {
            movieId,
            userEmail: user.email,
            userName: user.name,
            body: rev.value,
            timestamp: Date.now(),
        };
        // Remove old review by this user for this movie
        const filtered = reviews.filter(r => r.userEmail !== user.email);
        setReviews([...filtered, newReview]);
        rev.value = '';
    };

    const startEdit = (review) => {
        setEditingReviewId(review.userEmail);
        setEditText(review.body);
    };

    const saveEdit = (review) => {
        setReviews(reviews.map(r =>
            r.userEmail === review.userEmail ? { ...r, body: editText, timestamp: Date.now() } : r
        ));
        setEditingReviewId(null);
        setEditText("");
    };

    const cancelEdit = () => {
        setEditingReviewId(null);
        setEditText("");
    };

    const deleteReview = (review) => {
        setReviews(reviews.filter(r => r.userEmail !== review.userEmail));
    };

    // Always use a local safeReviews array for mapping
    const safeReviews = Array.isArray(reviews) ? reviews : [];

    // Fix: Only call setReviews([]) in a useEffect, not during render
    useEffect(() => {
        if (!Array.isArray(reviews)) {
            setReviews([]);
        }
    }, [reviews, setReviews]);

    return (
        <Container>
            <Row>
                <Col>
                <h3>Reviews</h3>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col xs={12} md={4} className="reviews-form-col">
                    <img src={movie?.poster} alt="" className="reviews-movie-poster" style={{width: '100%', maxWidth: 220, borderRadius: 8, marginBottom: 16}}/>
                </Col>
                <Col xs={12} md={8} className="reviews-list-col">
                {
                <>
                <Row>
                    <Col>
                    <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a review"></ReviewForm></Col></Row>
                    <Row>
                        <Col>
                            <hr />
                        </Col>
                    </Row>
                </>
                }
                {
                    safeReviews.map((r) => {
                        const isUserReview = user && r.userEmail === user.email;
                        return (
                            <React.Fragment key={r.userEmail}>
                            <Row>
                                <Col>
                                    <b>{r.userName}</b>
                                    <br/>
                                    {editingReviewId === r.userEmail ? (
                                        <>
                                            <textarea value={editText} onChange={e => setEditText(e.target.value)} className="reviews-edit-textarea" style={{width:'100%'}} />
                                            <button onClick={() => saveEdit(r)} className="reviews-btn" style={{marginRight:8}}>Save</button>
                                            <button onClick={cancelEdit} className="reviews-btn">Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            {r.body}
                                            {isUserReview && (
                                                <>
                                                    <button onClick={() => startEdit(r)} className="reviews-btn" style={{marginLeft:8}}>Edit</button>
                                                    <button onClick={() => deleteReview(r)} className="reviews-btn" style={{marginLeft:8}}>Delete</button>
                                                </>
                                            )}
                                        </>
                                    )}
                                </Col></Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>
                            </React.Fragment>
                        )
                    })
                }

                </Col>
            </Row>
            <Row>
                <Col>
                <hr /></Col>
            </Row>

        </Container>
    )
};

export default Reviews;
