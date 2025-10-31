import PriceCardDetails from "./PriceCardDetails";
import PropTypes, { func } from "prop-types";
import { Link } from "react-router-dom";

import { jwtDecode } from "jwt-decode";
import axios from "../axios";

const userToken = localStorage.getItem("auth_token");
const decoded = userToken && jwtDecode(userToken);

function PriceCard({ priceData }) {
  async function handleSubscription() {
    const userName = decoded?.name;
    const email = decoded?.email;
    const title = priceData?.title;
    const price = priceData?.price;
    const subscriptionType = priceData?.subscriptionType;
    const imageUrl =
      "https://plus.unsplash.com/premium_photo-1729036163578-f80877183448?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    const finalData = {
      userName,
      email,
      title,
      price,
      subscriptionType,
      imageUrl,
    };

    const session = await axios.post(
      `/create-checkout-session`,
      finalData
    );

    const subscriptionTitle = session.data.title;

    localStorage.setItem("subscriptionTitle", subscriptionTitle);
    window.location.replace(session.data.session.url);
  }

  return (
    <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
      <h3 className="mb-4 text-2xl font-semibold">{priceData?.title}</h3>
      <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
        {priceData?.subtitle}
      </p>
      <div className="flex justify-center items-baseline my-8">
        <span className="mr-2 text-5xl font-extrabold">
          ${priceData?.price}
        </span>
        <span className="text-gray-500 dark:text-gray-400">
          /{priceData?.subscriptionType}
        </span>
      </div>
      <ul role="list" className="mb-8 space-y-4 text-left">
        {priceData.priceCardDetail.map((item, index) => (
          <PriceCardDetails priceCardDetails={item} key={index} />
        ))}
      </ul>
      <Link
        onClick={handleSubscription}
        className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900"
      >
        Get started
      </Link>
    </div>
  );
}

PriceCard.propTypes = {
  priceData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    subscriptionType: PropTypes.string.isRequired,
    priceCardDetail: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default PriceCard;
