const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const { SerialPort } = require("serialport");

const ModelDni = require("./models/Dni");

/* const arduino = new SerialPort({
  path: "/dev/tty.usbmodem143101",
  baudRate: 115200,
}); */

const app = express();
const port = process.env.PORT || 4000;

const writeArduino = (data) => {
  return new Promise((resolve, reject) => {
    const success = arduino.write(data);
    if (success) {
      resolve();
    }
  });
};

app.use(cors());
app.use(bodyParser.json());

app.get("/api/v1/", (_, res) => {
  SerialPort.list().then((ports) => {
    res.send(ports);
  });
});

app.post("/api/v1/message", (req, res) => {
  const { status, message } = req.body;
  arduino.write(`${status}:${message}`);
  res.send({
    status: "success",
  });
});

/* app.post("/api/v1/led", (req, res) => {
  const { status } = req.body;
  writeArduino(`${status}`).then(() => {
    res.send({
      status: "success",
    });
  });
}); */

app.get("/api/v1/dni/:dni", (req, res) => {
  const { dni } = req.params;
  const token = "apis-token-2054.T1Yd55SZwGDBXEN1GEdmzcSmf4tCQax2";
  axios
    .get(`https://api.apis.net.pe/v1/dni?numero=${dni}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const dni = new ModelDni(response.data);
      res.send(dni.toJson());
    })
    .catch((error) => {
      res.send(error);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
