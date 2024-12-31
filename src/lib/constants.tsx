export const API_URL = process.env.NEXT_PUBLIC_API_DOMAIN;
export const APP_DOMAIN = process.env.APP_DOMAIN;

export const categoryIcons:{ [key: string]: JSX.Element } = {
  "Electronics": <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  className="feather feather-cpu"
  width="24"
  height="24"
>
  <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
  <rect x="9" y="9" width="6" height="6"></rect>
  <line x1="9" y1="1" x2="9" y2="4"></line>
  <line x1="15" y1="1" x2="15" y2="4"></line>
  <line x1="9" y1="20" x2="9" y2="23"></line>
  <line x1="15" y1="20" x2="15" y2="23"></line>
  <line x1="20" y1="9" x2="23" y2="9"></line>
  <line x1="20" y1="14" x2="23" y2="14"></line>
  <line x1="1" y1="9" x2="4" y2="9"></line>
  <line x1="1" y1="14" x2="4" y2="14"></line>
</svg>,
"Library": <svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
strokeWidth="2"
strokeLinecap="round"
strokeLinejoin="round"
width="24"
height="24"
>
<path d="M3 4h18v16H3z"></path>
<line x1="7" y1="4" x2="7" y2="20"></line>
<line x1="17" y1="4" x2="17" y2="20"></line>
<line x1="11" y1="4" x2="11" y2="20"></line>
<line x1="3" y1="8" x2="21" y2="8"></line>
</svg>,
"Clothes": <svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
strokeWidth="2"
strokeLinecap="round"
strokeLinejoin="round"
width="24"
height="24"
>
<path d="M4 4h16l-2 8h-12z"></path>
<path d="M8 4v16"></path>
<path d="M16 4v16"></path>
<path d="M10 20h4"></path>
</svg>,
"Others":<svg
xmlns="http://www.w3.org/2000/svg"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
strokeWidth="2"
strokeLinecap="round"
strokeLinejoin="round"
width="24"
height="24"
>
<path d="M3 3h18v18H3z"></path>
<path d="M12 8c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5"></path>
<circle cx="12" cy="16" r="1"></circle>
</svg>





}