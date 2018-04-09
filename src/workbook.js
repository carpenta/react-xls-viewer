import React from 'react';

const sheetToObjects = (sheet) => {
    const [head, tail] = sheet['!ref'].split(":");
    const headCode = head.charCodeAt(0);
    const tailCode = tail.charCodeAt(0);
    const startRowNum = Number(head.substring(1));
    const height = Number(tail.substring(1)) - startRowNum;

    let columns = [];
    for (var i = headCode; i <= tailCode; i++) {
        const key = String.fromCharCode(i) + startRowNum;
        columns.push(sheet[key].v);
    }
    //console.log(columns);

    let matrix = [];
    for (var j = startRowNum + 1; j <= startRowNum + height; j++) {
        let row = [];
        for (var k = headCode; k <= tailCode; k++) {
            const key = String.fromCharCode(k) + j;
            if (key in sheet) {
                row.push(sheet[key].v);
            } else {
                row.push(null);
            }
        }
        matrix.push(row);
    }
    //console.log(matrix);

    return {columns: columns, matrix: matrix};
}

export default class Workbook extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        try {
            if (this.props 
                && this.props.src 
                && this.props.src.Sheets) {
                const sheets = this.props.src.Sheets;
                const names = this.props.src.SheetNames;
                return names.map((name) => {
                    const {columns, matrix} = sheetToObjects(sheets[name]);
                    return (<div>
                        <h3>{name}</h3>
                        <table border="1">
                            <thead>
                                <tr>{columns.map((c) => <th>{c}</th>)}</tr>
                            </thead>
                            <tbody>
                            {matrix.map((row) => <tr>
                                {row.map((item) => <td>{item}</td>)}
                            </tr>)}
                            </tbody>
                        </table>
                    </div>)
                });
            }
        } catch (err) {
            console.error(err);
            return (<div><p>잘못된 형식의 파일입니다.</p></div>);
        }
        return (<div />);
    }
}