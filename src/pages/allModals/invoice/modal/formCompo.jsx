import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, FormControl, InputGroup, Form } from "react-bootstrap";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import {
  fetchGradeRequest,
  fetchMarkRequest,
  fetchWarehouseUserRequest,
  getSaleNoRequest,
  teaTypeAction,
} from "../../../../store/actions/index";
import { useSelector } from "react-redux";
import { fetchSubTeaTypeRequest } from "../../../../store/actions/teaType/TeaType";
const validationSchema = Yup.object().shape({
  mark: Yup.string().required("Mark is required"),
  warehouse: Yup.string().required("Warehouse is required"),
  warehouseName: Yup.string().required("Warehouse Name is required"),
  warehouseAddress: Yup.string().required("Warehouse Address is required"),
  invoiceNo: Yup.string().required("Invoice No is required"),
  invoiceQty: Yup.string().required("Invoice Qty is required"),
  origin: Yup.string().required("Origin is required"),
  manufacture: Yup.string().required("Manufacture is required"),
  grade: Yup.string().required("Grade is required"),

  fromDate: Yup.date().required("From Date is required"),
  toDate: Yup.date()
    .required("To Date is required")
    .min(
      Yup.ref("fromDate"),
      "To Date must be greater than or equal to From Date"
    ),

  dateOfDispatch: Yup.date().required("Date of Dispatch is required"),
  invoiceDate: Yup.date().required("Invoice Date is required"),
  season: Yup.string().required("Season is required"),
  saleNo: Yup.string().required("Sale No is required"),
  auctioneer: Yup.string().required("Auctioneer is required"),
  lorryReceiptNo: Yup.string().required("Lorry Receipt No is required"),
  lorryNo: Yup.string().required("Lorry No is required"),
  invRefNo: Yup.string().required("Inv Ref No is required"),
  carrier: Yup.string().required("Carrier is required"),
  teaType: Yup.string().required("Tea Type is required"),
  subType: Yup.string().required("Sub Type is required"),
  category: Yup.string().required("Category is required"),
  packageSize: Yup.string().required("Package Size is required"),
  packageType: Yup.string().required("Package Type is required"),
  packageNo: Yup.string().required("Package No is required"),
  totalPackages: Yup.string().required("Total Packages is required"),
  grossKgs: Yup.string().required("Gross Kgs is required"),
  tareKgs: Yup.string().required("Tare Kgs is required"),
  netKgs: Yup.string().required("Net Kgs is required"),
  totalNetKgs: Yup.string().required("Total Net Kgs is required"),
});
const initialValues = {
  mark: "Mark Value",
  warehouse: "Warehouse Value",
  warehouseName: "Warehouse Name Value",
  warehouseAddress: "Warehouse Address Value",
  invoiceNo: "Invoice No Value",
  invoiceQty: "Invoice Qty Value",
  origin: "Origin Value",
  manufacture: "Manufacture Value",
  grade: "Grade Value",
  fromDate: "From Date Value",
  toDate: "To Date Value",
  dateOfDispatch: "Date of Dispatch Value",
  invoiceDate: "Invoice Date Value",
  season: "Season Value",
  saleNo: "Sale No Value",
  auctioneer: "Auctioneer Value",
  lorryReceiptNo: "Lorry Receipt No Value",
  lorryNo: "Lorry No Value",
  invRefNo: "Inv Ref No Value",
  carrier: "Carrier Value",
  teaType: "Tea Type Value",
  subType: "Sub Type Value",
  category: "Category Value",
  packageSize: "Package Size Value",
  packageType: "Package Type Value",
  packageNo: "Package No Value",
  totalPackages: "Total Packages Value",
  grossKgs: "Gross Kgs Value",
  tareKgs: "Tare Kgs Value",
  netKgs: "Net Kgs Value",
  totalNetKgs: "Total Net Kgs Value",
};

