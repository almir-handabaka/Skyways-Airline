//import { useUserAuth } from "../context/UserAuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { doc, setDoc, collection, getDocs, where, query, deleteDoc, get  } from "firebase/firestore";
import { db } from "../../firebase";
import { useState, useEffect } from 'react';

const Radnik = () => {
  const[letovi, setLetovi] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(()=> {
    const getLetove = async () => {
      setLetovi([]);
      const q = query(collection(db, "letovi"));

      const querySnapshot = await getDocs(q);
      setLetovi(querySnapshot.docs.map((doc) => ({ ...doc.data(), id:doc.id }) ));
    }

    return () => {
      getLetove();
    };

  }, [])




  return (
    <>
      <Container className="m-3">
        <Row className="justify-content-center">
          <Col xs={10} className="border" >
            
            <div className="list-group">
            {
              letovi && letovi.map((let_info) => {
                return <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-start">
                <span class="p-2 bg-success border border-light rounded-circle mt-auto mb-auto me-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Let u toku">
                    <span class="visually-hidden">Let u toku</span>
                  </span>
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Šifra</div>
                    {let_info.sifra}
                  </div>
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Lokacija</div>
                    {let_info.start + " - " + let_info.end}
                  </div>
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Status</div>
                    Gate closed
                  </div>

                  <div className="ms-2 me-auto">
                    <div className="fw-bold text-center">I</div>
                    25/40
                  </div>

                  <div className="ms-2 me-auto">
                    <div className="fw-bold text-center">II</div>
                    25/40
                  </div>

                  <div className="ms-2 me-auto">
                    <div className="fw-bold text-center">III</div>
                    25/40
                  </div>

                  <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-outline-dark" onClick={handleShow}>Prodaja</button>
                    <button type="button" class="btn btn-outline-dark">Status</button>
                  </div>
                </a>
              })
            }
            
          </div>


          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Prodaja 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-group mb-3 ">
            <span className="input-group-text" id="basic-addon1">I klasa</span>
            <input type="text" className="form-control" aria-label="Email" aria-describedby="basic-addon1" name="cijena_prva_klasa"   />
            <span className="input-group-text text-success" id="basic-addon1">214 $</span>
          </div>
          <div className="input-group mb-3 ">
            <span className="input-group-text" id="basic-addon1">Biznis klasa</span>
            <input type="text" className="form-control" aria-label="Email" aria-describedby="basic-addon1" name="cijena_prva_klasa"   />
            <span className="input-group-text text-success" id="basic-addon1">120 $</span>
          </div>
          <div className="input-group mb-3 ">
            <span className="input-group-text" id="basic-addon1">Ekonomska klasa</span>
            <input type="text" className="form-control" aria-label="Email" aria-describedby="basic-addon1" name="cijena_prva_klasa" />
            <span className="input-group-text text-success" id="basic-addon1">79 $</span>
          </div>
          <hr className="text-danger border-2 opacity-50" />

          <div className="ms-2 me-auto text-center">
            <div className="fw-bold text-center">Totalno</div>
            150 $
          </div>

        </Modal.Body>
        <Modal.Footer>
          <span></span>
          <Button variant="secondary">
            Close
          </Button>
          <Button variant="primary">
            Sačuvaj
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Radnik;