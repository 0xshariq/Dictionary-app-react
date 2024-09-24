import React, { useState, useEffect } from "react";

function Dictionary() {
  const [word, setWord] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setWord(event.target.value);
  };

  const updateWord = async () => {
    if (word.trim() === "") {
      setError("Please enter a word");
      setData(null);
      return;
    }

    try {
      const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Word not found");
      }
      const data = await response.json();
      setData(data);
      setError("");
    } catch (error) {
      console.error(error);
      setError(error.message);
      setData(null);
    }
  };

  const handleSubmit = () => {
    if (word.trim() !== "") {
      updateWord();
    }
  };

  const handleReset = () => {
    setWord("");
    setData(null);
    setError("");
  };

  return (
    <div className="container flex justify-center items-center my-10">
      <div className="contain w-9/12 flex flex-col justify-evenly items-center border mx-10">
        <h1>Dictionary App Using React JS</h1>
        <label htmlFor="inputBox">Enter a word:</label>
        <br />
        <input
          type="text"
          name="word"
          id="inputBox"
          onChange={handleChange}
          value={word}
        />
        <div className="msg">
          {error && <p className="error">{error}</p>}
          {data && data[0] && (
            <>
              <p className="word">Word: {data[0].word}</p>
              {/* audio of the word  */}
              {data[0].phonetics[0] && (
                <audio controls src={data[0].phonetics[0].audio}>
                  Your browser does not support the audio element.
                </audio>
              )}
              {data[0].meanings.map((meaning, index) => (
                <div key={index} className="meaning-block">
                  {/* <p className="part-of-speech">
                    Part of Speech: {meaning.partOfSpeech}
                  </p> */}
                  {/* definition */}
                  {meaning.definitions.map((def, defIndex) => (
                    <p key={defIndex} className="meaning">
                      Definition {defIndex + 1}: {def.definition}
                    </p>
                  ))}
                </div>
              ))}
            </>
          )}
        </div>
        <div className="btn ">
          <input
            type="button"
            value="Submit"
            id="submit"
            onClick={handleSubmit}
            className="btn"
          />
          <input
            type="button"
            value="Reset"
            id="reset"
            onClick={handleReset}
            className="btn"
          />
        </div>
      </div>
    </div>
  );
}

export default Dictionary;
