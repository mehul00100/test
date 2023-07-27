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
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationModal from "../../../../components/common/ConfirmationModal";
import CreateInvoiceForm from "./formCompo";
import { fetchInvoiceDetailsRequest } from "../../../../store/actions/invoice/invoiceActions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchMarkRequest, getSaleNoRequest } from "../../../../store/actions";

const allInvoices = [
  {
    checked: false,
    invoiceStatus: "Paid",
    season: "Spring 2023",
    saleNo: "12345",
    receivedDate: "2023-07-01",
    invoiceNo: "INV-001",
    manufacturer: "ABC Company",
    mark: "Mark 1",
    warehouseName: "Warehouse A",
    grade: "A",
    edit: "Edit 1",
  },
  {
    checked: false,
    invoiceStatus: "Pending",
    season: "Summer 2023",
    saleNo: "67890",
    receivedDate: "2023-07-05",
    invoiceNo: "INV-002",
    manufacturer: "XYZ Company",
    mark: "Mark 2",
    warehouseName: "Warehouse B",
    grade: "B",
    edit: "Edit 2",
  },
  // Add more invoice objects as needed
];

const Modal = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [actionData, setActionData] = useState({
    view: {},
    edit: {},
  });
  const [formData, setFormData] = useState({
    age1: "",
    age2: "",
    age3: "",
    age4: "",
    age5: "",
    age6: "",
    age7: "",
    age8: "",
    age9: "",
    age10: "",
    age11: "",
    age12: "",
    age13: "",
    age14: "",
    age15: "",
  });

  const [expandedTab, setExpandedTab] = useState("panel1");
  const [rows, setRows] = useState(allInvoices);
  const [selection, setSelection] = useState([1]);
  const [selectAllRow, setSelectAllRow] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [markDataList, setMarkDataList] = useState([]);
  const [saleNo, setSaleNo] = useState([]);

  const [invoiseSearch, setInvoiceSearch] = useState({
    markId: 0,
    season: "2023",
    saleNo: 0,
    status: 5,
  });

  const markList = useSelector((state) => state?.mark?.data?.responseData);

  const saleNumber = useSelector(
    (state) => state?.auction?.saleNumber?.responseData
  );

  const responseData = useSelector(
    (state) => state?.invoiceDetails?.data?.responseData
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInvoiceDetailsRequest(invoiseSearch));
    dispatch(fetchMarkRequest());
    dispatch(getSaleNoRequest());
  }, []);

  useEffect(() => {
    setMarkDataList(markList);
    setSaleNo(saleNumber);
    setRows(responseData ? responseData : []);
  }, [markList, saleNumber, responseData]);

  const invoices = [
    {
      name: "select",
      title: "Select",
      getCellValue: ({ ...row }) => <InvoiceCheckBox data={row} />,
    },
    {
      name: "status",
      title: "Invoice Status",
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
      name: "receivedDate",
      title: "Received Date",
      getCellValue: ({ ...row }) => (
        <span>{row?.receivedDate?.split("T")[0]}</span>
      ),
    },
    {
      name: "invoiceNo",
      title: "Invoice No",
    },
    {
      name: "manufacturerName",
      title: "Manufacturer",
    },
    {
      name: "mark",
      title: "Mark",
    },
    {
      name: "wareHouseName",
      title: "Warehouse Name",
    },
    {
      name: "gradeName",
      title: "Grade",
    },
    {
      name: "action",
      title: "Action",
      getCellValue: ({ ...row }) => <ActionArea data={row} />,
    },
  ];
  const handleFromDateChange = (event) => {
    const selectedDate = event.target.value;
    setFromDate(selectedDate);

    if (toDate < selectedDate) {
      setToDate("");
    }
  };

  const handleToDateChange = (event) => {
    const selectedDate = event.target.value;

    if (selectedDate >= fromDate) {
      setToDate(selectedDate);
    }
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInvoiceSearch((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAccordionChange = (panel) => (_, isExpanded) => {
    setExpandedTab(isExpanded ? panel : null);
  };
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

  const InvoiceCheckBox = (data) => {
    const handleChange = (e) => {
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.invoiceNo === data.data.invoiceNo
            ? { ...row, checked: e.target.checked }
            : row
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(invoiseSearch, "😂😂😂😂😂");
  };

  return (
    <>
      <div>
        <ConfirmationModal
          show={openDelete}
          onDelete={() => {
            setRows([
              ...rows?.filter(
                (ele) => ele.invoiceNo !== actionData.edit.invoiceNo
              ),
            ]);
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
            <Typography>List</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form onSubmit={handleSubmit}>
              <div className="invoice-wrapper">
                <div className="invoice-dropdown">
                  <InputGroup>
                    <FormControl
                      as="select"
                      name="season"
                      value={invoiseSearch.season}
                      onChange={handleChange}
                    >
                      {generateYearOptions()}
                    </FormControl>
                  </InputGroup>
                </div>
                <div className="invoice-dropdown">
                  <InputGroup>
                    <FormControl
                      as="select"
                      name="saleNo"
                      value={invoiseSearch.saleNo}
                      onChange={handleChange}
                    >
                      {saleNo?.length > 0
                        ? saleNo?.map((item, index) => (
                            <option value={item.saleNo} key={index}>
                              {item.saleNo}
                            </option>
                          ))
                        : "No Data"}
                    </FormControl>
                  </InputGroup>
                </div>
                <div className="invoice-dropdown">
                  <InputGroup>
                    <FormControl
                      as="select"
                      name="markId"
                      value={invoiseSearch.markId}
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
                </div>
                <div className="invoice-dropdown">
                  <InputGroup>
                    <FormControl
                      as="select"
                      name="status"
                      value={invoiseSearch.status}
                      onChange={handleChange}
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </FormControl>
                  </InputGroup>
                </div>
                <div className="invoice-dropdown">
                  <Button variant="primary" type="submit">
                    Search
                  </Button>
                </div>
              </div>
            </form>
            <div>
              {/* <div className="SelectAll">
                   
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
                </div> */}
              <div id="invoiceTable">
                <TableComponent
                  columns={invoices}
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
        <Accordion
          expanded={expandedTab === "panel2"}
          onChange={handleAccordionChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Maintenance</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CreateInvoiceForm />
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};

export default Modal;
