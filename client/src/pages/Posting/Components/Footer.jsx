export const Footer = ({ props, save }) => {

    const { data, prevStep, updateData } = props;
    const update = (e) => {
        updateData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className="footer">
            <div>
                <h1>해시태그 입력</h1>
                <input type="#해시태그" name="tags" onChange={update} value={data.tags}/>
            </div>
            <div>
                <h1>출처입력</h1>
                <textarea name="source" onChange={update} value={data.source}/>
            </div>

            <div className="">
                <button onClick={prevStep}>뒤로</button>
                <button onClick={save}>완료</button>
            </div>
        </div>
    )
}