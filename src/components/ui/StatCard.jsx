import { BookCheck } from "lucide-react";
import React from "react";

export const StatCard = ({ value, title, icon, className, footer }) => {
  return (
    <>
      <div className="flex flex-col justify-between space-y-2 bg-white border shadow-sm rounded-xl max-h-[180px] w-full">
        <div className="flex justify-between items-center p-6">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">{value}</h1>
            <h2 className="text-l text-gray-400">{title}</h2>
          </div>
          <div>
            {icon}
          </div>
        </div>
        <div className={`${className} px-6 py-3 rounded-b-xl border-t`}>
            {footer}
        </div>
      </div>
    </>
  );
};
