// pages/instructors.js
import instructors from '@/app/data/instructors';
import Head from 'next/head';

const Instructors = () => {
    return (
        <div className="instructors-container">
            <Head>
                <title>Our Instructors</title>
            </Head>
            <h1 className="instructors-title">Our Instructors</h1>
            <div className="instructors-grid">
                {instructors.map((instructor, index) => (
                    <div key={index} className="instructor-card">
                        <h2 className="instructor-name">{instructor.name}</h2>
                        <p className="instructor-subject">{instructor.subject}</p>
                        <p className="instructor-description">{instructor.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Instructors;
