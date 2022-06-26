//import { useUserAuth } from "../context/UserAuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import { runTransaction, doc, setDoc, collection, getDocs, where, query, deleteDoc, get, updateDoc, arrayUnion, arrayRemove  } from "firebase/firestore";
import { db } from "../../firebase";
import { useState, useEffect } from 'react';


const default_values = {prva_klasa: [], biznis_klasa: [], ekonomska_klasa: [], cijena_prva_klasa:0, cijena_biznis_klasa:0, cijena_ekonomska_klasa:0, id:"", totalna_cijena:0}


const Radnik = () => {
  const [letovi, setLetovi] = useState([]);
  const [show, setShow] = useState(false);
  const [idLeta, setIdLeta] = useState("");
  const [karte, setKarte] = useState(default_values);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const otvoriModalZaProdaju = (let_info) => {
    setKarte({...karte, ["cijena_prva_klasa"]: let_info.cijena_prva_klasa, ["cijena_biznis_klasa"]: let_info.cijena_biznis_klasa, ["cijena_ekonomska_klasa"]: let_info.cijena_ekonomska_klasa, ["id"]: let_info.id, totalna_cijena:0 });
    console.log(karte)
    handleShow();
  }



  const sacuvajProdaju = async () => {

    const letoviRef = doc(db, "letovi", karte.id);


    // promjeniti u jednu transakciju, koristiti jedan niz/mapu za letove
    // za radnikovu prodaju koristiti id radnika koji je prodao ili generisati id za sale
    

    try {
      await runTransaction(db, async (transaction) => {
        const sfDoc = await transaction.get(letoviRef);
        if (!sfDoc.exists()) {
          throw "Document does not exist!";
        }

        let newKarte_biznis = sfDoc.data().karte_biznis;
        let newKarte_prva = sfDoc.data().karte_prva;
        let newKarte_ekonomska = sfDoc.data().karte_ekonomska;

        newKarte_biznis = newKarte_biznis.concat(karte.biznis_klasa);
        newKarte_prva = newKarte_prva.concat(karte.prva_klasa);
        newKarte_ekonomska = newKarte_ekonomska.concat(karte.ekonomska_klasa);
        
        console.log("--------------")
        console.log(karte.biznis_klasa, karte.prva_klasa, karte.ekonomska_klasa)

        transaction.update(letoviRef, { karte_biznis: newKarte_biznis, karte_prva: newKarte_prva, karte_ekonomska:newKarte_ekonomska });
      });
        console.log("Transaction successfully committed!");
      } catch (e) {
        console.log("Transaction failed: ", e);
      }

    

  }


  const handleInput = (event) => {
    const {name, value} = event.target;
    if(typeof value !== 'undefined'){
      let tmp_lista = []
      for(let i = 0;i<parseInt(value);i++){
        tmp_lista.push(value)
      }
      console.log(tmp_lista)
      setKarte({...karte, [name]: tmp_lista});
    }
    
  }

  useEffect(() => {
    let totalna_cijena = parseInt(karte.prva_klasa.length) * karte.cijena_prva_klasa + parseInt(karte.biznis_klasa.length) * karte.cijena_biznis_klasa + parseInt(karte.ekonomska_klasa.length) * karte.cijena_ekonomska_klasa;
      setKarte({...karte, ["totalna_cijena"]: totalna_cijena});

  }, [karte.prva_klasa, karte.biznis_klasa, karte.ekonomska_klasa])


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
                <span className="p-2 bg-success border border-light rounded-circle mt-auto mb-auto me-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Let u toku">
                    <span className="visually-hidden">Let u toku</span>
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
                    {(typeof let_info.karte_prva !== 'undefined') ? let_info.karte_prva.length:0}/{let_info.prva_klasa}
                  </div>

                  <div className="ms-2 me-auto">
                    <div className="fw-bold text-center">II</div>
                    {(typeof let_info.karte_biznis !== 'undefined') ? let_info.karte_biznis.length:0}/{let_info.biznis_klasa}
                  </div>

                  <div className="ms-2 me-auto">
                    <div className="fw-bold text-center">III</div>
                    {(typeof let_info.karte_ekonomska !== 'undefined') ? let_info.karte_ekonomska.length:0}/{let_info.ekonomska_klasa}
                  </div>

                  <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-outline-dark" onClick={() => otvoriModalZaProdaju(let_info)}>Prodaja</button>
                    
                  </div>
                </a>
              })
            }
            
          </div>


          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={() => {handleClose(); setKarte(default_values);}}>
        <Modal.Header closeButton>
          <Modal.Title>
            Prodaja 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-group mb-3 ">
            <span className="input-group-text" id="basic-addon1">I klasa</span>
            <input type="text" className="form-control" aria-label="Email" aria-describedby="basic-addon1" name="prva_klasa" value={karte.prva_klasa.length}  onChange={handleInput}  />
            <span className="input-group-text text-success" id="basic-addon1">{karte.cijena_prva_klasa} $</span>
          </div>
          <div className="input-group mb-3 ">
            <span className="input-group-text" id="basic-addon1">Biznis klasa</span>
            <input type="text" className="form-control" aria-label="Email" aria-describedby="basic-addon1" name="biznis_klasa" value={karte.biznis_klasa.length}  onChange={handleInput} />
            <span className="input-group-text text-success" id="basic-addon1">{karte.cijena_biznis_klasa} $</span>
          </div>
          <div className="input-group mb-3 ">
            <span className="input-group-text" id="basic-addon1">Ekonomska klasa</span>
            <input type="text" className="form-control" aria-label="Email" aria-describedby="basic-addon1" name="ekonomska_klasa" value={karte.ekonomska_klasa.length}  onChange={handleInput} />
            <span className="input-group-text text-success" id="basic-addon1">{karte.cijena_ekonomska_klasa} $</span>
          </div>
          <hr className="text-danger border-2 opacity-50" />

          <div className="ms-2 me-auto text-center">
            <div className="fw-bold text-center">Totalno</div>
            {karte.totalna_cijena} $
          </div>

        </Modal.Body>
        <Modal.Footer>
          <span></span>
          <Button variant="secondary">
            Close
          </Button>
          <Button variant="primary" onClick={sacuvajProdaju} >
            Sačuvaj
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Radnik;