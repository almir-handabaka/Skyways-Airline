import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useUserAuth } from "../../context/UserAuthContext";
import { db } from "../../firebase";
import { doc, setDoc, collection, getDocs, where, query } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

const Radnici = () => {
  const [radnici, setRadnike] = useState([]);
  const [noviRadnik, setNoviRadnik] = useState({password: "", email:""});
  const [show, setShow] = useState(false);
  const [poruka, setPoruka] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { signUp } = useUserAuth();


  const handleInput = (event) => {
    const {name, value} = event.target;
    setNoviRadnik({...noviRadnik, [name]: value});
  }

  const dodajNovogRadnika = async () => {
    let nova_sifra = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 15);
    setNoviRadnik({...noviRadnik, ["password"]: nova_sifra});

    try{
      await signUp(noviRadnik.email, noviRadnik.password);
      const new_user = {
        email: noviRadnik.email,
        id: uuidv4(),
        type: "employee",
        tickets: []
      }
      console.log("kreiranje profila");

      await setDoc(doc(db, "users", new_user.id), new_user);
      console.log(new_user);

    } catch(error){
      console.log(error.message);
      setPoruka("Greska prilikom kreiranja profila!")
    }

    
    navigator.clipboard.writeText(noviRadnik.password); // kopira sifru za copy & paste
    setPoruka("Šifra kopirana u clipboard!");
  }

  const ucitajRadnike = async () => {

  }

  useEffect(()=> {
    const unsubscribe = async () => {
      setRadnike([]);
      const q = query(collection(db, "users"), where("type", "==", "employee"));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
         let tmp_radnici = radnici;
         tmp_radnici.push(doc.data());
         setRadnike(tmp_radnici);
      });


    }

    return () => {
      unsubscribe();
    };

  }, [])


  return (
    <>
      <div className="m-2"> <button type="button" className="btn btn-outline-success" onClick={handleShow}>Novi uposlenik</button>
      </div>
      <hr className="text-danger border-2 opacity-50" />

      {
        radnici.map((radnik) => {
          return <div className="list-group">
        <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-start">
          <span class="p-2 bg-success border border-light rounded-circle mt-auto mb-auto me-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Let u toku">
          <span class="visually-hidden">Online</span>
          </span>
          <div className="ms-2 me-auto">
            <div className="fw-bold">Korisničko ime</div>
            almir_handabaka
          </div>
          <div className="ms-2 me-auto">
            <div className="fw-bold">Status</div>
            Administrator
          </div>
        </a>

      </div>
        })
      }



      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Novi radnik</Modal.Title>
        </Modal.Header>
        <Modal.Body>Unesite email i sistem će da generiše šifru.</Modal.Body>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Email</span>
          <input type="email" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" name="email" value={noviRadnik.email} onChange={handleInput} />
          <span className="input-group-text" id="basic-addon1">Šifra</span>
          <input type="text" className="form-control" aria-label="Šifra" aria-describedby="basic-addon1" name="password" value={noviRadnik.password} disabled />
        </div>

        <Modal.Footer>
          <span>{poruka}</span>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={dodajNovogRadnika}>
            Generiši šifru
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Radnici;