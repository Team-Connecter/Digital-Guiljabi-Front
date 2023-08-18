import React, { useState } from "react";
import { BookmarkItem } from "./BookmarkItem";
import { WritingItem } from "./WritingItem";

export const UserContent = ({ bookmarks, writings }) => {
    const [activeTab, setActiveTab] = useState("bookmark");

    const tabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div>
            <div>
                <button className="button" onClick={() => tabClick("bookmark")}>
                    Bookmark
                </button>
                <button className="button" onClick={() => tabClick("writing")}>
                    Writing
                </button>
            </div>
            {activeTab === "bookmark" && (
                <ul className="card-grid">
                    {bookmarks.length > 0 ? (
                        bookmarks.map((bookmark, index) => (
                            <BookmarkItem key={index} bookmark={bookmark} />
                        ))
                    ) : (
                        <p>즐겨찾기 목록이 없습니다.</p>
                    )}
                </ul>
            )}
            {activeTab === "writing" && (
                <ul className="card-grid">
                    {writings.length > 0 ? (
                        writings.map((writing, index) => (
                            <WritingItem key={index} writing={writing} />
                        ))
                    ) : (
                        <p>작성 목록이 없습니다.</p>
                    )}
                </ul>
            )}
        </div>
    );
};
