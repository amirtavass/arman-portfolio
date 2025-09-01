"use client";
import { useState } from "react";
import { useCreateClass, useUpdateClass } from "@/app/hooks/useClasses";

function ClassForm({ editingClass, onClose }) {
  const [formData, setFormData] = useState({
    title: editingClass?.title || "",
    classType: editingClass?.classType || "کلاس خصوصی ۱۲ جلسه",
    description: editingClass?.description || "",
    duration: editingClass?.duration || 60,
    date: editingClass
      ? new Date(editingClass.date).toISOString().split("T")[0]
      : "",
    time: editingClass?.time || "",
    maxStudents: editingClass?.maxStudents || 10,
    price: editingClass?.price || 0,
    instructor: editingClass?.instructor || "مربی اول",
    location: editingClass?.location || "استخر اصلی",
  });

  const createClass = useCreateClass();
  const updateClass = useUpdateClass();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const classData = { ...formData, date: new Date(formData.date) };

      if (editingClass) {
        await updateClass.mutateAsync({ id: editingClass._id, ...classData });
      } else {
        await createClass.mutateAsync(classData);
      }

      onClose();
    } catch (error) {
      alert("خطا در عملیات: " + error.message);
    }
  };

  return (
    <div className="mb-6 p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-bold mb-4">
        {editingClass ? "ویرایش کلاس" : "کلاس جدید"}
      </h3>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="عنوان"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />

        <select
          value={formData.classType}
          onChange={(e) =>
            setFormData({ ...formData, classType: e.target.value })
          }
          className="w-full px-3 py-2 border rounded-lg"
        >
          <option value="کلاس خصوصی ۱۲ جلسه">کلاس خصوصی ۱۲ جلسه</option>
          <option value="کلاس پدر و فرزند">کلاس پدر و فرزند</option>
          <option value="کلاس آمادگی مسابقات">کلاس آمادگی مسابقات</option>
          <option value="سانس آزاد استخر">سانس آزاد استخر</option>
          <option value="جلسه آزمایشی رایگان">جلسه آزمایشی رایگان</option>
        </select>

        <input
          type="number"
          placeholder="مدت زمان (دقیقه)"
          value={formData.duration}
          onChange={(e) =>
            setFormData({ ...formData, duration: parseInt(e.target.value) })
          }
          className="w-full px-3 py-2 border rounded-lg"
          required
        />

        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />

        <input
          type="time"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />

        <input
          type="number"
          placeholder="حداکثر دانشجو"
          value={formData.maxStudents}
          onChange={(e) =>
            setFormData({ ...formData, maxStudents: parseInt(e.target.value) })
          }
          className="w-full px-3 py-2 border rounded-lg"
          required
        />

        <input
          type="number"
          placeholder="قیمت (تومان)"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: parseInt(e.target.value) })
          }
          className="w-full px-3 py-2 border rounded-lg"
          required
        />

        <select
          value={formData.instructor}
          onChange={(e) =>
            setFormData({ ...formData, instructor: e.target.value })
          }
          className="w-full px-3 py-2 border rounded-lg"
        >
          <option value="مربی اول">مربی اول</option>
          <option value="مربی دوم">مربی دوم</option>
          <option value="هر دو مربی">هر دو مربی</option>
        </select>

        <textarea
          placeholder="توضیحات"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="col-span-2 w-full px-3 py-2 border rounded-lg"
          rows="3"
        />

        <div className="col-span-2 flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            {editingClass ? "به‌روزرسانی" : "ایجاد"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
          >
            انصراف
          </button>
        </div>
      </form>
    </div>
  );
}

export default ClassForm;
