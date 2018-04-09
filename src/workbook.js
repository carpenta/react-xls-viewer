import React from 'react';

const numberToAlpha = (num) => {
    let ret = '';
    let remain = num;
    while(remain >= 1) {
        const ch = remain % 26;
        remain = remain / 26;
        ret = String.fromCharCode('A'.charCodeAt(0) - 1 + ch) + ret;
    }
    return ret;
}

const alphToNumber = (atoz) => {
    let ret = 0;
    for (var i = 0; i < atoz.length; i++) {
        if (i > 0) {
            ret *= 26;
        }
        ret += atoz.charCodeAt(i) - 'A'.charCodeAt(0) + 1;
    }
    return ret;
}

const refToNumber = (ref) => {
    const [head, tail] = ref.split(":");
    const headTokens = head.match(/[A-Z]+|[0-9]+/g);
    const tailTokens = tail.match(/[A-Z]+|[0-9]+/g);
    return {
        head: {c: alphToNumber(headTokens[0]), r: Number(headTokens[1]), code: head},
        tail: {c: alphToNumber(tailTokens[0]), r: Number(tailTokens[1]), code: tail}
    }
}

const sheetToObjects = (sheet) => {
    //console.debug(sheet);
    const {head, tail} = refToNumber(sheet['!ref']);
    console.debug("Workbook Sheet ref =", head, tail);
    const headCode = head.c;
    const tailCode = tail.c;
    const startRowNum = head.r;
    const height = tail.r - startRowNum + 1;

    let columns = [];
    for (var i = headCode; i <= tailCode; i++) {
        const key = numberToAlpha(i) + startRowNum;
        if (key in sheet) {
            columns.push(sheet[key].v);
        } else {
            columns.push("");
        }
    }
    console.debug("Workbook Sheet columns=", columns);

    let matrix = [];
    for (var j = startRowNum + 1; j <= startRowNum + height; j++) {
        let row = [];
        for (var k = headCode; k <= tailCode; k++) {
            const key = numberToAlpha(k) + j;
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