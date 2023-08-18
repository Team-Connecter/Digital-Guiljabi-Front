import { Link } from "react-router-dom";

export default function TrendingList({ trendingData }) {
    return (
        <div className="cards card-grid">
            {trendingData.map((item, index) => (
                <div className="card" key={index}>
                    {/* <span>Category: {item.category}</span> */}
                    <img src={item.thumbnail} alt="" />
                    <h3>
                        <Link to={`/detailinfo/${item.boardPk}`}>
                            {item.title}
                        </Link>
                    </h3>
                    <p>{item.introduction}</p>
                    <span>
                        좋아요: {item.likeCnt} 북마크 : {item.bookmarkCnt}
                    </span>
                </div>
            ))}
        </div>
    );
}
