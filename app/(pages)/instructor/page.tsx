import React from 'react';
import styles from './Home.module.css';

export default function Instructor() {
    return (
        <div className={styles.container}>
            <div className={styles.mainContent}>
                <div className={styles.hero}>
                    <h1>Empower Your <span className={styles.route}>Teaching</span></h1>
                    <p>Join our network of expert instructors and share your knowledge with the world.</p>
                    <p>What you can expect as a CeRRoute Instructor:</p>
                    <ul className={styles.bulletPoints}>
                        <li>Access to a vast audience of learners</li>
                        <li>Tools to create engaging content</li>
                        <li>Comprehensive analytics</li>
                        <li>Dedicated support team</li>
                    </ul>
                </div>

                <form className={styles.form}>
                    <div className={styles.formRow}>
                        <input type="text" placeholder="First Name" className={styles.input} />
                        <input type="text" placeholder="Last Name" className={styles.input} />
                    </div>
                    <input type="email" placeholder="Work Email" className={styles.input} />
                    <input type="tel" placeholder="Phone Number" className={styles.input} />
                    <select className={styles.select}>
                        <option>Area of Expertise</option>
                    </select>
                    <input type="text" placeholder="Company/Organization Name" className={styles.input} />
                    <div className={styles.formRow}>
                        <select className={styles.select}>
                            <option>Years of Experience</option>
                        </select>
                        <select className={styles.select}>
                            <option>Preferred Teaching Mode</option>
                        </select>
                    </div>
                    <input type="text" placeholder="Job Title" className={styles.input} />
                    <textarea placeholder="Tell us about your teaching experience and goals (Optional)" className={styles.textarea}></textarea>
                    <button type="submit" className={styles.submitButton}>Submit</button>
                </form>
            </div>
        </div>
    );
}
