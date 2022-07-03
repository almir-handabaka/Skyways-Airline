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
	const [sort, setSort] = useState("desc");
	const [userTickets, setUserTickets] = ([]);

	const { user } = useUserAuth();

	
	const handleSort = (event) => {
 		const {name, value} = event.target;
 		console.log(typeof value)
 		getLetove(value);
	}

	const getLetove = async (sortParam) => {
		if(typeof(user) === 'null' ||  typeof(user.tickets) === 'undefined')
			return;
		
		const letoviRef = collection(db, "letovi");
    const userRef = doc(db, "users", user.id);

		try {
      await runTransaction(db, async (transaction) => {
        const userDoc = await transaction.get(userRef);

        if (!userDoc.exists()) {
          throw "Document does not exist!";
        }				

				//const querySnapshot = await transaction.get(collection(db, letoviRef));

        let tmp_letovi = []

         for await (const results of userDoc.data().tickets) {
				    const tmplet = await transaction.get(doc(db, "letovi", results.id_leta));
        		tmp_letovi.push({...tmplet.data(), ...results})
				  }
				  //console.log(tmp_letovi)
				  setLetovi(tmp_letovi)
        
      });
        console.log("Transaction successfully committed!");
      } catch (e) {
        console.log("Transaction failed: ", e);
      }

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
			  <div className="mx-auto">
			  	<div className="dropdown float-end">
					<select name="sortiranje" onChange= {handleSort} className="form-select form-select-sm" aria-label=".form-select-sm example">
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
	            			<span className="fw-light">Ka: </span>
	            			<span className="">{let_info.end}</span>
	            		</Col>
	            		<Col>
	            			<span className="fw-light">Šifra leta: </span>
	            			<span className="">{let_info.sifra_leta}</span>
	            		</Col>
	            		<Col>
	            			<span className="fw-light">Klasa: </span>
	            			<span className="">{let_info.klasa}</span>
	            		</Col>
	            	</Row>

	            	<Row>
	            		<Col>
	            			<span className="fw-light">Od: </span>
	            			<span className="">{let_info.start}</span>
	            		</Col>
	            		<Col>
	            			<span className="fw-light">Datum: </span>
	            			<span className="">{let_info.datum}</span>
	            		</Col>
	            		<Col>
	            			<span className="fw-light">Vrijeme poletanja: </span>
	            			<span className="">{let_info.vrijeme}</span>
	            		</Col>
	            		
	            	</Row>
	            	<div className= "position-absolute top-0 end-0">
		            		<div className="dropdown">
										  <button className="btn btn-light btn-sm" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
										    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
												  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
												</svg>
										  </button>
										  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
										    <li><a className="dropdown-item" href="#">Refund</a></li>
										   
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