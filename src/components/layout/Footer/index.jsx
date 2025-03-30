import { Link } from "react-router-dom";

import logo from "@/assets/images/logo.png";
import { homeUrl } from "@/routes";
import {
  FaPhoneAlt,
  FaFacebook,
  MdOutlineEmail,
  MdOutlinePrivacyTip,
} from "@/utils";

function Footer() {
  return (
    <div className="bg-theme-gray-700 container py-5">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-14">
        {/* Logo - Message */}
        <div className="flex w-full flex-col gap-6">
          {/* Logo */}
          <div className="flex">
            <Link to={homeUrl()} className="flex items-center">
              <img
                src={logo}
                alt="logo image"
                className="mr-1 w-16 object-cover"
              />
              <span className="text-2xl font-bold">Manga</span>
            </Link>
          </div>

          {/* Message */}
          <div>
            <p className="text-justify font-medium">
              Tibi-Man là dự án được phát triển bởi một lập trình viên trẻ tuổi,
              đam mê với truyện tranh và muốn mang lại trải nghiệm tốt nhất cho
              người đọc.
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="flex flex-col">
          <div className="flex md:justify-center">
            <div className="flex flex-col gap-3 md:gap-6">
              <h3 className="font-semibold">Thông tin liên hệ:</h3>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <FaPhoneAlt className="text-lg" />
                  <p>0123456789</p>
                </div>
                <div className="flex items-center gap-2">
                  <MdOutlineEmail className="text-2xl" />
                  <p>tibiman@gmail.com</p>
                </div>
                <div className="flex items-center gap-2">
                  <FaFacebook className="text-2xl" />
                  <Link to={"https://www.facebook.com/tibidev"} target="_blank">
                    <p>https://www.facebook.com/tibidev</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Term and Privacy */}
        <div className="flex flex-col gap-3 md:gap-6">
          <h3 className="font-semibold">Chính sách và bảo mật:</h3>

          <div className="flex items-center gap-2">
            <MdOutlinePrivacyTip className="text-2xl" />
            <Link to={"https://www.facebook.com/tibidev"} target="_blank">
              Chính sách và bảo mật
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
