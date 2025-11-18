import express from "express";
import axios from "axios";

const router = express.Router();
const BASE_URL = "https://fortnite-api.com/v2";

let cachedData = null;
let lastFetch = 0;
const CACHE_DURATION = 1000 * 60 * 10; // 10 minutos

router.get('/', async (req, res) => {
  const now = Date.now();

  if (cachedData && (now - lastFetch < CACHE_DURATION)) {
    console.log('Retornando dados do cache');
    return res.json(cachedData);
  }

  try {
    const response = await axios.get(`${BASE_URL}/cosmetics/br`);
    cachedData = response.data;
    lastFetch = now;

    res.json(response.data);
  } catch (error) {
    console.error('Erro ao buscar API Fortnite:', error.message);
    res.status(500).json({ error: 'Erro ao buscar cosméticos' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    if (cachedData && cachedData.data) {
      const item = cachedData.data.find((c) => c.id === id);
      if (item) {
        return res.json({ data: item });
      }
    }

    const response = await axios.get(`${BASE_URL}/cosmetics/br/${id}`);
    const cosmetic = response.data;

    if (cachedData && cachedData.data) {
      cachedData.data.push(cosmetic.data);
    }

    res.json(cosmetic);
  } catch (error) {
    console.error(`Erro ao buscar cosmético ${id}:`, error.message);
    res.status(500).json({ error: 'Erro ao buscar cosmético' });
  }
});

router.get("/new", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/cosmetics/new`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar cosméticos novos" });
  }
});

router.get("/shop", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/shop`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar loja atual" });
  }
});

export default router;
