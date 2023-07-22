import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Table, message } from "antd";
import { SetLoading } from "@/redux/loadersSlice";
import moment from "moment";

function BookingsTable() {
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showCancelModel, setShowCancelModel] = useState(false);

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      let url = "/api/bookings";
      if (!currentUser.isAdmin) {
        url = `/api/bookings?user=${currentUser._id}`;
      }
      const response = await axios.get(url);
      setBookings(response.data.data);
    } catch (error) {
      message.error(error.response.data.message || error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  const onCancel = async () => {
    try {
      dispatch(SetLoading(true));
      await axios.put(`/api/bookings/${selectedBooking._id}`, {
        status: "cancelled",
      });
      message.success("Booking cancelled successfully");
      setShowCancelModel(false);
      getData();
    } catch (error) {
      message.error(error.response.data.message || error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "Booking Id",
      dataIndex: "_id",
    },
    {
      title: "User",
      dataIndex: "user",
      render: (user) => user.name,
    },
    {
      title: "Car",
      dataIndex: "car",
      render: (car) => car.name,
    },
    {
      title: "Total Hours",
      dataIndex: "totalHours",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => status.toUpperCase(),
    },
    {
      title: "From Slot",
      dataIndex: "fromSlot",
      render: (fromSlot) => moment(fromSlot).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "To Slot",
      dataIndex: "toSlot",
      render: (toSlot) => moment(toSlot).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Action",
      render: (record) => (
        <div>
          {record.status === "approved" && (
            <span
              className="underline"
              onClick={() => {
                setSelectedBooking(record);
                setShowCancelModel(true);
              }}
            >
              Cancel
            </span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={bookings} columns={columns} />;
      {showCancelModel && (
        <Modal
          open={showCancelModel}
          onCancel={() => setShowCancelModel(false)}
          title="Cancel Booking"
          okText="Cancel Booking"
          cancelText="Close"
          onOk={onCancel}
        >
          <div className="flex flex-col gap-5">
            <span>
              Are you sure you want to cancel booking with id ?
              {selectedBooking._id}
            </span>

            <span>
              <b>Note</b> : Only the booking will be cancelled, the amount will
              not be refunded online and you will have to contact the admin for
              a refund.
            </span>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default BookingsTable;
