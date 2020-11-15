import React from 'react';
import map from '../../../../image/logos/map-marker-alt-solid 1.png';
import bed from '../../../../image/logos/bed 1.png';
import bath from '../../../../image/logos/bath 1.png';

const HouseRentDetails = ({ houseRentData }) => {
    return (

        <div className="col-md-4">
            <div className="card mt-4">
                <img className="card-img-top" src={houseRentData.img} alt="" />
                <div className="card-body">
                    <h4 className="card-title">{houseRentData.title}</h4>
                    <div className="d-flex mb-2">

                        <img style={{ height: "20px" }} src={map} alt="" />
                        <p className="ml-3">Nasirabad H/S, Chattogram</p>

                    </div>
                    <div className="d-flex align-items-center">
                        <div className="d-flex align-items-center mr-3">
                            <img style={{ height: "24px" }} src={bed} alt="Bed" />
                            <p className="ml-2 mt-3">3 Bedrooms</p>
                        </div>
                        <div className="d-flex align-items-center pl-3">
                            <img style={{ height: "24px" }} src={bath} alt="Bath" />
                            <p className="ml-2 mt-3">2 Bathrooms</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                        <h2 style={{ color: "#275A53", fontWeight: "bold", fontSize: "36px" }}>$194</h2>
                        <button className="btn" style={{ backgroundColor: "#275A53", color: "#F1F6F4" }}>View Details</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HouseRentDetails;