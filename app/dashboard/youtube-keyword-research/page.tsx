'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { FiCopy } from 'react-icons/fi'; // Import the copy icon from react-icons

function KeywordResearch() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://keyword-research-for-youtube.p.rapidapi.com/yttags.php?keyword=${encodeURIComponent(keyword)}`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key': 'cca330428dmsh4b459b029c77e3cp1a7504jsn8f61efbba564',
            'x-rapidapi-host': 'keyword-research-for-youtube.p.rapidapi.com',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching keyword data:', error);
    }
  };

  // Function to determine the color based on competition score
  const getCompetitionColor = (score) => {
    if (score < 50) return 'text-green-600';  // Low competition
    if (score < 80) return 'text-orange-600'; // Medium competition
    return 'text-red-600';                     // High competition
  };

  // Function to copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert(`${text} copied to clipboard!`); // Alert message after copying
    }).catch((err) => {
      console.error('Error copying text: ', err);
    });
  };

  return (
    <div className="container mx-auto p-5">
        <Link href={'/dashboard'}>
            <button className='flex bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-white mb-10'>
                <img className='w-5 mt-[1px]' src="https://cdn-icons-png.flaticon.com/128/8213/8213500.png" alt="" />
                Home</button>
                </Link>
      <h1 className="text-2xl font-bold">YouTube Keyword Research</h1>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter a keyword"
        className="border p-2 rounded mt-2 w-full"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded ml-2 mt-2">
        Search
      </button>

      {results && (
        <div className="mt-4">
          <h2 className="text-xl">Results for: <span className="font-semibold">{keyword}</span></h2>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Exact Keyword</h3>
            {results.exact_keyword.map((item, index) => (
              <div key={index} className="border p-4 rounded mb-2 bg-gray-50 relative">
                <h4 className="font-semibold">{item.keyword}</h4>
                <p>Monthly Searches: <span className="font-medium">{item.monthlysearch}</span></p>
                <p className={getCompetitionColor(item.competition_score)}>
                  Competition Score: <span className="font-medium">{item.competition_score}</span>
                </p>
                <p>Difficulty: <span className="font-medium">{item.difficulty}</span></p>
                <p>Overall Score: <span className="font-medium">{item.overallscore}</span></p>
                <button
                  onClick={() => copyToClipboard(item.keyword)}
                  className="absolute bottom-2 right-2 p-1 text-gray-600 hover:text-blue-500"
                  title="Copy Keyword"
                >
                  <FiCopy size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Related Keywords</h3>
            {results.related_keywords.map((item, index) => (
              <div key={index} className="border p-4 rounded mb-2 bg-gray-50 relative">
                <h4 className="font-semibold">{item.keyword}</h4>
                <p>Monthly Searches: <span className="font-medium">{item.monthlysearch}</span></p>
                <p className={getCompetitionColor(item.competition_score)}>
                  Competition Score: <span className="font-medium">{item.competition_score}</span>
                </p>
                <p>Difficulty: <span className="font-medium">{item.difficulty}</span></p>
                <p>Overall Score: <span className="font-medium">{item.overallscore}</span></p>
                <p>Last Update: <span className="font-medium">{item.last_update}</span></p>
                <button
                  onClick={() => copyToClipboard(item.keyword)}
                  className="absolute bottom-2 right-2 p-1 text-gray-600 hover:text-blue-500"
                  title="Copy Keyword"
                >
                  <FiCopy size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default KeywordResearch;
