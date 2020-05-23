import React from 'react'
import XLSX from 'xlsx'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import getUserData from '../hoc'
import {useWindowSize} from '../../utils'

const pkg = require('../../../package.json')

class Dashboard extends React.Component {
    state = {
        employees: []
    }

    componentWillMount() {
        if (!this.props.login)
            this.props.history.push('/login')
    }

    render() {
        const { employees } = this.state;
        const keys = employees.length > 0 ? Object.keys(employees[0]) : null
        return (<div className="container">
            
            <div className="row m-4">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <div className="form-group">
                                <label>Open excel file</label>
                                <input className="form-control p-1" type="file" onChange={this.handleFileOpen} />
                            </div>
                            <table id="tbl_canvas" className="table table-responsive">
                                <thead>
                                    <tr>
                                        {keys && keys.map((item, index) => {
                                            return <th>{item}</th>
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees && employees.map((item, index) => {
                                        return <tr>{keys && keys.map((key, k) => <td>{item[key]}</td>)}</tr>
                                    })}
                                </tbody>
                            </table>
                            {employees.length > 0 ? <button onClick={() => {
                                if (employees.length > 0) {
                                    let doc = document.getElementById('tbl_canvas')
                                    html2canvas(doc).then(canvas => {
                                        var img = canvas.toDataURL('image/png')
                                        const pdf = new jsPDF();
                                        pdf.addImage(img, 'PNG', 0, 0);
                                        pdf.save("download.pdf");
                                    })
                                }
                            }}>PDF</button> : null}
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h5>Package.json</h5>
                        </div>
                        <div className="card-body">
                            {JSON.stringify(pkg)}
                        </div>
                    </div>

                </div>
            </div>
        </div>)
    }

    handleFileOpen = (e) => {
        var context = this;
        var files = e.target.files, f = files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            var data = new Uint8Array(e.target.result);
            var workbook = XLSX.read(data, { type: 'array' });
            var json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
            // console.log("json  => ", json);
            context.setState({ employees: json, totalCount: json.length }, () => {
                //context.onUpload({});
            })
        };
        reader.readAsArrayBuffer(f);
    }
}

export default getUserData(Dashboard)