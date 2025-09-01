"use client";
import { useDeleteClass } from "@/app/hooks/useClasses";

function ClassesTable({ classes, onEdit }) {
  const deleteClass = useDeleteClass();

  const handleDelete = async (classId) => {
    if (window.confirm("آیا از حذف این کلاس اطمینان دارید؟")) {
      try {
        await deleteClass.mutateAsync(classId);
      } catch (error) {
        alert("خطا در حذف: " + error.message);
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-right">عنوان</th>
            <th className="px-4 py-2 text-right">نوع کلاس</th>
            <th className="px-4 py-2 text-right">قیمت</th>
            <th className="px-4 py-2 text-right">تاریخ</th>
            <th className="px-4 py-2 text-center">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {classes?.map((cls) => (
            <tr key={cls._id} className="border-b">
              <td className="px-4 py-2">{cls.title}</td>
              <td className="px-4 py-2">{cls.classType}</td>
              <td className="px-4 py-2">{cls.price.toLocaleString()} تومان</td>
              <td className="px-4 py-2">
                {new Date(cls.date).toLocaleDateString("fa-IR")}
              </td>
              <td className="px-4 py-2 text-center">
                <button
                  onClick={() => onEdit(cls)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm mr-2"
                >
                  ویرایش
                </button>
                <button
                  onClick={() => handleDelete(cls._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClassesTable;
