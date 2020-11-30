import React, { useState, useEffect } from 'react';
import TutorialDataService from '../services/tutorial.service';

const Tutorial = (props) => {
  const [ currentTutorial, setCurrentTutorial ] = useState({
    id: null,
    title: '',
    description: '',
    published: false
  });

  const [ message, setMessage ] = useState('');

  const onChangeTitle = e => setCurrentTutorial(
    prevState => ({
      ...prevState,
      title: e.target.value
    })
  );

  const onChangeDescription = e => setCurrentTutorial(
    prevState => ({
      ...prevState,
      description: e.target.value
    })
  );

  const getTutorial = id => TutorialDataService.get(id)
    .then(response => {
      setCurrentTutorial(response.data)
    })
    .catch(e => {
      console.log(e);
    });

  const updatePublished = status => {
    const data = {
      ...currentTutorial,
      published: status
    }

    TutorialDataService.update(currentTutorial.id, data)
      .then(response => {
        setCurrentTutorial(
          prevState => ({
            ...prevState,
            published: status
          })
        );
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  const updateTutorial = () => {
    TutorialDataService.update(
      currentTutorial.id,
      currentTutorial
    )
      .then(response => {
        console.log(response.data);
        setMessage('The tutorial was updated successfully!');
      })
      .catch(e => {
        console.log(e);
      })
  }

  const deleteTutorial = () => {
    TutorialDataService.delete(currentTutorial.id)
      .then(response => {
        console.log(response.data);
        props.history.push('/tutorials');
      })
  }

  useEffect(() => {
    getTutorial(props.match.params.id)
  }, [props.match.params.id]);

  return (
    <div>
      {currentTutorial ? (
        <div className="edit-form">
          <h4>Tutorial</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={currentTutorial.title}
                onChange={onChangeTitle}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={currentTutorial.description}
                onChange={onChangeDescription}
              />
            </div>
            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentTutorial.published ? "Published" : "Pending"}
            </div>
          </form>

          <button
            className="badge badge-primary mr-2"
            onClick={() => updatePublished(!currentTutorial.published)}
          >
            {currentTutorial.published ? "Unpublish" : "Publish"}
          </button>

          <button
            className="badge badge-danger mr-2"
            onClick={deleteTutorial}
          >
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateTutorial}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  )
}

export default Tutorial;