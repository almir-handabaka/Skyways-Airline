import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useUserAuth } from "../../context/UserAuthContext";
import { db } from "../../firebase";
import { doc, setDoc, collection, getDocs, where, query, deleteDoc  } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

const Korisnik = () => {

  const handleInput = (event) => {
    //const {name, value} = event.target;
    //setNoviRadnik({...noviRadnik, [name]: value});
  }




  return (
    <>
      <Container className="m-3">
        <Row className="justify-content-center">
          <Col xs={10} className="border" >
            <form>
              <div class="mb-3">
                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Od" />
              </div>

              <div class="mb-3">
                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Do" />
              </div>
              <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Korisnik;