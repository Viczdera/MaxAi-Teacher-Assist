import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Dialog from "../dialog";
import axios from "axios";
import { SyncLoader } from "react-spinners";

import textStyles from "../../texts.module.scss";
import "./form.scss";

import Divider from "../../inputs/divider";

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

const assignHomework = async (data: any) => {
  const response = await axios
    .post("http://localhost:3000/assignment", data)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log("errror fetching resources", err);
    });
  return response;
};

const TaskForm = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [resources, setResources] = useState<any[]>([]);
  const [loadingResources, setLoadingResources] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLoadingResources(true);
    fetchResources().then((data) => {
      setResources(data?.resources || []);
      setLoadingResources(false);
    });
  }, []);
  const initialValues: {
    name: string;
    date: string;
    resources: any[];
    students: any[];
  } = {
    name: "",
    date: "",
    resources: [],
    students: [],
  };

  const handleValidation = yup.object().shape({
    name: yup.string().required("Kindly add an assignment name"),
    date: yup
      .date()
      .required("Kindly add an assignment due date")
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
    enableReinitialize: true,
    validationSchema: handleValidation,
    onSubmit: (values) => {
      console.log(values);
      // setSubmitting(true);
      // assignHomework(values).then((data) => {
      //   console.log(data);
      //   setSubmitting(false);
      // });
    },
  });
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <form onSubmit={formik.handleSubmit}>
        <p className={textStyles.sectionTitle}>About your assessment</p>
        <Divider mb="var(--p-sm)" />
        <div className="form-group">
          <div className="card-cont">
            <div className="inputWrap">
              <input
                placeholder="Enter assessment name"
                type="text"
                name="name"
                className={
                  formik.touched.name && formik.errors.name ? "error" : ""
                }
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.name && formik.errors.name ? (
              <div className="error-message">{formik.errors.name}</div>
            ) : null}
          </div>
        </div>
        <p className={textStyles.sectionTitle}>Add resources and data</p>
        <Divider mb="var(--p-sm)" />
        <div className="card-cont">
          <div className="form-group">
            <div className="form-label">
              <label>Due Date</label>
            </div>
            <div className="inputWrap">
              <input
                type="date"
                name="date"
                className={
                  formik.touched.date && formik.errors.date ? "error" : ""
                }
                value={formik.values.date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.date && formik.errors.date ? (
              <div className="error-message">{formik.errors.date}</div>
            ) : null}
          </div>
          <div className="form-group">
            <div className="form-label">
              <label>Resources</label>
            </div>

            {!loadingResources ? (
              <div>
                <select
                  name="resources"
                  disabled={loadingResources}
                  className={
                    formik.touched.resources && formik.errors.resources
                      ? "error"
                      : ""
                  }
                  value={formik.values.resources}
                  onChange={(e) => {
                    const selectedValue: string = e.target.value;
                    const selectedValues = Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    );

                    const currentValue = [...formik.values.resources];
                    if (selectedValues.length == 1) {
                      let selectedIndex = currentValue.indexOf(
                        selectedValues[0]
                      );
                      if (currentValue.includes(selectedValue)) {
                        currentValue.splice(selectedIndex, 1);
                        formik.setFieldValue(e.target.name, currentValue);
                      } else {
                        formik.setFieldValue(e.target.name, [
                          ...currentValue,
                          selectedValue,
                        ]);
                      }
                    } else if (selectedValues.length > 1) {
                      formik.setFieldValue(e.target.name, selectedValues);
                    } else {
                      formik.setFieldValue(e.target.name, []);
                    }
                  }}
                  onBlur={formik.handleBlur}
                  multiple
                >
                  {resources.map((resource, index) => (
                    <option key={index} value={resource?.id}>
                      {resource?.path}
                    </option>
                  ))}
                </select>
                {formik.touched.resources && formik.errors.resources ? (
                  <div className="error-message">{formik.errors.resources}</div>
                ) : null}
              </div>
            ) : (
              <div className="flex-center-center inputWrap">
                <SyncLoader size={10} color="var(--gray)" />
              </div>
            )}
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
        </div>
        <button
          className="button-default"
          style={{ marginTop: "var(--p-sm)" }}
          type="submit"
        >
          Confirm
        </button>
      </form>
    </Dialog>
  );
};

export default TaskForm;
