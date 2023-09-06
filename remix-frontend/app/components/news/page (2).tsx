// "use client";
// import { newsDummyData } from "@/utils/news-dummy-data";
// import React from "react";
// import NotFound from "@/app/not-found";
// import Image from "next/image";
// import YouTubeIcon from "@mui/icons-material/YouTube";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
// import Link from "next/link";
// import RelatedNewsWrapper from "@/components/news/RelatedNewsWrapper";

// interface Props {
//   params: {
//     id: string;
//   };
// }

// const NewsFullPage: React.FC<Props> = ({ params: { id } }) => {
//   const news = newsDummyData.find((news) => news.id === +id);
//   if (!news) {
//     return <NotFound />;
//   }

//   return (
//     <div className="flex flex-col">
//       <div className="relative mb-6 h-48 md:h-56">
//         <div className="absolute bg-black/50 h-full top-0 left-0 bottom-0 w-full -z-10"></div>
//         <Image
//           src="/news_background_img.jpg"
//           alt="background pict"
//           width={400}
//           height={700}
//           className="absolute object-cover h-full top-0 right-0 -z-20 md:w-full"
//         />
//         <h3 className="text-white text-2xl py-4 px-4 md:text-4xl">
//           {news.title}
//         </h3>
//         <p className="text-white text-sm pb-4 px-4 md:text-lg">{news.date}</p>
//       </div>
//       <div className="relative  h-screen flex flex-col lg:flex-row">
//         <div className="w-full lg:w-3/5">
//           <div className="flex flex-col justify-center mb-6 md:mx-auto md:w-1/2 md:h-3/5 md:pt-6">
//             <Image
//               src={news.image}
//               alt={news.title}
//               width={400}
//               height={200}
//               className="p-4 md:w-auto"
//             />
//             <p className="p-4">{news.description}</p>
//           </div>
//           <div className="flex flex-row mx-4 md:flex md:justify-center">
//             <div className="flex flex-row pr-4">
//               <h3 className="text-xl font-semibold pt-3">SHARE:</h3>
//             </div>
//             <div className="flex flex-row gap-4 mb-4 bg-black p-2">
//               <div className="bg-white rounded-full p-2">
//                 <Link href="https://www.youtube.com/">
//                   <YouTubeIcon />
//                 </Link>
//               </div>
//               <div className="bg-white rounded-full p-2">
//                 <Link href="https://www.instagram.com/">
//                   <InstagramIcon />
//                 </Link>
//               </div>
//               <div className="bg-white rounded-full p-2">
//                 <Link href="https://www.facebook.com/">
//                   <FacebookRoundedIcon />
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="mb-8 w-full h-fit md:w-1/3 md:flex lg:sticky">
//           <RelatedNewsWrapper newsIds={[1, 2, 3]} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewsFullPage;
