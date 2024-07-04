import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../Context/FireBaseContext";

const Listing = () => {
  const [bookName, setBookName] = useState("");
  const [ISBInumber, setISBInumber] = useState();
  const [Price, setPrice] = useState("");
  const [bookImage, setBookImage] = useState(null);
  const fireBaseContext = useFirebase();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fireBaseContext.handleBookUploadListing(
        bookName,
        Price,
        ISBInumber,
        bookImage
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container m-5 ">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter Book Name </Form.Label>
            <Form.Control
              onChange={(e) => {
                setBookName(e.target.value);
              }}
              value={bookName}
              type="text"
              placeholder="Book Name "
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label> Enter ISBI Number</Form.Label>
            <Form.Control
              onChange={(e) => {
                setISBInumber(e.target.value);
              }}
              value={ISBInumber}
              type="Number"
              placeholder="ISBI Number"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label> Enter the Price </Form.Label>
            <Form.Control
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              type="number"
              placeholder="Price"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label> Upload Book Cover</Form.Label>
            <Form.Control
              onChange={(e) => {
                setBookImage(e.target.files[0]);
              }}
              type="file"
              placeholder="Cover Image"
            />
          </Form.Group>

          <Button variant="success" type="submit" onClick={submitHandler}>
            Submit Book
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Listing;
