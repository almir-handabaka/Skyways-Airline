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

        <Row className="justify-content-center">
        	<div className="row row-cols-1 row-cols-md-2 g-4">
						{
	          letovi && letovi.map((let_info) => {
	            return <div class="border">
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
	            </div>
	          })
	        }
          </div>
        </Row>
      </Container>

      	
    </>
  )
}

export default MojeKarte;