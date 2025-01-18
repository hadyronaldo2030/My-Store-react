// Footer Component
export default function FooterAbout () {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="row">
          {/* Footer Widget 1 */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-widget">
              <h4 className="widget-title">About Us</h4>
              <p>
                We are an IT solutions company dedicated to providing the most
                secure and reliable services to our customers.
              </p>
              <div className="social-icons">
                <a href="#" className="icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="icon">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Footer Widget 2 */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-widget">
              <h4 className="widget-title">Quick Links</h4>
              <ul className="footer-links">
                <li>
                  <a href="about.html">About Us</a>
                </li>
                <li>
                  <a href="service.html">Services</a>
                </li>
                <li>
                  <a href="contact.html">Contact</a>
                </li>
                <li>
                  <a href="pricing.html">Pricing</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Widget 3 */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-widget">
              <h4 className="widget-title">Contact Info</h4>
              <ul className="contact-info">
                <li>
                  <i className="fas fa-map-marker-alt"></i> 123 Main Street,
                  City, Country
                </li>
                <li>
                  <i className="fas fa-phone-alt"></i> +123-456-7890
                </li>
                <li>
                  <i className="fas fa-envelope"></i> info@example.com
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
