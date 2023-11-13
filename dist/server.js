"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const tokenController_1 = __importDefault(require("./controllers/tokenController"));
const cardController_1 = __importDefault(require("./controllers/cardController"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
// Endpoint para la creación de un token
app.post('/api/token', tokenController_1.default.createToken);
// Endpoint para obtener detalles de tarjeta por token
app.get('/api/card', cardController_1.default.getCardDetails);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
