import Papa from "papaparse";
import { useState } from "react";
import * as React from 'react';



function Upload() {
    const styles = require('../../assets/defaultStyle.json')
    let init: any
    const [parsedData, setParsedData] = useState({style:"", words :init});
    const [fileName, setFileName] = useState("download")
    const templateData = require('../../assets/template.json').data
    const csv = Papa.unparse(templateData);
    const [isChecked, setIsChecked] = useState(false);

    const handleOnChange = () => {
        if (!isChecked) { parsedData.style=styles.style;setParsedData( parsedData ); } else { parsedData.style = ""; setParsedData(parsedData); }
        setIsChecked(!isChecked);
    };


    const changeHandler = async (event: { target: { files: any[]; }; }) => {
        // Passing file data (event.target.files[0]) to parse using Papa.parse
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                const rowsArray = [];
                const valuesArray = [];
                // Iterating data to get column name and their values
                results.data.forEach((d: any) => {
                    rowsArray.push(Object.keys(d));
                    valuesArray.push(Object.values(d));
                });
                // Parsed Data Response in array format
                results.data.forEach((ele: any) => {
                    ele['weight'] = Number(ele['weight'])
                    let keys = ele.keywords.replace(' ', '').split(';')
                    let links = ele.links.replace(' ', '').split(';')
                    delete ele["keywords"]
                    delete ele["links"]
                    ele["click"] = []
                    keys.forEach((key: any, idx: string | number) => {
                        ele["click"].push({ "label": key, "link": links[idx] })
                    })
                })
                let obj = { words: results.data }
                parsedData.words=results.data
                setParsedData(parsedData)
            },
        })
    };

    return (
        <div style={{ paddingLeft: "50px" }}>
            <div style={{"textAlign": "left"}}>
                <h1 >Upload CSV OR JSON</h1>
            </div>

            <div style={{"textAlign": "left"}}>
                {/* File Uploader */}
                <a  style={{ margin: "10px auto" }} href={`data:text/csv;charset=utf-8,${encodeURIComponent(
                    csv
                )}`}
                    download={fileName} >
                    Download Template
                </a>
                <button >
                    <input
                        type="file"
                        name="file"
                        onChange={()=>changeHandler}
                        accept=".csv"
                        style={{ display: "block", margin: "10px auto" }}
                    />
                </button>
                <div><input
                    type="checkbox"
                    id="default style"
                    name="default style"
                    value="Add Default Style"
                    checked={isChecked}
                    onChange={handleOnChange}
                />Add Default Styling</div>
                <div className="form-group p-2">
                    <br></br>
                    <small>
                        <label className="text-muted">JSON File Name </label>
                    </small>
                    <input
                        onChange={(e) => setFileName(e.target.value + '.json')}
                        type="text"
                        className="form-control"
                        placeholder="Enter Name"
                    />
                </div>
                <br></br>
                <div >
                    <a  style={{ margin: "10px auto" }} href={`data:text/json;charset=utf-8,${encodeURIComponent(
                        JSON.stringify(parsedData)
                    )}`}
                        download={fileName} >
                        Submit
                    </a>
                </div>
                <br />
                <br />
            </div>
        </div >
    );
}

export default Upload;