import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { API_URLS } from "../Services/ApiUrls";
import { CustomAlert } from "../customAlerts/customAlert";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";


export const AddPrdouct = () => {
    const navigate = useNavigate();
    // to disable button while submitting the form
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alert, setAlert] = useState();
    const initialValues = {
        name: "",
        image: "",
        category: "",
        price: "",
        description: "",
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("This Field is required"),
        image: Yup.string().required("This Field is required"),
        ctegory: Yup.string().required("This Field is required"),
        price: Yup.number().required("This Field is required"),
        description: Yup.number().required("This Field is required"),
    });

    const showAlert = (message, type) => {
        setAlert({
            message: message,
            type: type,
        });
        setTimeout(() => {
            setAlert({});
        }, 2000);
    };

    const onSubmit = async (fields, setFieldValue) => {
        setIsSubmitting(true);
        try {
            let { isSuccess } = await API_URLS.addProduct(fields);
            // saving user data in redux state
            //   userLogIn(res.data);
            if (isSuccess) {
                showAlert("Product Added", "success");
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            }
        } catch (error) {
            let err =
                typeof error.message === "object"
                    ? "Some error occurred"
                    : error.message;
            showAlert(err, "danger");
        }
        setIsSubmitting(false);
    };

    const uploadImage = async (e, values, setFieldValue) => {
        setIsSubmitting(true);
        const file = e.target.files[0];
        const data = new FormData();
        data.append("file", file);
        data.append("name", file.name);
        const res = await API_URLS.uploadImage(data);
        if (res.isSuccess) {
            setFieldValue("image", res?.data?.imageUrl);
        }
        setIsSubmitting(false);
    };

    return (
        <div>
            {alert && <CustomAlert alert={alert} />}
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({ errors, touched, values, setFieldValue }) => {
                    return (
                        <Form style={{ display: "flex", flexDirection: 'column', alignItems: 'center', width: "75%", border: '1px solid black', margin: 'auto', marginTop: '100px' }}>
                            <h2>Product Details</h2>
                            <div style={{ width: '85%', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid black', margin: '0px 0px 40px 0px' }}>
                                <div style={{ display: 'flex', flexDirection: 'row', width: '80%', justifyContent: 'space-between', marginTop: '50px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '40%' }}>
                                        <div style={{ width: '100%' }}>
                                            <label className="form-label text-lefts">Product Name *</label>
                                            <Field
                                                type="text"
                                                name="name"
                                                placeholder="Enter Name"
                                                style={{ backgroundColor: "inherit" }}
                                                className={
                                                    "form-control" +
                                                    (errors.name && touched.name ? " is-invalid" : "")
                                                }
                                            />
                                            <ErrorMessage
                                                name="name"
                                                component="div"
                                                className="invalid-feedback"
                                            />
                                        </div>
                                        <div>
                                            <label className="form-label text-lefts">Category *</label>
                                            <Field
                                                type="text"
                                                name="category"
                                                placeholder="Category"
                                                style={{ backgroundColor: "inherit" }}
                                                className={
                                                    "form-control" +
                                                    (errors.category && touched.category ? " is-invalid" : "")
                                                }
                                            />
                                            <ErrorMessage
                                                name="category"
                                                component="div"
                                                className="invalid-feedback"
                                            />
                                        </div>
                                        <div >
                                            <label className="form-label text-lefts">Price (₹) *</label>
                                            <Field
                                                type="number"
                                                name="price"
                                                placeholder="Price"
                                                style={{ backgroundColor: "inherit" }}
                                                className={
                                                    "form-control" +
                                                    (errors.price && touched.price ? " is-invalid" : "")
                                                }
                                            />
                                            <ErrorMessage
                                                name="price"
                                                component="div"
                                                className="invalid-feedback"
                                            />
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid black', padding: '15px', width: '40%' }}>
                                        {values.image && (
                                            <img
                                                style={{
                                                    width: "80%",
                                                    objectFit: "cover",
                                                    aspectRatio: "1.5",
                                                    margin: "auto",
                                                }}
                                                src={values.image}
                                                alt="profile pic"
                                            />
                                        )}
                                        <div className="m-3">
                                            {/* <label className="form-label">Profile Pic *</label> */}
                                            <label
                                                htmlFor="imginput"
                                                className="form-lable d-flex justify-content-center"
                                            >
                                                <ImageSearchIcon fontSize="large" /> Upload a new image
                                            </label>
                                            <Field
                                                type="file"
                                                name="slected_file"
                                                id="imginput"
                                                placeholder="Image"
                                                style={{ display: "none" }}
                                                onChange={(e) => uploadImage(e, values, setFieldValue)}
                                                className={
                                                    "form-control" +
                                                    (errors.image && touched.image
                                                        ? " is-invalid"
                                                        : "")
                                                }
                                            />
                                            <ErrorMessage
                                                name="image"
                                                component="div"
                                                className="invalid-feedback"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="m-3" style={{ width: '80%' }}>
                                    <label htmlFor="textArea">Description</label>
                                    <Field
                                        as="textarea"
                                        id="textArea"
                                        name="description"
                                        className='form-control'
                                        rows="3" // Set the number of rows for the textarea
                                    />
                                </div>
                                <button
                                    className="m-4 btn btn-primary"
                                    disabled={isSubmitting}
                                    onClick={() => onSubmit(values, setFieldValue)}
                                    type="submit"
                                >
                                    Save Details
                                </button>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};
