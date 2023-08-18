import { useEffect, useState } from "react";
import { PostList } from "./components/PostList";
import { Category } from "./components/Category";
import { SeeMore } from "./components/SeeMore";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import styles from "../../styles/modules/SearchInfo.module.css";

export const SearchInfo = () => {
    const params = useParams();

    const api_url = process.env.REACT_APP_API_URL;
    const [searchText, setSearchText] = useState(params.keyword);
    const [sortBy, setSortBy] = useState("POP");
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [matchPosts, setMatchPosts] = useState(false);
    const [selectCategory, setSelectCategory] = useState("");
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const navigate = useNavigate();

    const searchChange = (e) => {
        setSearchText(e.target.value);
    };

    const sortChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleCategoryChange = (category) => {
        setSelectCategory(category);
    };

    const handleMore = () => {
        setCurrentPage(currentPage);
        setPageSize(pageSize + 10);
    };

    const handleAll = () => {
        setSelectCategory("");
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let apiUrl = `${api_url}/api/v1/boards?pageSize=${pageSize}&page=${currentPage}&sort=${sortBy}`;

                if (searchText) {
                    apiUrl = `${api_url}/api/v1/boards?q=${searchText}&pageSize=${pageSize}&page=${currentPage}&sort=${sortBy}`;
                }

                if (selectCategory) {
                    apiUrl = `${api_url}/api/v1/boards?categoryPk=${selectCategory}&q=${searchText}&pageSize=${pageSize}&page=${currentPage}&sort=${sortBy}`;
                }

                const response = await axios.get(apiUrl);
                const testDataFromServer = response.data;
                setFilteredPosts([...testDataFromServer.list]);
                setPosts([...testDataFromServer.list]);
            } catch (error) {
                console.error("Error 발생 (도움말 목록 불러오기) : ", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get(
                    `${api_url}/api/v1/categories/root`
                );
                const categoriesFromServer = response.data.list;
                setCategories(categoriesFromServer);
            } catch (error) {
                console.error("Error 발생(카테고리) : ", error);
            }
        };

        fetchPosts();
        fetchCategories();
    }, [searchText, sortBy, selectCategory, currentPage, pageSize, api_url]);

    const handleSearch = () => {
        const filtered = posts.filter((post) =>
            post.title.toLowerCase().includes(searchText.toLowerCase())
        );

        if (filtered.length === 0) {
            setMatchPosts(true);
        } else {
            setMatchPosts(false);
        }
    };

    if (loading) {
        return (
            <main className="content-area__main">
                <p>불러오는 중입니다.</p>
            </main>
        );
    }

    const handleWritePost = () => {
        navigate("/posting");
    };

    return (
        <main className="content-area__main">
            <h1>검색</h1>
            <section className={styles.sectionSearch}>
                <div>
                    <input
                        className="input primary"
                        type="search"
                        placeholder="검색어를 입력하세요."
                        value={searchText}
                        onChange={searchChange}
                    />
                    <button className="button primary" onClick={handleSearch}>
                        검색
                    </button>
                </div>
                <label>
                    <select
                        className="select"
                        value={sortBy}
                        onChange={sortChange}
                    >
                        <option value="POP">인기순</option>
                        <option value="NEW">최신순</option>
                    </select>
                </label>
            </section>
            <Category
                handleCategoryChange={handleCategoryChange}
                categories={categories}
                handleAll={handleAll}
            />
            {matchPosts ? (
                <p>일치하는 도움말이 없습니다.</p>
            ) : (
                <PostList posts={filteredPosts} />
            )}
            <SeeMore handleMore={handleMore} />
            <button className="button primary" onClick={handleWritePost}>
                글 작성
            </button>
        </main>
    );
};
