import React, { useState } from 'react';

const Question = ({ question, onNextQuestion }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setAnswer('');
    onNextQuestion();
  };

  return (
    <div className="question">
      <form onSubmit={handleSubmit}>
        <label>{question}</label>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />
        <button type="submit">Continuar</button>
      </form>
    </div>
  );
};

export default Question;
