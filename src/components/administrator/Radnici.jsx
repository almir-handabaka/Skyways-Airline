import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useUserAuth } from "../../context/UserAuthContext";
import { db } from "../../firebase";
import { doc, setDoc, collection, getDocs, where, query, deleteDoc  } from "firebase/firestore";
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


  const deleteUposlenika = async (radnik_id) => {
    try{
      await deleteDoc(doc(db, "users", radnik_id));
      let tmp_radnici = radnici.filter(word => word.id !== radnik_id);
      setRadnike(tmp_radnici);
    }catch (error){
      console.log("greska pri brisanju uposlenika");
    }
  } 



  useEffect(()=> {
    const getRadnike = async () => {
      setRadnike([]);
      const q = query(collection(db, "users"), where("type", "in", ["employee", "administrator"]));

      const querySnapshot = await getDocs(q);
      setRadnike(querySnapshot.docs.map((doc) => ({ ...doc.data(), id:doc.id }) ));
    }

    return () => {
      getRadnike();
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
          
          <div className="ms-2 me-auto">
            <div className="fw-bold">Korisničko ime</div>
            {radnik.email}
          </div>
          <div className="ms-2 me-auto">
            <div className="fw-bold">Status</div>
            {radnik.type}
          </div>
          <button type="button" className="btn btn-outline-danger" onClick={() => deleteUposlenika(radnik.id)} >X</button>
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