import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FormControl, InputGroup } from "react-bootstrap";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./modal.css";
import TableComponent from "../../../../components/tableComponent/TableComponent";

import {
  AccordionDetails,
  AccordionSummary,
  Typography,
  Accordion,
} from "@mui/material";
import { SelectAll } from "@mui/icons-material";
import * as Yup from "yup";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationModal from "../../../../components/common/ConfirmationModal";
import AWRForm from "./form/Form";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  fetchCategoryRequest,
  fetchGradeRequest,
  fetchMarkRequest,
  getSaleNoRequest,
  teaTypeAction,
} from "../../../../store/actions";
import { useDispatch } from "react-redux";

const allAWRs = [
  {
    id: 1,
    category: "cat",
    season: "Spring 2023",
    saleNo: "12345",
    gatePassQty: "10",
    awrRefNo: "AWR-001",
    mark: "Mark 1",
    warehouse: "Warehouse A",
    arrivalDate: "2023-07-01",
    awrDate: "2023-07-05",
    catalogClosingDate: "2023-07-10",
    manufacturer: "ABC Company",
    grade: "A",
    checked: false,
  },
  {
    id: 2,
    category: "cat",
    season: "Summer 2023",
    saleNo: "67890",
    gatePassQty: "20",
    awrRefNo: "AWR-002",
    mark: "Mark 2",
    warehouse: "Warehouse B",
    arrivalDate: "2023-08-01",
    awrDate: "2023-08-05",
    catalogClosingDate: "2023-08-10",
    manufacturer: "XYZ Company",
    grade: "B",
    checked: false,
  },
  // Add more AWR objects as needed
];
const validationSchema = Yup.object().shape({
  mark: Yup.string().required("Mark is required"),
  category: Yup.string().required("category is required"),
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

const Modal = () => {
  const dispatch = useDispatch();
  const saleNumber = useSelector(
    (state) => state.auction.saleNumber?.responseData
  );
  const teaType = useSelector(
    (state) => state?.teaType?.teaTypeList?.responseData
  );
  const markList = useSelector((state) => state.mark.data.responseData);
  const categorystate = useSelector(
    (state) => state?.category?.data?.responseData
  );
  console.log(categorystate, "categorystate");
  const grades = useSelector((state) => state?.grade?.data?.responseData);
  const formik = useFormik({
    initialValues: initialValues,

    validationSchema,
    onSubmit: (values) => {
      console.log(values); // Handle form submission here
    },
  });
  const [sellsNo, setSellNo] = useState(1);

  console.log("");
  const [expandedTab, setExpandedTab] = useState("panel1");
  const [rows, setRows] = useState(allAWRs);
  const [year, setYear] = useState("2023");
  const [teaTypeList, setTeaTeatypeList] = useState([]);
  const [gradesList, setGradesList] = useState([]);
  const [markDataList, setMarkDataList] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectAllRow, setSelectAllRow] = useState(false);
  const [categoryList, setcategory] = useState([]);
  const [actionData, setActionData] = useState({
    view: {},
    edit: {},
  });
  const { handleChange, handleBlur, values, touched, errors } = formik;

  useEffect(() => {
    dispatch(teaTypeAction());
    dispatch(fetchMarkRequest());
    // dispatch(fetchWarehouseUserRequest());
    dispatch(fetchGradeRequest());
    dispatch(getSaleNoRequest());
    dispatch(fetchCategoryRequest());

    // dispatch(fetchSubTeaTypeRequest());
  }, []);
  const awrs = [
    {
      name: "select",
      title: "Select",
      getCellValue: ({ ...row }) => <AWRCheckBox data={row} />,
    },
    {
      name: "season",
      title: "Season",
    },
    {
      name: "saleNo",
      title: "Sale No",
    },
    {
      name: "gatePassQty",
      title: "Gate Pass Q ty",
    },
    {
      name: "awrRefNo",
      title: "AWR R ef. No",
    },
    {
      name: "mark",
      title: "Mark",
    },
    {
      name: "warehouse",
      title: "Warehouse",
    },
    {
      name: "arrivalDate",
      title: "Arrival Date",
    },
    {
      name: "awrDate",
      title: "AWR Date",
    },
    {
      name: "catalogClosingDate",
      title: "Catalog Closing Date",
    },
    {
      name: "awrDate",
      title: "AWR Date",
    },
    {
      name: "manufacturer",
      title: "Manufacturer",
    },
    {
      name: "grade",
      title: "Grade",
    },
    {
      name: "action",
      title: "Action",
      getCellValue: ({ ...row }) => <ActionArea data={row} />,
    },
  ];
  const handleRefresh = () => {};
  const handleSearch = () => {};
  const handleAccordionChange = (panel) => (_, isExpanded) => {
    setExpandedTab(isExpanded ? panel : null);
  };
  function generateYearOptions() {
    const currentYear = new Date().getFullYear();
    const options = [];

    for (let i = currentYear; i > currentYear - 7; i--) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return options;
  }
  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    setSelectAllRow(checked);
    setRows((prevRows) =>
      prevRows.map((row) => ({
        ...row,
        checked,
      }))
    );
  };

  const ActionArea = (row) => {
    function handleAction(action) {
      setExpandedTab("panel2");

      switch (action) {
        case "view": {
          return setActionData({ ...actionData, view: row.data });
        }
        case "edit": {
          return setActionData({ ...actionData, view: row.data });
        }
        default:
          return "no data";
      }
    }
    useEffect(() => {
      setGradesList(grades);
      setMarkDataList(markList);
      setTeaTeatypeList(teaType);
      setcategory(categorystate);
      console.log(gradesList, teaTypeList, markList, "gtt");
    }, [gradesList, teaTypeList, markList]);
    return (
      <>
        <Button
          style={{ background: "transparent", border: "none", color: "green" }}
          onClick={() => handleAction("view")}
        >
          <VisibilityIcon />
        </Button>
        <Button
          style={{ background: "transparent", border: "none", color: "green" }}
          onClick={() => handleAction("edit")}
        >
          <EditIcon />
        </Button>
        <Button
          style={{ background: "transparent", border: "none", color: "green" }}
          onClick={() => {
            setOpenDelete(true);
            setActionData({ ...actionData, edit: row.data });
          }}
        >
          <DeleteIcon />
        </Button>
      </>
    );
  };

  const AWRCheckBox = (data) => {
    const handleChange = (e) => {
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === data.data.id ? { ...row, checked: e.target.checked } : row
        )
      );

      const allChecked = rows.every((row) => row.checked);
      setSelectAllRow(allChecked);
    };
    useEffect(() => {
      const allChecked = rows.every((row) => row.checked);
      setSelectAllRow(allChecked);
    }, [rows]);

    return (
      <>
        <Form.Check
          type="checkbox"
          id="custom-switch"
          checked={data.data.checked}
          onChange={handleChange}
        />
      </>
    );
  };

  return (
    <>
      <div>
        <ConfirmationModal
          show={openDelete}
          onDelete={() => {
            setRows([...rows?.filter((ele) => ele.id !== actionData.edit.id)]);
            setOpenDelete(false);
          }}
          onHide={() => setOpenDelete(false)}
        />
        <Accordion
          expanded={expandedTab === "panel1"}
          onChange={handleAccordionChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Kutcha Catalog List</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="row align-items-end">
              <div className="col-lg-2">
                <label>Select Season</label>
                <InputGroup>
                  <FormControl
                    as="select"
                    name="age1"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  >
                    {generateYearOptions()}
                  </FormControl>
                </InputGroup>
              </div>
              <div className="col-lg-2">
                <label>Select Sale No.</label>
                <InputGroup>
                  <FormControl
                    as="select"
                    name="age2"
                    value={sellsNo}
                    onChange={(e) => setSellNo(e.target.value)}
                  >
                    {saleNumber.map((e) => (
                      <option key={e.SaleNoId} value={e.saleNo}>
                        {e.saleNo}
                      </option>
                    ))}
                  </FormControl>
                </InputGroup>
              </div>
              <div className="col-lg-2">
                <label>Select Tea Type</label>
                <InputGroup>
                  <FormControl as="select" size="sm">
                    {teaTypeList?.length > 0
                      ? teaTypeList?.map((item, index) => (
                          <option value={item?.teaTypeId}>
                            {item.teaTypeName}
                          </option>
                        ))
                      : "No Data"}
                  </FormControl>
                </InputGroup>
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
                      <div className="error text-danger">
                        {formik.errors.grade}
                      </div>
                    )}
                  </div>
                </div>
              </div>
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
                      <div className="error text-danger">
                        {formik.errors.mark}
                      </div>
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
                        {categoryList?.length > 0
                          ? categoryList?.map((item, index) => (
                              <option value={item.categoryId} key={index}>
                                {item.categoryName}
                              </option>
                            ))
                          : "No Data"}
                      </FormControl>
                    </InputGroup>
                    {/* {formik.errors.category && formik.touched.category && (
                      <div className="error text-danger">
                        {formik.errors.category}
                      </div>
                    )} */}
                  </div>
                </div>
              </div>
              <div className="col-lg-2">
                <Button className="SubmitBtn" onClick={handleSearch}>
                  Search
                </Button>
              </div>
              <div className="col-lg-2">
                <Button className="SubmitBtn" onClick={handleRefresh}>
                  Refresh
                </Button>
              </div>
            </div>
            <div className="invoice-wrapper">
              <div className="col-lg-12 my-3">
                <Button variant="primary" type="submit">
                  Search
                </Button>
              </div>
            </div>
            <div>
              <div className="SelectAll">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                    checked={selectAllRow}
                    onChange={handleSelectAllChange}
                  />
                  <label class="form-check-label" for="defaultCheck1">
                    Select All
                  </label>
                </div>
              </div>
              <div id="invoiceTable">
                <TableComponent
                  columns={awrs}
                  rows={rows}
                  setRows={setRows}
                  dragdrop={false}
                  fixedColumnsOn={false}
                  resizeingCol={false}
                  selectionCol={true}
                  sorting={true}
                />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        {/* <Accordion
          expanded={expandedTab === "panel2"}
          onChange={handleAccordionChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>AWR Maintenance</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AWRForm />
          </AccordionDetails>
        </Accordion> */}
      </div>
    </>
  );
};

export default Modal;
