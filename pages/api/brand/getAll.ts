import { PrismaClient } from "@prisma/client";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const prisma = new PrismaClient();

  const brands = await prisma.vehicleType.findMany({
    include: {
      bodies: true,
      brands: true,
    },
  });

  await prisma.$disconnect();

  res.status(200).json({ resp: brands });
};

export default handler;
