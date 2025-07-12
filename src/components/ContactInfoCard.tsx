import React from "react";

interface ContactInfoCardProps {
  label: string;
  value: string;
  type?: "email" | "phone" | "address";
}

const ContactInfoCard: React.FC<ContactInfoCardProps> = ({ label, value, type }) => (
  <div className="bg-white rounded-xl shadow p-4 flex flex-col">
    <span className="text-xs text-gray-400 mb-1">{label}</span>
    <span className="text-gray-700 font-medium break-words">
      {value}
    </span>
  </div>
);

export default ContactInfoCard;