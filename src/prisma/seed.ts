import { prisma } from "../config";

const main = async () => {
  const promo = await prisma.promo.create({
    data: {
      title: "Summar Sale",
    },
  });

  const tags = await prisma.tag.createManyAndReturn({
    data: [{ name: "Technology" }, { name: "Lifestyle" }],
  });

  const article = await prisma.article.create({
    data: {
      title: "Getting Started with Prisma",
      content: "This is a sample article about Prisma...",
      promoId: promo.id,
      articleTags: {
        create: tags.map((tag) => ({
          tagId: tag.id,
        })),
      },
    },
  });

  console.log({ promo, tags, article });
};

const addNew = async () => {
  const iklans = await prisma.iklan.createManyAndReturn({
    data: [
      {
        name: "Pembiayaan ACC Haji Syariah Reguler",
        content:
          "Solusi terbaik mendapatkan porsi Haji lebih cepat bersama ACC Syariah, tanpa perlu menabung terlebih dahulu.",
        discount: 10,
        image:
          "https://netimg.acc.co.id/ACCONE/PAYMENT_METHOD/PAYMENT_METHOD_1767421.JPG",
      },
      {
        name: "Perhatian!",
        content:
          "Melakukan Over Alih Kredit tanpa sepengetahuan ACC akan dikenakan sanksi pidana!",
        discount: 10,
        image:
          "https://netimg.acc.co.id/ACCONE/PAYMENT_METHOD/PAYMENT_METHOD_1767619.JPG",
      },
      {
        name: "Spesial Untuk Anda!",
        content: "Dapatkan berbagai promo menarik dari ACC",
        discount: 10,
        image:
          "https://netimg.acc.co.id/ACCONE/PAYMENT_METHOD/PAYMENT_METHOD_1767640.JPG",
      },
      {
        name: "Solusi Mudah Perpanjang STNK",
        content:
          "Perpanjang STNK melalui ACC ONE! Bisa sameday, pelayanan cepat, dan biaya murah",
        discount: 10,
        image:
          "https://netimg.acc.co.id/ACCONE/PAYMENT_METHOD/PAYMENT_METHOD_1767634.JPG",
      },
      {
        name: "Kredit Multiguna",
        content: "Untuk berbagai kebutuhan Anda dengan BPKB",
        discount: 10,
        image:
          "https://netimg.acc.co.id/ACCONE/PAYMENT_METHOD/PAYMENT_METHOD_1767634.JPG",
      },
    ],
  });

  const blogs = await prisma.blog.createManyAndReturn({
    data: [
      {
        title: "12 Oleh-oleh Khas Batam yang Wajib Dibawa Pulang!",
        content: "This is a sample article about Prisma...",
        desc: "Berita",
        image:
          "https://netimg.acc.co.id/ACCONE/CONTENT/DETAILNEWS/webp/oleh-oleh-batam.webp",
      },
      {
        title:
          "Prostat: Fungsi, Penyakit, dan Cara Pencegahan yang Harus Anda Ketahui!",
        content: "This is a sample article about Prisma...",
        desc: "Berita",
        image:
          "https://netimg.acc.co.id/ACCONE/CONTENT/DETAILNEWS/webp/prostat-(1).webp",
      },
      {
        title: "12 Makanan Wajib Malaysia Terlezat yang Wajib Anda Coba!",
        content: "This is a sample article about Prisma...",
        desc: "Berita",
        image:
          "https://netimg.acc.co.id/ACCONE/CONTENT/DETAILNEWS/webp/makanan-khas-malaysia.webp",
      },
      {
        title:
          "6 Wisata Klaten Terbaru 2024: Destinasi Menarik untuk Liburan Seru",
        content: "This is a sample article about Prisma...",
        desc: "Berita",
        image:
          "https://netimg.acc.co.id/ACCONE/CONTENT/DETAILNEWS/webp/Banner-Wisata-Klaten.webp",
      },
      {
        title:
          "5 Tempat Wisata Paling Populer dan Aktivitas Seru di Danau Toba",
        content: "This is a sample article about Prisma...",
        desc: "Berita",
        image:
          "https://netimg.acc.co.id/ACCONE/CONTENT/DETAILNEWS/webp/Banner-danau-toba.webp",
      },
      {
        title: "Harga Toyota Kijang Krista Diesel Bekas dan Keunggulannya",
        content: "This is a sample article about Prisma...",
        desc: "Berita",
        image:
          "https://netimg.acc.co.id/ACCONE/CONTENT/DETAILNEWS/webp/Banner-Kijang-Krista-ACC.webp",
      },
    ],
  });

  const cars = await prisma.car.create({
    data: {
      name: "DAIHATSU GRANMAX MB",
      image:
        "https://netimg.acc.co.id/ACCONE/PAYMENT_METHOD/PAYMENT_METHOD_1717558.PNG",
      model: "DAIHATSU GRANMAX MB",
      variant: "MB",
      price: 100000000,
      isNew: true,
      iklanId: iklans[0].id,
      carBlogs: {
        create: blogs.map((blog) => ({
          blogId: blog.id,
        })),
      },
    },
  });
};

addNew()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
