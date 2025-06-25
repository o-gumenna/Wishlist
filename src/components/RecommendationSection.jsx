import { useEffect, useState } from "react";
import RecommendationCard from "./RecommendationCard";

const RecommendationSection = () => {
  const [visibleGifts, setVisibleGifts] = useState([]);

  const getRandomSubset = (arr, count) => {
    return [...arr]
      .sort(() => 0.5 - Math.random())
      .slice(0, count);
  };

  const fetchGifts = async () => {
    try {
      const res = await fetch("http://localhost:9999/gifts");
      const data = await res.json();
      const randomThree = getRandomSubset(data, 3);
      setVisibleGifts(randomThree);
    } catch (err) {
      console.error("Error fetching gifts:", err);
    }
  };

  useEffect(() => {
    fetchGifts();

    const interval = setInterval(() => {
      fetchGifts();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-5 recommendation-section">
      <div className="container">
        <h2 className="mb-4 text-center text-white">Gift Ideas for You</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {visibleGifts.map((gift) => (
            <div key={gift.id} className="col pulse-hover">
              <RecommendationCard gift={gift} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendationSection;
