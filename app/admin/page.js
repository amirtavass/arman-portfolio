function AdminPage() {
  const demoStudents = [
    {
      id: 1,
      name: "علی رضایی",
      phone: "09121234567",
      classDate: "12 مرداد",
      isPaid: true,
    },
    {
      id: 2,
      name: "مریم محمدی",
      phone: "09351234567",
      classDate: "15 مرداد",
      isPaid: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-200 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">پنل مربی</h1>
            <p className="text-lg text-gray-600 mb-6">
              مدیریت هنرجوهای ثبت‌نام شده
            </p>

            {/* Demo Notice */}
            <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700 text-center">
                <strong>در نسخه کامل:</strong> مربی می‌تواند هنرجوهای ثبت‌نام
                شده را مشاهده کند.
              </p>
            </div>
          </div>

          {/* Students Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-700">
                    نام هنرجو
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-700">
                    شماره تماس
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-700">
                    تاریخ کلاس
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-700">
                    پرداخت شده
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {demoStudents.map((student) => (
                  <tr key={student.id}>
                    <td className="px-6 py-4 text-gray-900">{student.name}</td>
                    <td className="px-6 py-4 text-gray-600">{student.phone}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {student.classDate}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {student.isPaid ? (
                        <span className="text-green-600 text-xl">✅</span>
                      ) : (
                        <span className="text-red-500 text-xl">❌</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
