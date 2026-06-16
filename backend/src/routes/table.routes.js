const express = require("express");
const { Mesa, SesionMesa } = require("../models");
const { verificarToken, verificarRol } = require("../middlewares/auth.middleware");

const router = express.Router();

// --- RUTAS DE LECTURA (Abiertas o para otros roles, mantenemos las del equipo) ---
router.get("/mesas", async (req, res) => {
  try {
    const mesas = await Mesa.findAll();
    res.json(mesas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener mesas" });
  }
});

router.get("/mesas/numero/:numero", async (req, res) => {
  try {
    const { numero } = req.params;
    const mesa = await Mesa.findOne({ where: { numero } });
    if (!mesa) return res.status(404).json({ mensaje: "Mesa no encontrada" });
    res.json(mesa);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al buscar la mesa" });
  }
});

// --- RUTAS DE ESCRITURA (ABM Protegido para Administradores) ---

// Crear Mesa con PIN automático
router.post("/mesas", verificarToken, verificarRol(['super-admin', 'admin']), async (req, res) => {
  try {
    const { numero } = req.body;
    // Generamos PIN de 4 dígitos
    const pinAleatorio = Math.floor(1000 + Math.random() * 9000).toString();
    
    const mesa = await Mesa.create({ numero, pin: pinAleatorio });
    res.status(201).json(mesa);
  } catch (error) {
    console.error("Error en POST /mesas:", error);
    res.status(500).json({ mensaje: "Error al crear la mesa (¿El número ya existe?)" });
  }
});

// Actualizar Mesa (y regenerar PIN opcionalmente)
router.put("/mesas/:id", verificarToken, verificarRol(['super-admin', 'admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const { numero, estado, activa, generarNuevoPin } = req.body;
    
    const mesa = await Mesa.findByPk(id);
    if (!mesa) return res.status(404).json({ mensaje: "Mesa no encontrada" });

    let nuevoPin = mesa.pin;
    if (generarNuevoPin) {
      nuevoPin = Math.floor(1000 + Math.random() * 9000).toString();
    }

    await mesa.update({ numero, estado, activa, pin: nuevoPin });
    res.json(mesa);
  } catch (error) {
    console.error("Error en PUT /mesas:", error);
    res.status(500).json({ mensaje: "Error al actualizar la mesa" });
  }
});

// Eliminar Mesa
router.delete("/mesas/:id", verificarToken, verificarRol(['super-admin', 'admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const mesa = await Mesa.findByPk(id);
    if (!mesa) return res.status(404).json({ mensaje: "Mesa no encontrada" });

    await mesa.destroy();
    res.json({ mensaje: "Mesa eliminada correctamente" });
  } catch (error) {
    console.error("Error en DELETE /mesas:", error);
    res.status(500).json({ mensaje: "Error al eliminar la mesa" });
  }
});

// Abrir Mesa (Inicia sesión y genera PIN)
router.post("/mesas/:id/abrir", verificarToken, async (req, res) => {
  try {
    const { id } = req.params;
    const mesa = await Mesa.findByPk(id);
    
    if (!mesa) return res.status(404).json({ mensaje: "Mesa no encontrada" });
    if (mesa.estado === 'ocupada') return res.status(400).json({ mensaje: "La mesa ya está abierta" });

    // Generamos un PIN seguro de 4 dígitos
    const nuevoPin = Math.floor(1000 + Math.random() * 9000).toString();
    
    // Actualizamos la mesa
    await mesa.update({ estado: 'ocupada', pin: nuevoPin });

    // Creamos el registro de la sesión (Asume que Sequelize creó la relación MesaId)
    await SesionMesa.create({ 
      MesaId: mesa.id, 
      estado: 'abierta',
      fechaApertura: new Date()
    });

    res.json({ mensaje: "Mesa abierta", mesa });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al abrir la mesa" });
  }
});

// Cerrar Mesa (Finaliza sesión e invalida PIN)
router.post("/mesas/:id/cerrar", verificarToken, async (req, res) => {
  try {
    const { id } = req.params;
    const mesa = await Mesa.findByPk(id);
    
    if (!mesa) return res.status(404).json({ mensaje: "Mesa no encontrada" });

    // Liberamos la mesa y bloqueamos el acceso invalidando el PIN
    await mesa.update({ estado: 'disponible', pin: '0000' });

    // Buscamos la sesión que estaba abierta para esta mesa y la cerramos
    const sesionAbierta = await SesionMesa.findOne({ 
      where: { MesaId: mesa.id, estado: 'abierta' } 
    });
    
    if (sesionAbierta) {
      await sesionAbierta.update({ 
        estado: 'cerrada', 
        fechaCierre: new Date() 
      });
    }

    res.json({ mensaje: "Mesa cerrada correctamente", mesa });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al cerrar la mesa" });
  }
});

module.exports = router;