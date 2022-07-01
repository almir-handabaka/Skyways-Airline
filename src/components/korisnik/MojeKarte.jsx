import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useUserAuth } from "../../context/UserAuthContext";
import { db } from "../../firebase";
import { orderBy, runTransaction, doc, setDoc, collection, getDocs, where, query, deleteDoc  } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';




const MojeKarte = () => {
	const [letovi, setLetovi] = useState([]);
	const [sort, setSort] = useState("najnovije");
	const [userTickets, setUserTickets] = ([]);

	const { user } = useUserAuth();
	console.log("user", user);

	const handleInput = (event) => {
    const {name, value} = event.target;
    console.log(name, value)
   // setPretraga({...pretraga, [name]: value});
 	}

	const handleSort = (event) => {
 		const {name, value} = event.target;
 		console.log(typeof value)
 		getLetove(value);
	}

	const getLetove = async (sortParam) => {
		if(typeof(user) === 'null' ||  typeof(user.tickets) === 'undefined')
			return;
		
		console.log(["saddsad", "kskksks", "kskksks", "kskksks", "kskksks", "kskksks"])
		const letoviRef = collection(db, "letovi");
    	const q1 = query(letoviRef, where("id", "in", user.tickets), orderBy("datum", sortParam));
    	const querySnapshot = await getDocs(q1);
    	querySnapshot.forEach((docq) => {
					console.log(docq.id, " => ", docq.data());
    		});
      	setLetovi([]);
      	
      	setLetovi(querySnapshot.docs.map((doc) => ({ ...doc.data(), id:doc.id }) ));
    }

	useEffect(()=> {
	   	return () => {
	     	getLetove("asc");
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
					<select name="sortiranje" onChange= {handleSort} class="form-select form-select-sm" aria-label=".form-select-sm example">
					  <option value="desc" defaultValue>Najnovije</option>
					  <option value="asc">Najstarije</option>
					</select>
				</div>
			  </div>
			</div>
              
          </Col>
        </Row>


  <Row className="justify-content-center" xs={12}>
  {
	          letovi && letovi.map((let_info) => {
	            return <Col xs={5} className="border ms-2 mt-2 position-relative">
	            	<Row>
	            		<Col>
	            			<span class="fw-light">Ka: </span>
	            			<span class="">{let_info.end}</span>
	            		</Col>
	            		<Col>
	            			<span class="fw-light">Šifra leta: </span>
	            			<span class="">{let_info.sifra_leta}</span>
	            		</Col>
	            		<Col>
	            			<span class="fw-light">Klasa: </span>
	            			<span class="">klasa</span>
	            		</Col>
	            	</Row>

	            	<Row>
	            		<Col>
	            			<span class="fw-light">Od: </span>
	            			<span class="">{let_info.start}</span>
	            		</Col>
	            		<Col>
	            			<span class="fw-light">Datum: </span>
	            			<span class="">{let_info.datum}</span>
	            		</Col>
	            		<Col>
	            			<span class="fw-light">Vrijeme poletanja: </span>
	            			<span class="">{let_info.vrijeme}</span>
	            		</Col>
	            		
	            	</Row>
	            	<div className= "position-absolute top-0 end-0">
		            		<div class="dropdown">
										  <button class="btn btn-light btn-sm" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
										    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
												  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
												</svg>
										  </button>
										  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
										    <li><a class="dropdown-item" href="#">Refund</a></li>
										    <li><a class="dropdown-item" href="#">Another action</a></li>
										    <li><a class="dropdown-item" href="#">Something else here</a></li>
										  </ul>
										</div>
	            		</div>
	            </Col>
	          })
	        }
  </Row>



        
      </Container>

      	
    </>
  )
}

export default MojeKarte;