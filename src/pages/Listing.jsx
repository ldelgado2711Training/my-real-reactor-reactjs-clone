import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router";
import { getAuth } from "firebase/auth";
import { Swiper, SwiperSlide } from "swiper/react";

import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";

import "swiper/css/bundle";

import {
  FaShare,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaParking,
  FaChair,
} from "react-icons/fa";

import { Spinner } from "../components/Spinner";
import { db } from "../firebase";
import Contact from "../components/Contact";

export default function Listing() {
  const auth = getAuth();
  const params = useParams();
  const [listing, SetListing] = useState(null);
  const [loading, SetLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const [contactLandlord,setContactLandlord] = useState(false);

  SwiperCore.use([Autoplay, Navigation, Pagination]);

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.ListingID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        SetListing(docSnap.data());
        SetLoading(false);
      }
    };
    fetchListing();
  }, [params.ListingID]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        modules={[EffectFade]}
        effect="fade"
        autoplay={{ delay: 3000 }}
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full overflow-hidden h-[350px] relative"
              style={{
                background: `url( ${listing.imgUrls[index]} ) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className="fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <FaShare className="text-lg text-slate-500" />
      </div>

      {shareLinkCopied && (
        <p className="fixed top-[23%] right-[5%] font-semibold border-2 border-gray-400 rounded-md bg-white z-10">
          Link Copied
        </p>
      )}

      <div className="m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5">
        <div className="w-full h-[200px] lg-[400px]">
          <p className="text-2xl font-bold mb-3 text-blue-900  ">
            {listing.name} - $
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" ? " / month" : ""}
          </p>

          <p className="flex items-center mt-6 mb-3 font-semibold ">
            <FaMapMarkerAlt className="text-green-700 mr-1" />
            {listing.address}
          </p>

          <div className="flex justify-start items-center space-x-4 w-[75%]">
            <p
              className="bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center  font-semibold
            shadow-md "
            >
              {listing.type === "rent" ? "Rent" : "Sale"}
            </p>
            {listing.offer && (
              <p className="w-full max-w-[200px] bg-green-800 rounded-mp p-1 text-white text-center font-semibold shadow-md">
                ${+listing.regularPrice - +listing.discountedPrice} discount
              </p>
            )}
          </div>
          <p className="mt-3 mb-3">
            <span className="font-semibold">Description - &nbsp;</span>
            {listing.description}
          </p>

          <ul className="flex items-center space-x-2 lg:space-x-10 text-sm font-semibold">
            <li className="flex items-center white-space-nowrap">
              <FaBed className="text-lg mr-1" />
              {+listing.bedrooms >= 1 ? "1 Bed" : `${listing.bedrooms} Beds`}
            </li>

            <li className="flex items-center white-space-nowrap">
              <FaBath className="text-lg mr-1" />
              {+listing.bathrooms >= 1
                ? "1 Bath"
                : `${listing.bathrooms} Baths`}
            </li>

            <li className="flex items-center white-space-nowrap">
              <FaBath className="text-lg mr-1" />
              {+listing.bathrooms >= 1
                ? "1 Bath"
                : `${listing.bathrooms} Baths`}
            </li>

            <li className="flex items-center white-space-nowrap">
              <FaParking className="text-lg mr-1" />
              {listing.bathrooms ? "Parking" : "Not Parking"}
            </li>

            <li className="flex items-center white-space-nowrap">
              <FaChair className="text-lg mr-1" />
              {listing.furnished ? "Furnished" : "Not Furnished"}
            </li>
          </ul>

          {listing.userRef !== auth.currentUser?.uid && !contactLandlord && (
            <div className="mt-6">
              <button onClick={() =>setContactLandlord(true)}
              className="px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow.lb w-full text-center transition duration-150 ease-in-out">
                Contact Landlord
              </button>
            </div>
          )}
          {contactLandlord && (
            <Contact userRef={listing.userRef} listing={listing}/>
          )}
        </div>

        <div className="bg-blue-300 w-full h-[200px] lg-[400px] z-10 overflow-x-hidden"></div>
      </div>
    </main>
  );
}