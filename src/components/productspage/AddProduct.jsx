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
                        <Form className="d-flex flex-column align-items-center p-3" style={{ width: "70%", border: '1px solid black', margin: 'auto' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                                <div className="m-3">
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
                                <div className="m-3">
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
                                <div className="m-3">
                                    <label className="form-label text-lefts">Price *</label>
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
                            <div className="m-3">
                                <label htmlFor="textArea">Description</label>
                                <Field
                                    as="textarea"
                                    id="textArea"
                                    name="Description"
                                    className='form-control'
                                    rows="4" // Set the number of rows for the textarea
                                />
                            </div>
                            {values.image && (
                                <img
                                    style={{
                                        width: "80%",
                                        objectFit: "cover",
                                        aspectRatio: "1",
                                        margin: "auto",
                                    }}
                                    src={values.image}
                                    alt="profile pic"
                                />
                            )}
                            {console.log(values.image)}
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
                            <button
                                className="m-4 btn btn-primary"
                                disabled={isSubmitting}
                                type="submit"
                            >
                                Sign Up
                            </button>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};
