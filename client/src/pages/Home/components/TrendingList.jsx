import { Link } from "react-router-dom";

export default function TrendingList({ trendingData }) {
    return (
        <div>
            {trendingData.map((item, index) => (
                <div className="card" key={index}>
                    {/* <span>Category: {item.category}</span> */}
                    <h3>
                        <Link to={`/detailinfo/${item.boardPk}`}>
                            {item.title}
                        </Link>
                    </h3>
                    <p>{item.introduction}</p>
                    <span>Likes: {item.likeCnt}</span>
                </div>
            ))}
        </div>
    );
}
