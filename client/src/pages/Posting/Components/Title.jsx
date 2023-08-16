export const Title = ({ props }) => {
    const { data, updateData, nextStep } = props;

    const update = (e) => {
        updateData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="title">
            <div>
                <input
                    className="input"
                    name="title"
                    placeholder="제목을 입력해주세요."
                    onChange={update}
                    value={data.title}
                />
            </div>
            <div>
                <input
                    className="input"
                    name="content"
                    placeholder="서론(소개말) 입력"
                    onChange={update}
                    value={data.content}
                />
            </div>
            <div>
                <input
                    className="input"
                    name="img_url"
                    type="file"
                    onChange={update}
                    value={data.img_url}
                />
            </div>

            <div>
                <button className="button" onClick={nextStep}>
                    다음 단계로
                </button>
            </div>
        </div>
    );
};
