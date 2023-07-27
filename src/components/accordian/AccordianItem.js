import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SaleProgram from "../../pages/allModals/saleprogram/SaleProgram";
import Invoice from "../../pages/allModals/invoice/Invoice";
import { Category } from "@mui/icons-material";
import CetegoryMaster from "../../pages/allModals/master/Cetegory/CetegoryMaster";
import CreateTeaType from "../../pages/createTeaType/CreateTeaType";
import CreateCategory from "../../pages/createCategory/CreateCategory";
import CreateAuctionCenter from "../../pages/createAuctionCenter/CreateAuctionCenter";
import CreateStateMaster from "../../pages/createStateMaster/CreateStateMaster";
import CreatePlantationDistrictMaster from "../../pages/createPlantationDistrictMaster/CreatePlantationDistrictMaster";
import CreateSubTeaType from "../../pages/createSubTeaType/CreateSubTeaType";
import CreateRevenueDistrictMaster from "../../pages/createRevenueDistrictMaster/CreateRevenueDistrictMaster";
import CreateGrade from "../../pages/createGrade/CreateGrade";
import CreateFactoryType from "../../pages/createFactoryType/CreateFactoryType";
import CreateRole from "../../pages/createRole/CreateRole";
import Awr from "../../pages/allModals/awr/AWR";
import KutchCatalog from "../../pages/allModals/kutchacatalog/KutchaCatalog";

const AccordionItem = ({ title, content }) => {
  const [modalNames, setModalNames] = useState("");

  const handleItemClick = (ele) => {
    setModalNames(ele);
  };

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel-content"
          id="panel-header"
        >
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {Array.isArray(content) ? (
              <ul className="SideMenu">
                {content.map((ele, index) => (
                  <li className="text-capitalize" key={index}>
                    <div onClick={() => handleItemClick(ele.name)}>
                      {ele.title}
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <SaleProgram open={modalNames} setOpen={setModalNames} />
      <Invoice open={modalNames} setOpen={setModalNames} />
      <CreateStateMaster open={modalNames} setOpen={setModalNames} />
      <CreateAuctionCenter open={modalNames} setOpen={setModalNames} />
      <CreateCategory open={modalNames} setOpen={setModalNames} />
      <CreateTeaType open={modalNames} setOpen={setModalNames} />
      <CreateSubTeaType open={modalNames} setOpen={setModalNames} />
      <CreatePlantationDistrictMaster
        open={modalNames}
        setOpen={setModalNames}
      />
      <CreateRevenueDistrictMaster open={modalNames} setOpen={setModalNames} />
      <CreateGrade open={modalNames} setOpen={setModalNames} />
      <CreateFactoryType open={modalNames} setOpen={setModalNames} />
      <CreateRole open={modalNames} setOpen={setModalNames} />
      <Awr open={modalNames} setOpen={setModalNames} />
      <KutchCatalog open={modalNames} setOpen={setModalNames} />

    </>
  );
};

export default AccordionItem;
