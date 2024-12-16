import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import jsonData from '..//data.json';

function ShowModal({ setShowModal, category }) {


    const saveToLocalStorage = (categoryTitle, formData) => {
        const existingData = JSON.parse(localStorage.getItem(categoryTitle) || '[]');

        existingData.push(formData);


        localStorage.setItem(categoryTitle, JSON.stringify(existingData));
    };



    // const[currentIndex,setCurrentIndex] = useState(0);

    const validationSchema = Yup.object({
        date: Yup.date().required("Date is required"),
        description: Yup.string().required("Description is required"),
        amount: Yup.number()
            .typeError("Amount must be a number")
            .integer("Amount must be an integer")
            .positive("Amount must be a positive number")
            .required("Amount is required"),
    });

    const formik = useFormik({
        initialValues: {
            date: null,
            description: '',
            amount: '',
        },
        validationSchema,
        // onSubmit: (values, { resetForm }) => {
        //   console.log(values);
        //   resetForm();
        //   alert("Form submitted successfully!");
        //   setShowModal(false);
        // },

        onSubmit: (values, { resetForm }) => {

            // console.log(values)

            const expenseData = {
                ...values,
                date: values.date,

            };

            // console.log(expenseData)

            saveToLocalStorage(category.title, expenseData);

            // console.log(`Saved to ${category.title}:`, expenseData);
            resetForm();
            alert("Form submitted successfully!");
            setShowModal(false);
        },
    });






    return (<>
        {/* <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
     <div class="modal-dialog">
      <div class="modal-content">
       <div class="modal-header"> */}

        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">




                        {/* <h5 class="modal-title" id="exampleModalLabel"  onClick={()=>index()}>{jsonData[currentIndex].title} </h5> */}
                        <h5 className="modal-title" id="exampleModalLabel">
                            {category?.title || 'Add Expense'}
                        </h5>


                    </div>


                    <div class="modal-body">

                        <form onSubmit={formik.handleSubmit} className="modal-body">
                            <div>
                                <label htmlFor="date">Date</label>
                                <DatePicker
                                    id="date"
                                    selected={formik.values.date}
                                    onChange={(date) => formik.setFieldValue('date', date)}
                                    onBlur={formik.handleBlur}
                                    dateFormat="dd-MM-yyyy"
                                    placeholderText="Select Date"
                                    className="form-control"
                                />
                                {formik.touched.date && formik.errors.date && (
                                    <div style={{ color: 'red' }}>{formik.errors.date}</div>
                                )}
                            </div>

                            <div>
                                <label htmlFor="description">Description</label>
                                <input
                                    id="description"
                                    name="description"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.description}
                                    className="form-control"
                                />
                                {formik.touched.description && formik.errors.description && (
                                    <div style={{ color: 'red' }}>{formik.errors.description}</div>
                                )}
                            </div>

                            <div>
                                <label htmlFor="amount">Amount</label>
                                <input
                                    id="amount"
                                    name="amount"
                                    type="number"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.amount}
                                    className="form-control"
                                />
                                {formik.touched.amount && formik.errors.amount && (
                                    <div style={{ color: 'red' }}>{formik.errors.amount}</div>
                                )}
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                                <button type="submit" className="btn btn-primary" onClick={() => saveToLocalStorage()} >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>







                </div>
            </div>
        </div>
    </>
    )
}

export default ShowModal