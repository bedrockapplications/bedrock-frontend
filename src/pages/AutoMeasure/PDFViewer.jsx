import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import MuiDialog from "../../components/MuiDialog";
import { getKreoProjectDetails } from "../../services/request";
import {
  DialogContent,
  Button,
  DialogActions,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import PicUpload from "../DailyLogs/dropZone";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const dataList = [
  {
    id: "1.",
    name: "Doors",
    value: "→ 20",
  },
  {
    id: "1.",
    name: "Doors",
    value: "→ 20",
  },
  {
    id: "1.",
    name: "Doors",
    value: "→ 20",
  },
  {
    id: "1.",
    name: "Doors",
    value: "→ 20",
  },
  {
    id: "1.",
    name: "Doors",
    value: "→ 20",
  },
  {
    id: "1.",
    name: "Doors",
    value: "→ 20",
  },
  {
    id: "1.",
    name: "Doors",
    value: "→ 20",
  },
  {
    id: "1.",
    name: "Doors",
    value: "→ 20",
  },
  {
    id: "1.",
    name: "Doors",
    value: "→ 20",
  },
  {
    id: "1.",
    name: "Doors",
    value: "→ 20",
  },
  {
    id: "1.",
    name: "Doors",
    value: "→ 20",
  },
  {
    id: "1.",
    name: "Doors",
    value: "→ 20",
  },
  {
    id: "1.",
    name: "Doors",
    value: "→ 20",
  },
  {
    id: "1.",
    name: "Doors",
    value: "→ 20",
  },
  {
    id: "1.",
    name: "Doors",
    value: "→ 20",
  },
  {
    id: "1.",
    name: "Doors",
    value: "→ 20",
  },
  {
    id: "1.",
    name: "Doors",
    value: "→ 20",
  },
  {
    id: "1.",
    name: "Doors",
    value: "→ 20",
  },
  {
    id: "1.",
    name: "Doors",
    value: "→ 20",
  },
  {
    id: "1.",
    name: "Doors",
    value: "→ 20",
  },
];

const PDFViewer = (props) => {
  const { open, handleClose, id, title, myPdfFile, kreoProjectObj } = props;
  // const [numPages, setNumPages] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [individualDetails, setIndividualDetails] = useState({});
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function changePage(offSet) {
    setPageNumber((prevPageNumber) => prevPageNumber + offSet);
  }

  function changePageBack() {
    if (pageNumber > 1) {
      changePage(-1);
      getProjectDetailsApi(numPages - 1);
    }
  }

  function changePageNext() {
    if (pageNumber < numPages) {
      changePage(+1);
      getProjectDetailsApi(numPages - 1);
    }
  }

  const getProjectDetailsApi = (index) => {
    let token = localStorage.getItem("kreoToken");
    // if (kreoProjectObj.projectId) {
    getKreoProjectDetails(token, 67817, index || 0)
      .then((res) => {
        if (res.status === 200) {
          let data = res?.data?.polygons?.Element;
          let data1 = res?.data?.polygons?.Space;
          let detailObj = {
            Window: data?.Window?.length,
            Wall: data?.Wall?.length,
            Door: data?.Door?.length,
            Opening: data?.Opening?.length,
            // BATHROOM :
            Vent: data1?.Vent?.length,
            Corridor: data1?.Corridor.length,
            Riser: data1?.Riser?.length,
            Stair: data1?.Stair?.length,
            GEA: data1?.GEA?.length,
            NIA: data1?.NIA.length,
            GIA: data1.GIA?.length,
            Elevator: data1?.Elevator?.length,
            Cupboard: data1?.Cupboard?.length,
          };
          console.log("res", detailObj);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
    // }
  };

  useEffect(() => {
    // if (kreoProjectObj.projectId) {
    getProjectDetailsApi();
    // }
  }, [kreoProjectObj?.projectId]);

  return (
    <>
      {console.log("kreoProjectObj", kreoProjectObj)}
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
            <Grid
              item
              xs={4}
              sx={{
                background: "#3A3A3C",
                overflowY: "scroll",
                padding: "25px",
                height: "calc(50vh + 75px)",
              }}
            >
              <Typography
                sx={{
                  color: "#FFFFFF",
                  fontSize: "24px",
                  fontWeight: "600",
                  marginBottom: "25px",
                }}
              >
                Count :
              </Typography>
              <Box>
                {dataList.map((each, i) => (
                  <Grid container spacing={2} sx={{ marginBottom: "15px" }}>
                    <Grid item xs={5}>
                      <Typography
                        sx={{
                          color: "#FFFFFF",
                          fontSize: "16px",
                          fontWeight: "400",
                        }}
                      >{`${each.id} ${each.name}`}</Typography>
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={4}>
                      <Typography
                        sx={{
                          color: "#FFFFFF",
                          fontSize: "16px",
                          fontWeight: "400",
                        }}
                      >
                        {each.value}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Box>
                <center>
                  {myPdfFile?.type?.startsWith("application/pdf") ? (
                    <Document
                      file={myPdfFile}
                      onLoadSuccess={onDocumentLoadSuccess}
                      style={{ height: "calc(100vh - 100px)", width: "70vw" }}
                    >
                      <Page pageNumber={pageNumber} />
                    </Document>
                  ) : (
                    <Box
                      sx={{
                        height: "calc(50vh)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        style={{ width: "32.5vw" }}
                        src={URL.createObjectURL(myPdfFile)}
                        alt=""
                      />
                    </Box>
                  )}
                </center>
                <div className="end-box">
                  <div
                    className="pagestext"
                    style={{
                      visibility: myPdfFile.type.startsWith("image/")
                        ? "hidden"
                        : "",
                    }}
                  >
                    Page {pageNumber} of {numPages}
                  </div>
                  <div className="buttonbox">
                    <div
                      className="backbutton"
                      style={{
                        cursor: pageNumber > 1 ? "pointer" : "not-allowed",
                      }}
                      onClick={changePageBack}
                    >
                      Previous
                    </div>
                    <div
                      className="nextbutton"
                      style={{
                        cursor:
                          pageNumber < numPages ? "pointer" : "not-allowed",
                      }}
                      onClick={changePageNext}
                    >
                      Next
                    </div>
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
