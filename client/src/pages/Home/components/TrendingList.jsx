import { Link } from "react-router-dom";

export default function TrendingList({ trendingData }) {
    return (
        <div>
            {trendingData.map((item, index) => (
                <div className="card" key={index}>
                    <span>Category: {item.category}</span>
                    <h3>
                        <Link to={`/detailinfo?id=${item.id}`}>
                            {item.title}
                        </Link>
                    </h3>
                    <p>{item.description}</p>
                    <span>Likes: {item.likes}</span>
                </div>
            ))}
        </div>
    );
}
