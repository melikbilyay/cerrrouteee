'use client'

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebookF,
    faLinkedinIn,
    faTwitter,
    faBehance,
} from "@fortawesome/free-brands-svg-icons";
import PropTypes from "prop-types";

const teamMembers = [
    {
        picture: "https://i.ibb.co/dLPRtFG/aliberke.jpg", // Update with your image path
        fullName: "Ali Berke Ökçelik",
        designation: "Founder / CEO",
        bio: "Subscribe Easy Tutorials Youtube Channel watch more videos",
        socialLinks: [
            { icon: faFacebookF, href: "#" },
            { icon: faLinkedinIn, href: "#" },
            { icon: faTwitter, href: "#" },
            { icon: faBehance, href: "#" },
        ],
    },
    {
        picture: "https://i.ibb.co/FnsfN1L/melik.jpg", // Update with your image path
        fullName: "Necip Melik Bilyay",
        designation: "Computer Engineer",
        bio: "Subscribe Easy Tutorials Youtube Channel watch more videos",
        socialLinks: [
            { icon: faFacebookF, href: "#" },
            { icon: faLinkedinIn, href: "#" },
            { icon: faTwitter, href: "#" },
            { icon: faBehance, href: "#" },
        ],
    },
    {
        picture: "https://i.ibb.co/QD4zczs/teyfik.jpg", // Update with your image path
        fullName: "Teyfik Yılmaz",
        designation: "Computer Engineer",
        bio: "Subscribe Easy Tutorials Youtube Channel watch more videos",
        socialLinks: [
            { icon: faFacebookF, href: "#" },
            { icon: faLinkedinIn, href: "#" },
            { icon: faTwitter, href: "#" },
            { icon: faBehance, href: "#" },
        ],
    },
    {
        picture: "https://i.ibb.co/2Kf2gn0/faruk.jpg", // Update with your image path
        fullName: "Faruk Berk Öztürk",
        designation: "Computer Engineer",
        bio: "Subscribe Easy Tutorials Youtube Channel watch more videos",
        socialLinks: [
            { icon: faFacebookF, href: "#" },
            { icon: faLinkedinIn, href: "#" },
            { icon: faTwitter, href: "#" },
            { icon: faBehance, href: "#" },
        ],
    },
    {
        picture: "https://i.ibb.co/GMfszTY/emircan.jpg", // Update with your image path
        fullName: "Emircan Aydın",
        designation: "Computer Engineer",
        bio: "Subscribe Easy Tutorials Youtube Channel watch more videos",
        socialLinks: [
            { icon: faFacebookF, href: "#" },
            { icon: faLinkedinIn, href: "#" },
            { icon: faTwitter, href: "#" },
            { icon: faBehance, href: "#" },
        ],
    },
];

const TeamMemberItem = ({ member }: { member: any }) => (
    <div className="bg-white  shadow-xl rounded-xl hover:-translate-y-1 duration-500 h-full p-6 lg:p-8">
        <img
            src={member.picture}
            alt={member.fullName}
            className="max-w-full h-auto rounded-full border-4 p-1 border-blue-600 mx-auto"
            width="120"
        />
        <div className="mt-6">
            <h4 className="text-2xl font-medium mb-1">{member.fullName}</h4>
            <p className="mb-4 text-sm">{member.designation}</p>
            <p className="opacity-50">{member.bio}</p>
            <div className="mt-6">
                {member.socialLinks.map((item: any, i: number) => (
                    <a
                        href={item.href}
                        className={`inline-block opacity-60 transition duration-300 hover:translate-y-1 hover:opacity-100 ${
                            i + 1 !== member.socialLinks.length && "mr-4"
                        }`}
                        key={i}
                    >
                        <FontAwesomeIcon icon={item.icon} />
                    </a>
                ))}
            </div>
        </div>
    </div>
);

TeamMemberItem.propTypes = {
    member: PropTypes.object.isRequired,
};

const TeamMember9 = () => {
    return (
        <section className="ezy__team9 light py-14 md:py-24 bg-white text-zinc-900 ">
            <div className="container px-4 mx-auto">
                <div className="flex justify-center mb-6 md:mb-12">
                    <div className="max-w-lg text-center">
                        <h2 className="text-3xl leading-none font-bold md:text-[45px] mb-4 -mt-9 ">
                            Team
                        </h2>

                    </div>
                </div>

                <div className="grid grid-cols-5 gap-6 text-center pt-6">
                    {teamMembers.map((member: any, i: number) => (
                        <div className="col-span-4 md:col-span-2 lg:col-span-1" key={i}>
                            <TeamMemberItem member={member} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamMember9;
