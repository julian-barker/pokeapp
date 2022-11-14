export default function Loading() {
  return (
    <div className="my-3 h-36 flex flex-col items-center">
      <div className="relative h-24 w-24 border-2 border-gray-700 rounded-full overflow-hidden animate-spin">
        <div className="h-2 w-full absolute top-1/2 transform -translate-y-1/2 bg-gray-900"></div>
        <div className="h-8 w-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 rounded-full border-gray-900 bg-gray-100">
          <div className="h-6 w-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 rounded-full border-gray-700 bg-gray-100"></div>
        </div>
        <div className="h-1/2 bg-red-500"></div>
        
        <div className="h-1/2 bg-gray-200"></div>
      </div>
      <p className="mt-4 font-bold text-xl transform scale">
        Loading...
      </p>
    </div>
  );
}