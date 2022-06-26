import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useUserAuth } from "../../context/UserAuthContext";
import { db } from "../../firebase";
import { doc, setDoc, collection, getDocs, where, query, deleteDoc  } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

const Korisnik = () => {

  const [letovi, setLetovi] = useState([]);

  const handleInput = (event) => {
    //const {name, value} = event.target;
    //setNoviRadnik({...noviRadnik, [name]: value});
  }


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
          <Col xs={6} className="border p-4" >
            <form>
              <div className="mb-3">
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Od" />
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Do" />
              </div>
              <div className="mb-3">
                <input type="date" className="form-control" id="exampleFormControlInput1" placeholder="Datum" />
              </div>
                <button type="submit" className="btn btn-primary mx-5">Pretraga</button>
            </form>
          </Col>
        </Row>

        <hr class="border-primary border-3 opacity-75" />

        <Row className="justify-content-center">
        <div class="row row-cols-1 row-cols-md-2 g-4">
        {
            letovi && letovi.map((let_info) => {
                return <div class="col">
                    <div class="card">
                      <img src="..." class="card-img-top" alt="..." />
                      <div class="card-body">
                        <h5 class="card-title">{let_info.id}</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      </div>
                    </div>
                  </div>
                

            })
        }
          </div>
        </Row>
      </Container>
    </>
  )
}

export default Korisnik;