const CreateInvoiceForm = () => {
  const formik = useFormik({
    initialValues: initialValues,

    validationSchema,
    onSubmit: (values) => {
      console.log(values); // Handle form submission here
    },
  });
  const [teaTypeList, setTeaTeatypeList] = useState([]);
  const [markDataList, setMarkDataList] = useState([]);
  const [warehouseUserList, setWarehouseUserList] = useState([]);
  const [gradesList, setGradesList] = useState([]);
  const [saleNo, setSaleNo] = useState([]);
  const [subTeaTypeNo, setSubTeaTypeNo] = useState([]);

  const teaType = useSelector(
    (state) => state.teaType.teaTypeList.responseData
  );
  const subTeaType = useSelector((state) => state.teaType.data.responseData);

  const markList = useSelector((state) => state.mark.data.responseData);
  const warehouseUsersList = useSelector(
    (state) => state.warehouseUser.data.responseData
  );
  const grades = useSelector((state) => state.grade.data.responseData);

  const saleNumber = useSelector(
    (state) => state.auction.saleNumber?.responseData
  );

  // console.log(teaType);
  const dispatch = useDispatch();

  const { handleChange, handleBlur, values, touched, errors } = formik;

  useEffect(() => {
    dispatch(teaTypeAction());
    dispatch(fetchMarkRequest());
    dispatch(fetchWarehouseUserRequest());
    dispatch(fetchGradeRequest());
    dispatch(getSaleNoRequest());
    dispatch(fetchSubTeaTypeRequest());
  }, []);

  useEffect(() => {
    setTeaTeatypeList(teaType);
    setMarkDataList(markList);
    setWarehouseUserList(warehouseUsersList);
    setGradesList(grades);
    setSaleNo(saleNumber);
    setSubTeaTypeNo(subTeaType);
  }, [teaType, subTeaType, markList, warehouseUsersList, grades, saleNumber]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="Invoice-Maintenance cust-filed row">
        <div className="col-md-2">
          <div className="FormGrup">
            <label>Mark</label>
            <div className="max-width250">
              <InputGroup>
                <FormControl
                  as="select"
                  name="mark"
                  value={formik.values.mark}
                  onChange={handleChange}
                >
                  {markDataList?.length > 0
                    ? markDataList?.map((item, index) => (
                        <option value={item.markId} key={index}>
                          {item.markName}
                        </option>
                      ))
                    : "No Data"}
                </FormControl>
              </InputGroup>
              {formik.errors.mark && formik.touched.mark && (
                <div className="error text-danger">{formik.errors.mark}</div>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="FormGrup">
            <label>Warehouse</label>
            <div className="max-width250">
              <InputGroup>
                <FormControl
                  as="select"
                  name="warehouse"
                  value={formik.values.warehouse}
                  onChange={handleChange}
                >
                  {warehouseUserList?.length > 0
                    ? warehouseUserList?.map((item, index) => (
                        <option value={item.wareHouseUserRegId} key={index}>
                          {item.wareHouseName}
                        </option>
                      ))
                    : "No Data"}
                </FormControl>
              </InputGroup>
              {formik.errors.warehouse && formik.touched.warehouse && (
                <div className="error text-danger">
                  {formik.errors.warehouse}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="FormGrup">
            <label>Warehouse Name</label>
            <div className="max-width250">
              <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Control
                    type="text"
                    placeholder="APPL"
                    name="warehouseName"
                    value={formik.values.warehouseName}
                    onChange={handleChange}
                  />
                </Form.Group>
                {formik.errors.warehouseName &&
                  formik.touched.warehouseName && (
                    <div className="error text-danger">
                      {formik.errors.warehouseName}
                    </div>
                  )}
              </Form>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="FormGrup">
            <label>Warehouse Address</label>
            <div className="max-width250">
              <Form>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="warehouseAddress"
                    value={formik.values.warehouseAddress}
                    onChange={handleChange}
                  />
                </Form.Group>
                {formik.errors.warehouseAddress &&
                  formik.touched.warehouseAddress && (
                    <div className="error text-danger">
                      {formik.errors.warehouseAddress}
                    </div>
                  )}
              </Form>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="FormGrup">
            <label>Invoice No</label>
            <div className="max-width250">
              <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Control
                    type="text"
                    name="invoiceNo"
                    value={formik.values.invoiceNo}
                    onChange={handleChange}
                  />
                </Form.Group>
                {formik.errors.invoiceNo && formik.touched.invoiceNo && (
                  <div className="error text-danger">
                    {formik.errors.invoiceNo}
                  </div>
                )}
              </Form>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="FormGrup">
            <label>Invoice Qty</label>
            <div className="max-width250">
              <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Control
                    type="text"
                    name="invoiceQty"
                    value={formik.values.invoiceQty}
                    onChange={handleChange}
                  />
                </Form.Group>
                {formik.errors.invoiceQty && formik.touched.invoiceQty && (
                  <div className="error text-danger">
                    {formik.errors.invoiceQty}
                  </div>
                )}
              </Form>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="FormGrup">
            <label>Origin</label>
            <div className="max-width250">
              <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Control
                    type="text"
                    name="origin"
                    value={formik.values.origin}
                    onChange={handleChange}
                  />
                </Form.Group>
                {formik.errors.origin && formik.touched.origin && (
                  <div className="error text-danger">
                    {formik.errors.origin}
                  </div>
                )}
              </Form>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="FormGrup">
            <label>Manufacture</label>
            <div className="max-width250">
              <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Control
                    type="text"
                    name="manufacture"
                    value={formik.values.manufacture}
                    onChange={handleChange}
                  />
                </Form.Group>
                {formik.errors.manufacture && formik.touched.manufacture && (
                  <div className="error text-danger">
                    {formik.errors.manufacture}
                  </div>
                )}
              </Form>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="FormGrup">
            <label>Grade</label>
            <div className="max-width250">
              <InputGroup>
                <FormControl
                  as="select"
                  name="grade"
                  value={formik.values.grade}
                  onChange={handleChange}
                >
                  {gradesList?.length > 0
                    ? gradesList?.map((item, index) => (
                        <option value={item.gradeId} key={index}>
                          {item.gradeName}
                        </option>
                      ))
                    : "No Data"}
                </FormControl>
              </InputGroup>
              {formik.errors.grade && formik.touched.grade && (
                <div className="error text-danger">{formik.errors.grade}</div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-2">
          <div className="FormGrup">
            <label>Period of manufacture</label>
            <div className="max-width250 d-flex">
              <div>
                <input
                  type="date"
                  id="fromDate"
                  value={formik.values.fromDate}
                  name="fromDate"
                  onChange={handleChange}
                />
                {formik.errors.fromDate && formik.touched.fromDate && (
                  <div className="error text-danger">
                    {formik.errors.fromDate}
                  </div>
                )}
              </div>
              <div>
                <input
                  type="date"
                  id="toDate"
                  value={formik.values.toDate}
                  name="toDate"
                  onChange={handleChange}
                  min={formik.values.fromDate}
                />
                {formik.errors.toDate && formik.touched.toDate && (
                  <div className="error text-danger">
                    {formik.errors.toDate}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="FormGrup">
            <label>Date of dispatch</label>
            <div className="max-width250">
              <input
                type="date"
                name="dateOfDispatch"
                value={formik.values.dateOfDispatch}
                onChange={handleChange}
              />
              {formik.errors.dateOfDispatch &&
                formik.touched.dateOfDispatch && (
                  <div className="error text-danger">
                    {formik.errors.dateOfDispatch}
                  </div>
                )}
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="FormGrup">
            <label>Invoice Date</label>
            <div className="max-width250">
              <input
                type="date"
                name="invoiceDate"
                value={formik.values.invoiceDate}
                onChange={handleChange}
              />
              {formik.errors.invoiceDate && formik.touched.invoiceDate && (
                <div className="error text-danger">
                  {formik.errors.invoiceDate}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="FormGrup">
            <label>Season</label>
            <div className="max-width250">
              <InputGroup>
                <FormControl
                  as="select"
                  name="season"
                  value={formik.values.season}
                  onChange={handleChange}
                >
                  <option value="">Select Season</option>
                  <option value={10}>2023</option>
                  <option value={20}>Amal Gamated</option>
                  <option value={30}>Warehouse 2</option>
                </FormControl>
              </InputGroup>
              {formik.errors.season && formik.touched.season && (
                <div className="error text-danger">{formik.errors.season}</div>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="FormGrup">
            <label>Sale no</label>
            <div className="max-width250">
              <InputGroup>
                <FormControl
                  as="select"
                  name="saleNo"
                  value={formik.values.saleNo}
                  onChange={handleChange}
                >
                  {saleNo?.length > 0
                    ? saleNo?.map((item, index) => (
                        <option value={item.SaleProgramId} key={index}>
                          {item.saleNo}
                        </option>
                      ))
                    : "No Data"}
                </FormControl>
              </InputGroup>
              {formik.errors.saleNo && formik.touched.saleNo && (
                <div className="error text-danger">{formik.errors.saleNo}</div>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="FormGrup">
            <label>Auctioneer</label>
            <div className="max-width250">
              <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Control
                    type="text"
                    name="auctioneer"
                    value={formik.values.auctioneer}
                    onChange={handleChange}
                  />
                </Form.Group>
                {formik.errors.auctioneer && formik.touched.auctioneer && (
                  <div className="error text-danger">
                    {formik.errors.auctioneer}
                  </div>
                )}
              </Form>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="FormGrup">
            <label>Lorry Receipt No</label>
            <div className="max-width250">
              <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Control
                    type="text"
                    name="lorryReceiptNo"
                    value={formik.values.lorryReceiptNo}
                    onChange={handleChange}
                  />
                </Form.Group>
                {formik.errors.lorryReceiptNo &&
                  formik.touched.lorryReceiptNo && (
                    <div className="error text-danger">
                      {formik.errors.lorryReceiptNo}
                    </div>
                  )}
              </Form>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="FormGrup">
            <label>Lorry No</label>
            <div className="max-width250">
              <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Control
                    type="text"
                    name="lorryNo"
                    value={formik.values.lorryNo}
                    onChange={handleChange}
                  />
                </Form.Group>
                {formik.errors.lorryNo && formik.touched.lorryNo && (
                  <div className="error text-danger">
                    {formik.errors.lorryNo}
                  </div>
                )}
              </Form>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="FormGrup">
            <label>Inv Ref No</label>
            <div className="max-width250">
              <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Control
                    type="text"
                    name="invRefNo"
                    value={formik.values.invRefNo}
                    onChange={handleChange}
                  />
                </Form.Group>
                {formik.errors.invRefNo && formik.touched.invRefNo && (
                  <div className="error text-danger">
                    {formik.errors.invRefNo}
                  </div>
                )}
              </Form>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="FormGrup">
            <label>Carrier</label>
            <div className="max-width250">
              <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Control
                    type="text"
                    name="carrier"
                    value={formik.values.carrier}
                    onChange={handleChange}
                  />
                </Form.Group>
                {formik.errors.carrier && formik.touched.carrier && (
                  <div className="error text-danger">
                    {formik.errors.carrier}
                  </div>
                )}
              </Form>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="FormGrup">
            <label>TeaType</label>
            <div className="max-width250">
              <InputGroup>
                <FormControl
                  as="select"
                  name="teaType"
                  value={formik.values.teaType}
                  onChange={handleChange}
                >
                  {/* <option value="">Select Tea Type</option> */}
                  {teaTypeList?.length > 0
                    ? teaTypeList?.map((item, index) => (
                        <option value={item.teaTypeId}>
                          {item.teaTypeName}
                        </option>
                      ))
                    : "No Data"}
                </FormControl>
              </InputGroup>
              {formik.errors.teaType && formik.touched.teaType && (
                <div className="error text-danger">{formik.errors.teaType}</div>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="FormGrup">
            <label>SubType</label>
            <div className="max-width250">
              <InputGroup>
                <FormControl
                  as="select"
                  name="subType"
                  value={formik.values.subType}
                  onChange={handleChange}
                >
                  {subTeaTypeNo?.length > 0
                    ? subTeaTypeNo?.map((item, index) => (
                        <option value={item.subTeaTypeNo} key={index}>
                          {item.subTeaTypeName}
                        </option>
                      ))
                    : "No Data"}
                </FormControl>
              </InputGroup>
              {formik.errors.subType && formik.touched.subType && (
                <div className="error text-danger">{formik.errors.subType}</div>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="FormGrup">
            <label>Category</label>
            <div className="max-width250">
              <InputGroup>
                <FormControl
                  as="select"
                  name="category"
                  value={formik.values.category}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  <option value={13}>Category</option>
                </FormControl>
              </InputGroup>
              {formik.errors.category && formik.touched.category && (
                <div className="error text-danger">
                  {formik.errors.category}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="FormGrup">
            <label>Package Size</label>
            <div className="max-width250">
              <InputGroup>
                <FormControl
                  as="select"
                  name="packageSize"
                  value={formik.values.packageSize}
                  onChange={handleChange}
                >
                  <option value="">Select Package Size</option>
                  <option value={14}>Package Size</option>
                </FormControl>
              </InputGroup>
              {formik.errors.packageSize && formik.touched.packageSize && (
                <div className="error text-danger">
                  {formik.errors.packageSize}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="FormGrup">
            <label>Package Type</label>
            <div className="max-width250">
              <InputGroup>
                <FormControl
                  as="select"
                  name="packageType"
                  value={formik.values.packageType}
                  onChange={handleChange}
                >
                  <option value="">Select Package Type</option>
                  <option value={15}>Package Type</option>
                </FormControl>
              </InputGroup>
              {formik.errors.packageType && formik.touched.packageType && (
                <div className="error text-danger">
                  {formik.errors.packageType}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="FormGrup">
            <label>PackageNo</label>
            <div className="max-width250">
              <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Control
                    type="text"
                    name="packageNo"
                    value={formik.values.packageNo}
                    onChange={handleChange}
                  />
                </Form.Group>
                {formik.errors.packageNo && formik.touched.packageNo && (
                  <div className="error text-danger">
                    {formik.errors.packageNo}
                  </div>
                )}
              </Form>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="FormGrup">
            <label>TotalPackages</label>
            <div className="max-width250">
              <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Control
                    type="text"
                    name="totalPackages"
                    value={formik.values.totalPackages}
                    onChange={handleChange}
                  />
                </Form.Group>
                {formik.errors.totalPackages &&
                  formik.touched.totalPackages && (
                    <div className="error text-danger">
                      {formik.errors.totalPackages}
                    </div>
                  )}
              </Form>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="FormGrup">
            <label>GrossKgs</label>
            <div className="max-width250">
              <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Control
                    type="text"
                    name="grossKgs"
                    value={formik.values.grossKgs}
                    onChange={handleChange}
                  />
                </Form.Group>
                {formik.errors.grossKgs && formik.touched.grossKgs && (
                  <div className="error text-danger">
                    {formik.errors.grossKgs}
                  </div>
                )}
              </Form>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="FormGrup">
            <label>TareKgs</label>
            <div className="max-width250">
              <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Control
                    type="text"
                    name="tareKgs"
                    value={formik.values.tareKgs}
                    onChange={handleChange}
                  />
                </Form.Group>
                {formik.errors.tareKgs && formik.touched.tareKgs && (
                  <div className="error text-danger">
                    {formik.errors.tareKgs}
                  </div>
                )}
              </Form>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="FormGrup">
            <label>NetKgs</label>
            <div className="max-width250">
              <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Control
                    type="text"
                    name="netKgs"
                    value={formik.values.netKgs}
                    onChange={handleChange}
                  />
                </Form.Group>
                {formik.errors.netKgs && formik.touched.netKgs && (
                  <div className="error text-danger">
                    {formik.errors.netKgs}
                  </div>
                )}
              </Form>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="FormGrup">
            <label>TotalNetKgs</label>
            <div className="max-width250">
              <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Control
                    type="text"
                    name="totalNetKgs"
                    value={formik.values.totalNetKgs}
                    onChange={handleChange}
                  />
                </Form.Group>
                {formik.errors.totalNetKgs && formik.touched.totalNetKgs && (
                  <div className="error text-danger">
                    {formik.errors.totalNetKgs}
                  </div>
                )}
              </Form>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 my-3"></div>
          <div className="col-12">
            <div className="BtnGroup">
              <Button className="SubmitBtn" type="submit">
                Create
              </Button>
              <Button className="SubmitBtn">Save</Button>
              <Button>
                <ImportExportIcon />
              </Button>
              <Button>
                <FileUploadIcon />
              </Button>
              <Button>
                <PictureAsPdfIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateInvoiceForm;
