import React from "react";

export interface Qualification {
  name: string;
  rate: string;
}

interface QualificationsTableProps {
  title: string;
  qualifications: Qualification[];
  onAdd: () => void;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

const QualificationsTable: React.FC<QualificationsTableProps> = ({
  title,
  qualifications,
  onAdd,
  onEdit,
  onDelete,
}) => (
  <section className="bg-white rounded-xl shadow p-6 mb-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <button
        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={onAdd}
      >
        Add
      </button>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full text-left">
        <thead>
          <tr>
            <th className="py-2 px-4 text-gray-500 font-medium">Name</th>
            <th className="py-2 px-4 text-gray-500 font-medium">Rate ($/hr)</th>
            <th className="py-2 px-4"></th>
          </tr>
        </thead>
        <tbody>
          {qualifications.length === 0 ? (
            <tr>
              <td colSpan={3} className="py-4 px-4 text-gray-400 text-center">
                No qualifications
              </td>
            </tr>
          ) : (
            qualifications.map((q, idx) => (
              <tr key={idx} className="border-t">
                <td className="py-2 px-4">{q.name}</td>
                <td className="py-2 px-4">{q.rate}</td>
                <td className="py-2 px-4 flex gap-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => onEdit(idx)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => onDelete(idx)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </section>
);

export default QualificationsTable;