import React, { useState } from 'react';
import TutorialDataService from '../services/tutorial.service';

const AddTutorial = () => {
  const [ tutorial, setTutorial ] = useState({
    id: null,
    title: '',
    description: '',
    published: false,
    submitted: false
  });

  const onChangeTitle = e => setTutorial(
    prevState => ({
      ...prevState,
      title: e.target.value
    })
  )

  const onChangeDescription = e => setTutorial(
    prevState => ({
      ...prevState,
      description: e.target.value
    })
  )

  const saveTutorial = () => {
    const data = {
      title: tutorial.title,
      description: tutorial.description
    };

    TutorialDataService.create(data)
      .then(response => {
        setTutorial({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,
          submitted: true
        });
        console.log(response.data)
      })
      .catch(e => {
        console.log(e);
      })
  }

  const newTutorial = () => {
    setTutorial({
      id: null,
      title: '',
      description: '',
      published: false,
      submitted: false
    });
  }

  return (
    <div className="submit-form">
    {tutorial.submitted ? (
      <div>
        <h4>You submitted successfully!</h4>
        <button className="btn btn-success" onClick={newTutorial}>
          Add
        </button>
      </div>
    ) : (
      <div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            required
            value={tutorial.title}
            onChange={onChangeTitle}
            name="title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            required
            value={tutorial.description}
            onChange={onChangeDescription}
            name="description"
          />
        </div>

        <button onClick={saveTutorial} className="btn btn-success">
          Submit
        </button>
      </div>
    )}
    </div>
  )
};

export default AddTutorial;