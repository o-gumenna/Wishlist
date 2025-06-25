import Image from "next/image";
import { Button } from "react-bootstrap";
import { notifyLoginRequired } from "../hooks/toastUtils";
import { isLoggedIn } from "../hooks/auth";

const HeroSection = ({ onAddWish }) => {
  return (
    <section className="py-5 hero-section mt-5">
      <div className="container">
        <div className="row align-items-stretch">
          
          <div className="col-md-6 mb-4 mb-md-0">
            <div className="d-flex flex-column justify-content-between h-100">
              
              <div>
                <h2
                  className="fw-bold mb-3 display-2 text-start"
                  style={{ lineHeight: "1.2", wordBreak: "keep-all" }}
                >
                  <span className="d-block">WHERE WISHES</span>
                  <span className="d-block">TAKE ROOT</span>
                </h2>
              </div>

              <div>
                <p className="fs-2 mb-4">
                  Dream, look for, save and make<br />your wish come true
                </p>
                <Button
                  className="btn-main"
                  size="lg"
                  onClick={() => {
                    if (!isLoggedIn()) {
                      notifyLoginRequired();
                      return;
                    }
                    onAddWish();
                  }}
                >
                  save a new wish
                </Button>
              </div>

            </div>
          </div>

          <div className="col-md-6 text-center">
            <Image
              src="/images/wishlist.png"
              alt="Wish visual"
              width={550}
              height={450}
              className="img-fluid rounded-4"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
