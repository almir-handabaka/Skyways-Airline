import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GiCommercialAirplane } from 'react-icons/gi';



const Letovi = () => {

  return (
    <>
      <div className="m-2 d-flex justify-content-between align-items-start"> 
      <div> 
        <button type="button" class="btn btn-outline-success me-2">Prebaci na letove</button>
        <button type="button" class="btn btn-outline-success">Dodaj avion</button>
      </div>
        <button type="button" class="btn btn-outline-success"> <GiCommercialAirplane /> Flight Tracker</button>
      </div>

      <hr className="text-danger border-2 opacity-50" />

      <div className="list-group">
        <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-start">
          <div className="ms-2 me-auto">
            <div className="fw-bold">Šifra</div>
            5KIGNR598N
          </div>
          <div className="ms-2 me-auto">
          <div className="fw-bold">Udaljenost</div>
            SWA
          </div>
          <div className="ms-2 me-auto">
            <div className="fw-bold">First</div>
            10
          </div>
          <div className="ms-2 me-auto">
            <div className="fw-bold">Business</div>
            25
          </div>
          <div className="ms-2 me-auto">
          <div className="fw-bold">Economy</div>
            40
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