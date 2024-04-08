
interface InfoCardProps {
  icon: JSX.Element; 
  title: string;
  value: number | string;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, value, className }) => {
  return (
    <div className={`shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-800 ${className}`}>
      <div className="flex items-center">
        <span className="rounded-xl p-4 bg-purple-200 dark:bg-purple-500">
          {icon}
        </span>
        <div className="flex flex-col justify-start ml-4">
          <p className="text-sm text-gray-600 dark:text-white">{title}</p>
          <p className="text-3xl font-semibold text-gray-800 dark:text-white">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;