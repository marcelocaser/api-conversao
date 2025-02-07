import express from 'express';
import { hostname } from 'os';
import { serve, setup } from 'swagger-ui-express';
import yamljs from 'yamljs';

const app = express();
const swaggerDocument = yamljs.load('./swagger.yaml');

app.use('/api-docs', serve, setup(swaggerDocument)); 

app.get('/fahrenheit/:valor/celsius', (req, res) => {

    let valor = req.params.valor;
    let celsius = (valor - 32) * 5 / 9;
    res.json({ "celsius": celsius, "maquina": hostname() });
});

app.get('/celsius/:valor/fahrenheit', (req, res) => {

    let valor = req.params.valor;
    let fahrenheit = (valor * 9 / 5) + 32;
    res.json({ "fahrenheit": fahrenheit, "maquina": hostname() });
});

app.get('/temperatura/fahrenheitparacelsius/:valor', (req, res) => {

    let valor = req.params.valor;
    let celsius = (valor - 32) * 5 / 9;
    res.json({ "celsius": celsius });
});


app.get('/temperatura/celsiusparafahrenheit/:valor', (req, res) => {

    let valor = req.params.valor;
    let fahrenheit = (valor * 9 / 5) + 32;
    res.json({ "fahrenheit": fahrenheit });
});


app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
});
