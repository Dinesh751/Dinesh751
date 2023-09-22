import React from "react";
import Layout from "../component/Layouts/Layout";

function About() {
  return (
    <Layout>
      <div class="row" style={{ margin: "2%" }}>
        <div class=" col-md-6">
          <img
            src="/images/about.us.jpg"
            alt="Contact Us"
            style={{ width: "100%", padding: "2%" }}
          />
        </div>
        <div class="col-md-4" style={{ padding: "1%" }}>
          <p className="text-black ">
            we are guided by four principles: customer obsession rather than
            competitor focus, passion for invention, commitment to operational
            excellence, and long-term thinking. we strives to be Earth’s
            most customer-centric company, Earth’s best employer, and Earth’s
            safest place to work. Customer reviews, 1-Click shopping,
            personalized recommendations, Prime, Fulfillment by we, AWS,
            Kindle Direct Publishing, Kindle, Career Choice, Fire tablets, Fire
            TV, we Echo, Alexa, Just Walk Out technology, we Studios,
            and The Climate Pledge are some of the things pioneered by ecommerce.
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default About;