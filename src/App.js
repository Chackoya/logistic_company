import React,{useState,useRef} from 'react';
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader'
import {Container,Card,CardContent,makeStyles,Grid,TextField,Button} from '@material-ui/core';

import emailjs from 'emailjs-com';



function App() {
  const[text,setText]=useState('');
  const [imageUrl,setImageUrl]=useState('');
  const [scanResultFile,setScanResultFile] = useState('');
  const classes=useStyles();
  const qrRef=useRef(null);

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('gmail', 'template_xlz9pcj', e.target, 'user_ualiHPVnbPLyTCQw1E096')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset()
  }
  
  function sendEmailDeliveryDateLogistic() { 
    var templateParams = { message: "Delivery is done2." ,sendemail: "esg9dealership@outlook.pt" };
    
    console.log("sendEmailDeliveryDateLogistic") 
    emailjs.send('gmail', 'template_xlz9pcj', templateParams, 'user_ualiHPVnbPLyTCQw1E096').then((result) => { console.log(result.text); }, 
    (error) => { console.log(error.text); }); 
  } 

  const generateQrCode=async()=>{

    try{
      const response = await QRCode.toDataURL(text);
      setImageUrl(response);
      console.log(response);

    }catch(error){
      console.log(error);
    }
  }

  const handleErrorFile=(error)=>{

    console.log(error);
  }
  const handleScanFile=(result)=>{
    console.log("here12")
    console.log(result)
    if(result){
      setScanResultFile(result);
      console.log(result)
    }
    
  }
  const onScanFile=()=>{
    console.log("here")
    console.log(qrRef)
    console.log(scanResultFile)
    qrRef.current.openImageDialog();
    console.log("new ref")
    console.log(qrRef)
    
    qrRef.current.openImageDialog();

  }

  return (
    <Container className={classes.container}>
      <Card>
        <h2 className={classes.title}>Logistic Company</h2>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item x1={4} lg={4} md={6} sm={12} xs={12}>
              {/*}
              <TextField label="Enter Text Here"
                 onChange={(e)=>setText(e.target.value)}/>
              <Button className={classes.btn} variant="contained" 
                color="primary" onClick={()=>generateQrCode()}>Generate</Button>
                <br/>
                <br/>
                <br/>
                {imageUrl ? (<a href={imageUrl} download>
                <img src={imageUrl} alt="img"/>
                </a>):null} 
                */}
            </Grid>

            <Grid item x1={4} lg={4} md={6} sm={12} xs={12}>
              <Button className={classes.btn} variant="contained" 
              color="secondary" onClick={onScanFile}>Scan Qr code</Button>
            <QrReader
              ref={qrRef}
              delay={300}
              style={{width:'100%'}}
              onError={handleErrorFile}
              onScan={handleScanFile}
              legacyMode
            />
            <h3>Scanned Code:{scanResultFile}</h3>
            </Grid>

            <Grid item x1={4} lg={4} md={6} sm={12} xs={12}>
            </Grid>
              <div className="contact-form" >
                <button onClick={sendEmailDeliveryDateLogistic}>Send confirmation email</button>
              </div>
          </Grid>
        </CardContent>
      </Card>
    
    
    </Container>
    
  );
}

const useStyles = makeStyles((theme)=>({
  container:{
    marginTop:10
  },
  title: {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    backGround:'#fff',
    padding:20
  },
  btn:{
    marginTop:10,
    marginBottom:20

  }

}));
export default App;
