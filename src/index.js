import React from 'react';
import ReactDom from 'react-dom';
import xlsx from 'xlsx';
import Dropzone from 'react-dropzone';
import Workbook from './workbook';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { files: [], data: {}, loaded: false}
    }

    onDrop(files) {
        if (files.length > 0) {
            this.setState({loaded: false, data: {}, files: files}, () => {
                const reader = new FileReader();
                reader.onload = () => this.setState({
                    loaded: true, 
                    data: xlsx.read(reader.result, {type: 'binary'})
                });
                reader.readAsBinaryString(files[0]);
            })
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
                <h3>File list</h3>
                <ul>
                { this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>) }
                </ul>
            </div>
            { !this.state.loaded && (<div><p>Loading...</p></div>)}
            <Workbook src={this.state.data} />
        </div>
        );
    }
}

ReactDom.render(<App />, document.getElementById('root'));
