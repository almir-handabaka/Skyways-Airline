//import { useUserAuth } from "../context/UserAuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Letovi from './Letovi';
import Radnici from './Radnici';


const Administrator = () => {

  return (
    <Container className="m-3">
      <Row>
        <Col xs={8} className="border" >
          <Letovi/>
        </Col>
        <Col xs={4} className="border">
          <Radnici/>
        </Col>
      </Row>
    </Container>
  )
}

export default Administrator;