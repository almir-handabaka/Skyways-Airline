import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GiCommercialAirplane } from 'react-icons/gi';



const Letovi = () => {

  return (
    <>
      <div className="m-2 d-flex justify-content-between align-items-start"> 
      <div> 
        <button type="button" class="btn btn-outline-success me-2">Info o avionima</button>
        <button type="button" class="btn btn-outline-success">Novi let</button>
      </div>
        <button type="button" class="btn btn-outline-success"> <GiCommercialAirplane /> Flight Tracker</button>
      </div>

      <hr className="text-danger border-2 opacity-50" />

      <div className="list-group">
        <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-start">
        <span class="p-2 bg-success border border-light rounded-circle mt-auto mb-auto me-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Let u toku">
            <span class="visually-hidden">Let u toku</span>
          </span>
          <div className="ms-2 me-auto">
            <div className="fw-bold">Šifra</div>
            5KIGNR598N
          </div>
          <div className="ms-2 me-auto">
            <div className="fw-bold">Lokacija</div>
            Sarajevo - Zagreb
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
            <button type="button" class="btn btn-outline-dark">Info</button>
          </div>


        </a>
        <a href="#" className="list-group-item list-group-item-action">A third link item</a>
        <a href="#" className="list-group-item list-group-item-action">A fourth link item</a>
        <a className="list-group-item list-group-item-action disabled">A disabled link item</a>
      </div>
    </>
  )
}

export default Letovi;