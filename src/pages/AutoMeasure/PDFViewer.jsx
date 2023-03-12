import React, { useEffect, useState, useContext } from "react";
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
import { makeStyles } from "@mui/styles";
import { GlobalState } from "../../Context/Context";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useStyle = makeStyles(() => ({
  titleText: {
    color: "#FFFFFF",
    fontSize: "16px",
    fontWeight: "400",
  },
}));

const PDFViewer = (props) => {
  const classes = useStyle();
  const { setIsLoading } = useContext(GlobalState);

  const { open, handleClose, id, title, myPdfFile, kreoProjectObj } = props;
  // const [numPages, setNumPages] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageIndex, setPageIndex] = useState(0);
  const [individualDetails, setIndividualDetails] = useState({});
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function changePage(offSet) {
    console.log(pageNumber, "oooo")
    console.log(offSet, "pppp")
    console.log(pageIndex, "num")
    setPageNumber((prevPageNumber) => prevPageNumber + offSet);
    getProjectDetailsApi(pageIndex + offSet);
    setPageIndex(pageIndex + offSet);
  }

  function changePageBack() {
    if (pageNumber > 1) {
      changePage(-1);
    }
  }

  function changePageNext() {
    if (pageNumber < numPages) {
      changePage(+1);
    }
  }

  const getProjectDetailsApi = (index) => {
    setIsLoading(true);
    let token = localStorage.getItem("kreoToken");
    if (kreoProjectObj.projectId) {
      getKreoProjectDetails(token, kreoProjectObj?.projectId, index || 0)
        .then((res) => {
          if (res.status === 200) {
            let data = res?.data?.polygons?.Element;
            let data1 = res?.data?.polygons?.Space;
            let detailObj = {
              Door: data?.Door?.length || 0,
              Opening: data?.Opening?.length || 0,
              Wall: data?.Wall?.length || 0,
              Bathroom: data1?.Bathroom?.length || 0,
              Bedroom: data1?.Bedroom?.length || 0,
              // Living_Room: data1["Living Room"]?.length || 0,
              Corridor: data1?.Corridor?.length,
              Hall: data1?.Hall?.length || 0,
              Cupboard: data1?.Cupboard?.length,
              //GARAGE:
              Balcony: data1?.Balcony?.length || 0,
              Elevator: data1?.Elevator?.length,
              Vent: data1?.Vent?.length,
              Riser: data1?.Riser?.length,
              Stair: data1?.Stair?.length,
              GIA: data1.GIA?.length,
              GEA: data1?.GEA?.length,
              NIA: data1?.NIA.length,
              Window: data?.Window?.length,
            };
            setIsLoading(false);
            setIndividualDetails({ ...detailObj });
          }
        })
        .catch((error) => {
          console.log("error", error);
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    if (kreoProjectObj.projectId) {
      getProjectDetailsApi();
    }
  }, [kreoProjectObj?.projectId]);

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
                <Grid container spacing={2} sx={{ marginBottom: "15px" }}>
                  <Grid item xs={12}>
                    <Typography className={classes.titleText}>
                      Doors : {individualDetails?.Door}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className={classes.titleText}>
                      Opening : {individualDetails?.Opening}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className={classes.titleText}>
                      Wall : {individualDetails?.Wall}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className={classes.titleText}>
                      Bathroom : {individualDetails?.Bathroom}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className={classes.titleText}>
                      Corridor : {individualDetails?.Corridor}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className={classes.titleText}>
                      Hall : {individualDetails?.Hall}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className={classes.titleText}>
                      Cupboard : {individualDetails?.Cupboard}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className={classes.titleText}>
                      Balcony : {individualDetails?.Balcony}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className={classes.titleText}>
                      Elevator : {individualDetails?.Elevator}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className={classes.titleText}>
                      Vent : {individualDetails?.Vent}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className={classes.titleText}>
                      Riser : {individualDetails?.Riser}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className={classes.titleText}>
                      Stair : {individualDetails?.Stair}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className={classes.titleText}>
                      GIA : {individualDetails?.GIA}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className={classes.titleText}>
                      GEA : {individualDetails?.GEA}
                    </Typography>
                  </Grid>{" "}
                  <Grid item xs={12}>
                    <Typography className={classes.titleText}>
                      NIA : {individualDetails?.NIA}
                    </Typography>
                  </Grid>{" "}
                  <Grid item xs={12}>
                    <Typography className={classes.titleText}>
                      Window : {individualDetails?.Window}
                    </Typography>
                  </Grid>
                </Grid>

                {/* {dataList.map((each, i) => (
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
                ))} */}
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
        {/* <DialogActions>
          <Button
            variant="contained"
            type="submit"
            size="small"
            // onClick={handleSubmitForm}
          >
            Save
          </Button>
        </DialogActions> */}
      </MuiDialog>
    </>
  );
};

export default PDFViewer;
