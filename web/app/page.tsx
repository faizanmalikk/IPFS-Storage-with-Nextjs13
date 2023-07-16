'use client'

import React, { useState, useEffect } from "react";


function App() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => { }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "filename") {
      setFileName(e.target.value);
    }
    if (e.target.name === 'file') {
      const selectedFile = e.target.files?.[0]; // Perform a null check
      setFile(selectedFile!); // Assert the existence using the non-null assertion operator
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      var formData = new FormData();
      formData.append("filename", fileName);
      if (file) {
        formData.append('file', file);
      }
      const res = await fetch("/api/uploadData", {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        throw new Error("Network response is not ok");
      }
      const data = await res.json();
      setResult(data.message);

    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={'container'}>
      <header className={'header'}>
        <h1>⁂<span>Store IPFS hash on blockchain</span>⁂</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <label className={'lable'}>Enter Unique Filename: </label>
        <input type="text" name="filename" value={fileName} onChange={handleChange} className={'input'}></input>
        <br />
        <input type="file" name="file" onChange={handleChange} className={'input'}></input>
        <br />
        <input type="Submit" className={'button'}></input>
      </form>

      {result && <p className={result}>{result}</p>}
    </div>
  )
}

export default App;