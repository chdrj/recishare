import { useState, useContext, useEffect } from 'react';
import { Card, Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';
import { UserContext } from '../contexts/userContext';
import { getSavedRecipe } from '../services/savedService';
import { rateRecipe, saveRecipe, unsaveRecipe } from "../services/saveRateService.js";
import './SavedFeed.css';

const SavedFeed = () => {
  const [show, setShow] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [savedFeed, setSavedFeed] = useState([]);
  const [rating, setRating] = useState(''); // State to store the rating
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchSavedFeed = async () => {
      const feed = await getSavedRecipe(user.id);
      if (feed.success) {
        setSavedFeed(feed.data);
      } else {
        console.error(feed.error);
      }
    };

    fetchSavedFeed();
  }, [user.id]);

  const handleClose = () => setShow(false);
  const handleShow = (recipe) => {
    setSelectedRecipe(recipe);
    setShow(true);
  };
  const handleSave = async () => {
    if (selectedRecipe) {
      const result = await saveRecipe(user.id, selectedRecipe._id);
      if (result.success) {
        alert("Recipe saved successfully!");
      }
      else {
        alert("Recipe already saved!");
      }
    }
  };

  const handleUnsave = async () => {
    if (selectedRecipe) {
      const result = await unsaveRecipe(user.id, selectedRecipe._id);
      if (result.success) {
        alert("Recipe unsaved successfully!");
      }
      else {
        alert("Recipe not saved!");
      }
    }
  };

  const handleRateChange = (event) => {
    setRating(event.target.value); // Capture the rating value
  };

  const handleRate = async () => {
    if (selectedRecipe) {
      const numericRating = Number(rating); // Convert rating to a number
      if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
        alert("Please enter a valid rating between 1 and 5.");
        return;
      }
      const result = await rateRecipe(user.id, selectedRecipe._id, numericRating); // Pass the rating value
      if (result.success) {
        alert("Recipe rated successfully!");
      }
    }
  };


  return (
    <>
      <Container className="saved-container">
        <Row className="align-items-stretch">
          <Card.Title className="text-center">Your Saved Recipes:</Card.Title>
        </Row>
      </Container>

      <Container className="saved-container">
        <Row className="justify-content-center">
          <Col>
            {savedFeed.map((recipe) => (
              <div key={recipe.id} className="mb-2">
                <Card onClick={() => handleShow(recipe)} style={{ cursor: 'pointer' }}>
                  <Row className="align-items-stretch">
                    <Col>
                      <Card.Body>
                        <Card.Title>{recipe.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Author: {recipe.user.username}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">Date: {recipe.createdAt.slice(0, 10)}</Card.Subtitle>
                        <Card.Text>{recipe.description}</Card.Text>
                        <ul className="list-group list-group-flush">
                          {recipe.ingredients.map((ingredient, index) => (
                            <li key={index} className="list-group-item">
                              {ingredient}
                            </li>
                          ))}
                        </ul>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        {selectedRecipe && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedRecipe.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img src={selectedRecipe.image.url} alt={selectedRecipe.title} className="img-fluid mb-4" />
              <h5>Author</h5>
              <p>{selectedRecipe.user.username}</p>
              <h5>Date</h5>
              <p>{selectedRecipe.createdAt.slice(0, 10)}</p>
              <h5>Average Rating</h5>
              <p>{selectedRecipe.averageRating}</p>
              <h5>Description</h5>
              <p>{selectedRecipe.description}</p>
              <h5>Ingredients</h5>
              <ul className="list-group list-group-flush">
                {selectedRecipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="list-group-item">
                    {ingredient}
                  </li>
                ))}
              </ul>
              <Form.Group controlId="formRating">
                <h5>Your rating</h5>
                <Form.Control
                  type="number"
                  placeholder="Enter a number from 1-5"
                  name="rating"
                  value={rating}
                  onChange={handleRateChange}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="dark" onClick={handleRate}>
                Rate
              </Button>
              <Button variant="dark" onClick={handleSave}>
                Save
              </Button>
              <Button variant="dark" onClick={handleUnsave}>
                Unsave
              </Button>
              <Button variant="dark" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
};

export default SavedFeed;
