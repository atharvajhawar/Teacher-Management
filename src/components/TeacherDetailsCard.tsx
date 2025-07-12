import React from "react";

interface TeacherDetailsProps {
  name: string;
  role: string;
  birthDate: string;
  onEdit: () => void;
}

const TeacherDetailsCard: React.FC<TeacherDetailsProps> = ({ name, role, birthDate, onEdit }) => (
  <section className="bg-white rounded-xl shadow p-6 mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
    <div>
      <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
      <p className="text-gray-500">{role}</p>
      <p className="text-gray-400 text-sm">Birth Date: {birthDate}</p>
    </div>
    <button
      className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      onClick={onEdit}
    >
      Edit
    </button>
  </section>
);

export default TeacherDetailsCard;