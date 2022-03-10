const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();

const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    return res.json({
      error: "All fields required",
    });
  }
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    return res.json(user);
  } catch (e) {
    return res.json({
      error: "Something went wrong",
    });
  }
});

router.get("/all", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    return res.json(users);
  } catch (e) {
    return res.json({
      error: "Something went wrong",
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    return res.send(user);
  } catch (e) {
    return res.json({
      error: "Something went wrong",
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  if (!name && !email) {
    return res.json({
      error: "Nothing to edit",
    });
  }
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
      },
    });
    return res.json(user);
  } catch (e) {
    return res.json({
      error: "Something went wrong",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    console.log(user);

    if (!user) {
      return res.json({
        error: "User not found",
      });
    }
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    return res.json({
      message: "User deleted",
    });
  } catch (e) {
    return res.json({
      error: "Something went wrong",
    });
  }
});

module.exports = router;
