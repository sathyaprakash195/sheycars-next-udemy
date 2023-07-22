import { Button, Table, message } from "antd";
import React from "react";
import CarForm from "./CarForm";
import { useDispatch } from "react-redux";
import { SetLoading } from "@/redux/loadersSlice";
import axios from "axios";

function Cars() {
  const [cars, setCars] = React.useState([]); // [{}
  const [showCarFormModal, setShowCarFormModal] = React.useState(false);
  const [selectedCar, setSelectedCar] = React.useState(null);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get("/api/cars");
      setCars(response.data.data);
    } catch (error) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  const deleteCar = async (carid) => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.delete(`/api/cars/${carid}`);
      message.success(response.data.message);
      getData();
    } catch (error) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "Car Image",
      dataIndex: "carImage",
      render: (carImage) => (
        <img src={carImage} alt="car" width="50" height="50" />
      ),
    },
    {
      title: "Car Name",
      dataIndex: "name",
    },
    {
      title: "Brand",
      dataIndex: "brand",
    },
    {
      title: "Fuel Type",
      dataIndex: "fuelType",
    },
    {
      title: "Rent Per Hour",
      dataIndex: "rentPerHour",
    },
    {
      title: "Seating Capacity",
      dataIndex: "seatingCapacity",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <div className="flex gap-5">
          <i
            className="ri-pencil-line"
            onClick={() => {
              setSelectedCar(record);
              setShowCarFormModal(true);
            }}
          ></i>
          <i
            className="ri-delete-bin-line"
            onClick={() => {
              deleteCar(record._id);
            }}
          ></i>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-end">
        <Button
          type="primary"
          onClick={() => {
            setSelectedCar(null);
            setShowCarFormModal(true);
          }}
        >
          Add Car
        </Button>
      </div>

      <Table dataSource={cars} columns={columns} rowKey="_id" />

      {showCarFormModal && (
        <CarForm
          setShowCarFormModal={setShowCarFormModal}
          showCarFormModal={showCarFormModal}
          selectedCar={selectedCar}
          reloadData={getData}
        />
      )}
    </div>
  );
}

export default Cars;
