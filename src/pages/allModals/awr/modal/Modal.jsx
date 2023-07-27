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
import AWRForm from "./form/Form";

const allAWRs = [
  {
    id: 1,
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

const Modal = () => {
  const [expandedTab, setExpandedTab] = useState("panel1");
  const [rows, setRows] = useState(allAWRs);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectAllRow, setSelectAllRow] = useState(false);
  const [actionData, setActionData] = useState({
    view: {},
    edit: {},
  });

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
            <Typography>AWR List</Typography>
          </AccordionSummary>
          <AccordionDetails>
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
        <Accordion
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
        </Accordion>
      </div>
    </>
  );
};

export default Modal;
