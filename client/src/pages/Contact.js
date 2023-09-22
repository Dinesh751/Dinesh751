import React from "react";
import Layout from "../component/Layouts/Layout";
import { BiMailSend } from "react-icons/bi";
import { FiPhoneCall } from "react-icons/fi";
import { TfiHeadphoneAlt } from "react-icons/tfi";

const Contact = () => {
  return (
    <Layout>
      <div class="row" style={{ margin: "2%" }}>
        <div class=" col-md-6">
          <img
            src="/images/customer support.jpeg"
            alt="Contact Us"
            style={{ width: "100%", padding: "2%" }}
          />
        </div>
        <div class="col-md-4" style={{ padding: "2%" }}>
          <h1 className="bg-dark p-2 text-white text-center">Contact Us</h1>
          <div style={{ padding: "5%" }}>
            <p className="text-justify mt-2">
              any query amd info about product feel free to call anytime we 24X7
              available
            </p>
            <p className="mt-3">
              <BiMailSend />: www.help@ecommerceapp.com
            </p>
            <p className="mt-3">
              <FiPhoneCall />: 012-123456789
            </p>
            <p className="mt-3">
              <TfiHeadphoneAlt />: 1800-0000-0000 (toll free)
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;