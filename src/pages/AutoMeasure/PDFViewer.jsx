import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import MuiDialog from "../../components/MuiDialog";
import {
  DialogContent,
  Button,
  DialogActions,
  Box,
  Grid,
  Typography
} from "@mui/material";
import PicUpload from "../DailyLogs/dropZone";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const dataList = [
  {
    id:"1.",
    name:"Doors",
    value:"→ 20",
  },
  {
    id:"1.",
    name:"Doors",
    value:"→ 20",
  },
  {
    id:"1.",
    name:"Doors",
    value:"→ 20",
  },
  {
    id:"1.",
    name:"Doors",
    value:"→ 20",
  },
  {
    id:"1.",
    name:"Doors",
    value:"→ 20",
  },
  {
    id:"1.",
    name:"Doors",
    value:"→ 20",
  },
  {
    id:"1.",
    name:"Doors",
    value:"→ 20",
  },
  {
    id:"1.",
    name:"Doors",
    value:"→ 20",
  },
  {
    id:"1.",
    name:"Doors",
    value:"→ 20",
  },
  {
    id:"1.",
    name:"Doors",
    value:"→ 20",
  },
  {
    id:"1.",
    name:"Doors",
    value:"→ 20",
  },
  {
    id:"1.",
    name:"Doors",
    value:"→ 20",
  },
  {
    id:"1.",
    name:"Doors",
    value:"→ 20",
  },
  {
    id:"1.",
    name:"Doors",
    value:"→ 20",
  },
  {
    id:"1.",
    name:"Doors",
    value:"→ 20",
  },
  {
    id:"1.",
    name:"Doors",
    value:"→ 20",
  },
  {
    id:"1.",
    name:"Doors",
    value:"→ 20",
  },
  {
    id:"1.",
    name:"Doors",
    value:"→ 20",
  },
  {
    id:"1.",
    name:"Doors",
    value:"→ 20",
  },
  {
    id:"1.",
    name:"Doors",
    value:"→ 20",
  },
]

const PDFViewer = (props) => {
  const { open, handleClose, id, title, myPdfFile } = props;
  // const [numPages, setNumPages] = useState(null);
  const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }
  
    function changePage(offSet) {
      setPageNumber((prevPageNumber) => prevPageNumber + offSet);
    }
  
    function changePageBack() {
      if(pageNumber > 1 ){
          changePage(-1);
      }
    }
  
    function changePageNext() {
      if(pageNumber < numPages){
          changePage(+1);
      }
    }

  return (
    <>
      <MuiDialog
        open={open}
        handleClose={handleClose}
        id={id}
        title={title}
        maxWidth={"md"}
      >
        {/* <Divider /> */}
        <DialogContent dividers>
          <Grid container spacing={0}>
          <Grid item xs={4} sx={{background:"#3A3A3C", overflowY:"scroll", padding: "25px", height:"calc(50vh + 75px)"}}>
            <Typography sx={{color:"#FFFFFF", fontSize: "24px", fontWeight:"600", marginBottom:"25px"}}>
            Count :
            </Typography>
            <Box>
              {
                dataList.map((each, i) => 
                  (
                  <Grid container spacing={2} sx={{marginBottom:"15px"}}>
                    <Grid item xs={5}>
                      <Typography sx={{color:"#FFFFFF", fontSize: "16px", fontWeight:"400"}}>{`${each.id} ${each.name}`}</Typography>
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={4}>
                      <Typography sx={{color:"#FFFFFF", fontSize: "16px", fontWeight:"400"}}>
                        {each.value}
                      </Typography>
                    </Grid>
                  </Grid>
                  )
                )
              }
            </Box>
          </Grid>
          <Grid item xs={8}>
          <Box>
          <center>
            {
              myPdfFile?.type?.startsWith('application/pdf') ?
                <Document file={myPdfFile} onLoadSuccess={onDocumentLoadSuccess}
                style={{height:'calc(100vh - 100px)', width:"70vw"}}>
                    <Page pageNumber={pageNumber} />
                </Document>
                :
                <Box sx={{height:'calc(50vh)', display:"flex", alignItems:"center", justifyContent:"center"}}>
                  <img style={{ width:"32.5vw"}} src={URL.createObjectURL(myPdfFile)} alt="" />
                </Box>
            }
            </center>
            <div className="end-box">
                <div className="pagestext"style={{visibility: myPdfFile.type.startsWith("image/") ? "hidden" : ""}}>
                    Page {pageNumber} of {numPages}
                </div>
                <div className="buttonbox" style={{visibility: myPdfFile.type.startsWith("image/") ? "hidden" : ""}}>
                    <div className="backbutton" style={{cursor: pageNumber > 1 ? "pointer" : "not-allowed"}} onClick={changePageBack}>Previous</div>
                    <div className="nextbutton" style={{cursor: pageNumber < numPages ? "pointer" : "not-allowed"}} onClick={changePageNext}>Next</div>
                </div>
            </div>
            {/* <Document
              file={myPdfFile}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  className="PDFPage"
                  scale={3}
                />
              ))}
            </Document> */}
          </Box>
          </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            type="submit"
            size="small"
            // onClick={handleSubmitForm}
          >
            Save
          </Button>
        </DialogActions>
      </MuiDialog>
    </>
  );
};

export default PDFViewer;
