//<------------------ Section Importation des modules ------------------->
const express = require('express');
const router = express.Router();
const brokerController = require('../controllers/brokerController');

//<------------------ Section Routes avec documentation swagger ------------------->
/**
* @swagger
* components:
*   schemas:
*     Broker:
*       type: object
*       properties:
*         name:
*           type: string
*         ipv4:
*           type: string
*         port:
*           type: integer
*/

/**
* @swagger
* /brokers/create:
*   post:
*     tags: [Brokers]
*     summary: Crée un nouveau broker
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Broker'
*     responses:
*       201:
*         description: Broker créé
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Broker'
*       400:
*         description: Broker existe déjà
*/
router.post('/create', brokerController.create);

/**
* @swagger
* /brokers/list:
*   get:
*     tags: [Brokers]
*     summary: Liste les brokers
*     responses:
*       200:
*         description: OK
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Broker'
*/
router.get('/list', brokerController.getAll);

/**
* @swagger
* /brokers/get/{name}:
*   get:
*     tags: [Brokers]
*     summary: Trouve un broker par nom
*     parameters:
*       - name: name
*         in: path
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: OK
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Broker'
*       404:
*         description: Non trouvé
*/
router.get('/get/:name', brokerController.getOne);
//<------------------ Section exporation ------------------->
module.exports = router;