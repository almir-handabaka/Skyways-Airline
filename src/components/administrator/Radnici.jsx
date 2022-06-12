import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Radnici = () => {

  return (
    <>
      <div className="m-2"> <button type="button" class="btn btn-outline-success">Novi uposlenik</button>
      </div>
      <hr className="text-danger border-2 opacity-50" />

      <div className="list-group">
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
    </>
  )
}

export default Radnici;