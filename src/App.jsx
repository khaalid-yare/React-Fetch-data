import React, { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, isLoading] = useState(false);
  const [error, isError] = useState(false);

  useEffect(() => {
    isLoading(true);
    isError(false);
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
        isLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        isError(true);
        isLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-lg text-red-500">
        Error fetching data. Please try again later.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {data.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl"
        >
          <img
            className="w-full h-48 object-cover"
            src={item.image}
            alt={item.title}
          />
          <div className="p-4">
            <h3 className="font-bold text-xl mb-2 text-gray-800">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm truncate-2-lines max-h-12 overflow-hidden">
              {item.description}
            </p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-blue-600 font-semibold">${item.price}</span>
              <span className="text-sm text-gray-500">{item.category}</span>
            </div>
            <div className="mt-4 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center">
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                className="w-4 h-4 mr-1"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.34 4.15a1.056 1.056 0 001.002.739h4.356c.969 0 1.37 1.24.588 1.81l-3.517 2.56a1.056 1.056 0 00-.386 1.174l1.34 4.15c.3.921-.755 1.683-1.588 1.174l-3.517-2.56a1.056 1.056 0 00-1.238 0l-3.517 2.56c-.833.51-1.888-.253-1.588-1.174l1.34-4.15a1.056 1.056 0 00-.386-1.174l-3.517-2.56c-.782-.57-.381-1.81.588-1.81h4.356c.419 0 .79-.278 1.002-.739l1.34-4.15z"></path>
              </svg>
              <span>
                {item.rating.rate} ({item.rating.count} reviews)
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
