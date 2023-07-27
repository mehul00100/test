import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  seson: Yup.string().required("Seson is required"),
  sellno: Yup.string().required("Sell No is required"),
  gatePassQuantity: Yup.number()
    .required("Gate Pass Quantity is required")
    .min(1, "Gate Pass Quantity must be at least 1"),
  awrRefNo: Yup.string().required("AWR Ref No is required"),
  mark: Yup.string().required("MARK is required"),
  warehouse: Yup.string().required("Warehouse is required"),
  arrivalDate: Yup.date().required("Arrival Date is required"),
  awrDate: Yup.date().required("AWR Date is required"),
  catalogClosingDate: Yup.date().required("Catalog Closing Date is required"),
  invoiceDate: Yup.date().required("Invoice Date is required"),
  manufacture: Yup.string().required("Manufacture is required"),
  grade: Yup.string().required("Grade is required"),
});

const CommonForm = ({
  fields,
  onSubmit,
  initialValues,
  validationSchema,
  uploadedFiles,
  setUploadedFiles,
  handleFileRemove,
}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const { values, handleChange, handleSubmit, errors: formikErrors } = formik;

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(
      (file) =>
        file.type === "application/vnd.ms-excel" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    if (validFiles.length > 0) {
      setUploadedFiles((prevFiles) => [...prevFiles, ...validFiles]);
      setErrors((prevErrors) => ({
        ...prevErrors,
        fileUpload: null,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        fileUpload: "Please select valid Excel files",
      }));
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        {fields.map((field,index) => (
          <div className="col-md-4" key={index}>
            <div className={field.className}>
              <label htmlFor={field.name}>{field.label}</label>
              {field.type === "select" ? (
                <div className="FormGroup">
                  <select
                    className="select-form form-control"
                    name={field.name}
                    id={field.name}
                    value={values[field.name] || field.options[0].value} // Set the default value to the first option
                    onChange={handleChange}
                  >
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              ) : field.type === "datepicker" ? (
                <input
                  type="date"
                  className="form-control"
                  name={field.name}
                  id={field.name}
                  value={values[field.name] || ""}
                  onChange={handleChange}
                />
              ) : (
                <input
                  type={field.type}
                  className="form-control"
                  name={field.name}
                  id={field.name}
                  value={values[field.name] || ""}
                  onChange={handleChange}
                />
              )}
              {formikErrors[field.name] && (
                <span className="error text-danger">
                  {formikErrors[field.name]}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="BtnGroup">
        <Button type="submit" className="SubmitBtn">
          Create
        </Button>
        <Button className="SubmitBtn">Save</Button>
        <label className="btn SubmitBtn mr-2">
          <ImportExportIcon />
        </label>
        <label htmlFor="fileUpload" className="btn SubmitBtn mr-2">
          <FileUploadIcon />
        </label>
        <input
          type="file"
          className="form-control"
          id="fileUpload"
          accept=".xls, .xlsx"
          onChange={handleFileUpload}
          // style={{ display: "none" }}
          multiple
        />
        <label className="btn SubmitBtn">
          <PictureAsPdfIcon />
        </label>
      </div>
    </form>
  );
};

export default CommonForm;
