import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import { CentraliseForm } from "../../Components/CentraliseForm";
import {
  setCrudData1,
  getDataFromServer,
  postDataToServer,
  updateDataToServer,
  deleteDataToServer,
} from "../Slices/RestaurantListSlice";
import { CentraliseModal } from "../../Components/CentraliseModal";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { GrView } from "react-icons/gr";

export const FormPage = () => {
  const initialFormData = {
    name: "",
    email: "",
    mobile: "",
    address: "",
    pincode: "",
    textarea: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [userDataErrors, setUserDataErrors] = useState({});

  const [viewPopupOpen, setViewPopupOpen] = useState(false);
  const [viewPopupData, setViewPopupData] = useState({});

  const dispatch = useDispatch();
  const crudData = useSelector((state) => state.crudData);

  useEffect(() => {
    setFormData(crudData.crudData1);
    dispatch(getDataFromServer());
  }, [crudData.crudData1, dispatch]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (userDataErrors[name]) {
      setUserDataErrors((prevState) => ({
        ...prevState,
        [name]: "",
      }));
    }
  };

  const handleView = (data) => {
    setViewPopupData(data);
    setViewPopupOpen(true);
  };

  const popupClose = () => {
    setViewPopupOpen(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteDataToServer(id));
  };

  const handleUpdate = () => {
    dispatch(updateDataToServer(formData));
    dispatch(setCrudData1({})); // Clear the form data after updating
    setFormData(initialFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userValidateField(formData)) {
      if (formData.id) {
        handleUpdate();
      } else {
        dispatch(postDataToServer(formData));
        setFormData(initialFormData);
      }
    }
  };

  const userValidateField = (data) => {
    let userDataErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.name) {
      userDataErrors.name = "This field is required";
    }
    if (!data.email) {
      userDataErrors.email = "This field is required";
    } else if (!emailRegex.test(data.email)) {
      userDataErrors.email = "Please enter a valid email address";
    }
    if (!data.mobile) {
      userDataErrors.mobile = "This field is required";
    }
    if (!data.address) {
      userDataErrors.address = "This field is required";
    }
    if (!data.pincode) {
      userDataErrors.pincode = "This field is required";
    }
    if (!data.textarea) {
      userDataErrors.textarea = "This field is required";
    }
    setUserDataErrors(userDataErrors);
    if (Object.keys(userDataErrors).length === 0) {
      return userDataErrors;
    }
  };


  const finalData = crudData && crudData.storeData ? crudData.storeData : [];
  // console.log("storeData ", storeData)

  // useEffect(() => {
  //   dispatch(stor)
  // })

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 align-self-center">
              <h2 className="banner_title">Contact Us</h2>
              <p className="banner_desc pe-lg-5 p-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab magni, ullam odit corrupti esse dolorum fugit, cumque deleniti adipisci ea unde? Ex repellat veniam nam!</p>
          </div>
          <div className="col-lg-6">
            <form onSubmit={handleSubmit}>
            <CentraliseForm
              htmlFor="username"
              label={false}
              type="text"
              placeholder="Enter your name"
              id="username"
              name="name"
              className="username mb-2"
              handleChange={handleChange}
              value={formData.name}
              errmsg={userDataErrors.name}
            />
            <CentraliseForm
              htmlFor="email"
              label={false}
              type="email"
              placeholder="Enter your email"
              id="email"
              name="email"
              className="email mb-2"
              handleChange={handleChange}
              value={formData.email}
              errmsg={userDataErrors.email}
            />
            <CentraliseForm
              htmlFor="mobile"
              label={false}
              type="number"
              placeholder="Enter your mobile no"
              id="mobile"
              name="mobile"
              className="mobile mb-2" 
              handleChange={handleChange}
              value={formData.mobile}
              errmsg={userDataErrors.mobile}
            />
            <CentraliseForm
              htmlFor="address"
              label={false}
              type="text"
              placeholder="Enter your address"
              id="address"
              name="address"
              className="address mb-2"
              handleChange={handleChange}
              value={formData.address}
              errmsg={userDataErrors.address}
            />
            <CentraliseForm
              htmlFor="pincode"
              label={false}
              type="number"
              placeholder="Enter your pincode"
              id="pincode"
              name="pincode"
              className="pincode mb-2"
              handleChange={handleChange}
              value={formData.pincode}
              errmsg={userDataErrors.pincode}
            />
            <CentraliseForm
              htmlFor="textarea"
              label={false}
              cols="30"
              rows="5"
              type="textarea"
              id="textarea"
              name="textarea"
              placeholder="Enter your message"
              className="textarea mb-2"
              handleChange={handleChange}
              value={formData.textarea}
              errmsg={userDataErrors.textarea}
            />
              <div className="text-center">
                <button className="btn common_btn w-50 my-3" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="row py-5">
          <div className="col-lg-12">
          <Table responsive="xl" className=" text-center" striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Pincode</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {finalData.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.mobile}</td>
              <td>{data.address}</td>
              <td>{data.pincode}</td>
              <td>{data.textarea}</td>
              <td>
                <div className="d-flex gap-3 flex-wrap justify-content-center">
                  <GrView className="fs-5 text-primary" onClick={() => handleView(data)}/>
                  <FaRegEdit className="fs-5 text-warning" onClick={() => dispatch(setCrudData1(data))}/>
                  <MdDelete className="fs-5 text-danger" onClick={() => handleDelete(data.id)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
          </div>
        </div>
      </div>

      {/* View Modal */}
      <CentraliseModal
        show={viewPopupOpen}
        size="md"
        centered={false}
        handleClose={popupClose}
        modalTitle="View Data"
        LeftBtnValue="Close"
      >
        <div>
          <p>Name: {viewPopupData.name}</p>
          <p>Password: {viewPopupData.email}</p>
          <p>Password: {viewPopupData.mobile}</p>
          <p>Password: {viewPopupData.address}</p>
          <p>Password: {viewPopupData.pincode}</p>
          <p>Password: {viewPopupData.textarea}</p>
        </div>
      </CentraliseModal>
    </>
  );
};
