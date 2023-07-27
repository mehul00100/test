import React, { useEffect, useState } from "react";
import Modal from "../../../components/common/Modal";
import CommonTable from "../../../components/tableComponent/CommonTable";
import { Button, Card, Form, FormControl, InputGroup } from "react-bootstrap";
import Accordion from "@mui/material/Accordion";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AuctionCard from "./maintanance/Maintananse";
import TableComponent from "../../../components/tableComponent/TableComponent";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  fetchSaleProgramDetailsRequest,
  fetchSaleProgramListRequest,
  getSaleNoRequest,
} from "../../../store/actions";
import NoData from "../../../components/nodata/NoData";
import { SettingsCellOutlined } from "@mui/icons-material";
import axios from "axios";

function SaleProgram({ open, setOpen }) {
  const dispatch = useDispatch();
  const saleProgramList = useSelector(
    (state) => state.sale.saleProgramList.responseData
  );
  const saleNumber = useSelector(
    (state) => state.auction.saleNumber?.responseData
  );
  const [selectedSaleProgram, setSelectedSaleProgram] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [searchData, setSearchData] = useState([]);
  

  const [rows, setRows] = useState(saleProgramList);
  const [totalCount, setTotalCount] = useState(0);
  const [selectAllRow, setSelectAllRow] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [year, setYear] = useState("2023");
  const [sellsNo, setSellNo] = useState(1);

  useEffect(() => {
    setRows(saleProgramList);
  }, [saleProgramList]);

  const [actionData, setActionData] = useState({
    view: {},
    edit: {},
  });
  const [expanded, setExpanded] = useState("panel1");

  const [originalRows, setOriginalRows] = useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    setIsDisabled(false);
    setIsEdit(false);
    setSelectedSaleProgram(null);
  };

  const handleYearChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: parseInt(value), // Convert the value to an integer
    }));
  };
  const season = "2023";
  const saleNo = "";
  const pageNumber = 1;
  const pageSize = 200;

  // Dispatch the action on component mount
  useEffect(() => {
    dispatch(fetchSaleProgramListRequest({ season, pageNumber, pageSize }));
  }, []);
  const handleRefresh = ()=>{
    dispatch(fetchSaleProgramListRequest({ season, pageNumber, pageSize }));
  }
  useEffect(() => {
    if (!saleNumber) {
      dispatch(getSaleNoRequest());
    }
  }, [dispatch, saleNumber]);

  useEffect(() => {
    setRows(searchData);
  }, [searchData]);
  // console.log(saleProgramList, "POLO");
  const data = [
    { id: 1, name: "John", age: 25 },
    { id: 2, name: "Jane", age: 30 },
    { id: 3, name: "Alice", age: 28 },
  ];

  const columns = ["ID", "Name", "Age"];

  const handleDelete = (row) => {
    // Delete the row from the data array
    console.log("Deleting row:", row);
  };
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

  const handleSearch = () => {
    // Filter the originalRows data based on the selected values in the form

    const data = {
      season: year,
      saleNo: parseInt(sellsNo),
      pageNumber: 1,
      pageSize: 1000,
    };

    try {
      axios
        .post(
          "http://192.168.101.75:5080/api/SaleProgram/GetSaleProgramList",
          data
        )
        .then((response) => setSearchData(response.data.responseData));
    } catch (error) {
      console.error("Error calling POST API:", error);
    }

    console.log(data, "😘");

    // Update the rows state with the filtered data
    // setRows(filteredRows);
  };

  const ActionArea = (row) => {
    function handleAction(action) {
      setExpanded("panel2");

      switch (action) {
        // case "view": {
        //   return dispatch(
        //     fetchSaleProgramDetailsRequest(row.data.saleProgramDetailId)
        //   );
        // }
        case "view": {
          const saleProgramDetail = row.data;
          setSelectedSaleProgram(saleProgramDetail);
          setIsDisabled(true);
          dispatch(
            fetchSaleProgramDetailsRequest(saleProgramDetail.SaleProgramId)
          );
          break;
        }
        case "edit": {
          const saleProgramDetail = row.data;
          setSelectedSaleProgram(saleProgramDetail);
          setIsDisabled(false);
          setIsEdit(true);
          dispatch(
            fetchSaleProgramDetailsRequest(saleProgramDetail.SaleProgramId)
          );
        }
        default:
          return "no data";
      }
    }

    if (!saleProgramList || !saleNumber) {
      return (
        <div>
          <NoData />
        </div>
      ); // Show a message when no data is available
    }
    return (
      <>
        <div className="ActionBtn">
          <span className="view-icon" onClick={() => handleAction("view")}>
            <VisibilityIcon />
          </span>
          <span className="divider"></span>
        
          <span className="edit-icon" onClick={() => handleAction("edit")}>
            <EditIcon />
          </span>
          {/* <span
            onClick={() => {
              setOpenDelete(true);
              setActionData({ ...actionData, edit: row.data });
            }}
          >
            <DeleteIcon />
          </span> */}
        </div>
      </>
    );
  };
  const sellPrograms = [
    // {
    //   name: "select",
    //   title: "Select",
    //   getCellValue: ({ ...row }) => <InvoiceCheckBox data={row} />,
    // },

    // {
    //   name: "select",
    //   title: "Select",
    //   getCellValue: ({ ...row }) => <InvoiceCheckBox data={row} />,
    // },
    {
      name: "teaTypeName",
      title: "Tea Type",
    },
    {
      name: "saleNo",
      title: "Sale No",
    },
    {
      name: "saleDate",
      title: "Sale Date",
      getCellValue: ({ ...row }) => {
        return new Date(row.saleDate).toLocaleDateString("en-GB");
      },
    },
    {
      name: "buyersPromptDate",
      title: "Buyer Prompt Date",
      getCellValue: ({ ...row }) => {
        return new Date(row.buyersPromptDate).toLocaleDateString("en-GB");
      },
    },
    {
      name: "sellersPromptDate",
      title: "Seller Prompt Date",
      getCellValue: ({ ...row }) => {
        return new Date(row.sellersPromptDate).toLocaleDateString("en-GB");
      },
    },
    {
      name: "status",
      title: "Status",
      getCellValue: ({ status }) => {
        switch (status) {
          case "0": {
            return "Pending";
          }
          case "1": {
            return "Active";
          }
          case "2": {
            return "Completed";
          }
          case "3": {
            return "Cancelled";
          }
          default:
            return "-";
        
      }}
      
    },
    // {
    //   name: "mark",
    //   title: "Mark",
    // },
    // {
    //   name: "warehouseName",
    //   title: "Warehouse Name",
    // },
    // {
    //   name: "grade",
    //   title: "Grade",
    // },
    {
      name: "action",
      title: "Action",
      getCellValue: ({ ...row }) => <ActionArea data={row} />,
    },
  ];
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

  return (
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
      {open && (
        <Modal
          title="Sale Program master"
          show={open === "saleProgramMaster" ? true : false}
          handleClose={() => setOpen("")}
          size="xl"
        >
          <div>
            <Accordion
              expanded={expanded === "panel1"}
              className={`${expanded === "panel1" ? "active" : ""}`}
              onChange={handleChange("panel1")}
              TransitionProps={{ unmountOnExit: true }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>List</Typography>
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
                  <div className="mr-2">
                    <Button className="SubmitBtn search-btn" onClick={handleSearch}>
                      Search
                    </Button>
                  </div>
                  <div className="mr-2" >
                    <Button className="SubmitBtn refresh-btn" onClick={handleRefresh}>
                    <i className="fa fa-refresh "></i>

                    </Button>
                  </div>
                </div>
                <div
                  id="invoiceTable"
                  className="mt-2"
                  style={{ height: "300px", overflow: "scroll " }}
                >
                  {(rows?.length <= 0 && rows == []) || undefined || null ? (
                    "No data"
                  ) : (
                    <TableComponent
                      columns={sellPrograms}
                      rows={rows?.length > 0 ? rows : []}
                      setRows={setRows}
                      // totalCount={setTotalCount}
                      // setTotalCount={setTotalCount}
                      // currentPage={currentPage}
                      // pageSize={pageSize}
                      // setCurrentPage={setCurrentPage}
                      addpagination={true}
                      dragdrop={false}
                      fixedColumnsOn={false}
                      resizeingCol={false}
                      selectionCol={true}
                      sorting={true}
                    />
                  )}
                </div>
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
              </AccordionDetails>
            </Accordion>
            <Accordion
              className={`${expanded === "panel2" ? "active" : ""}`}
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Maintenance</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <AuctionCard
                  rows={saleProgramList}
                  formData={formData}
                  saleNumber={saleNumber}
                  setSelectedSaleProgram={setSelectedSaleProgram}
                  handleYearChange={handleYearChange}
                  generateYearOptions={generateYearOptions}
                  actionData={actionData}
                  selectedSaleProgram={selectedSaleProgram}
                  isDisabled={isDisabled}
                  isEdit={isEdit}
                />
              </AccordionDetails>
            </Accordion>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default SaleProgram;
