import React, { useState } from "react";
import Modal from "../../components/common/Modal";
import TableComponent from "../../components/tableComponent/TableComponent";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Card, Form } from "react-bootstrap";
import {
  AiOutlineFile,
  AiOutlineFileImage,
  AiOutlineFilePdf,
  AiOutlineFileText,
} from "react-icons/ai";

const data = [
  {
    state: "California",
    stateCode: "CA",
    stateInitial: "C",
    action: "Some action",
  },
  {
    state: "New York",
    stateCode: "NY",
    stateInitial: "NY",
    action: "Another action",
  },
  // Add more objects as needed...
];

function CreateStateMaster({ open, setOpen }) {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [rows, setRows] = useState(data);
  const columns = [
    {
      name: "state",
      title: "State",
    },
    {
      name: "stateCode",
      title: "State Code",
    },
    {
      name: "stateInitial",
      title: "State Initial",
    },
    {
      name: "Status",
      title: "Status",
      getCellValue: (rows) => <StatusData data={rows} />,
    },
    {
      name: "action",
      title: "Action",
      getCellValue: (rows) => <ActionData data={rows} />,
    },
  ];

  function StatusData(data) {
    return (
      <>
        <div class="Switch">
        <div class="custom-control custom-switch">
            <input type="checkbox" class="custom-control-input" id="customSwitch1"/>
            <label class="custom-control-label" for="customSwitch1">Active</label>
          </div>
        </div>
      </>
    );
  }

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles(files);
  };

  const renderFileTypeIcon = (file) => {
    const extension = file.name.split(".").pop().toLowerCase();

    if (extension === "pdf") {
      return <AiOutlineFilePdf />;
    } else if (
      extension === "jpg" ||
      extension === "jpeg" ||
      extension === "png"
    ) {
      return <AiOutlineFileImage />;
    } else if (extension === "txt") {
      return <AiOutlineFileText />;
    } else {
      return <AiOutlineFile />;
    }
  };

  const removeFile = (index) => {
    setUploadedFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const removeAllFiles = () => {
    setUploadedFiles([]);
  };

  function ActionData(data) {
    return (
      <>
        <div class="ActionBtn">
          <i className="fa fa-edit"></i>
        </div>
      </>
    );
  }
  return (
    <Modal
      title={"Create State Master"}
      show={open === "createStateMaster" ? true : false}
      handleClose={() => setOpen("")}
      size="lg"
    >
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
          <Typography>Create State Master</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className="row">
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-md-12">
                    <div className="row align-items-end">
                      <div className="col-md-4">
                        <div className="FormGroup">
                          <label>State Name</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="FormGroup">
                          <label>State Code</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="FormGroup">
                          <label>State Initial</label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="FormGroup">
                          <Card className="mt-3 FileUploadBox">
                            <Card.Body>
                              <Card.Title>File Upload</Card.Title>
                              <div className="FileUpload">
                                <input
                                  type="file"
                                  multiple
                                  onChange={handleFileUpload}
                                />
                                <button onClick={() => removeAllFiles()}>
                                  Remove All
                                </button>
                              </div>
                              {/* Render file type icons based on uploaded files */}
                              {uploadedFiles.map((file, index) => (
                                <div className="UploadedFile" key={index}>
                                  <div>
                                    {renderFileTypeIcon(file)}
                                    <span>{file.name}</span>
                                  </div>
                                  <i
                                    className="fa fa-times"
                                    onClick={() => removeFile(index)}
                                  ></i>
                                </div>
                              ))}
                            </Card.Body>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="BtnGroup">
                      <button className="SubmitBtn">Submit</button>
                      <button className="Clear">Clear</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        className={`${expanded === "panel2" ? "active" : ""}`}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Manage State Master</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className="row">
              <div className="col-lg-12">
                <div className="row align-items-end">
                  <div className="col-md-3">
                    <div className="FormGroup">
                      <label>State Name</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="FormGroup">
                      <label>State Code</label>
                      <select className="form-control select-form">
                        <option>Gujarat</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="FormGroup">
                      <label>State Initial</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="BtnGroup">
                      <button className="SubmitBtn">Search</button>
                      <button className="Clear">Clear</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12 mt-4">
                <div className="TableBox CreateStateMaster">
                  <TableComponent
                    columns={columns}
                    // setColumns={setColumns}
                    rows={rows}
                    setRows={setRows}
                    sorting={true}
                    dragdrop={false}
                    fixedColumnsOn={false}
                    resizeingCol={false}
                  />
                </div>
              </div>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Modal>
  );
}

export default CreateStateMaster;
