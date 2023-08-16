export const ReportInfo = ({ reportedAt, username, reason }) => {
    return (
        <div className="report-info">
            <div className="report-date">
                <div>신고일시 </div>
                <div>{reportedAt}</div>
            </div>
            <div className="report-name">
                <div>신고자 </div>
                <div>{username}</div>
            </div>
            <div className="report-reason">
                <div>신고사유 </div>
                <div>{reason}</div>
            </div>
        </div>
    )
};
