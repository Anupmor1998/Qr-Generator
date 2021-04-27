import React, { useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import fileDownload from "js-file-download";
import { Box, Input, IconButton, Image, Button } from "@chakra-ui/react";
import {
  FaFileAlt,
  // FaFileImage,
  FaRegEnvelope,
  FaQrcode,
  FaDownload,
} from "react-icons/fa";
import qrCode from "./qrlogo.png";
import load from "./load.svg";
import "../QrGenerator/QrGenerator.css";

function QrGenerator() {
  // const [data, setData] = useState("");
  const [qr, setQr] = useState("");
  const [loading, setLoading] = useState(false);
  const valueRef = useRef(null);

  const qrSubmit = async () => {
    setLoading(true);

    // setData(valueRef.current.value);

    const msg = {
      text: valueRef.current.value,
    };

    axios
      // .post("https://qr-generator-cw.herokuapp.com/qrcodemsg", msg)
      .post("http://localhost:3002/qrcodemsg", msg)
      .then((res) => {
        setQr("");
        setQr("http://localhost:3002" + res.data);
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };
  const downloadSvg = () => {
    axios
      .get("http://localhost:3002/qrcodemsg", {
        responseType: "arraybuffer",
      })
      .then((res) => {
        fileDownload(res.data, "qrCode.svg");
      })
      .catch((err) => console.log(err));
  };

  let imgUrl;
  if (loading) {
    imgUrl = `${load}`;
  } else {
    imgUrl = `${qr}?${Date.now()}`;
  }

  return (
    <Box height="100vh" padding="2rem 0">
      <Box
        d="flex"
        flexDirection="row"
        bg="#90e0ef"
        borderRadius="50px"
        height="90vh"
        margin="0 auto"
        width="180vh"
        border="15px solid #fff"
      >
        <Box margin="1rem auto">
          <Image src={qrCode} width="50px" height="50px" margin="1rem auto 0" />
          <Box
            d="flex"
            bg="#fff"
            height="60vh"
            width="10vh"
            // marginTop="1.5rem"
            // marginBottom="1.5rem"
            // marginLeft="1.5rem"
            margin="2rem auto 0"
            borderRadius="50px"
            alignItems="center"
            flexDirection="column"
          >
            <Box margin="3rem auto 0">
              <Link to="/">
                <IconButton
                  borderRadius="50px"
                  bgColor="#fff"
                  _hover={{ bgColor: "#023e8a", color: "#fff" }}
                  icon={<FaFileAlt />}
                />
              </Link>
            </Box>
            {/* <Link to="/img" style={{ margin: "auto" }}>
          <IconButton icon={<FaFileImage />} />
        </Link> */}
            <Box margin="2rem auto 0">
              <Link to="/mail">
                <IconButton
                  borderRadius="50px"
                  bgColor="#fff"
                  _hover={{ bgColor: "#023e8a", color: "#fff" }}
                  icon={<FaRegEnvelope />}
                />
              </Link>
            </Box>
          </Box>
        </Box>
        <Box margin="auto" d="flex" flexDirection="column">
          <Input
            fontSize="50px"
            size="md"
            width="80vh"
            height="10vh"
            margin="auto"
            padding="20px"
            placeholder="Enter Your Text Here"
            _placeholder={{ color: "#023e8a" }}
            variant="unstyled"
            // onChange={handleChange}
            ref={valueRef}
          />

          <Button
            type="submit"
            margin="4rem auto"
            onClick={qrSubmit}
            // disabled={!data}
          >
            <FaQrcode /> &nbsp; Generate QR Code
          </Button>
        </Box>
        <Box
          d="flex"
          flexDirection="column"
          bg="#023e8a"
          height="auto"
          width="50vh"
          margin="1.5rem auto"
          // marginTop="1.5rem"
          // marginBottom="1.5rem"
          // marginRight="1.5rem"
          borderRadius="30px"
        >
          <Image
            src={imgUrl}
            boxSize="256px"
            margin="2rem auto"
            borderRadius="30px"
            bg="white"
          />
          <Button
            type="submit"
            margin="auto"
            onClick={downloadSvg}
            // disabled={!qr}
          >
            <FaDownload />
            &nbsp;Download SVG
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default QrGenerator;