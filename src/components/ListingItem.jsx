import Moment from "react-moment";
import { Link } from "react-router-dom";
import { MdLocationOn, MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";


export default function ListingItem({ listing, id, onEdit, onDelete }) {
 
  const {   
    imgUrls,
    timestamp,
    address,
    name,
    offer,
    discountedPrice,
    regularPrice,
    type,
    bedrooms,
    bathrooms,
  } = listing;

  
  return (
    <li className="bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition duration-150 relative m-[10px]">
      <Link className="contents" to={`/category/${listing.type}/${id}`}>
        <img
          src={imgUrls[0]}
          className="h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in-out"
          loading="lazy"
        />
        <Moment
          className="absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-2 shadow-lg"
          fromNow
        >
          {timestamp?.toDate()}
        </Moment>
        <div className="w-full p-[10px]">
          <div className="flex items-center space-x-1">
            <MdLocationOn className="h-4 w-4 text-green-600" />
            <p className="font-semibold text-sm mb-[2px] text-gray-600 truncate">
              {address}
            </p>
          </div>
          <p className="font-semibold m-0 text-lg truncate">{name}</p>
          <p className="text-[#457b9d] mt-2 font-semibold">
            $
            {offer
              ? discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {type == "rent" && " /month"}
          </p>

          <div className="flex items-center mt-[10px] space-x-3">
            <div className="flex items-center mt-[10px] space-x-1">
              <p className="font-bold text-xs">{bedrooms > 1 ? `${bedrooms} Beds` : "1 bed"}</p>
            </div>
            <div className="flex items-center mt-[10px] space-x-1">
              <p className="font-bold text-xs">{bathrooms > 1 ? `${bathrooms} Baths` : "1 bath"}</p>
            </div>
          </div>

        </div>
      </Link>
      {onEdit && (
        <MdEdit 
            className="absolute bottom-2 right-7 h-4 cursor-pointer text-black"
            onClick={() => onEdit(listing.id)}
      />)}
        {onDelete && (
        <FaTrash 
            className="absolute bottom-2 right-2 h-[14px] cursor-pointer text-red-500"
            onClick={() => onDelete(listing.id)}
      />)}
    </li>
  );
}
