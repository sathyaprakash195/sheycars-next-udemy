"use client";
import { Col, Row } from "antd";
import React from "react";
import { useRouter } from "next/navigation";

function CarsGrid({ cars }) {
  const router = useRouter();
  return (
    <Row gutter={[16, 16]}>
      {cars.map((car) => (
        <Col span={6}>
          <div
            className="card cursor-pointer"
            onClick={() => router.push(`/cars/${car._id}`)}
          >
            <img src={car.carImage} alt="" height="220" width="100%" />

            <div className="py-3 px-2">
              <h1 className="text-md">
                {car.name} - {car.brand}
              </h1>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
}

export default CarsGrid;
