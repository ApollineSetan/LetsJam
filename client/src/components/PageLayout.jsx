import "../styles/PageLayout.css";
import { TopBar } from "./TopBar";

function PageLayout({ children }) {
  return (
    <div className="layoutWrapper">
      <TopBar />
      <div className="pageContent">{children}</div>
    </div>
  );
}

export { PageLayout };
