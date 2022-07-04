import 'bootstrap/dist/css/bootstrap.min.css';
import { GiCommercialAirplane } from 'react-icons/gi';
import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { db } from "../../firebase";
import { doc, setDoc, collection, getDocs, query, } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';


const Letovi = () => {
  const [show, setShow] = useState(false);
  const [noviLet, setLet] = useState({start: "", end:"", prva_klasa:0, biznis_klasa:0, ekonomska_klasa:0, cijena_prva_klasa:0, cijena_biznis_klasa:0, cijena_ekonomska_klasa:0, datum: "", vrijeme: "", status:"", avion:"", sifra_leta:"", id:"", karte_biznis: [], karte_prva:[], karte_ekonomska:[]});
  const [edit, setEdit] = useState(false);
  const[letovi, setLetovi] = useState([]);

  const handleClose = () => {
    setShow(false); 
    setEdit(false); 
    setLet({start: "", end:"", prva_klasa:0, biznis_klasa:0, ekonomska_klasa:0, cijena_prva_klasa:0, cijena_biznis_klasa:0, cijena_ekonomska_klasa:0, datum: "", vrijeme: "", status:"", avion:"", sifra_leta:"", id:""})
   console.log("handleClose")
  };

  const handleShow = () => {
    setShow(true);
  };


  const handleInput = (event) => {
    const {name, value} = event.target;
    setLet({...noviLet, [name]: value});
  }

  const editLet = (let_info) => {
    setEdit(true)
    setLet(let_info);
    return handleShow();
  }

  const prikaziModal = () => {
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let nova_sifra = "";
    for (var i = 0; i < 10; i++)
      nova_sifra += possible.charAt(Math.floor(Math.random() * possible.length));
    setLet({...noviLet, ["sifra_leta"]: nova_sifra, ["id"]: uuidv4()});
    
    setShow(true);
  }

  const dodajLet = async () => {
  
    console.log(noviLet);
    try{
      await setDoc(doc(db, "letovi", noviLet.id), noviLet);
      if(edit === true){
        setEdit(false);
        handleClose();
      }
      let novi_letovi = letovi.concat(noviLet)
      setLetovi(novi_letovi);
    } catch(error){
      console.log("greska prilikom kreiranja letova");
      console.log(error.message);
    } 

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
      <div className="m-2 d-flex justify-content-between align-items-start"> 
      <div> 
        <button type="button" class="btn btn-outline-success me-2">Info o avionima</button>
        <button type="button" class="btn btn-outline-success" onClick={prikaziModal}>Novi let</button>
      </div>
        <button type="button" class="btn btn-outline-success"> <GiCommercialAirplane /> Flight Tracker</button>
      </div>

      <hr className="text-danger border-2 opacity-50" />

      <div className="list-group">
        {
          letovi && letovi.map((let_info) => {
            return <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-start">
            <span class="p-2 bg-success border border-light rounded-circle mt-auto mb-auto me-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Let u toku">
                <span class="visually-hidden">Let u toku</span>
              </span>
              <div className="ms-2 me-auto">
                <div className="fw-bold">Šifra</div>
                {let_info.sifra_leta}
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
                <div className="fw-bold">Avion</div>
                SWA5406
              </div>

              <div>
                <button type="button" class="btn btn-outline-dark" onClick={() => editLet(let_info)} >Edit</button>
              </div>


            </a>
          })
        }
        
      </div>
      

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            { edit ? "Uređivanje leta":"Novi let"  }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Od</span>
          <input type="text" className="form-control" aria-label="Email" aria-describedby="basic-addon1" name="start" value={noviLet.start} onChange={handleInput} />
          <span className="input-group-text" id="basic-addon1">Do</span>
          <input type="text" className="form-control" aria-label="Šifra" aria-describedby="basic-addon1" name="end" value={noviLet.end} onChange={handleInput}  />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">I</span>
          <input type="number" className="form-control" placeholder="Prva klasa" aria-label="Email" aria-describedby="basic-addon1" name="prva_klasa" value={noviLet.prva_klasa} onChange={handleInput}  />
          <span className="input-group-text" id="basic-addon1">II</span>
          <input type="number" className="form-control" placeholder="Biznis klasa" aria-label="Šifra" aria-describedby="basic-addon1" name="biznis_klasa" value={noviLet.biznis_klasa} onChange={handleInput}   />
          <span className="input-group-text" id="basic-addon1">III</span>
          <input type="number" className="form-control" placeholder="Ekonomska klasa" aria-label="Šifra" aria-describedby="basic-addon1" name="ekonomska_klasa" value={noviLet.ekonomska_klasa} onChange={handleInput}   />
        </div>


        <div className="input-group mb-3">
          <span className="input-group-text text-success" id="basic-addon1">$</span>
          <input type="text" className="form-control" aria-label="Email" aria-describedby="basic-addon1" name="cijena_prva_klasa" value={noviLet.cijena_prva_klasa} onChange={handleInput}  />
          <span className="input-group-text text-success" id="basic-addon1">$</span>
          <input type="text" className="form-control" aria-label="Šifra" aria-describedby="basic-addon1" name="cijena_biznis_klasa" value={noviLet.cijena_biznis_klasa} onChange={handleInput}  />
          <span className="input-group-text text-success" id="basic-addon1">$</span>
          <input type="text" className="form-control" aria-label="Šifra" aria-describedby="basic-addon1" name="cijena_ekonomska_klasa" value={noviLet.cijena_ekonomska_klasa} onChange={handleInput}  />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Datum</span>
          <input type="date" className="form-control" aria-label="Email" aria-describedby="basic-addon1" name="datum" value={noviLet.datum} onChange={handleInput}  />
          <span className="input-group-text" id="basic-addon1">Vrijeme</span>
          <input type="time" className="form-control" aria-label="Šifra" aria-describedby="basic-addon1" name="vrijeme" value={noviLet.vrijeme} onChange={handleInput}   />
        </div>

        <Modal.Footer>
          <span></span>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={dodajLet}>
            Sačuvaj
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Letovi;