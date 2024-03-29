import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import fileDownload from 'js-file-download';
import qrCode from './qrlogo.png';
import {
  Box,
  Input,
  IconButton,
  Image,
  Textarea,
  Button,
} from '@chakra-ui/react';
import { FaFileAlt, FaRegEnvelope, FaDownload, FaQrcode } from 'react-icons/fa';

function QrMail() {
  // const [mail, setMail] = useState('');
  // const [subject, setSubject] = useState('');
  // const [message, setMessage] = useState('');
  const [qr, setQr] = useState('');

  const mailRef = useRef();
  const subjectRef = useRef();
  const messageRef = useRef();
  const qrSubmit = async () => {
    const msg = {
      mail: mailRef.current.value,
      subject: subjectRef.current.value,
      message: messageRef.current.value,
    };

    axios
      .post('https://qr-generator-cw.herokuapp.com/qrcodemail', msg)

      .then((res) => {
        setQr('');
        setQr('https://qr-generator-cw.herokuapp.com' + res.data);
      })
      .catch((err) => console.log(err));
  };

  const downloadSvg = () => {
    axios
      .get('https://qr-generator-cw.herokuapp.com/downloadMail', {
        responseType: 'arraybuffer',
      })
      .then((res) => {
        fileDownload(res.data, 'qrCode.svg');
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box height='100vh' padding='2rem 0'>
      <Box
        d='flex'
        flexDirection='row'
        bg='#90e0ef'
        borderRadius='50px'
        height='90vh'
        margin='0 auto'
        width='180vh'
        border='15px solid #fff'
      >
        <Box margin='1rem auto'>
          <Image src={qrCode} width='50px' height='50px' margin='1rem auto 0' />
          <Box
            d='flex'
            bg='#fff'
            height='60vh'
            width='10vh'
            margin='2rem auto 0'
            borderRadius='50px'
            alignItems='center'
            flexDirection='column'
          >
            <Box margin='3rem auto 0'>
              <Link to='/'>
                <IconButton
                  borderRadius='50px'
                  bgColor='#fff'
                  _hover={{ bgColor: '#023e8a', color: '#fff' }}
                  icon={<FaFileAlt />}
                />
              </Link>
            </Box>
            <Box margin='2rem auto 0'>
              <Link to='/mail'>
                <IconButton
                  borderRadius='50px'
                  bgColor='#fff'
                  _hover={{ bgColor: '#023e8a', color: '#fff' }}
                  icon={<FaRegEnvelope />}
                />
              </Link>
            </Box>
          </Box>
        </Box>
        <Box margin='5rem auto 0' boxSize='80vh'>
          <Box fontSize='60px' color='#023e8a'>
            Email
          </Box>
          <Input
            type='email'
            size='md'
            width='80vh'
            height='8vh'
            margin='auto'
            padding='20px'
            placeholder='Add your Email'
            variant='flushed'
            // onChange={(e) => setMail(e.target.value)}
            ref={mailRef}
          />
          <Input
            type='text'
            size='md'
            width='80vh'
            height='8vh'
            margin='auto'
            padding='20px'
            placeholder='Enter Email Subject'
            variant='flushed'
            // onChange={(e) => setSubject(e.target.value)}
            ref={subjectRef}
          />
          <Textarea
            size='md'
            width='80vh'
            height='8vh'
            margin='auto'
            padding='20px'
            placeholder='Enter your Message'
            variant='flushed'
            // onChange={(e) => setMessage(e.target.value)}
            ref={messageRef}
          />

          <Button type='submit' margin='4rem auto' onClick={qrSubmit}>
            <FaQrcode /> &nbsp; Generate QR Code
          </Button>
        </Box>
        <Box
          d='flex'
          flexDirection='column'
          bg='#023e8a'
          height='auto'
          width='50vh'
          margin='1.5rem auto'
          borderRadius='30px'
        >
          <Image
            src={`${qr}?${Date.now()}`}
            boxSize='256px'
            margin='2rem auto'
            borderRadius='30px'
            bg='white'
          />
          <Button type='submit' margin='auto' onClick={downloadSvg}>
            <FaDownload />
            &nbsp;Download SVG
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default QrMail;
