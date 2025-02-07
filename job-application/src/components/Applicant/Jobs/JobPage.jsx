import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const JobPage = () => {
    const { applicationId } = useParams(); // ✅ Get applicationId dynamically
    const [timeline, setTimeline] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTimeline = async () => {
            if (!applicationId) return; // ✅ Prevent API call if ID is missing
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:7000/application/timeline/by-application`,
                    { params: { applicationId } }
                );
                setTimeline(response.data.timeline || []);
            } catch (error) {
                setError("Failed to load application timeline");
            }
            setLoading(false);
        };

        fetchTimeline();
    }, [applicationId]); // ✅ Runs when applicationId changes

    return (
        <div className="job-page">
            <header className="header">
                <h1>Start applying to the latest job vacancies</h1>
            </header>

            <section className="timeline-section">
                <h2>Application Timeline</h2>
                {loading ? (
                    <p>Loading timeline...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : timeline.length === 0 ? (
                    <p>No timeline events available.</p>
                ) : (
                    <ul>
                        {timeline.map((event, index) => (
                            <li key={index}>{event}</li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
};

export default JobPage;
