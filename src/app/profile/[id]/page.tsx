export default async function UserProfile({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Hồ sơ người dùng</h1>
        <p className="text-gray-600">
          ID người dùng: <span className="font-mono text-blue-600">{params.id}</span>
        </p>
      </div>
    </div>
  )
}
