import React, { useState } from "react";
import Papa from "papaparse";
import { read, utils } from "xlsx";
import step_1_with_altitude from "../../Screenshots/Step 1 - Coordinates and Altitude.png";
import step_1_without_altitude from "../../Screenshots/Step 1 - Coordinates only.png";
import step_2_with_altitude from "../../Screenshots/Step 2 - with Altitude.png";
import step_2_without_altitude from "../../Screenshots/Step 2 - without Altitude.png";

const FromFile = () => {
  // State variables
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [refLat, setRefLat] = useState();
  const [refLong, setRefLong] = useState();
  const [refAlt, setRefAlt] = useState();

  // Function to handle latitude input
  const handleLatValue = (event) => {
    setRefLat(event.target.value);
  };

  // Function to handle longitude input
  const handleLongValue = (event) => {
    setRefLong(event.target.value);
  };

  // Function to handle altitude input
  const handleAltValue = (event) => {
    setRefAlt(event.target.value);
  };

  // Function to handle file selection
  const handleFileChange = (event) => {
    try {
      if (event.target.files) {
        // Get selected file
        const selectedFile = event.target.files[0];
        // Set file state
        setFile(selectedFile);
        // Set file name state
        setFileName(selectedFile.name);
        // Get file type
        const fileType = selectedFile.name.split(".").pop().toLowerCase();
        // Set file type state
        setFileType(fileType);
        const reader = new FileReader(); // Create a new FileReader object
        // Callback function executed when the FileReader finishes reading the file
        reader.onload = (event) => {
          const fileContents = event.target.result; // Get the contents of the file
          // Parse and log file content to console
          if (selectedFile.name.endsWith(".csv")) {
            const data = Papa.parse(fileContents, {
              header: true,
            });
            console.log(data);
          } else if (selectedFile.name.endsWith(".xlsx")) {
            const wb = read(fileContents, { type: "binary" });
            const sheet = wb.Sheets[wb.SheetNames[0]];
            const csvData = utils.sheet_to_csv(sheet);
            const data = Papa.parse(csvData, {
              header: true,
            });
            console.log(data);
          }
        };

        // Read the file as text
        reader.readAsBinaryString(selectedFile);
      }
    } catch (error) {
      console.error("Error handling file change:", error);
    }
  };

  // Function to check file name and type
  const fileNameChecker = () => {
    try {
      if (file === undefined) {
      }
      // Check if the file type is either Excel or CSV
      else if (
        (fileType === "xlsx" && fileName.length > 4) ||
        (fileType === "csv" && fileName.length > 4)
      ) {
        // console.log("File title:", fileName);
      } else {
        console.error(
          "Invalid file type. Please upload an Excel (.xlsx) or CSV (.csv) file."
        );
      }
    } catch (error) {}
  };

  // Check file type
  fileNameChecker();

  // Console log state variables for debugging
  // console.log(file, fileName, fileType, refLat, refLong, refAlt);

  return (
    <div className="flex flex-col text-center justify-start h-full">
      <div className="w-full rounded-lg p-4 sm:px-8 text-center">
        <h3 className="text-gray-700 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-6">
          Analyze your GNSS coordinates from a static test in an instant
        </h3>
        <div className="text-center mb-6">
          <h3 className="text-sm sm:text-lg text-gray-600 font-semibold mb-4">
            Please follow the instructions below to prepare your file and
            utilize this tool effectively
          </h3>
          <div className="flex flex-col items-center w-full h-fit justify-center">
            <div className="flex flex-col items-center justify-center w-full mb-4 sm:mb-8">
              <div className="bg-teal-600 font-bold rounded-full h-8 w-8 flex items-center justify-center text-white mb-4">
                1
              </div>
              <div className="text-start">
                <p className="mb-4 text-sm sm:text-md text-gray-600">
                  Follow the spreadsheet format shown below for accurate
                  analysis of coordinate sets.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                <div>
                  <img
                    src={step_1_with_altitude}
                    alt="File example without altitude"
                    className="mb-2"
                  />
                  <p className="mb-4 text-sm sm:text-md text-gray-600">
                    Image 1a: File template for single dataset with "Altitude"
                  </p>
                </div>
                <div>
                  <img
                    src={step_1_without_altitude}
                    alt="File example without altitude"
                    className="mb-2"
                  />
                  <p className="mb-4 text-sm sm:text-md text-gray-600">
                    Image 1b: File template for single dataset without
                    "Altitude"
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full mb-4 sm:mb-8">
              <div className="bg-teal-600 font-bold rounded-full h-8 w-8 flex items-center justify-center text-white mb-4">
                2
              </div>
              <div className="text-start">
                <p className="mb-4 text-sm sm:text-md text-gray-600">
                  For two or more datasets within the same file, replicate the
                  formatting demonstrated below. Then, proceed to upload the
                  file using the button provided.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                <div>
                  <img
                    src={step_2_with_altitude}
                    alt="File example without altitude"
                    className="mb-2"
                  />
                  <p className="mb-4 text-sm sm:text-md text-gray-600">
                    Image 2a: File template for multiple dataset with "Altitude"
                  </p>
                </div>
                <div>
                  <img
                    src={step_2_without_altitude}
                    alt="File example without altitude"
                    className="mb-2"
                  />
                  <p className="mb-4 text-sm sm:text-md text-gray-600">
                    Image 2b: File template for multiple dataset without
                    "Altitude"
                  </p>
                </div>
              </div>
            </div>
            <form className="mb-8 flex flex-col sm:mb-8 cursor-pointer">
              <label
                htmlFor="file-upload"
                className="h-fit w-fit px-6 py-3 border bg-blue-600 rounded-full text-white transition duration-300 ease-in-out hover:bg-blue-500 mt-0"
              >
                Choose file from computer
              </label>
              <input
                type={"file"}
                accept={".xlsx, .csv"}
                onChange={handleFileChange}
                id={"file-upload"}
                className={"hidden"}
              />
              <h3 className="mb-0 text-sm sm:text-md text-green-800">
                {fileName}
              </h3>
            </form>
            <div className="flex flex-col items-center justify-center w-full mb-4 sm:mb-8">
              <div className="bg-teal-600 font-bold rounded-full h-8 w-8 flex items-center justify-center text-white mb-4">
                3
              </div>
              <div className="">
                <p className="text-start mb-2 text-sm sm:text-md text-gray-600">
                  Enter the test site's Latitude, Longitude, and Altitude
                  (optional) below
                </p>
                <div className="flex flex-col gap-4 items-center justify-center">
                  <div className="flex flex-col sm:flex-row items-center justify-center sm:gap-6">
                    <input
                      type="number"
                      placeholder="Latitude (-90° to 90°)"
                      className="border px-2 py-2 rounded-xl text-green-800 mb-4"
                      onChange={handleLatValue}
                    />
                    <input
                      type="number"
                      placeholder="Longitude (-180° to 180°)"
                      className="border px-2 py-2 rounded-xl text-green-800 mb-4"
                      onChange={handleLongValue}
                    />
                    <input
                      type="number"
                      placeholder="Altitude (optional)"
                      className="border px-2 py-2 rounded-xl text-green-800 mb-4"
                      onChange={handleAltValue}
                    />
                  </div>
                  <div>
                    <button className="h-fit w-fit px-6 py-3 border bg-blue-600 rounded-full text-white transition duration-300 ease-in-out hover:bg-blue-500 mt-0">
                      Start Analysis...
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FromFile;
