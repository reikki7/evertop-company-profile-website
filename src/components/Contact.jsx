import React from 'react';
import { Phone, Mail, Instagram } from 'lucide-react';

const Contact = () => {

    const ContactItem = ({ icon, title, content, link }) => {
        const handleClick = () => {
            window.open(link, '_blank', 'noopener,noreferrer');
        };

        return (
            <div className="flex flex-col items-center p-6 duration-150 bg-white shadow-md cursor-pointer" onClick={handleClick}>
                {icon}
                <h3 className="mt-4 text-xl font-semibold">{title}</h3>
                <span className="mt-2 text-gray-600 transition-colors hover:text-gray-800">
                    {content}
                </span>
            </div>
        );
    };

    return (
        <div className="py-16 ">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <h2 className="mb-12 text-4xl font-bold text-center">Hubungi Kami</h2>
                <div className="grid grid-cols-1 gap-8 tracking-wider md:grid-cols-3">
                    <ContactItem
                        icon={<Phone className="w-8 h-8 text-green-600" />}
                        title="WhatsApp"
                        content="+62 812 8097 0794"
                        link="https://wa.me/6281280970794"
                    />
                    <ContactItem
                        icon={<Mail className="w-8 h-8 text-blue-600" />}
                        title="Email"
                        content="ptpolimaterialindonesia@gmail.com"
                        link="mailto:ptpolimaterialindonesia@gmail.com"
                    />
                    <ContactItem
                        icon={<Instagram className="w-8 h-8 text-purple-600" />}
                        title="Instagram"
                        content="@evertop.id"
                        link="https://www.instagram.com/evertop.id"
                    />
                </div>
            </div>
        </div>
    );
};

export default Contact;