import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Flex, Box, Input, IconButton, Image } from "@chakra-ui/react";
import {
  FaFileAlt,
  FaFileImage,
  FaRegEnvelope,
  FaQrcode,
} from "react-icons/fa";
import qrCode from "./qr.png";
function QrImg() {
  const [image, setImage] = useState("");
  const qrSubmit = async () => {
    const msg = {
      text: image,
    };
    console.log(msg);

    axios
      .post("http://localhost:3002/qrcodemsg", msg)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <Flex
      bg="salmon"
      borderRadius="20px"
      height="90vh"
      margin="2rem auto"
      width="180vh"
    >
      <Box
        d="flex"
        bg="blue"
        height="auto"
        width="10vh"
        marginTop="1.5rem"
        marginBottom="1.5rem"
        marginLeft="1.5rem"
        borderRadius="15px"
        alignItems="center"
        flexDirection="column"
      >
        <Link to="/" style={{ margin: "auto" }}>
          <IconButton icon={<FaFileAlt />} />
        </Link>
        <Link to="/img" style={{ margin: "auto" }}>
          <IconButton icon={<FaFileImage />} />
        </Link>
        <Link to="/mail" style={{ margin: "auto" }}>
          <IconButton icon={<FaRegEnvelope />} />
        </Link>
      </Box>
      <Box margin="auto">
        <Input
          type="file"
          size="md"
          width="80vh"
          height="8vh"
          margin="auto"
          padding="20px 70px 20px 20px"
          placeholder="Type Your Text Here"
          variant="flushed"
          onChange={(e) => setImage(e.target.value)}
        />
        <IconButton
          type="submit"
          margin="auto"
          position="relative"
          right="2.5rem"
          bottom="0.5rem"
          icon={<FaQrcode />}
          onClick={qrSubmit}
        ></IconButton>
      </Box>
      <Box
        d="flex"
        bg="blue"
        height="auto"
        width="50vh"
        marginTop="1.5rem"
        marginBottom="1.5rem"
        marginRight="1.5rem"
        borderRadius="15px"
      >
        <Image
          src={qrCode}
          boxSize="256px"
          margin="2rem auto"
          borderRadius="md"
        />
      </Box>
    </Flex>
  );
}

export default QrImg;
