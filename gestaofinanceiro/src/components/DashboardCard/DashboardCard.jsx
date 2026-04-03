
/**
 * Card de estatísticas
 * Props: title, value, color
 */
export default function DashboardCard({ title, value, color }){
  return (
    <div className={`p-6 rounded-lg shadow ${color} text-white flex flex-col`}>
      <span className="text-lg font-medium">{title}</span>
      <span className="mt-4 text-3xl font-bold">{value}</span>
    </div>
  );
};

