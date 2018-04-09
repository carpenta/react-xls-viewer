import React from 'react';
import ReactDom from 'react-dom';
import xlsx from 'xlsx';
import Dropzone from 'react-dropzone';
import Workbook from './workbook';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { files: [], data: {} }
    }

    onDrop(files) {
        if (files.length > 0) {
            const reader = new FileReader();
            reader.onload = () => {
                const content = reader.result;
                const data = xlsx.read(content, {type: 'binary'});
                this.setState({data: data});
            }
            reader.readAsBinaryString(files[0]);
            this.setState({ files: files })
        }
    }

    render() {
        return (
        <div>
            <h1>Xls Drop & Draw</h1>
            <div>
                <Dropzone 
                    multiple={false}
                    style={{margin: '0 auto', height:'50px', width:'100%', border:'1px dashed #aaa'}}
                    onDrop={this.onDrop.bind(this)}
                    >
                    <p style={{margin: '10px'}}> Drop XLS(x) file... </p>
                </Dropzone>
            </div>
            <div>
                <ul>
                { this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>) }
                </ul>
            </div>
            <Workbook src={this.state.data} />
        </div>
        );
    }
}

ReactDom.render(<App />, document.getElementById('root'));
