import React, { useEffect, useState } from "react";
import { useFirebase } from "../Context/FireBaseContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export const Home = () => {
  const fireBaseContext = useFirebase();
  const [books, setBooks] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  useEffect(() => {
    fireBaseContext.getBookList().then((doc) => {
      setBooks(doc.docs);

      console.log(doc.docs[0]._document.data.value.mapValue.fields);
      fireBaseContext
        .downloadCover(
          doc.docs[0]._document.data.value.mapValue.fields.imageUrl.stringValue
        )
        .then((URL) => setCoverImage(URL));
      console.log(coverImage);
    });
  }, []);

  return (
    <>
      {books.map((book, index) => {
        return (
          <Card className="mt-10" style={{ width: "18rem",
            display:"flex"
           }} key={index}>
            <Card.Img variant="top" src={coverImage} />
            <Card.Body>
              <Card.Title>
                {book._document.data.value.mapValue.fields.bookName.stringValue}
              </Card.Title>
              <Card.Text>{}</Card.Text>
              <Button variant="primary">
                {
                  book._document.data.value.mapValue.fields.bookPrice
                    .stringValue
                }
              </Button>
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
};
