import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useUserAuth } from "../../context/UserAuthContext";
import { db } from "../../firebase";
import { runTransaction, doc, setDoc, collection, getDocs, where, query, deleteDoc  } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import './korisnik.css';



const default_values = {prva_klasa: [], biznis_klasa: [], ekonomska_klasa: [], cijena_prva_klasa:0, cijena_biznis_klasa:0, cijena_ekonomska_klasa:0, id:"", totalna_cijena:0}


const Korisnik = () => {

  const [letovi, setLetovi] = useState([]);
  const [pretraga, setPretraga] = useState({od: "", do: "", datum: ""});
  const [clearSearch, setClearSearch] = useState(false);
  const [show, setShow] = useState(false);
  const [idLeta, setIdLeta] = useState("");
  const [karte, setKarte] = useState(default_values);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {user} = useUserAuth();
  console.log("user", user)

  const handleInput2 = (event) => {
    const {name, value} = event.target;
    if(typeof value !== 'undefined'){
      let tmp_lista = []
      for(let i = 0;i<parseInt(value);i++){
        tmp_lista.push(user.id)
      }
      console.log(tmp_lista)
      setKarte({...karte, [name]: tmp_lista});
    }
    
  }

  const sacuvajProdaju = async () => {

    const letoviRef = doc(db, "letovi", karte.id);
    const userRef = doc(db, "users", user.id);

    // promjeniti u jednu transakciju, koristiti jedan niz/mapu za letove
    // za radnikovu prodaju koristiti id radnika koji je prodao ili generisati id za sale
    

    try {
      await runTransaction(db, async (transaction) => {
        const sfDoc = await transaction.get(letoviRef);
        const userDoc = await transaction.get(userRef);

        if (!sfDoc.exists() || !userDoc.exists()) {
          throw "Document does not exist!";
        }

        let newKarte_biznis = sfDoc.data().karte_biznis;
        let newKarte_prva = sfDoc.data().karte_prva;
        let newKarte_ekonomska = sfDoc.data().karte_ekonomska;
        let newTickets = userDoc.data().tickets;

        newKarte_biznis = newKarte_biznis.concat(karte.biznis_klasa);
        newKarte_prva = newKarte_prva.concat(karte.prva_klasa);
        newKarte_ekonomska = newKarte_ekonomska.concat(karte.ekonomska_klasa);
        
        newTickets = newTickets.concat(karte.biznis_klasa);
        newTickets = newTickets.concat(karte.prva_klasa);
        newTickets = newTickets.concat(karte.ekonomska_klasa);

        console.log("--------------")
        console.log(karte.biznis_klasa, karte.prva_klasa, karte.ekonomska_klasa)

        transaction.update(letoviRef, { karte_biznis: newKarte_biznis, karte_prva: newKarte_prva, karte_ekonomska:newKarte_ekonomska });
        transaction.update(userRef, { tickets: newTickets })
      });
        console.log("Transaction successfully committed!");
      } catch (e) {
        console.log("Transaction failed: ", e);
      }

    

  }

  const otvoriModalZaProdaju = (let_info) => {
    setKarte({...karte, ["cijena_prva_klasa"]: let_info.cijena_prva_klasa, ["cijena_biznis_klasa"]: let_info.cijena_biznis_klasa, ["cijena_ekonomska_klasa"]: let_info.cijena_ekonomska_klasa, ["id"]: let_info.id, totalna_cijena:0 });
    console.log(karte)
    handleShow();
  }



  const handleInput = (event) => {
    const {name, value} = event.target;
    setPretraga({...pretraga, [name]: value});
  }

  const search = async () => {
    const letoviRef = collection(db, "letovi");

    const q1 = query(letoviRef, where("start", "==", pretraga.od), where("end", "==", pretraga.do), where("datum", "==", pretraga.datum));
    const querySnapshot = await getDocs(q1);
    setLetovi(querySnapshot.docs.map((doc) => ({ ...doc.data(), id:doc.id }) ));
    setClearSearch(true);
  }

  const ocistiPretragu = async () => {
    getLetove();
    setClearSearch(false);
  }


  const getLetove = async () => {
      setLetovi([]);
      const q = query(collection(db, "letovi"));

      const querySnapshot = await getDocs(q);
      setLetovi(querySnapshot.docs.map((doc) => ({ ...doc.data(), id:doc.id }) ));
    }

  useEffect(()=> {
    return () => {
      getLetove();
    };

  }, [])

  useEffect(() => {
    let totalna_cijena = parseInt(karte.prva_klasa.length) * karte.cijena_prva_klasa + parseInt(karte.biznis_klasa.length) * karte.cijena_biznis_klasa + parseInt(karte.ekonomska_klasa.length) * karte.cijena_ekonomska_klasa;
      setKarte({...karte, ["totalna_cijena"]: totalna_cijena});

  }, [karte.prva_klasa, karte.biznis_klasa, karte.ekonomska_klasa])


  return (
    <>
      <Container className="m-3 mb-4">
        <Row className="justify-content-center">
          <Col xs={6} className="border p-4" >
            <p class="text-center">Pretraga</p>

              <div className="mb-3">
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Od" name="od" value={pretraga.od} onChange={handleInput} />
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Do"  name="do" value={pretraga.do} onChange={handleInput} />
              </div>
              <div className="mb-3">
                <input type="date" className="form-control" id="exampleFormControlInput1" placeholder="Datum"  name="datum" value={pretraga.datum} onChange={handleInput} />
              </div>
              <button onClick={search} className="btn btn-primary">Pretraga</button>
              {clearSearch ? (<button onClick={ocistiPretragu} className="btn btn-primary ms-2">Očisti</button>): "" }
              
          </Col>
        </Row>

        <hr class="border-primary border-3 opacity-75" />

        <Row className="justify-content-center">
        <div className="row row-cols-1 row-cols-md-2 g-4">

        {(clearSearch && letovi.length === 0) ? (<p class="text-danger">Nema letova s tim parametrima.</p>) : ""}
        {
          letovi && letovi.map((let_info) => {
            return <div className="col">
                <div className="card chover">
                  <img src="" className="card-img-top" alt="" />
                  <div className="card-body">
                    <h5 className="card-title text-danger fs-5">{let_info.end}</h5>
                    <p className="card-text">iz {let_info.start}</p>
                    <p className="text-end text-success fs-5 fw-bold">{let_info.cijena_ekonomska_klasa} BAM</p>
                    <div className="d-grid gap-2">
                      <button className="btn btn-warning" type="button" onClick={() => otvoriModalZaProdaju(let_info)}>Kupi sada</button>
                    </div>
                  </div>
                </div>
              </div>
          })
        }
          </div>
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
            <input type="text" className="form-control" aria-label="Email" aria-describedby="basic-addon1" name="prva_klasa" value={karte.prva_klasa.length}  onChange={handleInput2}  />
            <span className="input-group-text text-success" id="basic-addon1">{karte.cijena_prva_klasa} $</span>
          </div>
          <div className="input-group mb-3 ">
            <span className="input-group-text" id="basic-addon1">Biznis klasa</span>
            <input type="text" className="form-control" aria-label="Email" aria-describedby="basic-addon1" name="biznis_klasa" value={karte.biznis_klasa.length}  onChange={handleInput2} />
            <span className="input-group-text text-success" id="basic-addon1">{karte.cijena_biznis_klasa} $</span>
          </div>
          <div className="input-group mb-3 ">
            <span className="input-group-text" id="basic-addon1">Ekonomska klasa</span>
            <input type="text" className="form-control" aria-label="Email" aria-describedby="basic-addon1" name="ekonomska_klasa" value={karte.ekonomska_klasa.length}  onChange={handleInput2} />
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

export default Korisnik;