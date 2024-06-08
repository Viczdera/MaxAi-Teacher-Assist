import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Dialog from "../dialog";
import { SyncLoader } from "react-spinners";
import textStyles from "../../texts.module.scss";
import "./form.scss";
import Divider from "../../inputs/divider";
import { NewTask, TaskFormType } from "../../../constants/typess";
import { useToast } from "../../../provider/contexts/toastContext";
import { fetchResources } from "../../../requests/fetchResources";
import { fetchStudents } from "../../../requests/fetchStudents";
import { saveTask } from "../../../requests/saveTask";
import { useTeacherContext } from "../../../provider/contexts/teacherContext";
import { useNavigate } from "react-router-dom";

const TaskForm = ({
  isOpen,
  onClose,
  selectType = "all",
  studentId,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectType: TaskFormType;
  studentId?: string | null;
}) => {
  const [resources, setResources] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [loadingResources, setLoadingResources] = useState(false);
  const { showToast } = useToast();
  const { dispatch } = useTeacherContext();
  const navigate = useNavigate();
  useEffect(() => {
    formik.resetForm();
    setLoadingResources(true);
    fetchResources().then((data) => {
      setResources(data?.resources || []);
      setLoadingResources(false);
    });
    fetchStudents().then((data) => {
      setStudents(data?.students || []);
    });
  }, [isOpen]);
  const initialValues: NewTask = {
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
    students: yup
      .array()
      .of(yup.string())
      .min(1, "Add at least 1 student")
      .required("Add at least 1 student"),
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: handleValidation,
    onSubmit: (values) => {
      let formValues = { ...values };
      const date = new Date(formValues.date);
      const dateTime = date.getTime().toString();
      formValues.date = dateTime;
      saveTask(values).then(({ success, message}) => {
        if (success) {
          if (selectType == "all") {
            dispatch({ type: "SET_ASSIGNMENT", payload: formValues });
          } else {
            let payload = {
              studentId: formValues.students[0],
              resourceId: formValues.resources[0],
              resourceName: formValues.name,
            };
            dispatch({ type: "SET_ASSIGNED_BOOKS", payload: payload });
          }
          onClose();
          showToast(message, "success");
          selectType == "all" && navigate("/classroom");
        } else {
          onClose();
          showToast(message, "error");
        }
      });
    },
  });
  useEffect(() => {
    if (selectType == "all") {
      const studentVals: any[] = students?.map((student) => student?.id);
      formik.setFieldValue("students", studentVals);
    } else if (selectType == "one" && studentId) {
      const newArr = [studentId];
      formik.setFieldValue("students", newArr);
    }
  }, [students]);
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
                  value={
                    selectType == "all"
                      ? formik.values.resources
                      : formik.values.resources[0]
                  }
                  onChange={(e) => {
                    const selectedValue: string = e.target.value;
                    const selectedValues = Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    );
                    if (selectType === "all") {
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
                    } else {
                      formik.setFieldValue(e.target.name, selectedValues);
                    }
                  }}
                  onBlur={formik.handleBlur}
                  multiple={selectType === "all"}
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

          <div className="form-group">
            <label>Student(s)</label>
            <div className="flex-center-center inputWrap">
              {students.length > 0
                ? selectType === "all"
                  ? "All students selected"
                  : "One student selected"
                : "Could not get students.Kindly refresh"}
            </div>
            {formik.touched.students && formik.errors.students ? (
              <div className="error-message">{formik.errors.students}</div>
            ) : null}
          </div>
        </div>
        <button
          className="button-default"
          style={{ marginTop: "var(--p-sm)" }}
          type="submit"
        >
          Assign
        </button>
      </form>
    </Dialog>
  );
};

export default TaskForm;
