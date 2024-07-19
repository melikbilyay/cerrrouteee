// pages/vision-mission.tsx
'use client'

const VisionMissionPage: React.FC = () => {
    return (
        <div className="bg-gray-100 h-1/4 py-12">
            <div className="container mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-8 md:p-12 lg:px-16 lg:py-24 text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-8">Our Vision and Mission</h1>

                    <div className="mb-12">
                        <h2 className="text-3xl font-semibold text-gray-700 mb-4">Our Vision</h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Our vision is to be a globally recognized and trusted leader in online education, providing innovative solutions that enrich the learning experience for students worldwide. We aim to leverage the latest technological advancements to create a sustainable and impactful educational ecosystem that empowers individuals to achieve their fullest potential.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-3xl font-semibold text-gray-700 mb-4">Our Mission</h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Our mission is to deliver high-quality educational content and services that meet the diverse needs of our learners. We strive to foster a culture of continuous improvement and innovation, ensuring that our students receive the best possible learning experience. By supporting the growth and development of our educators and staff, we aim to cultivate a collaborative and inspiring environment that drives success and excellence.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisionMissionPage;
