import { FileUpload } from "../../../modules/FileUpload";

export const Title = ({ props }) => {
    const { data, updateData, nextStep } = props;

    const update = (e) => {
        // check if file is uploaded
        if (e.target.files) {
            let url = FileUpload(e.target.files[0]);
            console.log("url: ", url);
            updateData({
                ...data,
                [e.target.name]: url
            });
            return;
        }

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
                <img src={data.img_url} alt="이미지 미리보기" />
                <input
                    className="input"
                    name="img_url"
                    type="file"
                    onChange={update}
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
