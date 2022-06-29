import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useUserAuth } from "../../context/UserAuthContext";
import { db } from "../../firebase";
import { runTransaction, doc, setDoc, collection, getDocs, where, query, deleteDoc  } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';




const MojeKarte = () => {
	const [letovi, setLetovi] = useState([]);
	const [sort, setSort] = useState("najnovije");
	const [userTickets, setUserTickets] = ([]);

	const { user } = useUserAuth();
	console.log("user", user);

  	const handleInput = (event) => {
	    const {name, value} = event.target;
	   // setPretraga({...pretraga, [name]: value});
	 }

	const getLetove = async () => {
		if(typeof(user) === 'null' ||  typeof(user.tickets) === 'undefined')
			return;

		const letoviRef = collection(db, "letovi");
    	const q1 = query(letoviRef, where("id", "in", ["asd"]));
    	const querySnapshot = await getDocs(q1);
      	setLetovi([]);
      	console.log("4")
      	setLetovi(querySnapshot.docs.map((doc) => ({ ...doc.data(), id:doc.id }) ));
    }

	useEffect(()=> {
	   	return () => {
	     	getLetove();
	   	};

	}, [])
  

  return (
    <>
      <Container className="m-3 mb-4">
        <Row className="justify-content-center">
          <Col xs={12} className="border p-4" >
            <div>
			  <div class="mx-auto">
			  	<div class="dropdown float-end">
					<select class="form-select form-select-sm" aria-label=".form-select-sm example">
					  <option  selected>Najnovije</option>
					  <option onSelect={() => console.log("Selekt")} >Najstarije</option>
					</select>
				</div>
			  </div>
			</div>
              
          </Col>
        </Row>

        <Row className="justify-content-center">
        	<div className="row row-cols-1 row-cols-md-2 g-4">

        
          </div>
        </Row>
      </Container>

      	
    </>
  )
}

export default MojeKarte;