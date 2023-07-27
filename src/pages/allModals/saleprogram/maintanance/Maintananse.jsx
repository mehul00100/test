import React, { useEffect, useState } from "react";
import {
  Card,
  FormControl,
  FormLabel,
  FormGroup,
  Button,
  Table,
  Col,
  Row,
} from "react-bootstrap";
import {
  AiOutlineFilePdf,
  AiOutlineFileImage,
  AiOutlineFileText,
  AiOutlineFile,
} from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  cancelSaleProgramDocumentRequest,
  cancelSaleProgramRequest,
  checkSaleNoExistence,
  createSaleProgramRequest,
  fetchPromptDatesByAuctionCenterRequest,
  teaTypeAction,
  updateSaleProgramRequest,
} from "../../../../store/actions/index";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import NoData from "../../../../components/nodata/NoData";
import { SettingsSystemDaydreamSharp } from "@mui/icons-material";
import axios from "axios";
import ConfirmationModal from "../../../../components/common/ConfirmationModal";

const AuctionCard = ({
  selectedSaleProgram,
  formData,
  generateYearOptions,
  handleYearChange,
  saleNumber,
  setSelectedSaleProgram,
  isDisabled,
  isEdit,
}) => {
  const dispatch = useDispatch();
  const auctionCenter = useSelector(
    (state) => state.auction.auctionCenter.responseData
  );
  const saleProgramList = useSelector(
    (state) => state.sale.saleProgramList.responseData
  );
  const [teaTypeList, setTeaTeatypeList] = useState([]);

  // const auctionId = auctionCenter.map((i) => i.auctionCenterId);
  // console.log(auctionId, "auction id");

  const [saleDate, setSaleDates] = useState("");
  const saleProgramDetail = useSelector((state) => state);
  const [saleProgramDetailList, setSaleProgramDetailList] = useState([]);
  const [selectedSalePrograms, setSelectedSalePrograms] = useState([]);
  const [salePromtDate, setSalePromtDate] = useState([]);
  const [SaleProgramId, setSaleProgramId] = useState(null);

  const exists = useSelector((state) => state.auction.saleNumber);
  const currentDate = new Date().toISOString()?.split("T")[0];
  const [closingDate, setClosingDate] = useState(currentDate);
  const [publishingDate, setPublishingDate] = useState(currentDate);
  const [saleDates, setSaleDate] = useState(currentDate);
  const [selectedSaleNo, setSelectedSaleNo] = useState(1);
  const [numRows, setNumRows] = useState(1); // State to track the number of rows
  const auctionDays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; // Array of auction days
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [year, setYears] = useState(currentDate?.split("-")[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [remark, setRemark] = useState("");

  const teaType = useSelector(
    (state) => state.teaType.teaTypeList.responseData
  );

  const saleDateData = useSelector(
    (state) => state?.auction?.promptDates?.responseData
  );

  useEffect(() => {
    setSalePromtDate(saleDateData?.at(0));
  }, [saleDateData]);

  console.log(salePromtDate, selectedSalePrograms, "qwe");
  useEffect(() => {
    dispatch(teaTypeAction());
  }, []);

  useEffect(() => {
    setTeaTeatypeList(teaType);
  }, [teaType]);

  // Get the total number of pages based on the number of items and the page size
  const totalPages = Math.ceil(numRows / pageSize);

  // Generate an array of page numbers
  const pageNumbers = Array?.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  // Get the items to display on the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, numRows);
  const itemsOnPage = Array?.from(
    { length: numRows },
    (_, index) => index + startIndex
  );

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  console.log(saleProgramDetailList, "😂😊");

  useEffect(() => {
    setSaleProgramDetailList(
      saleProgramDetail.sale.saleProgramDetails.responseData
    );
  }, [saleProgramDetail]);

  useEffect(() => {
    if (saleProgramDetailList?.length > 0) {
      setYears(saleProgramDetailList?.map((ele) => ele.season));
      setSelectedSaleNo(saleProgramDetailList?.map((ele) => ele.saleNo));
      setClosingDate(
        saleProgramDetailList?.map(
          (ele) => ele.catalogClosingDate?.split("T")[0]
        )
      );
      setPublishingDate(
        saleProgramDetailList?.map(
          (ele) => ele.catalogPublishingDate?.split("T")[0]
        )
      );
      setNumRows(saleProgramDetailList?.map((ele) => ele.noOfAuctionDays));

      setUploadedFiles(
        saleProgramDetailList?.map((ele) => ele?.documentDetails)[0]
      );
      console.log(
        saleProgramDetailList?.map((ele) => ele?.documentDetails)[0],
        "😒😒😒"
      );

      setSelectedSalePrograms(
        saleProgramDetailList
          ?.map((ele) => ele?.auctionDetails)
          ?.map((ele) => ele)[0]
      );
      setSaleProgramId(saleProgramDetailList?.map((ele) => ele?.SaleProgramId));
    } else {
      console.log("error");
    }
  }, [saleProgramDetailList]);

  const resateForm = () => {
    setYears("2023");
    setNumRows(1);
    setSelectedSaleNo(1);
    setSaleDate(currentDate);
    setPublishingDate(currentDate);
    setClosingDate(currentDate);
    setUploadedFiles([]);
    isDisabled = false;
    setNumRows(1);
    setSelectedSaleProgram([]);
    setSelectedSalePrograms([]);
  };

  // useEffect(()=>{
  //   setClosingDate(saleProgramDetailList[0].catalogPublishingDate)
  //   setPublishingDate(saleProgramDetailList[0].catalogPublishingDate)
  // },[saleProgramDetailList])

  // const handleFileUpload = (event) => {
  //   const files = Array.from(event.target.files);
  //   setUploadedFiles(files);
  // };
  const handleFileUpload = async (event) => {
    const files = event.target.files;
    const updatedFiles = [...uploadedFiles];
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileInfo = {
        documentName: file.name,
        documentPath: "xyz/xyz.jpeg",
        documentBrief: "", // Empty document brief, you can set the actual brief value
        DocumentSize: `${(file.size / (1024 * 1024)).toFixed(2)}MB`,
        status: 0,
        documentBytes: null, // Placeholder for the file bytes
        contentType: file.type,
      };
  
      // Read the file content as a Base64 string using FileReader and async/await
      const base64Content = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          // Extract the Base64 content from the data URI
          const base64String = event.target.result.split(",")[1];
          resolve(base64String);
        };
  
        reader.onerror = (event) => {
          console.error("Error reading the file:", event.target.error);
          resolve(null);
        };
  
        // Read the file as a data URL
        reader.readAsDataURL(file);
      });
  
      if (base64Content) {
        fileInfo.documentBytes = base64Content; // Store the Base64 content in fileInfo
        updatedFiles.push(fileInfo);
      }
    }
  
    // Update the state after all files have been processed
    setUploadedFiles(updatedFiles);
  };
  
  

  console.log(exists);

  // function checkRequiredKeys(array, requiredKeys) {
  //   // Helper function to check if an object contains all required keys

  //   return isAllKeysPresent;
  // }

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredKeys = [
      "teaTypeId",
      "saleDate",
      "buyersPromptDate",
      "sellersPromptDate",
    ];

    // if (!closingDate || !publishingDate || !saleDates) {
    //   toast.error('Please fill in all the form fields');
    //   return;
    // }

    //
    function hasRequiredKeys(obj, keys) {
      return keys?.every((key) => obj?.hasOwnProperty(key));
    }

    const isAllKeysPresent = selectedSalePrograms?.every((item) =>
      hasRequiredKeys(item, requiredKeys)
    );

    if (selectedSalePrograms?.length != numRows) {
      toast.error("Auction Details fields is missing.!");
      return;
    }

    if (!isAllKeysPresent) {
      toast.error("Sale program field is missing !");
      return;
    }

    if (publishingDate < currentDate) {
      toast.error("Publishing date cannot be less than the current date");
      return;
    }

    if (publishingDate <= closingDate) {
      toast.error(
        "Publishing date cannot be less than or equal to the closing date"
      );
      return;
    }
    if (!selectedSaleNo) {
      toast.error("Please select a sale number");
      return;
    }

    if (!closingDate) {
      toast.error("Please enter the closing date");
      return;
    }

    if (!publishingDate) {
      toast.error("Please enter the publishing date");
      return;
    }

    if (
      saleProgramList
        ?.map((ele) => ele.saleNo == selectedSaleNo && isEdit == false)
        .includes(true) == true
    ) {
      toast.error("This sale no is already exist");
      return;
    }
    if (!selectedSaleNo && isEdit == false) {
      toast.error("Please select a sale number");
      return;
    }
    if (!uploadedFiles.length > 0 && isEdit == false) {
      toast.error("Please upload a file");
      return;
    }

    // if (saleNoExists.includes(true)) {
    //   toast.error("This sale number already exists");
    // } else {
    //   // dispatch(createSaleProgram(selectedSaleNo));
    //   dispatch(checkSaleNoExistence(parseInt(selectedSaleNo), year));
    //   toast.success("You can create a sale program");
    // }

    // console.log(

    // );
    setSelectedSalePrograms([
      ...selectedSalePrograms.filter((item) =>
        item?.teaTypeId === ""
          ? (item.teaTypeId = teaTypeList[0]?.teaTypeName)
          : item.teaTypeId
      ),
    ]);

    // const data = {
    //   season: year,
    //   // numRows: numRows,
    //   saleNo: selectedSaleNo,
    //   saleDates: saleDates,
    //   catalogPublishingDate: publishingDate,
    //   catalogClosingDate: closingDate,
    //   documentList: uploadedFiles,
    //   noOfAuctionDays: numRows,
    //   auctionDays: selectedSalePrograms,
    //   auctionDate: "2023-07-30T17:16:40",
    // };
    console.log(formData, "😂😂😂😂😂");

    // const fomatdata = selectedSalePrograms.map((item) => {
    //   return {
    //     season: year,
    //     numRows: numRows,
    //     selectedSaleNo: selectedSaleNo,
    //     saleDates: saleDates,
    //     publishingDate: publishingDate,
    //     closingDate: closingDate,
    //     uploadedFiles: uploadedFiles,
    //     noOfAuctionDays: numRows,
    //     auctionDays: [
    //       {
    //         teaTypeId: item.teaTypeId,
    //         saleDate: item.saleDate,
    //         sellersPromptDate: item.sellersPromptDate,
    //         buyersPromptDate: item.buyersPromptDate,
    //       },
    //     ],
    //   };
    // });

    // console.log(data, "😂😊🤣😁");
    resateForm();

    // Submit the form or perform any other necessary actions

    if (isEdit == true) {
      const formData = {
        SaleProgramId: SaleProgramId[0],
        season: typeof year == "object" ? year[0] : year,
        saleNo: parseInt(selectedSaleNo),
        catalogClosingDate:
          typeof closingDate == "object" ? closingDate[0] : closingDate,
        catalogPublishingDate:
          typeof publishingDate == "object"
            ? publishingDate[0]
            : publishingDate,
        createdBy: 1,
        updatedBy: 1,
        noOfAuctionDays: parseInt(numRows),
        status: 0,
        auctionDate: typeof saleDates == "object" ? saleDates[0] : saleDates,
        auctionDays: selectedSalePrograms.map((ele) => {
          return {
            buyersPromptDate: ele.buyersPromptDate,
            saleDate: ele.saleDate,
            saleProgramDetailId: ele.saleProgramDetailId,
            sellersPromptDate: ele.sellersPromptDate,
            status: 0,
            teaTypeId: ele.teaTypeId,
            teaTypeName: ele.teaTypeName,
          };
        }),
        documentList:
          typeof uploadedFiles == "object"
            ? uploadedFiles[0]?.length > 0
              ? uploadedFiles[0]?.map((ele) => {
                  return {
                    DocumentSize: ele.DocumentSize,
                    documentBrief: ele?.documentBrief,
                    documentId: ele.documentId,
                    documentName: ele?.documentName,
                    documentPath: ele?.documentPath,
                    status: 0,
                  };
                })
              : uploadedFiles
            : uploadedFiles,
      };

      dispatch(updateSaleProgramRequest(formData));
    } else {
      const formData = {
        season: year,
        saleNo: parseInt(selectedSaleNo),
        catalogClosingDate: closingDate,
        catalogPublishingDate: publishingDate,
        createdBy: 1,
        noOfAuctionDays: parseInt(numRows),
        status: 0,
        auctionDate: saleDates,
        auctionDays: selectedSalePrograms,
        documentList: uploadedFiles,
      };

      dispatch(createSaleProgramRequest(formData));
    }
  };

  console.log(selectedSaleNo, "selectedSaleNo 🤣😊😂😘");
  const handleAuctionDaysChange = (e) => {
    const selectedValue = parseInt(e.target.value);

    // if (selectedValue > numRows?.length) {
    //   console.log(selectedValue);
    // }
    setNumRows(selectedValue);
  };
  if (exists === true) {
    toast.success("You can create a sale program");
  } else if (exists === false) {
    toast.error("You are not allowed to create a sale program");
  }

  const renderFileTypeIcon = (file) => {
    const extension = file.name?.split(".").pop().toLowerCase();

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
    const updatedFiles = [...uploadedFiles];
    URL.revokeObjectURL(updatedFiles[index].path); // Release the object URL
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);
  };

  const removeAllFiles = () => {
    setUploadedFiles([]);
  };
  const handleSaleNoChange = (event) => {
    const selectedValue = event.target.value;

    // // if(exists)
    // console.log(,"😘😘😘");

    if (
      saleProgramList
        ?.map((ele) => ele.saleNo == selectedValue)
        .includes(true) == true
    ) {
      toast.error("This sale no is already exist");
    } else {
      toast.success("You can create a sale program");
    }
    setSelectedSaleNo(selectedValue);

    // Pass the selectedValue to the backend or perform any desired action
    // Example: dispatch an action to update the backend with the selected value
    // dispatch(updateSaleNoRequest(selectedValue));
  };

  if (!exists || !saleProgramDetail) {
    return (
      <div>
        <NoData />
      </div>
    ); // Show a message when no data is available
  }
  const handleSaleDateChange = (e) => {
    const selectedSaleDate = e.target.value;
    setSaleDates(selectedSaleDate);
  };
  // Function to update the state for a specific row/item

  const updateSelectedSaleProgram = (index, updatedProgram) => {
    try {
      const updatedPrograms = [...selectedSalePrograms];
      updatedPrograms[index] = updatedProgram;

      // You can perform the API call regardless of whether saleDate is available or not
      if (updatedProgram.saleDate) {
        const apiUrl =
          "http://192.168.101.75:5080/api/SaleProgram/GetPromptDateByAuctionCenter";
        const requestData = {
          auctionCenterId: 1,
          saleDate: updatedPrograms[index].saleDate,
        };

        axios.post(apiUrl, requestData).then((response) => {
          const { buyersPromptDate, sellersPromptDate } =
            response.data.responseData[0];

          const combinedObject = {
            ...updatedPrograms[index],
            sellersPromptDate,
            buyersPromptDate,
          };

          updatedPrograms[index] = combinedObject;
          setSelectedSalePrograms(updatedPrograms);
        });
      } else {
        // If saleDate is not available, you can update the selectedSalePrograms directly
        setSelectedSalePrograms(updatedPrograms);
      }
    } catch (error) {
      console.error("API call error:", error);
      // Handle the error if needed
    }
  };

  const updateFileBrief = (index, brief) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles[index].documentBrief = brief;
    updatedFiles[index].status = 0;
    setUploadedFiles(updatedFiles);
  };

  const handleCencal = (e) => {
    e.preventDefault();
    const formData = {
      SaleProgramId: SaleProgramId[0],
      season: typeof year == "object" ? year[0] : year,
      saleNo: parseInt(selectedSaleNo),
      catalogClosingDate:
        typeof closingDate == "object" ? closingDate[0] : closingDate,
      catalogPublishingDate:
        typeof publishingDate == "object" ? publishingDate[0] : publishingDate,
      createdBy: 1,
      updatedBy: 1,
      noOfAuctionDays: parseInt(numRows),
      status: 0,
      remarks: remark,
      auctionDate: typeof saleDates == "object" ? saleDates[0] : saleDates,
      auctionDays: selectedSalePrograms.map((ele) => {
        return {
          buyersPromptDate: ele.buyersPromptDate,
          saleDate: ele.saleDate,
          saleProgramDetailId: ele.saleProgramDetailId,
          sellersPromptDate: ele.sellersPromptDate,
          status: 0,
          teaTypeId: ele.teaTypeId,
          teaTypeName: ele.teaTypeName,
        };
      }),
      documentList: typeof uploadedFiles
        ? uploadedFiles[0]?.map((ele) => {
            return {
              DocumentSize: ele.DocumentSize,
              documentBrief: ele.documentBrief,
              documentId: ele.documentId,
              documentName: ele.documentName,
              documentPath: ele.documentPath,
              status: 0,
            };
          })
        : uploadedFiles,
    };

    dispatch(cancelSaleProgramRequest(formData));
  };

  const cancelDocument = (documentId) => {
    console.log(documentId, "asddsa");
    const documentData = {
      documentId: documentId,
      updatedBy: 1,
    };
    dispatch(cancelSaleProgramDocumentRequest(documentData));
  };
  function getStatusText(status) {
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
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="p-2">
        <Row>
          <Col xs={12} md={12}>
            <Card className="grey-card  p-3">
              <div className="row">
              <FormGroup className="col-md-4 mb-3">
                <FormLabel>Season</FormLabel>
                <FormControl
                  as="select"
                  name="age1"
                  value={year || ""}
                  onChange={(e) => setYears(e.target.value)}
                  disabled
                >
                  {generateYearOptions()}
                </FormControl>
              </FormGroup>
             
              <FormGroup className="col-md-4 mb-3">
                <FormLabel>Sale No</FormLabel>
                <FormControl
                  as="select"
                  value={selectedSaleNo || ""}
                  onChange={handleSaleNoChange}
                  size="sm"
                  disabled={isDisabled}
                >
                  {saleNumber.map((e) => (
                    <option key={e.saleNo} value={e.saleNo}>
                      {e.saleNo}
                    </option>
                  ))}
                </FormControl>
              </FormGroup>

              <FormGroup className="col-md-4 mb-3">
                <FormLabel>Catalog Closing Date</FormLabel>
                <FormControl
                  as="input"
                  type="date"
                  size="sm"
                  // value={closingDate}
                  value={
                    isEdit == true || isDisabled == true
                      ? closingDate
                      : closingDate || ""
                  }
                  disabled={isDisabled}
                  onChange={(e) => setClosingDate(e.target.value)}
                />
              </FormGroup>

              <FormGroup className="col-md-4 mb-3" fullWidth>
                <FormLabel>Catalog Publish Date</FormLabel>
                <FormControl
                  as="input"
                  type="date"
                  size="sm"
                  // value={publishingDate}
                  value={
                    isEdit == true || isDisabled == true
                      ? publishingDate
                      : publishingDate || ""
                  }
                  disabled={isDisabled}
                  onChange={(e) => setPublishingDate(e.target.value)}
                />
              </FormGroup>

              <FormGroup className="col-md-4 mb-3">
                <FormLabel>No. of Auction Days</FormLabel>
                <FormControl
                  as="select"
                  value={numRows || auctionDays[0]}
                  disabled={isDisabled}
                  onChange={handleAuctionDaysChange}
                  size="sm"
                >
                  {auctionDays?.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </FormControl>
              </FormGroup>

              </div>
            </Card>
          </Col>
          <Col className="" xs={12} md={12}>
            <Card className="grey-card  mt-3 p-3">
              {
                <>
                <div className="table-responsive">
                  <Table>
                    <thead>
                      <tr>
                        <th>Tea Type</th>
                        <th>Sale Date</th>
                        <th>Buyer's Prompt Date</th>
                        <th>Seller's Prompt Date</th>
                        <th className="a-center" align="center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itemsOnPage
                        .slice(startIndex, endIndex)
                        ?.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <FormControl
                                as="select"
                                disabled={isDisabled}
                                size="sm"
                                value={
                                  selectedSalePrograms[index]?.teaTypeId || ""
                                }
                                onChange={(e) => {
                                  const updatedProgram = {
                                    ...selectedSalePrograms[index],
                                    teaTypeId: parseInt(e.target.value),
                                  };
                                  updateSelectedSaleProgram(
                                    index,
                                    updatedProgram
                                  );
                                }}
                              >
                                {teaTypeList?.length > 0
                                  ? teaTypeList?.map((item, index) => (
                                      <option value={item?.teaTypeId}>
                                        {item.teaTypeName}
                                      </option>
                                    ))
                                  : "No Data"}
                              </FormControl>
                            </td>
                            <td>
                              <input
                              className="form-control"
                                type="date"
                                id="saleDate"
                                value={
                                  selectedSalePrograms[index]?.saleDate?.split(
                                    "T"
                                  )[0] || ""
                                }
                                disabled={isDisabled}
                                onChange={(e) => {
                                  const updatedProgram = {
                                    ...selectedSalePrograms[index],
                                    saleDate: e.target.value,
                                  };
                                  updateSelectedSaleProgram(
                                    index,
                                    updatedProgram
                                  );
                                }}
                              />
                            </td>
                            <td>
                              <input
                               className="form-control"
                                type="date"
                                disabled={true}
                                value={
                                  selectedSalePrograms[
                                    index
                                  ]?.buyersPromptDate?.split("T")[0] || ""
                                }
                              />
                            </td>
                            <td>
                              <input
                               className="form-control"
                                disabled={true}
                                type="date"
                                value={
                                  selectedSalePrograms[
                                    index
                                  ]?.sellersPromptDate?.split("T")[0] || ""
                                  // selectedSalePrograms[index]?.sellersPromptDate?
                                }
                              />
                            </td>
                            <td align="center">
                              {selectedSaleProgram?.status === null
                                ? "-"
                                : getStatusText(selectedSaleProgram?.status)}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                  </div>
                </>
              }

              <div className="mt-2 mb-2 mr-2 ml-2">

                <ul className="pagination">
                  {/* Previous page button */}
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      Previous
                    </button>
                  </li>

                  {/* Page buttons */}
                  {pageNumbers.map((page) => (
                    <li
                      key={page}
                      className={`page-item ${
                        currentPage === page ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    </li>
                  ))}

                  {/* Next page button */}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </div>
            </Card>
          </Col>
        
          <Col className="" xs={12} md={12}>
       
          <Card className="grey-card  mt-3 p-3 FileUploadBox ">
            <Card.Title>File Upload</Card.Title>
            <div className="FileUpload">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                disabled={isDisabled}
              />
              {/* <button onClick={() => removeAllFiles()}>Remove All</button> */}
            </div>
            {/* Render file type icons based on uploaded files */}
            {/* {uploadedFiles.map((file, index) => (
            <div className="UploadedFile" key={index}>
              <div>
                {renderFileTypeIcon(file)}
                <span>{file.name}</span>
              </div>
              <i className="fa fa-times" onClick={() => removeFile(index)}></i>
            </div>
          ))} */}
            {uploadedFiles?.map((file, index) => (
              <div className="UploadedFile" key={index}>
                
                  <p>
                    {isDisabled == true || isEdit == true
                      ? file?.documentName
                      : file?.documentName}
                  </p>
                  <input
                    type="text"
                    value={
                      isDisabled == true || isEdit == true
                        ? file?.documentBrief
                        : file?.documentBrief
                    }
                    onChange={(event) =>
                      updateFileBrief(index, event.target.value)
                    }
                    placeholder="Enter document brief"
                    disabled={isDisabled}
                    required
                  />
                
                {isDisabled == true ? (
                  <>
                    <a href={file.documentPath} download={file.documentName}>
                      <i
                        className="fa fa-download"
                        style={{ color: "green", cursor: "pointer" }}
                      ></i>
                    </a>
                    <button
                      style={{
                        backgroundColor: "transparent",
                        cursor: "pointer",
                      }}
                      type="button"
                      onClick={() => cancelDocument(file.documentId)}
                    >
                      <i
                        className="fa fa-cancel"
                        style={{ color: "red", cursor: "pointer" }}
                      ></i>
                    </button>
                  </>
                ) : (
                  <i
                    className="fa fa-times"
                    onClick={() => removeFile(index)}
                  ></i>
                )}
              </div>
            ))}
          </Card>
      

        </Col>


        <Col className="text-center mt-3" xs={12} md={12}>
        {isDisabled !== true ? (
                <>
                  <Button className="mt-2 SubmitBtn" type="submit">
                    {isEdit == true ? "Update" : "Submit"}
                  </Button>
                  <Button className="mt-2 SubmitBtn refresh-btn ml-2" onClick={resateForm}>
                  <i className="fa fa-refresh "></i>
                  </Button>
                </>
              ) : (
                <Button className="mt-2 SubmitBtn ml-2" onClick={openModal}>
                  Cencal
                </Button>
              )}
              </Col>
              </Row>
              
      </form>

      <ConfirmationModal
        show={showModal}
        onHide={closeModal}
        onDelete={handleCencal}
        setRemark={setRemark}
      />

      <ToastContainer />
    </>
  );
};

export default AuctionCard;
