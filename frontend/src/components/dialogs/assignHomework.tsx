import React, { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Dialog from "./dialog";
import axios from "axios";
import "./inputs.scss";

const fetchResources = async () => {
  const response = await axios
    .get("http://localhost:3000/resources")
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log("errror fetching resources", err);
    });
  return response;
};

const assignHomework = async (data:any) => {
  const response = await axios
    .post("http://localhost:3000/assignment",data)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log("errror fetching resources", err);
    });
  return response;
};

const AssignHomework = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [resources, setResources] = useState<any[]>([]);
  const [submitting,setSubmitting]=useState(false)
  useEffect(() => {
    fetchResources().then((data) => {
      setResources(data?.resources || []);
    });
  }, []);
  const initialValues = {
    name: "",
    date: "",
    resources: [],
    students: [],
  };

  const handleValidation = yup.object().shape({
    name: yup.string().required("Please add an assignment name"),
    date: yup
      .date()
      .required("Please add an assignment due date")
      .min(new Date(), "Date cannot be in the past"),
    resources: yup
      .array()
      .of(yup.string())
      .min(1, "Add at least 1 resource")
      .required("Add at least 1 resource"),
    // students: yup
    //   .array()
    //   .of(yup.string())
    //   .min(1, "Add at least 1 student")
    //   .required("Add at least 1 student"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: handleValidation,
    onSubmit: (values) => {
      console.log(values);
      setSubmitting(true)
      assignHomework(values).then((data)=>{
        console.log(data)
        setSubmitting(false)
      })
    },
  });
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <p>About you assessment</p>

      <div
        style={{
          padding: "var(--p-md",
          borderRadius: "6px",
          boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
        }}
      >
        <div
          className="inputWrap"
          style={{
            borderRadius: "6px",
            padding: "var(--p-sm) var(--p-sm-2)",
            boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
          }}
        >
          <input placeholder="Enter assessment name" />
        </div>
      </div>
      {/* {JSON.stringify(resources)} */}
      <p>Add questions and answers</p>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className={formik.touched.name && formik.errors.name ? "error" : ""}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error-message">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            className={formik.touched.date && formik.errors.date ? "error" : ""}
            value={formik.values.date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.date && formik.errors.date ? (
            <div className="error-message">{formik.errors.date}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label>Resources</label>
          <select
            name="resources"
            className={
              formik.touched.resources && formik.errors.resources ? "error" : ""
            }
            value={formik.values.resources || []} 
            onChange={(e) => {
              const value = Array.from(
                e.target.selectedOptions,
                (option) => option.value
              );
              console.log(value);
              formik.setFieldValue("resources", value);
            }}
            onBlur={formik.handleBlur}
            multiple={false}
          >
            {resources.map((resource, index) => (
              <option key={index}>{resource?.path}</option>
            ))}
          </select>
          {formik.touched.resources && formik.errors.resources ? (
            <div className="error-message">{formik.errors.resources}</div>
          ) : null}
        </div>

        {/* <div className="form-group">
          <label>students</label>
          <select
            name="students"
            className={
              formik.touched.students && formik.errors.students ? "error" : ""
            }
            value={formik.values.students}
            onChange={(e) => {
              const value = Array.from(
                e.target.selectedOptions,
                (option) => option.value
              );
              console.log(value);
              formik.setFieldValue("students", value);
            }}
            onBlur={formik.handleBlur}
            multiple={false}
          >
            {students.map((resource, index) => (
              <option>{resource?.path}</option>
            ))}
          </select>
          {formik.touched.students && formik.errors.students ? (
            <div className="error-message">{formik.errors.students}</div>
          ) : null}
        </div> */}
        
        <button className="button-default" type="submit">Confirm</button>
      </form>
    </Dialog>
  );
};

export default AssignHomework;
