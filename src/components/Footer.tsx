export const Footer = ()=>{
    return <footer className="bg-[#f0f2f5] px-4 py-8 lg:px-10">
    <div className="max-w-screen-xl mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      
      {/* About Section */}
      <div>
        <h3 className="text-lg font-semibold text-[#111418]">About Campus Bazaar</h3>
        <p className="mt-4 text-sm text-[#60758a]">
          Campus Bazaar is the go-to platform for students to buy, sell, and exchange goods and services. Join a community where you can find the best deals on campus essentials.
        </p>
      </div>
  
      {/* Quick Links */}
      <div>
        <h3 className="text-lg font-semibold text-[#111418]">Quick Links</h3>
        <ul className="mt-4 text-sm text-[#60758a] space-y-2">
          <li><a href="#" className="hover:underline">Home</a></li>
          <li><a href="#" className="hover:underline">Browse Categories</a></li>
          <li><a href="#" className="hover:underline">Sell Items</a></li>
          <li><a href="#" className="hover:underline">My Account</a></li>
        </ul>
      </div>
  
      {/* Support Section */}
      <div>
        <h3 className="text-lg font-semibold text-[#111418]">Support</h3>
        <ul className="mt-4 text-sm text-[#60758a] space-y-2">
          <li><a href="#" className="hover:underline">Help Center</a></li>
          <li><a href="#" className="hover:underline">FAQs</a></li>
          <li><a href="#" className="hover:underline">Contact Us</a></li>
        </ul>
      </div>
  
      {/* Follow Us Section */}
      <div>
        <h3 className="text-lg font-semibold text-[#111418]">Follow Us</h3>
        <div className="mt-4 flex items-center space-x-4">
          <a href="#" aria-label="Facebook" className="text-[#60758a] hover:text-[#111418]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24px" height="24px">
              <path d="M22.675 0h-21.35C.595 0 0 .595 0 1.325v21.351C0 23.404.595 24 1.325 24H12.82v-9.294H9.692v-3.62h3.129V8.411c0-3.1 1.894-4.792 4.658-4.792 1.325 0 2.463.099 2.796.143v3.24h-1.918c-1.503 0-1.795.714-1.795 1.763v2.311h3.59l-.467 3.62h-3.123V24h6.116c.73 0 1.325-.595 1.325-1.324V1.325C24 .595 23.405 0 22.675 0z" />
            </svg>
          </a>
          <a href="#" aria-label="Twitter" className="text-[#60758a] hover:text-[#111418]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24px" height="24px">
              <path d="M23.643 4.937a9.937 9.937 0 01-2.828.775 4.94 4.94 0 002.165-2.723 9.93 9.93 0 01-3.127 1.196 4.924 4.924 0 00-8.389 4.482 13.978 13.978 0 01-10.151-5.148 4.922 4.922 0 001.523 6.573 4.916 4.916 0 01-2.229-.617c-.054 2.281 1.581 4.415 3.945 4.89a4.93 4.93 0 01-2.224.084 4.924 4.924 0 004.598 3.417A9.88 9.88 0 010 21.54a13.941 13.941 0 007.548 2.212c9.142 0 14.307-7.721 13.998-14.646a9.935 9.935 0 002.447-2.531z" />
            </svg>
          </a>
          <a href="#" aria-label="Instagram" className="text-[#60758a] hover:text-[#111418]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24px" height="24px">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.311 3.608 1.285.975.975 1.224 2.242 1.285 3.608.059 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.311 2.633-1.285 3.608-.975.975-2.242 1.224-3.608 1.285-1.266.059-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.311-3.608-1.285-.975-.975-1.224-2.242-1.285-3.608-.059-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.311-2.633 1.285-3.608C4.517 2.474 5.784 2.225 7.15 2.163c1.266-.059 1.646-.07 4.85-.07M12 0C8.741 0 8.332.012 7.052.072 5.773.133 4.51.333 3.5 1.343 2.49 2.353 2.29 3.615 2.229 4.895.013 5.994 0 8.741 0 12c0 3.259.012 6.006.072 7.281.061 1.28.261 2.542 1.271 3.553 1.011 1.011 2.273 1.21 3.553 1.271C8.332 23.988 8.741 24 12 24s3.668-.012 4.948-.072c1.28-.061 2.542-.261 3.553-1.271 1.011-1.011 1.21-2.273 1.271-3.553.059-1.275.072-4.022.072-7.281s-.012-6.006-.072-7.281c-.061-1.28-.261-2.542-1.271-3.553C19.542.333 18.28.133 17 .072 15.721.012 15.312 0 12 0z" />
              <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 100-2.88 1.44 1.44 0 000 2.88z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  
    <div className="mt-8 border-t border-solid border-[#e4e4e4] pt-4 text-center text-sm text-[#60758a]">
      <p>&copy; 2024 Campus Bazaar. All rights reserved.</p>
    </div>
  </footer>
  
}