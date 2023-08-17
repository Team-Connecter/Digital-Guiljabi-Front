import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export const Request = () => {
    const api_url = process.env.REACT_APP_API_URL;
    const [selectedOption, setSelectedOption] = useState("reports");
    const [showReportOptions, setShowReportOptions] = useState(true);
    const [reason, setReason] = useState("");
    const [reportType, setRepotType] = useState("");
    const param = useParams();

    const optionChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedOption(selectedValue);

        if (selectedValue === "reports") {
            setShowReportOptions(true);
        } else {
            setShowReportOptions(false);
        }
    };

    const reasonChange = (e) => {
        setReason(e.target.value);
    };

    const reportTypeChange = (e) => {
        setRepotType(e.target.value);
    };

    const submitReason = async () => {
        try {
            let requestData = {};

            if (selectedOption === "reports") {
                requestData = {
                    type: reportType,
                    content: reason,
                };
            } else if (selectedOption === "edit-requests") {
                requestData = {
                    content: reason,
                };
            }
            const response = await axios.post(
                `${api_url}/api/v1/boards/${param.id}/${selectedOption}`,
                requestData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            console.log(response);
            alert("요청이 성공적으로 제출되었습니다.");
        } catch (error) {
            console.error("Error 발생 (요청 제출) : ", error);
        }
    };

    return (
        <div>
            <h1>Request</h1>
            <label>
                <input
                    type="radio"
                    value="reports"
                    name="request"
                    checked={selectedOption === "reports"}
                    onChange={optionChange}
                />
                신고
            </label>
            <label>
                <input
                    type="radio"
                    value="edit-requests"
                    name="request"
                    checked={selectedOption === "edit-requests"}
                    onChange={optionChange}
                />
                수정
            </label>

            {selectedOption === "reports" && showReportOptions && (
                <div>
                    <label>
                        <input
                            type="radio"
                            value="IRREL"
                            name="reportClick"
                            onChange={reportTypeChange}
                        />
                        내용 불일치
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="CPOYR"
                            name="reportClick"
                            onChange={reportTypeChange}
                        />
                        저작권 침해
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="NOXI"
                            name="reportClick"
                            onChange={reportTypeChange}
                        />
                        유해, 광고성
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="ETC"
                            name="reportClick"
                            onChange={reportTypeChange}
                        />
                        기타
                    </label>
                </div>
            )}
            <br></br>
            <textarea
                value={reason}
                onChange={reasonChange}
                placeholder="해당 요청 사유를 입력하세요"
                rows={4}
                cols={50}
            />
            <br></br>
            <button onClick={submitReason}>제출</button>
        </div>
    );
};
